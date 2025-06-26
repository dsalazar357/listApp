"use client"

import { useState, useEffect } from "react"
import { Plus, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { TodoList } from "./todo-list"
import { TodoForm } from "./todo-form"
import { TodoFilters } from "./todo-filters"
import { mockTodos } from "@/lib/mock-data"
import type { Todo, TodoFilter } from "@/types/todo"

export function TodoApp() {
  const { theme, setTheme } = useTheme()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<TodoFilter>("all")
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  useEffect(() => {
    setTodos(mockTodos)
  }, [])

  const addTodo = (todoData: Omit<Todo, "id" | "createdAt" | "completed">) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
    }
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    updateTodo(id, {
      completed: !todos.find((todo) => todo.id === id)?.completed,
    })
  }

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (todoData: Omit<Todo, "id" | "createdAt" | "completed">) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData)
      setEditingTodo(null)
    } else {
      addTodo(todoData)
    }
    setIsFormOpen(false)
  }

  const handleFormClose = () => {
    setEditingTodo(null)
    setIsFormOpen(false)
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "completed":
        return todo.completed
      case "pending":
        return !todo.completed
      case "overdue":
        return !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
      case "archived":
        return !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-purple-600">ListApp</h1>
              <p className="text-sm text-muted-foreground mt-1">Una lista tan lista como tú</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsFormOpen(true)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            todosCount={{
              all: todos.length,
              completed: todos.filter((t) => t.completed).length,
              pending: todos.filter((t) => !t.completed).length,
              overdue: todos.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length,
              archived: todos.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length,
            }}
          />

          <TodoList todos={filteredTodos} onToggleComplete={toggleComplete} onEdit={handleEdit} onDelete={deleteTodo} />

          <TodoForm
            isOpen={isFormOpen}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            editingTodo={editingTodo}
          />
        </div>
      </div>
    </div>
  )
}
