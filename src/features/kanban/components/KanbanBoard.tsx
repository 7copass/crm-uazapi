"use client"

import * as React from "react"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { Search, RotateCw, Plus, Settings } from "lucide-react"

import { kanbanService } from "../service"
import { KanbanBoardData, KanbanCard as KanbanCardType } from "../types"
import { KanbanColumn } from "./KanbanColumn"
import { KanbanCard } from "./KanbanCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function KanbanBoard() {
    const [board, setBoard] = React.useState<KanbanBoardData | null>(null)
    const [activeCard, setActiveCard] = React.useState<KanbanCardType | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    React.useEffect(() => {
        kanbanService.getBoard().then(setBoard)
    }, [])

    function handleDragStart(event: DragStartEvent) {
        const { active } = event
        const card = board?.cards.find(c => c.id === active.id)
        if (card) setActiveCard(card)
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        setActiveCard(null)

        if (!over) return

        const cardId = active.id as string
        const newColumnId = over.id as string

        if (board) {
            // Optimistic Update
            const newCards = board.cards.map(card => {
                if (card.id === cardId) {
                    return { ...card, columnId: newColumnId }
                }
                return card
            })

            setBoard({ ...board, cards: newCards })

            // Async Sync
            kanbanService.moveCard(cardId, newColumnId)
        }
    }

    if (!board) return <div>Loading...</div>

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col h-full bg-background">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <h1 className="text-2xl font-bold font-sans flex items-center gap-4">
                        Leads
                        <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full dark:bg-green-900 dark:text-green-100">
                            2 LEADS ATIVOS: R$ 1.454,19
                        </span>
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="relative w-[300px]">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Buscar leads..." className="pl-9 bg-white" />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <RotateCw className="h-4 w-4" />
                            Automatize
                        </Button>
                        <Button className="gap-2 bg-green-500 hover:bg-green-600 text-white">
                            <Plus className="h-4 w-4" />
                            Novo Lead
                        </Button>
                    </div>
                </div>

                {/* Board Area */}
                <div className="flex flex-1 overflow-x-auto p-6 gap-6">
                    {board.columns.map(column => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            cards={board.cards.filter(c => c.columnId === column.id)}
                        />
                    ))}
                </div>
            </div>

            <DragOverlay>
                {activeCard ? <KanbanCard card={activeCard} /> : null}
            </DragOverlay>
        </DndContext>
    )
}
