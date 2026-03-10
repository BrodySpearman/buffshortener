'use server';
import { cookies } from 'next/headers';

// login information fetching
export async function submitLogin(email: string, password: string) {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://buffshortener.vercel.app';
    // must use URLSearchParams to create form data
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${baseUrl}/api/auth/jwt/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    });

    if (response.ok) {
        const data = await response.json();
        // { "access_token": "eyJhbGci...", "token_type": "bearer" }
        const cookieStore = await cookies();
        cookieStore.set('auth_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24
        })
        return { success: true, token: data.access_token };
    } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        return { success: false, error: "Invalid credentials" };
    }
}