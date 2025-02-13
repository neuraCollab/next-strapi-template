export interface Article {
  id: number
  attributes: {
    title: string
    description: string
  }
}

export interface StrapiResponse<T> {
  data: T
}
