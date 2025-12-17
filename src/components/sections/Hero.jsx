import React, { useState } from 'react';
import Container from '../Container';
import bg from '../../assets/images/hero_background.png';
import logo from '../../assets/images/villaverde-logo.svg';
import logo1 from '../../assets/images/villaverde-logo1.svg';
import menuIcon from '../../assets/images/menu-icon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <section
            id="Start"
            className="relative min-h-[900px] lg:min-h-svh flex flex-col">
            <div
                className="flex-1 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(
                        to bottom,
                        rgba(28, 29, 33, 0.8) 0%,
                        rgba(0, 0, 0, 0.2) 100%
                    ),
                    url(${bg})`
                }}
            >
                <Container>
                    <div className="h-[150px] lg:h-[250px] flex flex-row justify-between items-center">
                        {/* MOBILE: logo center + menu right */}
                        <div className="flex w-full items-center justify-center relative lg:hidden">
                            {/* LOGO CENTER */}
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <img src={logo} alt="Logo" className="max-w-[160px]" />
                            </div>

                            {/* MENU RIGHT */}
                            <div className="absolute right-0">
                                <button
                                    className="flex gap-2 border border-white px-2 rounded-full w-10 h-10"
                                    onClick={() => setMenuOpen(true)}
                                >
                                    <img src={menuIcon} alt="Menu" />
                                </button>
                            </div>
                        </div>

                        {/* DESKTOP */}
                        <div className="hidden lg:flex w-full flex-row justify-between items-center">
                            {/* LEFT */}
                            <nav className="w-full">
                                <ul className="flex flex-row w-full font-ebgaramond-regular text-white text-[24px]">
                                    <li className="w-auto lg:w-1/2">
                                        <button
                                            className="cursor-pointer hover:bg-white/[0.2] rounded-full"
                                            onClick={() => setMenuOpen(true)}
                                        >
                                            <div className="flex gap-2 px-2 border border-white rounded-full">
                                                <img src={menuIcon} alt="Menu" />
                                                <span className='block'>Menu</span>
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <HashLink to={"#Oferta domów"} smooth className="hover:underline">
                                            Mieszkania
                                        </HashLink>
                                    </li>
                                </ul>
                            </nav>

                            {/* LOGO CENTER */}
                            <div>
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-[360px]"
                                />
                            </div>

                            {/* RIGHT */}
                            <nav className="w-full">
                                <ul className="text-right flex flex-row justify-end w-full font-ebgaramond-regular text-white text-[24px]">
                                    <li className="text-left hidden lg:block w-1/2">
                                        <HashLink to={"#Kontakt"} smooth className="hover:underline">
                                            Kontakt
                                        </HashLink>
                                    </li>
                                    <li>
                                        <Link to={"tel: +48 518 451 555"} className="hover:underline">
                                            +48 518 451 555
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </Container>

            </div>

            {/* Czarny pasek na dole */}
            <div className="bg-[#1C1D21] relative">
                <Container className="relative h-full flex items-center justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-[32px] items-center">
                        <img
                            src={logo1}
                            alt="Villa Verde logo"
                            className="relative top-0 -translate-y-1/2 w-auto"
                        />
                        <p className="font-ebgaramond-regular font-light leading-relaxed text-[#C8A35F] text-[32px] lg:text-[32px] lg:text-[50px]">
                            - NOWOCZESNA FORMA NATURALNE OTOCZENIE
                        </p>
                    </div>
                </Container>
            </div>

            {/* Fullscreen Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-[#1C1D21] z-50 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Zamknij */}
                        <button
                            className="absolute top-8 right-8 text-white text-4xl"
                            onClick={() => setMenuOpen(false)}
                        >
                            ×
                        </button>

                        {/* Menu Items */}
                        <motion.ul
                            className="flex flex-col items-center justify-center gap-6 md:gap-12 text-white text-4xl font-ebgaramond-regular"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {['Start', 'Inwestycja', 'Plan Zagospodarowania', 'Oferta domów', 'Wizualizacje', 'Lokalizacja', 'Kontakt'].map((item, i) => (
                                <motion.li
                                    key={i}
                                    className="cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <HashLink to={"#" + item} smooth className='text-[24px] md:text-[32px]'>{item}</HashLink>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;
