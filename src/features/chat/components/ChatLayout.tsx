"use client"

import * as React from "react"
import { ConversationList } from "./ConversationList"
import { ChatWindow } from "./ChatWindow"
import { LeadDetailsSidebar } from "./LeadDetailsSidebar"
import { chatService } from "../service"
import { Chat, Message } from "../types"
import { supabase } from "@/lib/supabase"

export function ChatLayout() {
    const [chats, setChats] = React.useState<Chat[]>([])
    const [selectedChatId, setSelectedChatId] = React.useState<string | undefined>(undefined)
    const [messages, setMessages] = React.useState<Message[]>([])
    const [isSending, setIsSending] = React.useState(false)

    // Load Chats (Poll every 10s)
    React.useEffect(() => {
        const fetchChats = () => {
            chatService.getChats().then(setChats)
        }

        fetchChats() // Initial fetch
        const interval = setInterval(fetchChats, 10000)
        return () => clearInterval(interval)
    }, [])

    // Auto-select first chat on initial load
    React.useEffect(() => {
        if (chats.length > 0 && !selectedChatId) {
            setSelectedChatId(chats[0].id)
        }
    }, [chats.length, selectedChatId])

    // Load Messages when chat is selected
    React.useEffect(() => {
        if (!selectedChatId) {
            setMessages([])
            return
        }

        // Initial fetch
        chatService.getMessages(selectedChatId).then(setMessages)
    }, [selectedChatId])

    // Supabase Realtime subscription for new messages
    React.useEffect(() => {
        if (!selectedChatId) return

        const channel = supabase
            .channel(`messages:${selectedChatId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `chat_id=eq.${selectedChatId}`
                },
                (payload) => {
                    console.log('🔔 New message received via Realtime:', payload.new)
                    const newMsg = payload.new as {
                        id: string
                        chat_id: string
                        sender_id: string
                        content: string
                        type: string
                        created_at: string
                    }

                    // Only add if not already in the list (avoid duplicates from optimistic update)
                    setMessages(prev => {
                        const exists = prev.some(m => m.id === newMsg.id)
                        if (exists) return prev

                        return [...prev, {
                            id: newMsg.id,
                            chatId: newMsg.chat_id,
                            senderId: newMsg.sender_id,
                            content: newMsg.content,
                            type: newMsg.type as 'text' | 'image' | 'audio',
                            createdAt: newMsg.created_at,
                            status: 'delivered'
                        }]
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [selectedChatId])

    // Realtime subscription for chat list updates
    React.useEffect(() => {
        const channel = supabase
            .channel('chats:all')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'chats'
                },
                () => {
                    // Refresh chats list when any chat is updated
                    chatService.getChats().then(setChats)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    // Handle sending messages with optimistic update
    const handleSendMessage = async (content: string) => {
        if (!selectedChatId || !content.trim() || isSending) return

        setIsSending(true)

        // Optimistic update - add message immediately to UI
        const optimisticMessage: Message = {
            id: `temp-${Date.now()}`,
            chatId: selectedChatId,
            senderId: 'me',
            content: content,
            type: 'text',
            createdAt: new Date().toISOString(),
            status: 'sending'
        }

        setMessages(prev => [...prev, optimisticMessage])

        try {
            const savedMessage = await chatService.sendMessage(selectedChatId, content, 'me')

            // Replace optimistic message with the real one
            setMessages(prev =>
                prev.map(m => m.id === optimisticMessage.id ? savedMessage : m)
            )
        } catch (error) {
            console.error('Failed to send message:', error)
            // Remove optimistic message on error
            setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id))
        } finally {
            setIsSending(false)
        }
    }

    const selectedChat = chats.find(c => c.id === selectedChatId) || null

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <ConversationList
                chats={chats}
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
            />
            <ChatWindow
                chat={selectedChat}
                messages={messages}
                onSendMessage={handleSendMessage}
                isSending={isSending}
            />
            {selectedChat && (
                <div className="hidden xl:block">
                    <LeadDetailsSidebar
                        chat={selectedChat}
                        onClose={() => { }}
                    />
                </div>
            )}
        </div>
    )
}
