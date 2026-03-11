'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL);

export async function submitVal(formData: FormData) {

    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;
    const authToken = cookieStore.get('auth_token')?.value;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Cookie': `session_id=${sessionId}`
    }
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
    }

    try {
        const response = await fetch(`${baseUrl}/api/submit-url`, {
            method: 'POST',
            headers: headers,
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