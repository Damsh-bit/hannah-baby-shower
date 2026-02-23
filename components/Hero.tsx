'use client'

import { motion } from 'framer-motion'
import { PinkDino, GoldenDino, DinoEgg, GoldenEgg, MountainSilhouette } from '@/components/decorative/DinoSvgs'
import { Balloon, Cloud } from '@/components/decorative/BalloonSvgs'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: 'easeOut' },
})

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream">
            {/* Background clouds */}
            <div className="absolute top-8 left-8 opacity-50 animate-float-slow hidden md:block">
                <Cloud width={200} />
            </div>
            <div className="absolute top-20 right-12 opacity-40 animate-float hidden md:block">
                <Cloud width={160} />
            </div>
            <div className="absolute top-4 left-1/2 opacity-30 animate-float-delay -translate-x-1/2 hidden md:block">
                <Cloud width={240} />
            </div>

            {/* Balloons — top left cluster */}
            <div className="absolute top-0 left-4 md:left-16 flex gap-1 z-10">
                <div className="animate-float-delay">
                    <Balloon color="yellow" size={70} />
                </div>
                <div className="animate-float">
                    <Balloon color="pink" size={85} />
                </div>
                <div className="animate-float-slow">
                    <Balloon color="cream" size={65} />
                </div>
            </div>

            {/* Balloons — top right cluster */}
            <div className="absolute top-0 right-4 md:right-16 flex gap-1 z-10">
                <div className="animate-float-slow">
                    <Balloon color="cream" size={65} />
                </div>
                <div className="animate-float">
                    <Balloon color="pink" size={75} />
                </div>
                <div className="animate-float-delay">
                    <Balloon color="yellow" size={70} />
                </div>
            </div>

            {/* Corner dinos — desktop only */}
            <div className="absolute bottom-24 left-2 md:left-8 z-10 watercolor hidden sm:block">
                <PinkDino size={140} />
            </div>
            <div className="absolute bottom-24 right-2 md:right-8 z-10 watercolor hidden sm:block">
                <GoldenDino size={130} />
            </div>
            <div className="absolute top-32 left-4 md:left-12 z-10 watercolor hidden lg:block">
                <DinoEgg size={75} className="animate-float-slow" />
            </div>
            <div className="absolute top-32 right-4 md:right-12 z-10 watercolor hidden lg:block">
                <GoldenEgg size={65} className="animate-float-delay" />
            </div>

            {/* Hero text content */}
            <div className="z-20 text-center px-4 flex flex-col items-center gap-1 pt-24 pb-8">
                <motion.p
                    {...fadeUp(0.1)}
                    className="text-sm md:text-base italic text-charcoal/70 tracking-widest uppercase font-body"
                >
                    Están invitados al:
                </motion.p>

                <motion.h1 {...fadeUp(0.3)} className="font-script text-8xl sm:text-7xl md:text-9xl text-pink-dark leading-none">
                    Baby
                </motion.h1>

                <motion.p
                    {...fadeUp(0.45)}
                    className="font-body font-medium text-4xl sm:text-5xl md:text-8xl tracking-tight text-charcoal leading-none"
                >
                    SHOWER
                </motion.p>

                <motion.p
                    {...fadeUp(0.55)}
                    className="font-body font-semibold text-sm md:text-lg uppercase tracking-[0.35em] text-charcoal/60"
                >
                    de
                </motion.p>

                <motion.h2 {...fadeUp(0.65)} className="font-script text-9xl md:text-9xl text-pink-dark leading-none">
                    Hannah
                </motion.h2>

                {/* Decorative divider */}
                <motion.div {...fadeUp(0.8)} className="flex items-center gap-3 mt-6 mb-4">
                    <div className="w-12 h-px bg-pink" />
                    <span className="text-pink text-xl">🦕</span>
                    <div className="w-12 h-px bg-pink" />
                </motion.div>

                {/* Event details — 3 columns */}
                <motion.div
                    {...fadeUp(0.9)}
                    className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-4 text-center mt-4"
                >
                    {/* Column 1 */}
                    <div className="px-5 py-2">
                        <p className="font-body font-semibold text-charcoal text-sm md:text-base">Domingo</p>
                        <p className="font-body font-black text-3xl md:text-4xl text-charcoal">12</p>
                        <p className="font-body font-semibold text-charcoal text-sm md:text-base">Abril</p>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-16 bg-pink-dark/40 hidden sm:block" />
                    <div className="w-16 h-px bg-pink-dark/30 sm:hidden my-2" />

                    {/* Column 2 */}
                    <div className="px-5 py-2">
                        <p className="font-body font-semibold text-charcoal text-sm md:text-base">Mundo Eventos</p>
                        <p className="font-body text-charcoal/70 text-xs md:text-sm">Alsina 3051</p>
                        <p className="font-body text-charcoal/70 text-xs md:text-sm">Claypole</p>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-16 bg-pink-dark/40 hidden sm:block" />
                    <div className="w-16 h-px bg-pink-dark/30 sm:hidden my-2" />

                    {/* Column 3 */}
                    <div className="px-5 py-2">
                        <p className="font-body font-semibold text-charcoal text-sm md:text-base">Hora</p>
                        <p className="font-body font-black text-xl md:text-2xl text-charcoal">17:00 a 20:00</p>
                        <p className="font-body text-charcoal/60 text-sm">(Puntualidad por favor)</p>
                    </div>
                </motion.div>

                {/* Family name */}
                <motion.p {...fadeUp(1.0)} className="font-script text-3xl md:text-4xl text-pink-dark mt-6 opacity-80">
                    Familia Coronel-Herrera
                </motion.p>

                {/* Scroll hint */}
                <motion.div {...fadeUp(1.2)} className="mt-8 flex flex-col items-center gap-1 opacity-50">
                    <span className="text-xs font-body text-charcoal/50 uppercase tracking-widest">Deslizá</span>
                    <div className="w-px h-8 bg-pink animate-bounce" />
                </motion.div>
            </div>

            {/* Mountain terrain at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-0">
                <MountainSilhouette />
            </div>
        </section>
    )
}
