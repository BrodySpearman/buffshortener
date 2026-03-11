'use server';

export async function verifyUserToken(token: string) {
    const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL);

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