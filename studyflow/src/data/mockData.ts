import { Task } from "@/types";

export interface MockUser {
  matricula: string;
  senha: string;
  nome: string;
  curso: string;
  periodo: number;
  avatar: string;
}

export const mockUsers: MockUser[] = [
  {
    matricula: "2024001",
    senha: "estudo123",
    nome: "Ana Souza",
    curso: "Engenharia de Software",
    periodo: 4,
    avatar: "AS",
  },
  {
    matricula: "2023042",
    senha: "flow456",
    nome: "Carlos Lima",
    curso: "Ciência da Computação",
    periodo: 6,
    avatar: "CL",
  },
  {
    matricula: "2024099",
    senha: "123456",
    nome: "Mariana Costa",
    curso: "Sistemas de Informação",
    periodo: 2,
    avatar: "MC",
  },
];

export const mockTasksByUser: Record<string, Task[]> = {
  "2024001": [
    {
      id: "t1",
      title: "Estudar Álgebra Linear — Capítulo 5",
      subject: "Matemática",
      priority: "high",
      completed: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "t2",
      title: "Entregar relatório de Estruturas de Dados",
      subject: "Programação",
      priority: "high",
      completed: false,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "t3",
      title: "Revisar anotações de Cálculo II",
      subject: "Matemática",
      priority: "medium",
      completed: true,
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: "t4",
      title: "Ler artigo sobre Clean Architecture",
      subject: "Engenharia de Software",
      priority: "low",
      completed: true,
      createdAt: new Date(Date.now() - 345600000).toISOString(),
    },
    {
      id: "t5",
      title: "Praticar exercícios de Banco de Dados",
      subject: "BD",
      priority: "medium",
      completed: false,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
  ],
  "2023042": [
    {
      id: "t6",
      title: "Implementar algoritmo de Dijkstra",
      subject: "Grafos",
      priority: "high",
      completed: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "t7",
      title: "Estudar para prova de Compiladores",
      subject: "Teoria da Computação",
      priority: "high",
      completed: false,
      createdAt: new Date(Date.now() - 50000000).toISOString(),
    },
    {
      id: "t8",
      title: "Concluir projeto de Redes de Computadores",
      subject: "Redes",
      priority: "medium",
      completed: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
  "2024099": [
    {
      id: "t9",
      title: "Estudar fundamentos de UX/UI",
      subject: "Design",
      priority: "medium",
      completed: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "t10",
      title: "Completar lista de exercícios de Lógica",
      subject: "Lógica",
      priority: "high",
      completed: false,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "t11",
      title: "Assistir aulas gravadas de Introdução à IA",
      subject: "Inteligência Artificial",
      priority: "low",
      completed: true,
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
  ],
};
