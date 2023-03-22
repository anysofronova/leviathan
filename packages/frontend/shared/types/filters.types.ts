export interface IDesigner {
  id: number
  createdAt: Date
  name: string
  image: string
  info: string
}

export interface IFilters {
  categories: string[]
  relevance: string[]
}
