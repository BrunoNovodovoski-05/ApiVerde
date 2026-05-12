type Jogo = {
  id: number;
  nome: string;
  tipo: string;
  nota: number;
  review: string;
};
type BunRequest = Request & { params: Record<string, string | undefined> };

let jogos: Jogo[] = [
  {
    id: 1,
    nome: "The Legend of Zelda",
    tipo: "Aventura",
    nota: 10,
    review: "Um clássico absoluto.",
  },
  {
    id: 2,
    nome: "FIFA 23",
    tipo: "Esporte",
    nota: 7,
    review: "Bom para jogar com amigos.",
  },
];

export function getAll(_req: Request): Response {
  return Response.json(jogos);
}

function parseId(req: Request): number {
  return parseInt((req as BunRequest).params["id"] ?? "");
}

export function getOne(req: Request): Response {
  const id = parseId(req);
  const jogo = jogos.find((j) => j.id === id);
  if (jogo) return Response.json(jogo);
  return Response.json({ message: "Game not found" }, { status: 404 });
}

export async function create(req: Request): Promise<Response> {
  const body = (await req.json()) as Omit<Jogo, "id">;
  const novoJogo: Jogo = { id: jogos.length + 1, ...body };
  jogos.push(novoJogo);
  return Response.json(novoJogo, { status: 201 });
}

export async function update(req: Request): Promise<Response> {
  const id = parseId(req);
  const body = (await req.json()) as Omit<Jogo, "id">;
  const index = jogos.findIndex((j) => j.id === id);
  if (index !== -1) {
    jogos[index] = { id, ...body };
    return Response.json(jogos[index]);
  }
  return Response.json({ message: "Game not found" }, { status: 404 });
}

export function remove(req: Request): Response {
  const id = parseId(req);
  const index = jogos.findIndex((j) => j.id === id);
  if (index !== -1) {
    jogos.splice(index, 1);
    return new Response(null, { status: 204 });
  }
  return Response.json({ message: "Game not found" }, { status: 404 });
}
