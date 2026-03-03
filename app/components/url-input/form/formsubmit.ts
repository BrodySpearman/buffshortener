'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

let baseUrl = 'https://buffshortener.vercel.app';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8000';
}

export async function submitVal(formData: FormData) {

    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    try {
        const response = await fetch(`${baseUrl}/api/submit-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `session_id=${sessionId}`
            },
            body: JSON.stringify({ inputUrl: formData.get('inputUrl') }),
        });
        if (!response.ok) {
            throw new Error("Failed to send data");
        }

        const data = await response.json();
        console.log(data);
        revalidatePath('/');
    } catch (error) {
        console.error(error);
    }
}