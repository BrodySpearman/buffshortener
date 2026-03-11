'use server';
import { cookies } from 'next/headers';
export async function getUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        console.log('auth_token exists:', !!token)

        if (!token) return null;
        const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL);

        const response = await fetch(`${baseUrl}/api/auth/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('users/me status:', response.status)

        if (response.ok) {
            const user = await response.json();
            console.log('user found:', user.email)
            return user;
        }

        const errorBody = await response.text();
        console.log('users/me error:', errorBody)
        return null;
    } catch (err) {
        console.error('getUser crashed:', err)
        return null;
    }
}