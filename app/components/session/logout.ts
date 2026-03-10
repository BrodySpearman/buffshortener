'use server';
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function logout() {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://buffshortener.vercel.app';

    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {
        await fetch(`${baseUrl}/api/auth/jwt/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    cookieStore.delete('auth_token');
    cookieStore.delete('session_id');

    const sessionResponse = await fetch(`${baseUrl}/api/sessions/anonymous`);
    if (sessionResponse.ok) {
        const data = await sessionResponse.json();
        cookieStore.set('session_id', data.sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        })
    }
    revalidatePath('/');
}