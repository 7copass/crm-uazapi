import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_UAZAPI_BASE_URL;
const INSTANCE_ID = process.env.NEXT_PUBLIC_UAZAPI_INSTANCE_ID;
const TOKEN = process.env.NEXT_PUBLIC_UAZAPI_TOKEN;

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    const pathUrl = path.join('/');
    const url = `${BASE_URL}/${pathUrl}${req.nextUrl.search}`; // Preserve query params

    //console.log(`[Proxy] Forwarding to: ${url}`);

    try {
        const headers = {
            'Content-Type': 'application/json',
            'token': TOKEN || '',
        };

        const options: RequestInit = {
            method: req.method,
            headers: headers,
        };

        if (req.method !== 'GET' && req.method !== 'HEAD') {
            const body = await req.json();
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('[Proxy Error]', error);
        return NextResponse.json({ error: 'Proxy Request Failed' }, { status: 500 });
    }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
