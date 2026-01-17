import { Chat, Message, User } from '../types';
import { ChatService } from '../service';

// Pointing to Local Proxy
const BASE_URL = '/api/uazapi';

// Token is now handled securely on the server-side proxy, 
// no need to expose it here or send it from client.
const headers = {
    'Content-Type': 'application/json',
};

export class UazapiChatService implements ChatService {

    async getChats(): Promise<Chat[]> {
        // Auth handled by Proxy
        try {
            // Doc v2.0: GET /chats
            const response = await fetch(`${BASE_URL}/chats?limit=50&offset=0`, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                console.error('Failed to fetch chats:', await response.text());
                return [];
            }

            const data = await response.json();
            const chatsRaw = data.chats || [];

            // Map Uazapi format to our Chat interface
            return chatsRaw.map((c: any) => ({
                id: c.id,
                leadId: c.id.split('@')[0],
                leadName: c.name || c.id.split('@')[0],
                leadAvatar: c.profilePicUrl || '',
                leadPhone: c.id.split('@')[0],
                lastMessage: c.lastMessage || 'Nova conversa',
                lastMessageAt: c.lastMessageTime ? new Date(c.lastMessageTime * 1000).toISOString() : new Date().toISOString(),
                unreadCount: c.unreadCount || 0,
                status: 'open',
                tags: [],
                funnelStage: 'Leads de entrada'
            }));
        } catch (error) {
            console.error('Error getting chats:', error);
            return [];
        }
    }

    async getMessages(chatId: string): Promise<Message[]> {
        // Auth handled by Proxy
        try {
            const jid = chatId.includes('@') ? chatId : `${chatId}@s.whatsapp.net`;
            // Doc v2.0: GET /chat/messages
            const initialUrl = `${BASE_URL}/chat/messages?jid=${jid}&limit=50`;

            const response = await fetch(initialUrl, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                console.error('Failed to fetch messages:', await response.text());
                return [];
            }

            const data = await response.json();
            const messagesRaw = data.messages || [];

            return messagesRaw.map((m: any) => ({
                id: m.id,
                chatId: chatId,
                senderId: m.fromMe ? 'me' : chatId,
                content: m.body || m.caption || 'Mídia',
                type: m.type === 'image' ? 'image' : m.type === 'ptt' || m.type === 'audio' ? 'audio' : 'text',
                createdAt: m.timestamp ? new Date(m.timestamp * 1000).toISOString() : new Date().toISOString(),
                status: m.status || (m.fromMe ? 'sent' : 'delivered')
            })).reverse();
        } catch (error) {
            console.error('Error fetching messages:', error);
            return [];
        }
    }

    async sendMessage(chatId: string, content: string, senderId: string): Promise<Message> {
        const number = chatId.includes('@') ? chatId : `${chatId}@s.whatsapp.net`;

        // Doc v2.0: POST /send/text
        const body = {
            jid: number,
            message: content
        };

        const response = await fetch(`${BASE_URL}/send/text`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();

        // Create optimistic message
        return {
            id: data.messageId || Math.random().toString(),
            chatId,
            senderId: 'me',
            content,
            type: 'text',
            createdAt: new Date().toISOString(),
            status: 'sent'
        };
    }
}
