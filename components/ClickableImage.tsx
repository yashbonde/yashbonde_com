"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ClickableImage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

    const imagePrefix = "https://ndotovhaihcfvwintgpc.supabase.co/storage/v1/object/public/yashbonde/gen_img/";
    const maxImages = 13; // Assuming images from 0000.jpg to 0005.jpg

    // Shuffle function
    const shuffleArray = (array: number[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Initialize shuffled indices
    useEffect(() => {
        const indices = Array.from({ length: maxImages }, (_, i) => i);
        setShuffledIndices(shuffleArray(indices));
    }, [maxImages]);

    // Handle click to change image
    const handleImageClick = () => {
        if (isTransitioning) return; // Prevent multiple clicks during transition

        setIsTransitioning(true);
        setIsVisible(false);

        setTimeout(() => {
            // Get a random different image
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * shuffledIndices.length);
            } while (newIndex === currentImageIndex && shuffledIndices.length > 1);

            setCurrentImageIndex(newIndex);
            setIsVisible(true);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 300); // Half of transition duration
        }, 300); // Half of transition duration
    };

    const currentShuffledIndex = shuffledIndices[currentImageIndex];
    const imageNumber = currentShuffledIndex?.toString().padStart(4, '0') || '0000';
    const imageSrc = `${imagePrefix}${imageNumber}.jpg`;

    return (
        <div className="relative">
            <Image
                src={imageSrc}
                alt="Yash Bonde"
                width={400}
                height={250}
                className={`rounded-lg object-cover max-w-full h-auto transition-opacity duration-600 cursor-pointer hover:opacity-90 ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={handleImageClick}
            />
        </div>
    );
};

export default ClickableImage;
