import { Chat, Message, User } from '../types';
import { ChatService } from '../service';
import { supabase } from '@/lib/supabase';

// Proxy URL for sending messages via UAZAPI
const UAZAPI_PROXY_URL = '/api/uazapi';

export class SupabaseChatService implements ChatService {

    async getChats(): Promise<Chat[]> {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .order('last_message_at', { ascending: false });

        if (error) {
            console.error('Error fetching chats from Supabase:', error);
            return [];
        }

        return data.map((c: any) => ({
            id: c.id,
            leadId: c.uazapi_id.split('@')[0],
            leadName: c.lead_name || c.lead_phone,
            leadAvatar: c.lead_avatar || '',
            leadPhone: c.lead_phone,
            lastMessage: c.last_message || '',
            lastMessageAt: c.last_message_at,
            unreadCount: c.unread_count || 0,
            status: c.status,
            tags: c.tags || [],
            funnelStage: c.funnel_stage
        }));
    }

    async getMessages(chatId: string): Promise<Message[]> {
        // We need to find the UUID of the chat first if chatId is a JID, 
        // OR if the frontend is passing the UUID directly.
        // For safety, let's assume chatId passes the UUID from getChats.

        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true }); // Oldest first for chat window

        if (error) {
            console.error('Error fetching messages from Supabase:', error);
            return [];
        }

        return data.map((m: any) => ({
            id: m.id,
            chatId: m.chat_id,
            senderId: m.sender_id,
            content: m.content,
            type: m.type as 'text' | 'image' | 'audio',
            createdAt: m.created_at,
            status: m.status as 'sent' | 'delivered' | 'read'
        }));
    }

    async sendMessage(chatId: string, content: string, senderId: string): Promise<Message> {
        // 1. Get Chat details to find UAZAPI JID
        const { data: chat } = await supabase.from('chats').select('uazapi_id').eq('id', chatId).single();
        if (!chat) throw new Error('Chat not found');

        // 2. Send via UAZAPI Proxy
        // Extract phone number from JID (e.g., "5511970636118@s.whatsapp.net" -> "5511970636118")
        const phoneNumber = chat.uazapi_id.split('@')[0];

        const body = {
            number: phoneNumber,
            text: content
        };

        const response = await fetch(`${UAZAPI_PROXY_URL}/send/text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const apiData = await response.json();

        // 3. Save to Supabase (Optimistic / Confirmation)
        const messageId = apiData.messageid || apiData.messageId || 'sent-' + Date.now()

        const { data: savedMsg, error } = await supabase
            .from('messages')
            .insert({
                chat_id: chatId,
                uazapi_message_id: messageId,
                sender_id: 'me',
                content: content,
                type: 'text'
            })
            .select()
            .single();

        if (error) {
            console.error('Error saving message to Supabase:', error);
            throw error;
        }

        // 4. Update Last Message in Chat
        await supabase
            .from('chats')
            .update({
                last_message: content,
                last_message_at: new Date().toISOString()
            })
            .eq('id', chatId);

        return {
            id: savedMsg?.id || 'temp',
            chatId,
            senderId: 'me',
            content,
            type: 'text',
            createdAt: new Date().toISOString(),
            status: 'sent'
        };
    }
}
