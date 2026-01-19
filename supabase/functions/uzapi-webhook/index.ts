import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// UZAPI Real Payload Structure (not what's in docs!)
interface UzapiPayload {
    BaseUrl: string
    EventType: string // 'messages', 'messages_update', 'connection', etc.
    instanceName: string
    owner: string
    token: string
    chat: {
        id: string
        name: string
        phone: string
        wa_chatid: string
        wa_name: string
        imagePreview?: string
        wa_unreadCount: number
        wa_lastMsgTimestamp: number
        wa_lastMessageTextVote?: string
        wa_lastMessageType?: string
    }
    message: {
        id: string
        messageid: string
        chatid: string
        sender: string
        senderName: string
        content: string
        text: string
        type: string
        messageType: string
        messageTimestamp: number
        fromMe: boolean
        isGroup: boolean
        mediaType?: string
    }
    chatSource?: string
}

Deno.serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const body: UzapiPayload = await req.json()

        // Debug log
        console.log(`📦 EventType: ${body.EventType}, Chat: ${body.chat?.wa_chatid}, Message: ${body.message?.text?.substring(0, 50)}`)

        // Only process message events
        if (body.EventType !== 'messages') {
            console.log(`⏭️ Skipping event type: ${body.EventType}`)
            return new Response(
                JSON.stringify({ received: true, processed: false, reason: `Event type: ${body.EventType}` }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const msg = body.message
        const chat = body.chat

        // Extract data using UZAPI's real format
        const jid = msg?.chatid || chat?.wa_chatid || ''
        const fromMe = msg?.fromMe || false
        const pushName = msg?.senderName || chat?.wa_name || chat?.name || 'Desconhecido'
        const content = msg?.content || msg?.text || 'Mídia/Outro'
        const messageId = msg?.messageid || msg?.id || ''
        const phoneNumber = chat?.phone || jid.split('@')[0]
        const avatarUrl = chat?.imagePreview || ''

        // Skip if no JID
        if (!jid) {
            console.error('❌ Missing JID in webhook payload')
            return new Response(
                JSON.stringify({ error: 'Missing JID' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        console.log(`📩 Processing message from ${pushName} (${jid}): ${content.substring(0, 50)}...`)

        // 1. Upsert Chat
        let chatId: string | null = null

        // Check if chat exists
        const { data: existingChat } = await supabase
            .from('chats')
            .select('id, unread_count')
            .eq('uazapi_id', jid)
            .single()

        if (existingChat) {
            chatId = existingChat.id
            // Update existing chat
            const newUnreadCount = fromMe ? 0 : (existingChat.unread_count || 0) + 1

            await supabase
                .from('chats')
                .update({
                    lead_name: pushName,
                    lead_avatar: avatarUrl || undefined,
                    last_message: content,
                    last_message_at: new Date().toISOString(),
                    unread_count: newUnreadCount,
                    updated_at: new Date().toISOString()
                })
                .eq('id', chatId)

            console.log(`✅ Updated chat ${chatId}, unread: ${newUnreadCount}`)
        } else {
            // Create new chat
            const { data: newChat, error: insertError } = await supabase
                .from('chats')
                .insert({
                    uazapi_id: jid,
                    lead_name: pushName,
                    lead_phone: phoneNumber.replace(/\D/g, ''), // Remove non-digits
                    lead_avatar: avatarUrl,
                    last_message: content,
                    unread_count: fromMe ? 0 : 1
                })
                .select('id')
                .single()

            if (insertError) {
                console.error('❌ Error creating chat:', insertError)
                throw insertError
            }
            chatId = newChat?.id ?? null
            console.log(`✅ Created new chat ${chatId}`)
        }

        if (!chatId) {
            throw new Error('Failed to get or create chat')
        }

        // 2. Insert Message
        const { error: msgError } = await supabase
            .from('messages')
            .insert({
                chat_id: chatId,
                uazapi_message_id: messageId,
                sender_id: fromMe ? 'me' : jid,
                content: content,
                type: msg?.type || 'text'
            })

        if (msgError) {
            console.error('❌ Error inserting message:', msgError)
            throw msgError
        }

        console.log(`✅ Message saved - Chat: ${chatId}, From: ${fromMe ? 'me' : pushName}`)

        return new Response(
            JSON.stringify({ received: true, processed: true, chatId, messageId }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error('❌ Webhook Error:', error)
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: String(error) }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
