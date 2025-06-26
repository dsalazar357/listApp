"use client"

import { TodoItem } from "./todo-item"
import type { Todo } from "@/types/todo"

interface TodoListProps {
  todos: Todo[]
  onToggleComplete: (id: string) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggleComplete, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No hay tareas para mostrar</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
