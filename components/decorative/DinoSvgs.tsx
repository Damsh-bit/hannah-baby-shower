'use client'

import React from 'react'

interface DinoProps {
    className?: string
    size?: number
}

// Cute kawaii pink baby dinosaur facing right
export function PinkDino({ className = '', size = 100 }: DinoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Body */}
            <ellipse cx="60" cy="75" rx="32" ry="26" fill="#F4A7B9" />
            {/* Neck */}
            <ellipse cx="82" cy="56" rx="14" ry="18" fill="#F4A7B9" />
            {/* Head */}
            <ellipse cx="92" cy="38" rx="18" ry="16" fill="#F4A7B9" />
            {/* Snout */}
            <ellipse cx="104" cy="42" rx="9" ry="7" fill="#FAD0DA" />
            {/* Nostril */}
            <circle cx="108" cy="40" r="1.5" fill="#E8829A" />
            {/* Eye */}
            <circle cx="95" cy="33" r="5" fill="white" />
            <circle cx="96" cy="33" r="3" fill="#3D3D3D" />
            <circle cx="97.5" cy="31.5" r="1.2" fill="white" />
            {/* Eyelash */}
            <path d="M91 28 Q95 25 99 28" stroke="#3D3D3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Cheek blush */}
            <ellipse cx="101" cy="38" rx="4" ry="2.5" fill="#FAD0DA" opacity="0.8" />
            {/* Spines on back */}
            <path d="M55 50 L50 38 L58 52" fill="#E8829A" />
            <path d="M65 48 L62 35 L70 50" fill="#E8829A" />
            <path d="M75 47 L73 36 L79 49" fill="#E8829A" />
            {/* Front leg */}
            <ellipse cx="45" cy="96" rx="9" ry="6" fill="#F4A7B9" transform="rotate(-15 45 96)" />
            <ellipse cx="38" cy="103" rx="6" ry="4" fill="#FAD0DA" />
            {/* Back leg */}
            <ellipse cx="74" cy="97" rx="10" ry="6" fill="#F4A7B9" transform="rotate(10 74 97)" />
            <ellipse cx="80" cy="104" rx="6" ry="4" fill="#FAD0DA" />
            {/* Tail */}
            <path d="M28 75 Q10 80 8 68 Q6 56 20 62" fill="#F4A7B9" />
            {/* Belly */}
            <ellipse cx="58" cy="79" rx="20" ry="14" fill="#FAD0DA" opacity="0.6" />
            {/* Smile */}
            <path d="M100 46 Q104 49 108 46" stroke="#E8829A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
    )
}

// Cute kawaii golden/yellow baby dinosaur facing left
export function GoldenDino({ className = '', size = 100 }: DinoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} scale-x-[-1]`}
        >
            {/* Body */}
            <ellipse cx="60" cy="75" rx="32" ry="26" fill="#F9D89C" />
            {/* Neck */}
            <ellipse cx="82" cy="56" rx="14" ry="18" fill="#F9D89C" />
            {/* Head */}
            <ellipse cx="92" cy="38" rx="18" ry="16" fill="#F9D89C" />
            {/* Snout */}
            <ellipse cx="104" cy="42" rx="9" ry="7" fill="#FDE8BD" />
            {/* Nostril */}
            <circle cx="108" cy="40" r="1.5" fill="#F0C060" />
            {/* Eye */}
            <circle cx="95" cy="33" r="5" fill="white" />
            <circle cx="96" cy="33" r="3" fill="#3D3D3D" />
            <circle cx="97.5" cy="31.5" r="1.2" fill="white" />
            {/* Eyelash */}
            <path d="M91 28 Q95 25 99 28" stroke="#3D3D3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Cheek blush */}
            <ellipse cx="101" cy="38" rx="4" ry="2.5" fill="#FDE8BD" opacity="0.8" />
            {/* Spines on back */}
            <path d="M55 50 L50 38 L58 52" fill="#F0C060" />
            <path d="M65 48 L62 35 L70 50" fill="#F0C060" />
            <path d="M75 47 L73 36 L79 49" fill="#F0C060" />
            {/* Front leg */}
            <ellipse cx="45" cy="96" rx="9" ry="6" fill="#F9D89C" transform="rotate(-15 45 96)" />
            <ellipse cx="38" cy="103" rx="6" ry="4" fill="#FDE8BD" />
            {/* Back leg */}
            <ellipse cx="74" cy="97" rx="10" ry="6" fill="#F9D89C" transform="rotate(10 74 97)" />
            <ellipse cx="80" cy="104" rx="6" ry="4" fill="#FDE8BD" />
            {/* Tail */}
            <path d="M28 75 Q10 80 8 68 Q6 56 20 62" fill="#F9D89C" />
            {/* Belly */}
            <ellipse cx="58" cy="79" rx="20" ry="14" fill="#FDE8BD" opacity="0.6" />
            {/* Smile */}
            <path d="M100 46 Q104 49 108 46" stroke="#F0C060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
    )
}

// Speckled dinosaur egg
export function DinoEgg({ className = '', size = 60 }: DinoProps) {
    return (
        <svg
            width={size}
            height={size * 1.2}
            viewBox="0 0 60 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Egg */}
            <ellipse cx="30" cy="42" rx="22" ry="26" fill="#FAD0DA" />
            {/* Speckles */}
            <circle cx="22" cy="36" r="2.5" fill="#F4A7B9" opacity="0.7" />
            <circle cx="36" cy="32" r="2" fill="#F4A7B9" opacity="0.7" />
            <circle cx="28" cy="50" r="2.5" fill="#F4A7B9" opacity="0.7" />
            <circle cx="40" cy="46" r="2" fill="#F4A7B9" opacity="0.7" />
            <circle cx="20" cy="52" r="1.5" fill="#F4A7B9" opacity="0.6" />
            <circle cx="34" cy="58" r="1.5" fill="#F4A7B9" opacity="0.6" />
            {/* Highlight */}
            <ellipse cx="22" cy="30" rx="6" ry="8" fill="white" opacity="0.3" />
        </svg>
    )
}

// Golden egg
export function GoldenEgg({ className = '', size = 50 }: DinoProps) {
    return (
        <svg
            width={size}
            height={size * 1.2}
            viewBox="0 0 60 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <ellipse cx="30" cy="42" rx="22" ry="26" fill="#F9D89C" />
            <circle cx="22" cy="36" r="2.5" fill="#F0C060" opacity="0.7" />
            <circle cx="36" cy="32" r="2" fill="#F0C060" opacity="0.7" />
            <circle cx="28" cy="50" r="2.5" fill="#F0C060" opacity="0.7" />
            <circle cx="40" cy="46" r="2" fill="#F0C060" opacity="0.7" />
            <circle cx="20" cy="52" r="1.5" fill="#F0C060" opacity="0.6" />
            <ellipse cx="22" cy="30" rx="6" ry="8" fill="white" opacity="0.3" />
        </svg>
    )
}

// Small palm tree
export function PalmTree({ className = '', size = 80 }: DinoProps) {
    return (
        <svg
            width={size}
            height={size + 20}
            viewBox="0 0 80 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Trunk */}
            <path d="M38 100 Q36 70 40 40 Q44 70 42 100" fill="#C4956A" />
            {/* Fronds */}
            <path d="M40 40 Q20 28 8 32 Q22 20 40 35" fill="#8BC34A" opacity="0.85" />
            <path d="M40 40 Q60 28 72 32 Q58 20 40 35" fill="#7CB342" opacity="0.85" />
            <path d="M40 40 Q25 18 22 5 Q38 24 40 38" fill="#8BC34A" opacity="0.75" />
            <path d="M40 40 Q55 18 58 5 Q42 24 40 38" fill="#7CB342" opacity="0.75" />
            <path d="M40 40 Q18 35 6 45 Q20 30 40 38" fill="#9CCC65" opacity="0.7" />
            <path d="M40 40 Q62 35 74 45 Q60 30 40 38" fill="#9CCC65" opacity="0.7" />
        </svg>
    )
}

// Mountain/terrain silhouette
export function MountainSilhouette({ className = '' }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full ${className}`}
            preserveAspectRatio="none"
        >
            <path
                d="M0 120 L0 70 Q120 40 200 60 Q320 80 400 40 Q500 5 580 35 Q660 60 720 30 Q800 0 880 25 Q960 50 1040 20 Q1120 0 1200 30 Q1280 60 1360 50 L1440 45 L1440 120 Z"
                fill="#C4956A"
                opacity="0.3"
            />
            <path
                d="M0 120 L0 85 Q120 65 240 75 Q360 85 440 60 Q540 35 620 55 Q700 72 760 50 Q840 28 920 50 Q1000 70 1080 50 Q1160 30 1260 55 Q1360 75 1440 65 L1440 120 Z"
                fill="#C4956A"
                opacity="0.2"
            />
        </svg>
    )
}
