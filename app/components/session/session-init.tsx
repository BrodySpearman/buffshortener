'use client'

import { useEffect } from "react";

export default function SessionInit() {
    useEffect(() => {
        fetch('/api/session')
    }, []);

    return null;
}