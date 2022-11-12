import express, { json } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(json());

// view the data

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: String(id),
    },
  });
  res.json(user);
});

// create data

app.post("/", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
});

// update data

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: {
      id: String(id),
    },
    data: {
      name,
      email,
    },
  });
  res.json(user);
});

// delete data

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: String(id),
    },
  });
  res.json(user);
});

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);

export default server;
