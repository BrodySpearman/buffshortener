import { NextResponse } from "next/server";

// Proxy function for session management
export async function GET() {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://buffshortener.vercel.app';

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