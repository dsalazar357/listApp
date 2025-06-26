export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date
  dueDate?: Date
  category?: string
  tags?: string[]
}

export type TodoFilter = "all" | "completed" | "pending" | "archived"
