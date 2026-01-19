"use client"

import * as React from "react"
import { MoreHorizontal, Paperclip, Send, Smile, Phone, Search, X, Plus, Check } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Chat, Message } from "@/features/chat/types"

interface ChatWindowProps {
    chat: Chat | null // null means no chat selected
    messages: Message[]
    onSendMessage?: (content: string) => void
    isSending?: boolean
}

export function ChatWindow({ chat, messages, onSendMessage, isSending = false }: ChatWindowProps) {
    const [inputValue, setInputValue] = React.useState('')
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = () => {
        if (!inputValue.trim() || isSending || !onSendMessage) return
        onSendMessage(inputValue)
        setInputValue('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    if (!chat) {
        return (
            <div className="flex flex-1 items-center justify-center bg-muted/10">
                <p className="text-muted-foreground">Selecione uma conversa para começar.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col bg-muted/10 h-screen overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-white px-6 py-3 dark:bg-zinc-950">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <X className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-10 w-10 bg-orange-100">
                                <AvatarImage src={chat.leadAvatar} />
                                <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">{chat.leadName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-[1.5px]">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-base font-bold font-sans text-zinc-900 dark:text-zinc-50">{chat.leadName}</h2>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3 fill-green-500 text-green-500" />
                                <span className="font-medium">WhatsApp Lite</span>
                                <span className="text-zinc-300">•</span>
                                <span>Visto por último hoje às 12:35</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-600">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-600">
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Sub-Header (Tabs/Funnel) */}
            <div className="flex items-center justify-between border-b border-border bg-zinc-50 px-6 py-2 dark:bg-zinc-900/50">
                <div className="flex gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Funil de vendas:</span>
                    <span className="text-xs font-bold text-foreground">{chat.funnelStage}</span>
                </div>
                <div className="flex gap-2">
                    {/* Tags placehoder */}
                    {chat.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white border border-border px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {/* Date Separator - show today's date or first message date */}
                {messages.length > 0 && (
                    <div className="flex items-center justify-center">
                        <span className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                            {format(new Date(messages[0].createdAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                    </div>
                )}

                {messages.map((message) => {
                    const isMe = message.senderId === 'me' || message.senderId.startsWith('agent')
                    const isSendingMsg = message.status === 'sending'

                    return (
                        <div key={message.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                            {!isMe && (
                                <Avatar className="h-8 w-8 mt-1 lg:hidden">
                                    <AvatarImage src={chat.leadAvatar} />
                                    <AvatarFallback>SQ</AvatarFallback>
                                </Avatar>
                            )}

                            <div className={`flex flex-col max-w-[70%] gap-1 ${isMe ? 'items-end' : 'items-start'}`}>

                                <div className={`p-4 text-sm leading-relaxed shadow-sm relative group ${isMe
                                    ? 'bg-green-50 rounded-2xl rounded-tr-none text-zinc-800 border-none dark:bg-green-900/40 dark:text-green-100'
                                    : 'bg-white text-zinc-800 rounded-2xl rounded-tl-none border border-border dark:bg-zinc-900 dark:text-zinc-100'
                                    } ${isSendingMsg ? 'opacity-70' : ''}`}>
                                    {message.content}

                                    <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-end'}`}>
                                        <span className="text-[10px] text-muted-foreground/70">{format(new Date(message.createdAt), 'HH:mm')}</span>
                                        {isMe && (
                                            isSendingMsg
                                                ? <span className="text-[10px] text-muted-foreground/50">Enviando...</span>
                                                : <Check className="h-3 w-3 text-green-500" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Agent Avatar on the side (Optional/Design) */}
                            {isMe && (
                                <Avatar className="h-8 w-8 mt-1 shadow-sm">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>ME</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    )
                })}

                {/* System Message (Design match) */}
                <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 my-2">
                    <div className="h-4 w-1 bg-yellow-400"></div> {/* Bolt icon placeholder */}
                    <span>Salesbot alterou o status para <strong>Em negociação</strong></span>
                </div>

                {/* Auto-scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border dark:bg-zinc-950">

                {/* Quick Actions */}
                <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                    <Button variant="outline" className="rounded-full text-xs h-8 px-4 text-muted-foreground border-zinc-200 bg-white hover:bg-zinc-50 font-normal">
                        Agendar Ligação
                    </Button>
                    <Button variant="outline" className="rounded-full text-xs h-8 px-4 text-muted-foreground border-zinc-200 bg-white hover:bg-zinc-50 font-normal">
                        Enviar Catálogo
                    </Button>
                    <Button variant="outline" className="rounded-full text-xs h-8 px-4 text-muted-foreground border-zinc-200 bg-white hover:bg-zinc-50 font-normal">
                        / Resposta rápida
                    </Button>
                </div>

                {/* Input Field */}
                <div className="relative flex items-center gap-2 bg-zinc-50/50 p-2 rounded-2xl border border-zinc-200 focus-within:border-green-500/30 focus-within:ring-2 focus-within:ring-green-500/10 transition-all dark:bg-zinc-900 dark:border-zinc-800">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-600 h-9 w-9">
                        <div className="rounded-full border border-current p-0.5">
                            <Plus className="h-4 w-4" />
                        </div>
                    </Button>
                    <Input
                        className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 h-auto py-2 text-sm"
                        placeholder={`Escreva uma mensagem para ${chat.leadName}...`}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isSending}
                    />
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-600">
                            <Smile className="h-5 w-5" />
                        </Button>
                        <Button
                            size="icon"
                            className="bg-green-500 hover:bg-green-600 text-white rounded-xl h-10 w-10 shadow-sm shadow-green-500/20 disabled:opacity-50"
                            onClick={handleSend}
                            disabled={isSending || !inputValue.trim()}
                        >
                            <Send className="h-5 w-5 ml-0.5" />
                        </Button>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="px-1 py-2 flex items-center justify-between mt-1">
                    <span className="text-[10px] text-zinc-400 flex items-center gap-1.5 font-medium">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Online agora
                    </span>
                    <span className="text-[10px] text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-600">
                        REF: A422
                    </span>
                </div>
            </div>
        </div>
    )
}
