"use client"

import * as React from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Phone } from "lucide-react"

import { KanbanCard as KanbanCardType } from "../types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface KanbanCardProps {
    card: KanbanCardType
}

export function KanbanCard({ card }: KanbanCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: card.id,
        data: { card },
    })

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    }

    // Determine avatar text
    const initial = card.title.substring(0, 1).toUpperCase()
    // Mock background color based on initial
    const colors = ["bg-emerald-100 text-emerald-700", "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700"]
    const colorClass = colors[card.title.length % 3]

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="group relative flex flex-col gap-3 rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:shadow-md active:cursor-grabbing dark:bg-zinc-900"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className={`h-8 w-8 ${colorClass}`}>
                        <AvatarFallback className={colorClass}>{initial}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{card.title}</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Valor</span>
                        <div className="text-sm font-bold text-foreground">
                            R$ {card.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-1">
                <div className="flex gap-1">
                    {card.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="px-1.5 py-0 h-5 text-[10px] font-normal bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                            {tag}
                        </Badge>
                    ))}
                </div>
                {card.hasPhone && (
                    <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                        <Phone className="h-3 w-3 text-white fill-current" />
                    </div>
                )}
            </div>
        </div>
    )
}
