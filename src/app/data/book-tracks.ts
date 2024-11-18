export interface BookTrack {
  title: string;
  totalPages: number;
  alreadyReadPages: number;
  created_at: Date;
  image: string;
}

export const BOOK_TRACKS: BookTrack[] = [
  {
    title: "El Eternauta",
    totalPages: 300,
    alreadyReadPages: 200,
    created_at: new Date(),
    image:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/ba/56/ba5605fcb888643713b8bcb87ad4202f.jpg",
  },
  {
    title: "El Eternauta",
    totalPages: 300,
    alreadyReadPages: 20,
    created_at: new Date(),
    image:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/ba/56/ba5605fcb888643713b8bcb87ad4202f.jpg",
  },
];
