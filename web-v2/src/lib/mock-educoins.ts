export interface Transaction {
  id: string;
  type: "earn" | "spend";
  amount: number;
  description: string;
  date: string;
  category: "post" | "attendance" | "task" | "reward";
}

export interface Reward {
  id: string;
  title: string;
  price: number;
  image: string;
  category: "merch" | "benefit" | "experience";
  description: string;
}

export const eduHistory: Transaction[] = [
  {
    id: "1",
    type: "earn",
    amount: 15,
    description: "Post 'Experimento de Química' recebeu 50 upvotes",
    date: "2026-03-30T14:20:00Z",
    category: "post",
  },
  {
    id: "2",
    type: "earn",
    amount: 10,
    description: "Presença confirmada: 30/03",
    date: "2026-03-30T07:15:00Z",
    category: "attendance",
  },
  {
    id: "3",
    type: "earn",
    amount: 100,
    description: "Trabalho de História entregue no prazo",
    date: "2026-03-29T23:59:00Z",
    category: "task",
  },
  {
    id: "4",
    type: "spend",
    amount: 50,
    description: "Ticket de Lanchonete (Desconto 50%)",
    date: "2026-03-28T12:00:00Z",
    category: "reward",
  },
];

export const rewards: Reward[] = [
  {
    id: "r1",
    title: "Camiseta Oficial Escola",
    price: 1500,
    image: "https://placehold.co/400x400/6835d6/white?text=Camiseta+Oficial",
    category: "merch",
    description: "A clássica camiseta da Rede Escola, agora em edição especial.",
  },
  {
    id: "r2",
    title: "Day Off Atividades",
    price: 3000,
    image: "https://placehold.co/400x400/00b2f7/white?text=Day+Off",
    category: "benefit",
    description: "Um cupom para pular 1 dia de lição de casa opcional.",
  },
  {
    id: "r3",
    title: "Workshop de Robótica",
    price: 2500,
    image: "https://placehold.co/400x400/ffca28/black?text=Robotica",
    category: "experience",
    description: "Acesso antecipado ao laboratório Maker por 2 horas.",
  },
  {
    id: "r4",
    title: "Ingresso Cine-Escola",
    price: 800,
    image: "https://placehold.co/400x400/ff4500/white?text=Cinema",
    category: "experience",
    description: "Pipoca e refri grátis na próxima exibição do Cine-Escola.",
  },
];
