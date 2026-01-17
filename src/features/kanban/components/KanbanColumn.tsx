"use client"

import * as React from "react"
import { useDroppable } from "@dnd-kit/core"
import { MoreHorizontal, Plus } from "lucide-react"

import { KanbanColumn as KanbanColumnType, KanbanCard as KanbanCardType } from "../types"
import { KanbanCard } from "./KanbanCard"
import { Button } from "@/components/ui/button"

interface KanbanColumnProps {
    column: KanbanColumnType
    cards: KanbanCardType[]
}

export function KanbanColumn({ column, cards }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: column.id,
    })

    // Calculate total value
    const totalValue = cards.reduce((sum, card) => sum + card.value, 0)

    return (
        <div className="flex h-full w-[300px] min-w-[300px] flex-col rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20">
            {/* Header */}
            <div className="flex items-center justify-between p-3">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{column.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{cards.length} leads</span>
                        <span className="font-semibold">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
                    </div>
                </div>
                <div
                    className="h-1 flex-1 mx-3 rounded-full opacity-50"
                    style={{ backgroundColor: column.color }}
                />
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>

            {/* Cards Area */}
            <div ref={setNodeRef} className="flex-1 flex flex-col gap-3 p-2 overflow-y-auto">
                {cards.map((card) => (
                    <KanbanCard key={card.id} card={card} />
                ))}

                <Button variant="ghost" className="w-full border border-dashed border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground h-10">
                    <Plus className="h-4 w-4 mr-2" />
                    Adição rápida
                </Button>
            </div>
        </div>
    )
}
