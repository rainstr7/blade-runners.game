export const data = [
  {
    id: Math.random(),
    image:
      'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
    name: 'Keks Ovalniy',
    score: Math.floor(Math.random() * (10000000000 - 1) + 1),
  },
  {
    id: Math.random(),
    image:
      'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
    name: 'Keks Ovalniy1',
    score: Math.floor(Math.random() * (10000000000 - 1) + 1),
  },
  {
    id: Math.random(),
    image:
      'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
    name: 'Keks Ovalniy2',
    score: Math.floor(Math.random() * (10000000000 - 1) + 1),
  },
]

export interface LeaderBoardInterface {
  id: number
  image: string
  name: string
  score: number
}
