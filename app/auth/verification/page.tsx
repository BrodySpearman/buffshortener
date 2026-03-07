'use client'
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyUserToken } from './actions';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [status, setStatus] = useState('Verifying your email...');
    useEffect(() => {
        if (!token) {
            setStatus("Invalid link. No verification token provided.");
            return;
        }
        verifyUserToken(token).then((res) => {
            if (res?.success) {
                setStatus("Successfully verified! Redirecting to login...");
                // Redirects them back to the home page!
                // You might trigger your login modal to open automatically using query params
                setTimeout(() => router.push('/?showLogin=true'), 2000);
            } else {
                setStatus("Verification failed. Link may be expired.");
            }
        });
    }, [token, router]);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
            <h1>{status}</h1>
        </div>
    );
}