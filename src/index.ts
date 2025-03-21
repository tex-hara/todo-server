// console.log("hello express");

import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

app.post("/createTodo", async (req: Request, res: Response) => {
  console.log(req.body);
  const { title, isCompleted } = req.body;
  const createTodo = await prisma.todo.create({
    data: {
      title,
      isCompleted,
    },
  });

  return res.json(createTodo);
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, isCompleted } = req.body;
  const editTodo = await prisma.todo.update({
    where: { id },
    data: {
      title,
      isCompleted,
    },
  });
  return res.json(editTodo);
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleteTodo = await prisma.todo.delete({
    where: { id },
  });

  return res.json(deleteTodo);
});

app.listen(PORT, () => console.log("Server is running"));
