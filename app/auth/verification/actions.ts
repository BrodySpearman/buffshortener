'use server';

export async function verifyUserToken(token: string) {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://buffshortener.vercel.app';

    const response = await fetch(`${baseUrl}/api/auth/verify/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
    });

    if (response.ok) {
        return { success: true }
    } else {
        const errorMsg = await response.json();
        return { error: errorMsg }
    }
}