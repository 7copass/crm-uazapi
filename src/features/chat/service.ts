import { Chat, Message } from './types';

// Interface that allows swapping implementations (Mock vs Supabase)
export interface ChatService {
    getChats(): Promise<Chat[]>;
    getMessages(chatId: string): Promise<Message[]>;
    sendMessage(chatId: string, content: string, senderId: string): Promise<Message>;
}

// Mock Data
const MOCK_CHATS: Chat[] = [
    {
        id: '1',
        leadId: 'lead-1',
        leadName: 'Shirliane Queiroz',
        leadAvatar: 'https://github.com/shadcn.png', // Placeholder
        lastMessage: 'data.pdf',
        lastMessageAt: '2026-01-14T17:27:00',
        unreadCount: 1,
        status: 'open',
        tags: ['A441'],
        funnelStage: 'Leads de entrada'
    },
    {
        id: '2',
        leadId: 'lead-2',
        leadName: 'Alan Hair Brasil',
        leadAvatar: '',
        lastMessage: 'Áudio',
        lastMessageAt: '2026-01-12T12:01:00',
        unreadCount: 0,
        status: 'open',
        tags: ['A422'],
        funnelStage: 'Leads de entrada'
    }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
    '1': [
        {
            id: 'm1',
            chatId: '1',
            senderId: 'lead-1',
            content: 'Olá, gostaria de saber mais.',
            type: 'text',
            createdAt: '2026-01-14T17:20:00',
            status: 'read'
        },
        {
            id: 'm2',
            chatId: '1',
            senderId: 'agent-1',
            content: 'Claro! Como posso ajudar?',
            type: 'text',
            createdAt: '2026-01-14T17:22:00',
            status: 'read'
        }
    ]
};

export class MockChatService implements ChatService {
    async getChats(): Promise<Chat[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_CHATS;
    }

    async getMessages(chatId: string): Promise<Message[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_MESSAGES[chatId] || [];
    }

    async sendMessage(chatId: string, content: string, senderId: string): Promise<Message> {
        const newMessage: Message = {
            id: Math.random().toString(36).substr(2, 9),
            chatId,
            senderId,
            content,
            type: 'text',
            createdAt: new Date().toISOString(),
            status: 'sent'
        };

        if (!MOCK_MESSAGES[chatId]) {
            MOCK_MESSAGES[chatId] = [];
        }
        MOCK_MESSAGES[chatId].push(newMessage);

        return newMessage;
    }
}

import { SupabaseChatService } from "./services/supabase-service"

// Toggle this to switch between Mock and Real
const USE_REAL_API = true;

// We now use the Supabase Service which handles both DB and API sending
export const chatService = USE_REAL_API ? new SupabaseChatService() : new MockChatService();
