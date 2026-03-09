'use server';
import { cookies } from 'next/headers';
export async function getUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) return null;
        const baseUrl = process.env.NODE_ENV === 'development'
            ? 'http://localhost:8000'
            : 'https://buffshortener.vercel.app';

        const response = await fetch(`${baseUrl}/api/auth/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const user = await response.json();
            return user;
        }
        return null;
    } catch {
        return null;
    }
}