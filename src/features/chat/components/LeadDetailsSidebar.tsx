"use client"

import * as React from "react"
import { X, DollarSign, Tag, Phone, Mail, MapPin, Calendar, CheckSquare, Trash2, Link as LinkIcon, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Chat } from "@/features/chat/types"

interface LeadDetailsSidebarProps {
    chat: Chat | null
    onClose: () => void
}

export function LeadDetailsSidebar({ chat, onClose }: LeadDetailsSidebarProps) {
    if (!chat) return null

    return (
        <div className="flex w-[350px] flex-col border-l border-border bg-white h-screen overflow-y-auto dark:bg-zinc-950">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-2">
                <h2 className="text-sm font-bold font-sans tracking-wide text-muted-foreground">DETALHES DO LEAD</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center p-6 pt-2">
                <Avatar className="h-20 w-20 mb-4 bg-orange-100 text-orange-600">
                    <AvatarFallback className="text-2xl font-bold bg-orange-100 text-orange-600">AH</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold font-sans">{chat.leadName}</h1>
                <p className="text-sm text-muted-foreground">Lead #{chat.leadId}</p>
            </div>

            {/* Opportunity Value */}
            <div className="px-6 pb-6">
                <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex flex-col items-center dark:bg-green-900/10 dark:border-green-900/30">
                    <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1">Valor da Oportunidade</span>
                    <div className="flex items-center text-3xl font-bold text-green-600 dark:text-green-500">
                        <span className="text-lg mr-1">R$</span>
                        1.200,00
                    </div>
                </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3 font-sans uppercase tracking-wide">
                    <Tag className="h-4 w-4" /> TAGS
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="font-normal">Importado</Badge>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none font-normal dark:bg-green-900 dark:text-green-100">● Quente</Badge>
                    <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 rounded-full border-dashed">
                        + Adicionar
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Funnel */}
            <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3 font-sans uppercase tracking-wide">
                    FUNIL DE VENDAS
                </div>
                <Button variant="outline" className="w-full justify-between font-normal">
                    Leads de entrada (2 days)
                    <span className="ml-2">▼</span>
                </Button>
            </div>

            <Separator />

            {/* Contact Info */}
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3 font-sans uppercase tracking-wide">
                    CONTATO
                </div>

                <div className="flex gap-3 items-start">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Celular</p>
                        <p className="text-sm font-medium">+55 93 91049-069</p>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">alan.hair@exemplo.com</p>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Cidade</p>
                        <p className="text-sm font-medium">Santarém, PA</p>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Next Task */}
            <div className="p-6">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-3 font-sans uppercase tracking-wide">
                    <span>PRÓXIMA TAREFA</span>
                    <span className="text-green-600 cursor-pointer hover:underline">+ Nova</span>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 flex gap-3 dark:bg-yellow-900/10 dark:border-yellow-900/30">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <Phone className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-yellow-900 dark:text-yellow-100">Ligar para Alan</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">Hoje, 14:00</p>
                    </div>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-auto p-4 flex gap-2 border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white flex-col h-14 gap-1">
                    <CheckSquare className="h-5 w-5" />
                    <span className="text-[10px]">Aceitar</span>
                </Button>
                <Button variant="outline" className="flex-1 bg-white flex-col h-14 gap-1 dark:bg-zinc-900">
                    <LinkIcon className="h-5 w-5 text-green-500" />
                    <span className="text-[10px]">Link</span>
                </Button>
                <Button variant="outline" className="flex-1 bg-white flex-col h-14 gap-1 hover:bg-red-50 hover:text-red-600 dark:bg-zinc-900">
                    <Trash2 className="h-5 w-5 text-muted-foreground" />
                    <span className="text-[10px]">Rejeitar</span>
                </Button>
            </div>

        </div>
    )
}
