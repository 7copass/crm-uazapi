import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Log the event type
        const event = body.event;
        console.log(`🔔 Webhook Event Received: ${event}`);

        if (event === 'messages') {
            const msg = body.data;
            // Clean content helper
            const cleanContent = (m: any) => m.message?.conversation || m.body?.text || m.message?.extendedTextMessage?.text || 'Mídia/Outro';

            const jid = msg.key?.remoteJid || msg.jid;
            const fromMe = msg.key?.fromMe || msg.fromMe;
            const pushName = msg.pushName || 'Desconhecido';
            const content = cleanContent(msg);

            // 1. Ensure Chat Exists (Upsert)
            let { data: chat } = await supabase
                .from('chats')
                .select('id')
                .eq('uazapi_id', jid)
                .single();

            if (!chat) {
                const { data: newChat } = await supabase
                    .from('chats')
                    .insert({
                        uazapi_id: jid,
                        lead_name: pushName,
                        lead_phone: jid.split('@')[0],
                        lead_avatar: '',
                        last_message: content,
                        unread_count: 1
                    })
                    .select('id')
                    .single();
                chat = newChat;
            } else {
                await supabase
                    .from('chats')
                    .update({
                        last_message: content,
                        last_message_at: new Date().toISOString(),
                        unread_count: fromMe ? 0 : undefined
                    })
                    .eq('id', chat.id);
            }

            if (chat) {
                // 2. Insert Message
                await supabase.from('messages').insert({
                    chat_id: chat.id,
                    uazapi_message_id: msg.key?.id || msg.id,
                    sender_id: fromMe ? 'me' : jid,
                    content: content,
                    type: 'text',
                    status: 'delivered'
                });
            }
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ status: 'Webhook endpoint active' });
}
