"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

const creators = [
  {
    id: 1,
    name: "Carlos Moreno (me)",
    initials: "CM",
    avatar: null,
    bgColor: "bg-slate-600",
  },
  {
    id: 2,
    name: "Luis Juarez",
    initials: "LJ",
    avatar: "/placeholder.svg?height=40&width=40",
    bgColor: "bg-green-600",
  },
  {
    id: 3,
    name: "Raul Garcia Guzman",
    initials: "RG",
    avatar: null,
    bgColor: "bg-orange-500",
  },
  {
    id: 4,
    name: "Eduardo Salazar",
    initials: "ES",
    avatar: null,
    bgColor: "bg-blue-600",
  },
  {
    id: 5,
    name: "itj_lsantos",
    initials: "I",
    avatar: null,
    bgColor: "bg-indigo-600",
  },
  {
    id: 6,
    name: "Jacqueline Zamorano",
    initials: "JZ",
    avatar: null,
    bgColor: "bg-teal-600",
  },
]

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">Acerca de ListApp</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-2">ListApp</h2>
            <p className="text-sm text-muted-foreground">Una lista tan lista como tú</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Creadores</h3>
            <div className="space-y-3">
              {creators.map((creator) => (
                <div key={creator.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {creator.avatar ? (
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                    ) : null}
                    <AvatarFallback className={`${creator.bgColor} text-white font-semibold`}>
                      {creator.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{creator.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            <p>Versión 1.0.0</p>
            <p className="mt-1">Hecho con ❤️ para la productividad</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
