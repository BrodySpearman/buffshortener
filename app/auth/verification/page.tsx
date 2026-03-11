'use client'
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyUserToken } from '../../actions/verification/verifyAction';

function VerifyContent() {
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

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className='flex mt-[10rem]'><h1>Loading...</h1></div>}>
            <VerifyContent />
        </Suspense>
    );
}