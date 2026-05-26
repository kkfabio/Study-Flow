import { NextResponse } from "next/server";
import { Task } from "@/types";

// Mock API route — persistence is handled client-side via LocalStorage.
// This endpoint can be used for future server-side integration.

const mockTasks: Task[] = [
  {
    id: "seed_1",
    title: "Revisar capítulos de Cálculo I",
    subject: "Matemática",
    priority: "high",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed_2",
    title: "Fazer resumo de Algoritmos",
    subject: "Computação",
    priority: "medium",
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed_3",
    title: "Ler artigos de Filosofia da Ciência",
    subject: "Filosofia",
    priority: "low",
    completed: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ tasks: mockTasks });
}

export async function POST(request: Request) {
  const body = await request.json();
  const task: Task = {
    id: `api_${Date.now()}`,
    title: body.title,
    subject: body.subject,
    priority: body.priority ?? "medium",
    completed: false,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ task }, { status: 201 });
}
