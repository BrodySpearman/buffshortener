'use server'
import { refresh, revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

let baseUrl = 'https://buffshortener.vercel.app';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8000';
}

export async function fetchUrlList() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get('session_id')?.value;

        const response = await fetch(`${baseUrl}/api/show-url-list`, {
            headers: {
                'Cookie': `session_id=${sessionId}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch URL list");
        }

        const urlList = await response.json();
        console.log(urlList);

        return urlList;

    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteUrl(formData: FormData) {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get('session_id')?.value;

        const response = await fetch(
            `${baseUrl}/api/delete-url`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `session_id=${sessionId}`
                },
                body: JSON.stringify({ shortUrl: formData.get('shortUrl') }),
            }
        );
        if (!response.ok) {
            throw new Error("Failed to delete URL");
        }
        const result = await response.json();
        console.log(result);
        revalidatePath("/")
        return result;

    } catch (error) {
        console.error(error);
        return null;
    }
}