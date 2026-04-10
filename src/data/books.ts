export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  cover: string;
  description: string;
  pages: number;
  year: number;
  publisher: string;
  isbn: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    price: 890,
    oldPrice: 1200,
    category: "Классика",
    rating: 4.9,
    reviews: 2847,
    cover: "https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/c760bb64-55f6-453a-9057-b14993d72822.jpg",
    description: "Роман Михаила Булгакова — одно из величайших произведений русской литературы XX века. История о визите Дьявола в советскую Москву, о любви и творчестве, о добре и зле.",
    pages: 448,
    year: 2023,
    publisher: "АСТ",
    isbn: "978-5-17-090115-9",
    inStock: true,
    isBestseller: true,
  },
  {
    id: 2,
    title: "Война и мир",
    author: "Лев Толстой",
    price: 1490,
    category: "Классика",
    rating: 4.8,
    reviews: 1923,
    cover: "https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/c760bb64-55f6-453a-9057-b14993d72822.jpg",
    description: "Эпический роман-хроника, описывающий русское общество в эпоху войн против Наполеона. Грандиозное полотно человеческих судеб, любви и патриотизма.",
    pages: 1274,
    year: 2022,
    publisher: "Эксмо",
    isbn: "978-5-699-20863-7",
    inStock: true,
  },
  {
    id: 3,
    title: "Сто лет одиночества",
    author: "Габриэль Гарсиа Маркес",
    price: 990,
    oldPrice: 1350,
    category: "Зарубежная литература",
    rating: 4.7,
    reviews: 1456,
    cover: "https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/f2f4e205-52d1-4857-be93-798287167c7d.jpg",
    description: "Магический реализм Маркеса в своём лучшем проявлении. История семьи Буэндиа, основавшей город Макондо, на протяжении ста лет.",
    pages: 416,
    year: 2023,
    publisher: "АСТ",
    isbn: "978-5-17-146628-2",
    inStock: true,
    isNew: true,
  },
  {
    id: 4,
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    price: 750,
    category: "Классика",
    rating: 4.8,
    reviews: 3102,
    cover: "https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/c760bb64-55f6-453a-9057-b14993d72822.jpg",
    description: "Психологический роман о студенте Раскольникове, совершившем убийство ради доказательства своей теории о 'необыкновенных людях'.",
    pages: 592,
    year: 2023,
    publisher: "Эксмо",
    isbn: "978-5-04-108963-0",
    inStock: true,
    isBestseller: true,
  },
  {
    id: 5,
    title: "Маленький принц",
    author: "Антуан де Сент-Экзюпери",
    price: 590,
    oldPrice: 790,
    category: "Зарубежная литература",
    rating: 4.9,
    reviews: 4521,
    cover: "https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/f2f4e205-52d1-4857-be93-798287167c7d.jpg",
    description: "Философская сказка о маленьком принце, путешествующем по планетам. Книга о любви, дружбе и том, что по-настоящему важно в жизни.",
    pages: 96,
    year: 2024,
    publisher: "Эксмо",
    isbn: "978-5-04-099560-2",
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: 6,
    title: "Анна Каренина",
    author: "Лев Толстой",
    price: 890,
    category: "Классика",
    rating: 4.7,
    reviews: 1687,
    cover: "https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/c760bb64-55f6-453a-9057-b14993d72822.jpg",
    description: "Трагическая история замужней аристократки Анны Карениной и её страстного романа с офицером Вронским.",
    pages: 864,
    year: 2022,
    publisher: "АСТ",
    isbn: "978-5-17-133612-5",
    inStock: false,
  },
  {
    id: 7,
    title: "Процесс",
    author: "Франц Кафка",
    price: 690,
    category: "Зарубежная литература",
    rating: 4.6,
    reviews: 892,
    cover: "https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/f2f4e205-52d1-4857-be93-798287167c7d.jpg",
    description: "Абсурдистский роман о Йозефе К., арестованном без предъявления обвинений и вынужденном противостоять загадочной судебной системе.",
    pages: 320,
    year: 2023,
    publisher: "Эксмо",
    isbn: "978-5-04-121830-4",
    inStock: true,
  },
  {
    id: 8,
    title: "Дюна",
    author: "Фрэнк Герберт",
    price: 1190,
    oldPrice: 1590,
    category: "Фантастика",
    rating: 4.9,
    reviews: 3287,
    cover: "https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/05b50591-f6d0-493a-be31-4f6d7dfbe167.jpg",
    description: "Эпическая научно-фантастическая сага о планете Арракис, единственном источнике Пряности — самого ценного вещества во Вселенной.",
    pages: 896,
    year: 2024,
    publisher: "АСТ",
    isbn: "978-5-17-153234-7",
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
];

export const categories = ["Все", "Классика", "Зарубежная литература", "Фантастика", "Поэзия", "История"];
