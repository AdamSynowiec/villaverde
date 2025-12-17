import React, { useState, useRef, useEffect } from 'react';
import Container from '../Container';

const HousePlanMap = () => {
    const [hoveredHouse, setHoveredHouse] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const imgRef = useRef(null);

    const housesPoints = [
        { id: 1, points: "1614,986 1338,806 1346,745 1445,697 1456,704 1495,684 1564,725 1683,661 1831,740 1823,781 1843,795 1836,849 1615,986", label: "Dom 1", description: "Powierzchnia: 241.28m²\nDziałka: 847m²\nCena: 5 308 160zł" },
        { id: 2, points: "1172,696 961,558 962,504 987,494 986,473 1228,385 1310,426 1302,541 1230,571 1272,597 1267,652 1172,697", label: "Dom 2", description: "Powierzchnia: 241.46m²\nDziałka: 855m²\nCena: 5 305 520zł" },
        { id: 3, points: "821,463 766,429 763,393 727,372 729,325 764,314 762,265 851,239 996,316 996,406 824,466", label: "Dom 3", description: "Powierzchnia: 226.66m²\nDziałka: 826m²\nCena: 4 986 520zł" },
        { id: 4, points: "402,257 481,234 477,190 655,140 717,176 722,221 751,212 756,261 640,294 623,289 466,337 407,292 400,255", label: "Dom 4", description: "Powierzchnia: 234.42m²\nDziałka: 827m²\nCena: 5 157 240zł" },
        { id: 5, points: "133,373 410,296 463,333 470,391 452,395 510,440 516,489 412,520 356,477 207,523 159,482", label: "Dom 5", description: "Powierzchnia: 241.46m²\nDziałka: 1055m²\nCena: 5 305 520zł" },
    ];

    const getPolygonCenter = (points) => {
        const pts = points.split(' ').map(p => p.split(',').map(Number));
        const sum = pts.reduce((acc, [x, y]) => [acc[0] + x, acc[1] + y], [0, 0]);
        return [sum[0] / pts.length, sum[1] / pts.length];
    };

    useEffect(() => {
        const handleScroll = () => setHoveredHouse(null);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getTooltipStyle = () => {
        if (!imgRef.current) return { display: 'none' };
        const svgRect = imgRef.current.getBoundingClientRect();
        const scaleX = svgRect.width / imageSize.width;
        const scaleY = svgRect.height / imageSize.height;

        return {
            position: 'fixed',
            left: tooltipPos.x * scaleX + svgRect.left,
            top: tooltipPos.y * scaleY + svgRect.top - 10,
            background: 'rgba(255, 255, 255, 1)',
            color: 'black',
            padding: '8px 12px',
            pointerEvents: 'none',
            whiteSpace: 'pre-line',
            transform: 'translate(-50%, -150%)',
            zIndex: 10,
        };
    };

    return (
        <>
            <div className='py-[50px] lg:py-[100px] bg-[#1C1D21]'>
                <div id="Plan Zagospodarowania" />
                <Container>
                    <div className="grid grid-cols-1 lg::grid-cols-2">
                        <div>
                            <h2 className='text-white font-ebgaramond-regular text-[64px]'>Dostępne domy</h2>
                        </div>
                        <div>
                            <h3 className='text-[#C8A35F] font-ebgaramond-regular text-[32px] lg::text-[60px] lg::text-right'>
                                - TWOJE MIEJCE CZEKA  NA CIEBIE ZOBACZ OFERTĘ
                            </h3>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="w-full flex justify-center relative">
                <img
                    ref={imgRef}
                    src="https://villaverde-wola.pl/upload/images/villaverde-vis-4.png"
                    alt="Rzut domów"
                    className='max-w-full object-contain'
                    onLoad={(e) => {
                        const { naturalWidth, naturalHeight } = e.target;
                        setImageSize({ width: naturalWidth, height: naturalHeight });
                    }}
                />

                {imageSize.width > 0 && (
                    <svg
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        viewBox={`0 0 ${imageSize.width} ${imageSize.height}`}
                    >
                        {housesPoints.map((house) => {
                            const [cx, cy] = getPolygonCenter(house.points);
                            return (
                                <polygon
                                    key={house.id}
                                    points={house.points}
                                    fill={hoveredHouse === house.id ? "rgba(31,61,48,0.5)" : "transparent"}
                                    stroke="rgba(31,61,48,0.5)"
                                    style={{ cursor: 'pointer', pointerEvents: 'all', transition: 'fill 0.2s ease' }}
                                    onMouseEnter={() => {
                                        setHoveredHouse(house.id);
                                        setTooltipPos({ x: cx, y: cy });
                                    }}
                                    onMouseLeave={() => setHoveredHouse(null)}
                                />
                            );
                        })}
                    </svg>
                )}

                {hoveredHouse && (
                    <div style={getTooltipStyle()}>
                        <strong>{housesPoints.find(h => h.id === hoveredHouse).label}</strong>
                        <div>{housesPoints.find(h => h.id === hoveredHouse).description}</div>
                        <div className="absolute w-[20px] h-[20px] bg-white -bottom-[10px] left-1/2 -ml-[10px] rotate-45 z-0"></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default HousePlanMap;
