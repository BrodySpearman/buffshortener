"use client";
import Script from 'next/script';
import config from './particlesjs-config.json';

export default function ParticleBackground() {
    const initParticles = () => {
        if (typeof window !== "undefined" && (window as any).particlesJS) {
            (window as any).particlesJS("particles-js", config);
        }
    };

    return (
        <>
            <div id="particles-js" className="background"></div>
            <Script
                src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
                strategy="lazyOnload"
                onLoad={initParticles}
            />
        </>
    );
}