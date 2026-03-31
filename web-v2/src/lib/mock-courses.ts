export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  image: string;
  category: "Línguas" | "Tecnologia" | "Artes" | "Humanas";
  lastLesson: string;
}

export const myCourses: Course[] = [
  {
    id: "c1",
    title: "Inglês Básico 1",
    instructor: "Prof. Sarah",
    progress: 85,
    image: "https://placehold.co/600x400/6835d6/white?text=English",
    category: "Línguas",
    lastLesson: "Verbo To Be - Parte 2",
  },
  {
    id: "c2",
    title: "Iniciação à Robótica",
    instructor: "Prof. Marcos",
    progress: 45,
    image: "https://placehold.co/600x400/00b2f7/white?text=Robotics",
    category: "Tecnologia",
    lastLesson: "Circuitos Paralelos",
  },
];

export const recommendedCourses: Course[] = [
  {
    id: "r1",
    title: "Lógica de Programação",
    instructor: "Prof. Alan",
    progress: 0,
    image: "https://placehold.co/600x400/ffca28/black?text=Logic",
    category: "Tecnologia",
    lastLesson: "-",
  },
  {
    id: "r2",
    title: "Pintura em Óleo",
    instructor: "Prof. Lucia",
    progress: 0,
    image: "https://placehold.co/600x400/ff4500/white?text=Arts",
    category: "Artes",
    lastLesson: "-",
  },
];
