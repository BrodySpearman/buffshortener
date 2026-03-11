'use client'

import { useEffect } from "react";

export default function SessionInit() {
    useEffect(() => {
        fetch('/auth/api/session')
    }, []);

    return null;
}