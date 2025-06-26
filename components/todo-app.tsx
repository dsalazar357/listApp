"use client"

import { useState, useEffect } from "react"
import { Plus, Moon, Sun, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { TodoList } from "./todo-list"
import { TodoForm } from "./todo-form"
import { TodoFilters } from "./todo-filters"
import { AboutModal } from "./about-modal"
import { mockTodos } from "@/lib/mock-data"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Todo, TodoFilter } from "@/types/todo"

export function TodoApp() {
  const { theme, setTheme } = useTheme()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [todos, setTodos, isLoaded] = useLocalStorage<Todo[]>("listapp-todos", [])
  const [filter, setFilter] = useState<TodoFilter>("all")
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  // Cargar datos mock solo si no hay datos en localStorage
  useEffect(() => {
    if (isLoaded && todos.length === 0) {
      setTodos(mockTodos)
    }
  }, [isLoaded, todos.length, setTodos])

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

  const clearAllTodos = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar todas las tareas?")) {
      setTodos([])
    }
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "completed":
        return todo.completed
      case "pending":
        return !todo.completed
      case "archived":
        return false // No archived todos without due dates
      default:
        return true
    }
  })

  // Mostrar loading mientras se cargan los datos
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">ListApp</h1>
          <p className="text-muted-foreground">Cargando tus tareas...</p>
        </div>
      </div>
    )
  }

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
              <Button variant="outline" size="icon" onClick={() => setIsAboutOpen(true)}>
                <Info className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <TodoFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              todosCount={{
                all: todos.length,
                completed: todos.filter((t) => t.completed).length,
                pending: todos.filter((t) => !t.completed).length,
                archived: 0, // No archived todos without due dates
              }}
            />

            {todos.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllTodos}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                Limpiar todo
              </Button>
            )}
          </div>

          <TodoList todos={filteredTodos} onToggleComplete={toggleComplete} onEdit={handleEdit} onDelete={deleteTodo} />

          <TodoForm
            isOpen={isFormOpen}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            editingTodo={editingTodo}
          />

          <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

          {todos.length > 0 && (
            <div className="text-center text-xs text-muted-foreground">
              Tus tareas se guardan automáticamente en tu navegador
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
