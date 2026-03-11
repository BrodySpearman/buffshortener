import { NextResponse, NextRequest } from "next/server";

// Proxy function for anonymous session management
export async function GET(request: NextRequest) {
    const existingSession = request.cookies.get('session_id');

    if (existingSession) {
        console.log("Existing session found: ", existingSession.value);
        return NextResponse.json({ sessionId: existingSession.value });
    }

    const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL);

    // Found inside root api folder.
    const fastapiRes = await fetch(`${baseUrl}/api/sessions/anonymous`);
    const data = await fastapiRes.json();

    const response = NextResponse.json(data);

    const setCookie = fastapiRes.headers.get('set-cookie');
    if (setCookie) {
        response.headers.set('set-cookie', setCookie);
    }
    return response;
}

