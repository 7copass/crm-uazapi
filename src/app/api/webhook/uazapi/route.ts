import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Log the event type
        const event = body.event;
        console.log(`🔔 Webhook Event Received: ${event}`);

        if (event === 'messages') {
            const msg = body.data;
            console.log('💬 New Message:', {
                from: msg.info?.remoteJid || msg.jid,
                content: msg.message?.conversation || msg.body?.text || 'Media/Other',
                pushName: msg.pushName
            });

            // TODO: Save to Supabase here to trigger Realtime update to frontend
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
