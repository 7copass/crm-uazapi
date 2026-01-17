"use client"

import * as React from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Search, Filter, Phone, FileText, AudioLines, MoreHorizontal, CheckCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Chat } from "@/features/chat/types"

interface ConversationListProps {
    chats: Chat[]
    selectedChatId?: string
    onSelectChat: (chatId: string) => void
}

export function ConversationList({ chats, selectedChatId, onSelectChat }: ConversationListProps) {
    return (
        <div className="flex w-[350px] flex-col border-r border-border bg-white dark:bg-zinc-950">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold font-sans">Inbox</h1>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                        {chats.length}
                    </Badge>
                </div>
                <Button variant="ghost" size="icon">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                </Button>
            </div>

            {/* Search */}
            <div className="p-4 py-2">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar..." className="pl-8 bg-muted/50 border-none" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 px-4 pb-2">
                <Button variant="secondary" size="sm" className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                    Conversas abertas
                </Button>
                <span className="ml-auto text-xs text-muted-foreground self-center">Total: 301</span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-auto">
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={cn(
                            "flex w-full flex-col gap-1 p-4 text-left transition-all hover:bg-muted/50",
                            selectedChatId === chat.id && "bg-muted"
                        )}
                    >
                        <div className="flex w-full items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Avatar>
                                        <AvatarImage src={chat.leadAvatar} />
                                        <AvatarFallback>{chat.leadName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {/* Whatsapp Icon Badge */}
                                    <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-[2px]">
                                        <div className="rounded-full bg-green-500 p-1">
                                            <Phone className="h-2 w-2 text-white fill-current" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm flex items-center gap-2">
                                        {chat.leadName}
                                        {chat.tags.includes('A441') && <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 bg-green-100 text-green-700 border-none">A441</Badge>}
                                        {chat.tags.includes('A22') && <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 bg-gray-100 text-gray-700 border-none">A22</Badge>}
                                    </span>
                                    <span className="text-xs text-muted-foreground line-clamp-1">
                                        Lead #{chat.leadId}
                                    </span>
                                </div>
                            </div>

                            <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: false, locale: ptBR }).replace('cerca de ', '')}
                            </span>
                        </div>

                        <div className="pl-[52px] mt-1 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                {chat.lastMessage === 'data.pdf' ? <FileText className="h-3 w-3" /> : null}
                                {chat.lastMessage === 'Áudio' ? <AudioLines className="h-3 w-3" /> : null}
                                {chat.lastMessage}
                            </span>
                            {chat.unreadCount > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                                    {chat.unreadCount}
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
