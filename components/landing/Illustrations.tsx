import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background circles */}
            <circle cx="400" cy="80" r="60" fill="#EEF2FF" opacity="0.6" />
            <circle cx="80" cy="320" r="50" fill="#F0FDFA" opacity="0.6" />

            {/* Main laptop/screen */}
            <g transform="translate(100, 120)">
                {/* Laptop base */}
                <rect x="0" y="180" width="300" height="8" rx="4" fill="#1E293B" />
                <path d="M -20 180 L 320 180 L 300 188 L 0 188 Z" fill="#334155" />

                {/* Screen */}
                <rect x="40" y="0" width="220" height="180" rx="8" fill="#1E293B" />
                <rect x="48" y="8" width="204" height="164" rx="4" fill="#3B82F6" />

                {/* Screen content - gradient background */}
                <rect x="52" y="12" width="196" height="156" rx="2" fill="url(#screenGradient)" />

                {/* Code lines on screen */}
                <line x1="65" y1="30" x2="140" y2="30" stroke="#DBEAFE" strokeWidth="3" strokeLinecap="round" />
                <line x1="65" y1="45" x2="180" y2="45" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
                <line x1="65" y1="60" x2="120" y2="60" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />

                {/* Math equation on screen */}
                <text x="70" y="95" fontSize="20" fill="#DBEAFE" fontWeight="600">∫ f(x)dx</text>
                <line x1="70" y1="100" x2="140" y2="100" stroke="#DBEAFE" strokeWidth="2" />

                {/* Graph visualization */}
                <polyline
                    points="65,130 85,120 105,125 125,110 145,115 165,105 185,110"
                    stroke="#A78BFA"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                />
                <circle cx="85" cy="120" r="3" fill="#A78BFA" />
                <circle cx="125" cy="110" r="3" fill="#A78BFA" />
                <circle cx="165" cy="105" r="3" fill="#A78BFA" />
            </g>

            {/* Floating math symbols */}
            <g opacity="0.9">
                <text x="50" y="100" fontSize="28" fill="#7C3AED" fontWeight="bold">∑</text>
                <text x="420" y="150" fontSize="26" fill="#3B82F6" fontWeight="bold">π</text>
                <text x="380" y="280" fontSize="24" fill="#14B8A6" fontWeight="bold">√</text>
                <text x="60" y="250" fontSize="22" fill="#F59E0B" fontWeight="bold">∞</text>
            </g>

            {/* AI Brain/Assistant */}
            <g transform="translate(340, 40)">
                {/* Brain icon */}
                <circle cx="40" cy="40" r="35" fill="url(#brainGradient)" opacity="0.2" />
                <circle cx="40" cy="40" r="28" fill="url(#brainGradient)" />

                {/* Brain details */}
                <path d="M 30 35 Q 35 30 40 35 Q 45 30 50 35" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M 30 45 Q 35 40 40 45 Q 45 40 50 45" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
                <circle cx="35" cy="38" r="1.5" fill="white" />
                <circle cx="45" cy="38" r="1.5" fill="white" />

                {/* Sparkle effect */}
                <circle cx="25" cy="25" r="3" fill="#F59E0B" opacity="0.8" />
                <circle cx="60" cy="30" r="2" fill="#F59E0B" opacity="0.8" />
                <circle cx="55" cy="55" r="2.5" fill="#14B8A6" opacity="0.8" />
            </g>

            {/* Floating cards/notes */}
            <g transform="translate(30, 50)">
                <rect x="0" y="0" width="80" height="50" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="2" />
                <line x1="10" y1="15" x2="50" y2="15" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                <line x1="10" y1="25" x2="65" y2="25" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                <line x1="10" y1="35" x2="45" y2="35" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Formula card */}
            <g transform="translate(360, 220)">
                <rect x="0" y="0" width="100" height="60" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
                <text x="15" y="25" fontSize="16" fill="#7C3AED" fontWeight="600">f'(x) = </text>
                <text x="15" y="45" fontSize="14" fill="#3B82F6">lim h→0</text>
            </g>

            {/* Checkmark badge */}
            <g transform="translate(420, 320)">
                <circle cx="0" cy="0" r="25" fill="#10B981" />
                <path d="M -8 0 L -3 6 L 8 -6" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Trophy/Achievement */}
            <g transform="translate(40, 300)">
                <circle cx="0" cy="0" r="22" fill="#FEF3C7" />
                <path d="M -8 -5 L -8 -12 L 8 -12 L 8 -5 L 10 -5 L 10 0 C 10 3 8 3 8 3 L 8 6 C 8 10 4 12 0 12 C -4 12 -8 10 -8 6 L -8 3 C -8 3 -10 3 -10 0 L -10 -5 Z" fill="#F59E0B" />
                <path d="M -3 -8 L 0 -2 L 3 -8 L 6 -5 L 3 -2 L 6 2 L 0 0 L -6 2 L -3 -2 L -6 -5 Z" fill="#FEF3C7" />
            </g>

            {/* Decorative dots */}
            <circle cx="150" cy="50" r="4" fill="#3B82F6" opacity="0.3" />
            <circle cx="450" cy="200" r="4" fill="#7C3AED" opacity="0.3" />
            <circle cx="100" cy="380" r="3" fill="#14B8A6" opacity="0.3" />

            {/* Gradient definitions */}
            <defs>
                <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const AILearningIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 600 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background elements */}
            <circle cx="450" cy="100" r="80" fill="#EEF2FF" opacity="0.5" />
            <circle cx="100" cy="400" r="60" fill="#F0FDFA" opacity="0.5" />

            {/* Laptop */}
            <rect x="150" y="280" width="300" height="180" rx="8" fill="#1E293B" />
            <rect x="160" y="290" width="280" height="160" rx="4" fill="#3B82F6" />
            <rect x="170" y="300" width="260" height="130" rx="2" fill="#DBEAFE" />

            {/* Screen content - code */}
            <line x1="180" y1="315" x2="240" y2="315" stroke="#2563EB" strokeWidth="3" />
            <line x1="180" y1="330" x2="280" y2="330" stroke="#7C3AED" strokeWidth="3" />
            <line x1="180" y1="345" x2="220" y2="345" stroke="#14B8A6" strokeWidth="3" />

            {/* Math symbols floating */}
            <text x="380" y="150" fontSize="32" fill="#7C3AED" fontWeight="bold">∫</text>
            <text x="480" y="220" fontSize="28" fill="#2563EB" fontWeight="bold">∑</text>
            <text x="80" y="180" fontSize="30" fill="#14B8A6" fontWeight="bold">π</text>
            <text x="520" y="320" fontSize="26" fill="#F59E0B" fontWeight="bold">∞</text>

            {/* Matrix notation */}
            <g transform="translate(420, 380)">
                <text fontSize="20" fill="#7C3AED" fontWeight="600">[</text>
                <text x="10" fontSize="16" fill="#64748B">a b</text>
                <text x="10" y="18" fontSize="16" fill="#64748B">c d</text>
                <text x="45" fontSize="20" fill="#7C3AED" fontWeight="600">]</text>
            </g>

            {/* AI Assistant hologram */}
            <g transform="translate(320, 80)">
                {/* Hologram base */}
                <ellipse cx="60" cy="140" rx="50" ry="8" fill="#7C3AED" opacity="0.2" />

                {/* Robot head */}
                <rect x="30" y="40" width="60" height="60" rx="12" fill="#7C3AED" opacity="0.9" />
                <circle cx="50" cy="60" r="6" fill="#DBEAFE" />
                <circle cx="70" cy="60" r="6" fill="#DBEAFE" />
                <rect x="45" y="75" width="20" height="4" rx="2" fill="#DBEAFE" />

                {/* Robot body */}
                <rect x="35" y="105" width="50" height="40" rx="8" fill="#7C3AED" opacity="0.8" />

                {/* Hologram lines */}
                <line x1="20" y1="50" x2="20" y2="140" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                <line x1="100" y1="50" x2="100" y2="140" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            </g>

            {/* Student figure */}
            <g transform="translate(200, 200)">
                {/* Head */}
                <circle cx="0" cy="0" r="20" fill="#F1F5F9" />
                <circle cx="-6" cy="-2" r="3" fill="#1E293B" />
                <circle cx="6" cy="-2" r="3" fill="#1E293B" />
                <path d="M -8 8 Q 0 12 8 8" stroke="#1E293B" strokeWidth="2" fill="none" />

                {/* Body */}
                <rect x="-15" y="22" width="30" height="40" rx="8" fill="#3B82F6" />

                {/* Arm pointing */}
                <rect x="15" y="25" width="25" height="8" rx="4" fill="#3B82F6" transform="rotate(-20 15 29)" />
            </g>

            {/* Equation floating */}
            <g transform="translate(100, 100)">
                <rect x="0" y="0" width="100" height="40" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
                <text x="10" y="26" fontSize="18" fill="#1E293B" fontFamily="monospace">f(x)=x²</text>
            </g>

            {/* Code snippet */}
            <g transform="translate(450, 420)">
                <rect x="0" y="0" width="120" height="50" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
                <text x="10" y="20" fontSize="12" fill="#7C3AED" fontFamily="monospace">def solve():</text>
                <text x="15" y="38" fontSize="12" fill="#14B8A6" fontFamily="monospace">return x</text>
            </g>

            {/* Sparkles */}
            <circle cx="520" cy="80" r="4" fill="#F59E0B" />
            <circle cx="540" cy="95" r="3" fill="#F59E0B" />
            <circle cx="60" cy="300" r="4" fill="#14B8A6" />
            <circle cx="75" cy="285" r="3" fill="#14B8A6" />
        </svg>
    );
};

export const FeatureIconStructuredLearning: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Book */}
            <rect x="12" y="20" width="32" height="28" rx="2" fill="#DBEAFE" />
            <rect x="12" y="20" width="16" height="28" rx="2" fill="#93C5FD" />
            <line x1="28" y1="20" x2="28" y2="48" stroke="#3B82F6" strokeWidth="2" />

            {/* Graduation cap */}
            <path d="M32 12 L52 18 L32 24 L12 18 Z" fill="#7C3AED" />
            <path d="M32 24 L32 32 L28 34 L28 26 Z" fill="#A78BFA" />

            {/* Learning path */}
            <circle cx="48" cy="36" r="3" fill="#14B8A6" />
            <circle cx="52" cy="44" r="3" fill="#14B8A6" />
            <circle cx="48" cy="52" r="3" fill="#2DD4BF" />
            <line x1="48" y1="39" x2="52" y2="41" stroke="#14B8A6" strokeWidth="2" />
            <line x1="52" y1="47" x2="48" y2="49" stroke="#14B8A6" strokeWidth="2" />
        </svg>
    );
};

export const FeatureIconSmartAnalytics: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Dashboard background */}
            <rect x="8" y="8" width="48" height="48" rx="4" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="2" />

            {/* Bar chart */}
            <rect x="14" y="36" width="6" height="14" rx="1" fill="#2DD4BF" />
            <rect x="24" y="28" width="6" height="22" rx="1" fill="#14B8A6" />
            <rect x="34" y="32" width="6" height="18" rx="1" fill="#2DD4BF" />

            {/* Line graph */}
            <polyline points="14,20 24,16 34,18 44,14" stroke="#7C3AED" strokeWidth="2" fill="none" />
            <circle cx="14" cy="20" r="2" fill="#7C3AED" />
            <circle cx="24" cy="16" r="2" fill="#7C3AED" />
            <circle cx="34" cy="18" r="2" fill="#7C3AED" />
            <circle cx="44" cy="14" r="2" fill="#7C3AED" />

            {/* Pie chart segment */}
            <circle cx="48" cy="42" r="8" fill="#3B82F6" opacity="0.3" />
            <path d="M48 42 L48 34 A8 8 0 0 1 54 46 Z" fill="#3B82F6" />
        </svg>
    );
};

export const FeatureIconMockTests: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Trophy */}
            <path d="M20 16 L20 12 L44 12 L44 16 L48 16 L48 24 C48 28 44 28 44 28 L44 32 C44 36 40 40 32 40 C24 40 20 36 20 32 L20 28 C20 28 16 28 16 24 L16 16 Z" fill="#F59E0B" />
            <rect x="28" y="40" width="8" height="8" fill="#F59E0B" />
            <rect x="24" y="48" width="16" height="4" rx="2" fill="#D97706" />

            {/* Trophy handles */}
            <path d="M16 16 C12 16 12 20 16 24" stroke="#D97706" strokeWidth="2" fill="none" />
            <path d="M48 16 C52 16 52 20 48 24" stroke="#D97706" strokeWidth="2" fill="none" />

            {/* Star on trophy */}
            <path d="M32 20 L34 26 L40 26 L35 30 L37 36 L32 32 L27 36 L29 30 L24 26 L30 26 Z" fill="#FEF3C7" />

            {/* Checkmarks */}
            <polyline points="52,14 54,16 58,12" stroke="#14B8A6" strokeWidth="2" fill="none" />
            <polyline points="52,22 54,24 58,20" stroke="#14B8A6" strokeWidth="2" fill="none" />
        </svg>
    );
};

export const FeatureIconAIMentor: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Robot head */}
            <rect x="18" y="16" width="28" height="28" rx="6" fill="#7C3AED" />

            {/* Eyes */}
            <circle cx="28" cy="28" r="4" fill="#DBEAFE" />
            <circle cx="36" cy="28" r="4" fill="#DBEAFE" />
            <circle cx="28" cy="28" r="2" fill="#1E293B" />
            <circle cx="36" cy="28" r="2" fill="#1E293B" />

            {/* Smile */}
            <path d="M24 36 Q32 40 40 36" stroke="#DBEAFE" strokeWidth="2" fill="none" />

            {/* Antenna */}
            <line x1="32" y1="16" x2="32" y2="8" stroke="#7C3AED" strokeWidth="2" />
            <circle cx="32" cy="8" r="3" fill="#F59E0B" />

            {/* Body */}
            <rect x="22" y="44" width="20" height="12" rx="4" fill="#A78BFA" />

            {/* Arms */}
            <rect x="12" y="46" width="10" height="4" rx="2" fill="#A78BFA" />
            <rect x="42" y="46" width="10" height="4" rx="2" fill="#A78BFA" />

            {/* Math symbols around */}
            <text x="8" y="24" fontSize="12" fill="#14B8A6" fontWeight="bold">∫</text>
            <text x="50" y="24" fontSize="12" fill="#14B8A6" fontWeight="bold">∑</text>
            <text x="8" y="52" fontSize="12" fill="#3B82F6" fontWeight="bold">π</text>
            <text x="52" y="52" fontSize="12" fill="#3B82F6" fontWeight="bold">√</text>

            {/* Lightbulb idea */}
            <circle cx="52" cy="12" r="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
            <rect x="50" y="18" width="4" height="2" fill="#F59E0B" />
            <line x1="48" y1="8" x2="46" y2="6" stroke="#F59E0B" strokeWidth="1" />
            <line x1="56" y1="8" x2="58" y2="6" stroke="#F59E0B" strokeWidth="1" />
        </svg>
    );
};

export const SuccessIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Confetti */}
            <circle cx="80" cy="40" r="4" fill="#F59E0B" />
            <circle cx="320" cy="60" r="4" fill="#7C3AED" />
            <circle cx="100" cy="80" r="3" fill="#14B8A6" />
            <circle cx="300" cy="100" r="3" fill="#3B82F6" />
            <rect x="60" y="120" width="6" height="6" fill="#F59E0B" transform="rotate(45 63 123)" />
            <rect x="340" y="140" width="6" height="6" fill="#7C3AED" transform="rotate(45 343 143)" />

            {/* Student celebrating */}
            <g transform="translate(200, 140)">
                {/* Head */}
                <circle cx="0" cy="0" r="30" fill="#DBEAFE" />
                <circle cx="-10" cy="-5" r="4" fill="#1E293B" />
                <circle cx="10" cy="-5" r="4" fill="#1E293B" />
                <path d="M -12 12 Q 0 20 12 12" stroke="#1E293B" strokeWidth="3" fill="none" />

                {/* Body */}
                <rect x="-25" y="32" width="50" height="60" rx="12" fill="#3B82F6" />

                {/* Arms raised */}
                <rect x="-50" y="35" width="25" height="12" rx="6" fill="#3B82F6" transform="rotate(-45 -37.5 41)" />
                <rect x="25" y="35" width="25" height="12" rx="6" fill="#3B82F6" transform="rotate(45 37.5 41)" />

                {/* Legs */}
                <rect x="-20" y="92" width="15" height="40" rx="8" fill="#1E293B" />
                <rect x="5" y="92" width="15" height="40" rx="8" fill="#1E293B" />
            </g>

            {/* Trophy */}
            <g transform="translate(280, 200)">
                <path d="M-15 0 L-15 -8 L15 -8 L15 0 L20 0 L20 12 C20 16 15 16 15 16 L15 20 C15 26 10 30 0 30 C-10 30 -15 26 -15 20 L-15 16 C-15 16 -20 16 -20 12 L-20 0 Z" fill="#F59E0B" />
                <rect x="-6" y="30" width="12" height="12" fill="#F59E0B" />
                <rect x="-10" y="42" width="20" height="6" rx="3" fill="#D97706" />
                <path d="M0 -2 L2 6 L10 6 L4 10 L6 18 L0 14 L-6 18 L-4 10 L-10 6 L-2 6 Z" fill="#FEF3C7" />
            </g>

            {/* Achievement badges */}
            <g transform="translate(100, 220)">
                <circle cx="0" cy="0" r="20" fill="#7C3AED" />
                <text x="-8" y="6" fontSize="20" fill="white" fontWeight="bold">A+</text>
            </g>

            <g transform="translate(140, 240)">
                <circle cx="0" cy="0" r="18" fill="#14B8A6" />
                <path d="M-6 0 L0 -8 L6 0 L0 6 Z" fill="white" />
            </g>

            {/* Upward arrow */}
            <g transform="translate(120, 100)">
                <line x1="0" y1="60" x2="0" y2="0" stroke="#14B8A6" strokeWidth="4" />
                <path d="M0 0 L-8 12 L8 12 Z" fill="#14B8A6" />
            </g>

            {/* Stars */}
            <path d="M340 200 L342 206 L348 206 L343 210 L345 216 L340 212 L335 216 L337 210 L332 206 L338 206 Z" fill="#F59E0B" />
            <path d="M60 180 L62 186 L68 186 L63 190 L65 196 L60 192 L55 196 L57 190 L52 186 L58 186 Z" fill="#7C3AED" />
        </svg>
    );
};
