// Dados mock para o feed da Rede Escola
// Futuramente virão do Prisma / banco de dados

export type UserRole = "PROFESSOR" | "ALUNO" | "PAI" | "DIRETOR";

export interface MockUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: UserRole;
  eduCoins?: number;
}

export interface MockComment {
  id: string;
  author: MockUser;
  content: string;
  timestamp: string;
  votes: number;
  isOP?: boolean;
  replies?: MockComment[];
}

export interface MockPost {
  id: string;
  author: MockUser;
  content: string;
  image?: string;
  timestamp: string;
  flair?: { label: string; color: string };
  votes: number;
  comments: MockComment[];
  saved?: boolean;
}

export interface MockStory {
  id: string;
  user: MockUser;
  seen: boolean;
  isOwn?: boolean;
}

export interface MockCheckIn {
  id: string;
  studentName: string;
  relation: string;
  time: string;
  type: "entrada" | "saida";
}

// ────────────────────────────────────────────
// Usuário logado (mock)
// ────────────────────────────────────────────
export const currentUser: MockUser = {
  id: "u0",
  name: "Gabriel Silva",
  username: "gabriel.pai",
  avatar: "https://i.pravatar.cc/150?img=33",
  role: "PAI",
  eduCoins: 2450,
};

// ────────────────────────────────────────────
// Stories
// ────────────────────────────────────────────
export const mockStories: MockStory[] = [
  {
    id: "s0",
    user: currentUser,
    seen: false,
    isOwn: true,
  },
  {
    id: "s1",
    user: {
      id: "u1",
      name: "Prof. Ana Clara",
      username: "ana.professora",
      avatar: "https://i.pravatar.cc/150?img=47",
      role: "PROFESSOR",
    },
    seen: false,
  },
  {
    id: "s2",
    user: {
      id: "u2",
      name: "3º Ano B",
      username: "3ano.b",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "PROFESSOR",
    },
    seen: false,
  },
  {
    id: "s3",
    user: {
      id: "u3",
      name: "Diretora Lucia",
      username: "lucia.dir",
      avatar: "https://i.pravatar.cc/150?img=56",
      role: "DIRETOR",
    },
    seen: true,
  },
  {
    id: "s4",
    user: {
      id: "u4",
      name: "Prof. Carlos",
      username: "carlos.mat",
      avatar: "https://i.pravatar.cc/150?img=68",
      role: "PROFESSOR",
    },
    seen: true,
  },
];

// ────────────────────────────────────────────
// Posts do Feed
// ────────────────────────────────────────────
export const mockPosts: MockPost[] = [
  {
    id: "p1",
    author: {
      id: "u1",
      name: "Prof. Ana Clara",
      username: "ana.professora",
      avatar: "https://i.pravatar.cc/150?img=47",
      role: "PROFESSOR",
    },
    content:
      "Hoje exploramos o sistema solar! 🪐 As crianças construíram maquetes incríveis em grupo. Foi incrível ver a dedicação de cada um. Parabéns turma pelo engajamento e criatividade!",
    image:
      "https://images.unsplash.com/photo-1610486008182-1c251421fecd?w=800&q=80&fit=crop",
    timestamp: "há 2 horas",
    flair: { label: "Ciências", color: "purple" },
    votes: 342,
    comments: [
      {
        id: "c1",
        author: {
          id: "u5",
          name: "Carlos (Pai do Matheus)",
          username: "carlos.pai",
          avatar: "https://i.pravatar.cc/150?img=12",
          role: "PAI",
        },
        content: "Que maquete incrível! Meu filho adorou participar. 🚀",
        timestamp: "há 30 min",
        votes: 12,
        replies: [
          {
            id: "c2",
            author: {
              id: "u1",
              name: "Prof. Ana Clara",
              username: "ana.professora",
              avatar: "https://i.pravatar.cc/150?img=47",
              role: "PROFESSOR",
            },
            content: "Obrigada Carlos! 😊 O Matheus foi o líder do grupo!",
            timestamp: "agora mesmo",
            votes: 8,
            isOP: true,
          },
        ],
      },
    ],
  },
  {
    id: "p2",
    author: {
      id: "u3",
      name: "Diretora Lucia",
      username: "lucia.dir",
      avatar: "https://i.pravatar.cc/150?img=56",
      role: "DIRETOR",
    },
    content:
      "📢 Lembrando que na próxima sexta-feira (04/04) não haverá aulas devido ao recesso do Dia Mundial da Educação. Aproveitem para curtir em família! 🎉",
    timestamp: "há 5 horas",
    flair: { label: "Aviso", color: "orange" },
    votes: 89,
    comments: [
      {
        id: "c3",
        author: {
          id: "u6",
          name: "Maria (Mãe da Sofia)",
          username: "maria.mae",
          avatar: "https://i.pravatar.cc/150?img=23",
          role: "PAI",
        },
        content: "Obrigada pelo aviso! Já programei um passeio. 🌳",
        timestamp: "há 3 horas",
        votes: 5,
      },
    ],
  },
  {
    id: "p3",
    author: {
      id: "u4",
      name: "Prof. Carlos (Matemática)",
      username: "carlos.mat",
      avatar: "https://i.pravatar.cc/150?img=68",
      role: "PROFESSOR",
    },
    content:
      "Tarefa para esta semana: Exercícios de frações, páginas 42 a 45 do livro. Prazo até quinta-feira. Dúvidas me avisem! 📐",
    timestamp: "há 1 dia",
    flair: { label: "Tarefa", color: "blue" },
    votes: 45,
    comments: [],
  },
];

// ────────────────────────────────────────────
// Check-ins da Catraca
// ────────────────────────────────────────────
export const mockCheckIns: MockCheckIn[] = [
  {
    id: "ch1",
    studentName: "Matheus Silva",
    relation: "Filho",
    time: "07:15",
    type: "entrada",
  },
];
