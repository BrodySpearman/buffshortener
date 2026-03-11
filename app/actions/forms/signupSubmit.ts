'use server'
import { cookies } from 'next/headers';

interface signupData {
    email: string;
    password: string;
}

const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL);

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
        return await response.json();
    } else {
        const errorMsg = await response.json();
        console.error("Failed to sign up", errorMsg);
        return { error: errorMsg };
    }
}


