"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Todo } from "@/types/todo"

interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggleComplete, onEdit, onDelete }: TodoItemProps) {
  return (
    <Card className={`transition-opacity ${todo.completed ? "opacity-70" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox checked={todo.completed} onCheckedChange={() => onToggleComplete(todo.id)} className="mt-1" />

          <div className="flex-1 space-y-2">
            <h3 className={`text-lg font-semibold ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
              {todo.title}
            </h3>

            {todo.description && (
              <p className={`text-sm text-muted-foreground ${todo.completed ? "line-through" : ""}`}>
                {todo.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {todo.category && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {todo.category}
                </Badge>
              )}

              {todo.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(todo)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(todo.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
