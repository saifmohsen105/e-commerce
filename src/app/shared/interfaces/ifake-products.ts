
export type IFakeProducts = IFakeProducts2[]

export interface IFakeProducts2 {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

export interface Rating {
  rate: number
  count: number
}
