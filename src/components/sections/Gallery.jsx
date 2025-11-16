import React, { useEffect, useRef, useState } from 'react';
import Container from '../Container';
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
    const carouselRef = useRef();
    const [width, setWidth] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [dragged, setDragged] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const images = [
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_1_a-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_1_b-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_2_a-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_2_b-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_3_a-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_3_b-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_4_a-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_4_b-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_5_a-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_Dom_5_Int_01@2x-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_ext_02@2x-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_ext_03@2x-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/Pylna_TOP_01-min.png', altText: 'Galeria 1' },
        { path: 'https://villaverde-wola.pl/upload/images/wiz1@2x-min.png', altText: 'Galeria 1' },

    ];

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const handleImageClick = (index) => {
        if (!dragged) {
            setCurrentIndex(index);
            setSelectedImage(images[index]);
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedImage(images[currentIndex + 1]);
        }
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedImage(images[currentIndex - 1]);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === "ArrowRight") handleNext(e);
            else if (e.key === "ArrowLeft") handlePrev(e);
            else if (e.key === "Escape") setSelectedImage(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage, currentIndex]);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        const images = carouselRef.current?.querySelectorAll("img") || [];
        let loaded = 0;

        images.forEach((img) => {
            if (img.complete) {
                loaded++;
            } else {
                img.addEventListener("load", () => {
                    loaded++;
                    if (loaded === images.length) updateWidth();
                });
            }
        });

        updateWidth();

        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return (
        <div id="Wizualizacje" className='py-[100px] bg-[#1C1D21]'>
            <Container>
                <h2 className='text-white font-ebgaramond-regular text-[64px] pb-[64px]'>Galeria</h2>
            </Container>

            <div className="overflow-hidden w-full px-4 relative">
                <motion.div
                    ref={carouselRef}
                    className="flex cursor-e-resize active:cursor-e-resize"
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    onDragStart={() => setDragged(true)}
                    onDragEnd={() => setDragged(false)}
                >
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[300px] lg:min-w-[60vw] mr-4"
                            onClick={() => handleImageClick(index)}
                        >
                            <img
                                src={img.path}
                                alt={img.altText}
                                className="w-full  pointer-events-none "
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <button onClick={handlePrev} className="text-white text-3xl p-0 lg:px-4">
                                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <motion.img
                                src={selectedImage?.path}
                                alt={selectedImage?.altText}
                                className="rounded-lg shadow-2xl w-[80%] h-auto max-w-4xl"
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                            />

                            <button onClick={handleNext} className="text-white text-3xl p-0 lg:px-4">
                                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Gallery;
