import React, { useEffect, useRef, useState } from 'react'
import Container from '../Container'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Houses = () => {
    const [houses, setHouses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedHouse, setSelectedHouse] = useState(null)

    const [hoveredHouse, setHoveredHouse] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const imgRef = useRef(null);

    const housesPoints = [
        { id: 0, points: "1614,986 1338,806 1346,745 1445,697 1456,704 1495,684 1564,725 1683,661 1831,740 1823,781 1843,795 1836,849 1615,986" },
        { id: 1, points: "1172,696 961,558 962,504 987,494 986,473 1228,385 1310,426 1302,541 1230,571 1272,597 1267,652 1172,697" },
        { id: 2, points: "821,463 766,429 763,393 727,372 729,325 764,314 762,265 851,239 996,316 996,406 824,466" },
        { id: 3, points: "402,257 481,234 477,190 655,140 717,176 722,221 751,212 756,261 640,294 623,289 466,337 407,292 400,255" },
        { id: 4, points: "133,373 410,296 463,333 470,391 452,395 510,440 516,489 412,520 356,477 207,523 159,482" },
    ];

    const getPolygonCenter = (points) => {
        if (!points || typeof points !== "string") return [0, 0];
        const pts = points
            .split(' ')
            .map(p => p.split(',').map(Number))
            .filter(([x, y]) => !isNaN(x) && !isNaN(y));
        if (pts.length === 0) return [0, 0];
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


    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await fetch('https://villaverde-wola.pl/admin/api/content/items/apartments?api_key=USR-220f76c840d7600267e5f1532fbef18a0854718d');
                if (!res.ok) throw new Error('Błąd podczas pobierania danych');
                const data = await res.json();

                const normalized = normalizeHouses(data.items || data);
                setHouses(normalized);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHouses();
    }, []);

    // 🔒 Zablokowanie scrolla podczas otwartego popupu
    useEffect(() => {
        document.body.style.overflow = selectedHouse ? "hidden" : "auto"
        return () => { document.body.style.overflow = "auto" }
    }, [selectedHouse])

    const normalizeHouses = (data) => {
        return data
            .map((item, index) => {
                const getLastPrice = (arr) => {
                    if (!Array.isArray(arr) || arr.length === 0) return null;
                    const last = arr[arr.length - 1];
                    return last?.A_PRICE ? Number(last.A_PRICE) : null;
                };

                const getImages = (arr) => {
                    if (!Array.isArray(arr) || arr.length === 0) return [];
                    return arr.map(a => `https://villaverde-wola.pl/admin/storage/uploads/${a.path}`);
                };

                const pricePerM2 = getLastPrice(item.A_PRICE_PER_SQM);
                const totalPrice = getLastPrice(item.A_TOTAL_PRICE);

                let area = null;
                if (totalPrice && pricePerM2) {
                    area = totalPrice / pricePerM2;
                }

                // 🟢 Dopasowanie punktów z housesPoints do domu po indeksie lub numerze budynku
                const pointData =
                    housesPoints.find(
                        (p) =>
                            p.id === index ||
                            (item.A_PROPERTY_DEVELOPER_NUMBER &&
                                p.label === item.A_PROPERTY_DEVELOPER_NUMBER)
                    ) || null;

                return {
                    id: item._id,
                    order: item.A_ORDER ?? 9999,
                    building_number: item.A_PROPERTY_DEVELOPER_NUMBER || "-",
                    rooms: item.A_ROOMS || "-",
                    area: area ? area.toFixed(2) : "-",
                    price_m2: pricePerM2 ? pricePerM2.toLocaleString('pl-PL') : "-",
                    price: totalPrice ? totalPrice.toLocaleString('pl-PL') : "-",
                    status: item.A_STATUS || "-",
                    images: getImages(item.A_ASSETS),
                    finishStandard: item.A_FINISH_STANDARD || "",
                    investemntProspectus: item.A_INVESTMENT_PROSPECTUS || "",
                    // 🟢 Nowe pole: dane do mapy
                    points: pointData ? pointData.points : null,
                    mapId: pointData ? pointData.id : null,
                };
            })
            .sort((a, b) => a.order - b.order);
    };

    if (loading) return <p className="text-center text-white py-20">Ładowanie...</p>
    if (error) return <p className="text-center text-red-500 py-20">{error}</p>

    return (
        <>
            <div className='py-[50px] lg::py-[100px] bg-[#1C1D21]'>
                <div id="Plan Zagospodarowania" />
                <Container>
                    <div className="grid grid-cols-1 lg::grid-cols-2">
                        <div>
                            <h2 className='text-white font-ebgaramond-regular text-[64px]'>Dostępne domy</h2>
                        </div>
                        <div>
                            <h3 className='text-[#C8A35F] font-ebgaramond-regular text-[32px] lg::text-[60px] lg::text-right'>
                                — TWOJE MIEJCE CZEKA ZOBACZ OFERTE
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
                        {houses.map((house) => {
                            const [cx, cy] = getPolygonCenter(house.points);

                            // 🎨 Wybór koloru w zależności od statusu
                            const getStatusColor = (status) => {
                                switch (status?.toLowerCase()) {
                                    case "sprzedany":
                                        return "rgba(255, 0, 0, 0.5)"; // czerwony
                                    case "rezerwacja":
                                        return "rgba(255, 165, 0, 0.5)"; // pomarańczowy
                                    case "wolny":
                                        return "rgba(0, 128, 0, 0.5)"; // zielony
                                    default:
                                        return "rgba(31, 61, 48, 0.5)"; // domyślny (ciemna zieleń)
                                }
                            };

                            return (
                                <motion.polygon
                                    whileTap={{ scale: 0.98, opacity: 0.8 }}
                                    key={house.id}
                                    points={house.points}
                                    fill={hoveredHouse === house.id ? getStatusColor(house.status) : "transparent"}
                                    stroke="rgba(31,61,48,0.5)"
                                    style={{ cursor: 'pointer', pointerEvents: 'all', transition: 'fill 0.2s ease' }}
                                    onMouseEnter={() => {
                                        setHoveredHouse(house.id);
                                        setTooltipPos({ x: cx, y: cy });
                                    }}
                                    onMouseLeave={() => setHoveredHouse(null)}
                                    onClick={() => setSelectedHouse(house)}
                                />
                            );
                        })}
                    </svg>
                )}

                {hoveredHouse && window.innerWidth > 1024 && (
                    <div className="font-ebgaramond-regular" style={getTooltipStyle()}>
                        <div className="">
                            <strong>{houses.find(h => h.id === hoveredHouse).building_number}</strong>
                        </div>
                        <ul>
                            <li>Powierzchnia: {houses.find(h => h.id === hoveredHouse).area}m<sup>2</sup></li>
                            <li>Pokoje: {houses.find(h => h.id === hoveredHouse).rooms}</li>
                            <li>{(() => {
                                const house = houses.find(h => h.id === hoveredHouse);
                                const getStatusColor = (status) => {
                                    switch (status?.toLowerCase()) {
                                        case "sprzedany":
                                            return "text-red-600";
                                        case "rezerwacja":
                                            return "text-orange-500";
                                        case "wolny":
                                            return "text-green-600";
                                        default:
                                            return "text-gray-500";
                                    }
                                };

                                return (
                                    <li>
                                        Status:{" "}
                                        <span className={getStatusColor(house?.status)}>
                                            {house?.status || "-"}
                                        </span>
                                    </li>
                                );
                            })()}</li>
                        </ul>
                        <div className="text-lg text-right mt-2">
                            <strong>{houses.find(h => h.id === hoveredHouse).price} zł</strong>
                        </div>
                        <div className="absolute w-[20px] h-[20px] bg-white -bottom-[10px] left-1/2 -ml-[10px] rotate-45 z-0"></div>
                    </div>
                )}
            </div>
            <div>
                <div id="Oferta domów" />
                <div className='py-[50px] lg:py-[100px] bg-[#1C1D21]'>
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div>
                                <h2 className='text-white font-ebgaramond-regular text-[64px]'>Lista domów</h2>
                            </div>
                            <div>
                                <h3 className='text-[#C8A35F] font-ebgaramond-regular text-[32px] lg:text-[60px] lg:text-right'>
                                    — POBIERZ KARTĘ
                                </h3>
                            </div>
                        </div>
                    </Container>
                </div>

                <div className="bg-[#1C1D21] pb-[100px]">
                    <Container>
                        <div className="overflow-x-auto">
                            <table className="text-nowrap min-w-full">
                                <thead>
                                    <tr className='border-b border-[#4D4B4B] h-[100px] text-center text-[#C8A35F] font-ebgaramond-regular text-[18px] md:text-[24px]'>
                                        <th className="px-4">Numer budynku</th>
                                        <th className="px-4">Liczba pokoi</th>
                                        <th className="px-4">Powierzchnia</th>
                                        <th className="px-4">Cena za m²</th>
                                        <th className="px-4">Cena</th>
                                        <th className="px-4">Status</th>
                                        <th className="px-4">Szczegóły</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {houses.map((house, i) => (
                                        <tr
                                            key={i}
                                            className='border-b border-[#4D4B4B] h-[60px] md:h-[100px] text-center text-white font-ebgaramond-regular text-[18px] md:text-[24px]'
                                        >
                                            <td>{house?.building_number || "-"}</td>
                                            <td>{house?.rooms || "-"}</td>
                                            <td>{house?.area ? `${house.area} m²` : "-"}</td>
                                            <td>{house?.price_m2 ? `${house.price_m2} zł` : "-"}</td>
                                            <td className='px-5'>{house?.price ? `${house.price} zł` : "-"}</td>
                                            <td>
                                                {(() => {
                                                    const getStatusColor = (status) => {
                                                        switch (status?.toLowerCase()) {
                                                            case "sprzedany":
                                                                return "text-red-600";
                                                            case "rezerwacja":
                                                                return "text-orange-500";
                                                            case "wolny":
                                                                return "text-green-600";
                                                            default:
                                                                return "text-gray-400";
                                                        }
                                                    };

                                                    return (
                                                        <span className={getStatusColor(house?.status)}>
                                                            {house?.status || "-"}
                                                        </span>
                                                    );
                                                })()}
                                            </td>
                                            <td>
                                                {house?.images?.length > 0 ? (
                                                    <span
                                                        className="underline cursor-pointer hover:text-[#C8A35F]"
                                                        onClick={() => setSelectedHouse(house)}
                                                    >
                                                        Zobacz
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-500">Brak</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pt-4 text-right">
                            <Link to="/historia-cen" className='text-white hover:underline'>Historia cen</Link>
                        </div>
                    </Container>
                </div>

                <div className="bg-[#FCFCFC] py-[50px] lg:py-[100px]">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="text-center border-b lg:border-b-0 lg:border-r border-[#ccc] pb-[32px] lg:pr-[32px]">
                                <h2 className='text-[#C8A35F] font-ebgaramond-regular text-[32px] xl:text-[64px] mb-[20px]'>Standard wykończenia</h2>
                                <p className='text-[#474747] font-ebgaramond-regular text-[26px] text-center mb-[20px]'>Nowoczesna forma, naturalne materiały i perfekcyjnie dopracowane detale – Villa Verde zachwyca dziś i przez lata.</p>
                                {houses.length > 0 && <a href={`https://villaverde-wola.pl/admin/storage/uploads${houses.length > 0 && houses[0]?.finishStandard?.path}`} target="_blank" className='font-ebgaramond-regular text-[24px] lg:text-[28px] text-[#C8A35F] underline'>Pobierz standard wykończenia</a>}
                            </div>
                            <div className="text-center lg:pl-[32px]">
                                <h2 className='text-[#C8A35F] font-ebgaramond-regular text-[32px] xl:text-[64px] mb-[20px]'>Prospekt inwestycyjny</h2>
                                <p className='text-[#474747] font-ebgaramond-regular text-[26px] text-center mb-[20px]'>Cała inwestycja w pigułce – metraże i układy, standard, harmonogram oraz kwestie prawne. Poznaj Villa Verde świadomie, zanim podejmiesz decyzję.</p>
                                {houses.length > 0 && <a href={`https://villaverde-wola.pl/admin/storage/uploads${houses.length > 0 && houses[0]?.investemntProspectus?.path}`} target="_blank" className='font-ebgaramond-regular text-[24px] lg:text-[28px] text-[#C8A35F] underline'>Pobierz prospekt inwestycyjny</a>}
                            </div>
                        </div>
                    </Container>
                </div>

                {/* 🔳 POPUP Z OBRAZKAMI */}
                {selectedHouse && (
                    <motion.div
                        className="z-50 fixed inset-0 bg-white flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="flex flex-col items-center justify-center bg-white p-6 w-full h-full max-h-[90vh] overflow-auto"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <div className="flex flex-col overflow-y-auto gap-4 max-w-[90%] max-h-[80vh]">
                                {selectedHouse.images?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Rzut ${selectedHouse?.building_number} - ${index + 1}`}
                                        className="max-h-full w-auto"
                                    />
                                ))}
                            </div>
                            <button
                                className="absolute top-[4%] right-[2%]"
                                onClick={() => setSelectedHouse(null)}
                            >
                                <svg
                                    className="w-8 h-8 text-gray-800"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                        d="M6 18 17.94 6M18 18 6.06 6"
                                    />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default Houses
