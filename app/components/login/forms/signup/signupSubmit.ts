'use server'
import { cookies } from 'next/headers';

interface signupData {
    email: string;
    password: string;
}

let baseUrl = 'https://buffshortener.vercel.app';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8000';
}

export const signupServerSubmit = async (data: signupData) => {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': sessionId ? `session_id=${sessionId}` : ''
        },

        body: JSON.stringify({
            email: data.email,
            password: data.password,
        }),
    });

    if (response.ok) {
        return true;
    } else {
        const errorMsg = await response.json();
        console.error("Failed to sign up", errorMsg);
    }
}


