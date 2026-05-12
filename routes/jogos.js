
const express = require('express');
const router = express.Router();

// Dummy data for jogos (to be replaced with database logic)
let jogos = [
    { id: 1, nome: 'The Legend of Zelda', tipo: 'Aventura', nota: 10, review: 'Um clássico absoluto.' },
    { id: 2, nome: 'FIFA 23', tipo: 'Esporte', nota: 7, review: 'Bom para jogar com amigos.' }
];

// GET /jogos: List all games
router.get('/', (req, res) => {
    res.status(200).json(jogos);
});

// GET /jogos/:id: Get details of a specific game
router.get('/:id', (req, res) => {
    const jogo = jogos.find(j => j.id === parseInt(req.params.id));
    if (jogo) {
        res.status(200).json(jogo);
    } else {
        res.status(404).json({ message: 'Game not found' });
    }
});

// POST /jogos: Create a new game review
router.post('/', (req, res) => {
    const { nome, tipo, nota, review } = req.body;
    const novoJogo = { id: jogos.length + 1, nome, tipo, nota, review };
    jogos.push(novoJogo);
    res.status(201).json(novoJogo);
});

// PUT /jogos/:id: Update an existing game
router.put('/:id', (req, res) => {
    const { nome, tipo, nota, review } = req.body;
    const jogoIndex = jogos.findIndex(j => j.id === parseInt(req.params.id));
    if (jogoIndex !== -1) {
        jogos[jogoIndex] = { id: parseInt(req.params.id), nome, tipo, nota, review };
        res.status(200).json(jogos[jogoIndex]);
    } else {
        res.status(404).json({ message: 'Game not found' });
    }
});

// DELETE /jogos/:id: Delete a game review
router.delete('/:id', (req, res) => {
    const jogoIndex = jogos.findIndex(j => j.id === parseInt(req.params.id));
    if (jogoIndex !== -1) {
        jogos.splice(jogoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Game not found' });
    }
});

module.exports = router;
