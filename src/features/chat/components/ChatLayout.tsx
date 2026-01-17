"use client"

import * as React from "react"
import { ConversationList } from "./ConversationList"
import { ChatWindow } from "./ChatWindow"
import { LeadDetailsSidebar } from "./LeadDetailsSidebar"
import { chatService } from "../service"
import { Chat, Message } from "../types"

export function ChatLayout() {
    const [chats, setChats] = React.useState<Chat[]>([])
    const [selectedChatId, setSelectedChatId] = React.useState<string | undefined>(undefined)
    const [messages, setMessages] = React.useState<Message[]>([])

    // Load Chats (Poll every 10s)
    React.useEffect(() => {
        const fetchChats = () => {
            chatService.getChats().then((data) => {
                setChats(data)
                // Initialize selection if needed
                if (data.length > 0 && !selectedChatId) {
                    // Don't auto-select if user hasn't selected anything yet, 
                    // or maybe optional. For now keeping original logic but careful with loops.
                    // Actually, better to only auto-select on first load, not every poll.
                }
            })
        }

        fetchChats() // Initial fetch
        const interval = setInterval(fetchChats, 10000)
        return () => clearInterval(interval)
    }, []) // Dependencies empty to run once on mount + interval

    // Auto-select first chat ONLY on initial empty state if desired, 
    // but better to handle this separately to avoid overriding user selection.
    React.useEffect(() => {
        if (chats.length > 0 && !selectedChatId) {
            setSelectedChatId(chats[0].id)
        }
    }, [chats.length]) // Only when chats list changes size/initially loaded

    // Load Messages when chat is selected (Poll every 5s)
    React.useEffect(() => {
        if (!selectedChatId) {
            setMessages([])
            return
        }

        const fetchMessages = () => {
            chatService.getMessages(selectedChatId).then(setMessages)
        }

        fetchMessages() // Initial fetch
        const interval = setInterval(fetchMessages, 5000)
        return () => clearInterval(interval)
    }, [selectedChatId])

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

