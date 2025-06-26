"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TodoFilter } from "@/types/todo"

interface TodoFiltersProps {
  currentFilter: TodoFilter
  onFilterChange: (filter: TodoFilter) => void
  todosCount: {
    all: number
    completed: number
    pending: number
    archived: number
  }
}

export function TodoFilters({ currentFilter, onFilterChange, todosCount }: TodoFiltersProps) {
  const filters = [
    { key: "all" as TodoFilter, label: "Todas", count: todosCount.all },
    { key: "pending" as TodoFilter, label: "Pendientes", count: todosCount.pending },
    { key: "completed" as TodoFilter, label: "Completadas", count: todosCount.completed },
    { key: "archived" as TodoFilter, label: "Archivadas", count: todosCount.archived },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={currentFilter === filter.key ? "default" : "outline"}
          onClick={() => onFilterChange(filter.key)}
          className={`flex items-center gap-2 ${
            currentFilter === filter.key ? "bg-purple-600 hover:bg-purple-700" : ""
          }`}
        >
          {filter.label}
          <Badge variant={currentFilter === filter.key ? "secondary" : "default"}>{filter.count}</Badge>
        </Button>
      ))}
    </div>
  )
}
