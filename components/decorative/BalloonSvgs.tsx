'use client'

import React from 'react'

interface BalloonProps {
    color?: 'pink' | 'yellow' | 'cream' | 'lavender'
    size?: number
    className?: string
}

const colorMap = {
    pink: { body: '#F4A7B9', shine: '#FAD0DA', string: '#E8829A', dark: '#E8829A' },
    yellow: { body: '#F9D89C', shine: '#FDE8BD', string: '#F0C060', dark: '#F0C060' },
    cream: { body: '#EDE6D6', shine: '#F5F0E8', string: '#C4956A', dark: '#C4956A' },
    lavender: { body: '#D8B4FE', shine: '#EDE9FE', string: '#A855F7', dark: '#9333EA' },
}

export function Balloon({ color = 'pink', size = 70, className = '' }: BalloonProps) {
    const c = colorMap[color]
    return (
        <svg
            width={size}
            height={size * 1.5}
            viewBox="0 0 70 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Balloon body */}
            <ellipse cx="35" cy="38" rx="28" ry="34" fill={c.body} />
            {/* Shine */}
            <ellipse cx="24" cy="22" rx="9" ry="13" fill={c.shine} opacity="0.55" />
            {/* Knot */}
            <path d="M32 72 Q35 77 38 72" stroke={c.dark} strokeWidth="2" fill={c.body} />
            <circle cx="35" cy="74" r="3" fill={c.dark} />
            {/* String */}
            <path
                d="M35 77 Q32 85 35 93 Q38 100 35 105"
                stroke={c.string}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    )
}

export function BalloonCluster({ className = '' }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <div className="animate-float-delay" style={{ position: 'absolute', left: 0, top: 10 }}>
                <Balloon color="yellow" size={55} />
            </div>
            <div className="animate-float" style={{ position: 'absolute', left: 35, top: 0 }}>
                <Balloon color="pink" size={65} />
            </div>
            <div className="animate-float-slow" style={{ position: 'absolute', left: 75, top: 15 }}>
                <Balloon color="cream" size={50} />
            </div>
        </div>
    )
}

export function Cloud({ className = '', width = 120 }: { className?: string; width?: number }) {
    return (
        <svg
            width={width}
            height={width * 0.55}
            viewBox="0 0 120 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="35" cy="42" r="18" fill="white" opacity="0.6" />
            <circle cx="60" cy="32" r="25" fill="white" opacity="0.55" />
            <circle cx="88" cy="42" r="18" fill="white" opacity="0.6" />
            <rect x="17" y="42" width="86" height="18" fill="white" opacity="0.55" rx="4" />
        </svg>
    )
}
