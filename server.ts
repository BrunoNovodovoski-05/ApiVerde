import mongoose from "mongoose";
import * as login from "./routes/login";
import * as jogos from "./routes/jogos";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("Has no DATABASE_URL");

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

Bun.serve({
  port: 3000,
  routes: {
    "/login": { POST: login.post },
    "/jogos": { GET: jogos.getAll, POST: jogos.create },
    "/jogos/:id": {
      GET: jogos.getOne,
      PUT: jogos.update,
      DELETE: jogos.remove,
    },
  },
  fetch(req) {
    return new Response("Not found", { status: 404 });
  },
});

console.log("Server Started on port 3000");
