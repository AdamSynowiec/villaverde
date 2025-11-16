import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const PriceHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔤 Mapa tłumaczeń nazw pól
    const fieldNames = { A_DEVELOPER_NAME: "Nazwa dewelopera", A_DEVELOPER_LEGAL_FORM: "Forma prawna dewelopera", A_DEVELOPER_KRS_NUMBER: "Nr KRS", A_DEVELOPER_CEIDG_ENTRY_NUMBER: "Nr wpisu do CEiDG", A_DEVELOPER_NIP_NUMBER: "Nr NIP", A_DEVELOPER_REGON_NUMBER: "Nr REGON", A_DEVELOPER_PHONE_NUMBER: "Nr telefonu", A_DEVELOPER_EMAIL: "Adres poczty elektronicznej", A_DEVELOPER_FAX_NUMBER: "Nr faxu", A_DEVELOPER_WEBSITE: "Adres strony internetowej dewelopera", A_HEADQUARTERS_PROVINCE: "Województwo siedziby dewelopera", A_HEADQUARTERS_COUNTY: "Powiat siedziby dewelopera", A_HEADQUARTERS_COMMUNE: "Gmina siedziby dewelopera", A_HEADQUARTERS_CITY: "Miejscowość siedziby dewelopera", A_HEADQUARTERS_STREET: "Ulica siedziby dewelopera", A_HEADQUARTERS_BUILDING_NUMBER: "Nr budynku siedziby dewelopera", A_HEADQUARTERS_APARTMENT_NUMBER: "Nr lokalu siedziby dewelopera", A_HEADQUARTERS_POSTAL_CODE: "Kod pocztowy siedziby dewelopera", A_SALES_PROVINCE: "Województwo sprzedaży", A_SALES_COUNTY: "Powiat sprzedaży", A_SALES_COMMUNE: "Gmina sprzedaży", A_SALES_CITY: "Miejscowość sprzedaży", A_SALES_STREET: "Ulica sprzedaży", A_SALES_BUILDING_NUMBER: "Nr budynku sprzedaży", A_SALES_APARTMENT_NUMBER: "Nr lokalu sprzedaży", A_SALES_POSTAL_CODE: "Kod pocztowy sprzedaży", A_SALES_ADDITIONAL_LOCATIONS: "Dodatkowe lokalizacje sprzedaży", A_SALES_CONTACT_METHOD: "Sposób kontaktu nabywcy z deweloperem", A_PROJECT_PROVINCE: "Województwo inwestycji", A_PROJECT_COUNTY: "Powiat inwestycji", A_PROJECT_COMMUNE: "Gmina inwestycji", A_PROJECT_CITY: "Miejscowość inwestycji", A_PROJECT_STREET: "Ulica inwestycji", A_PROJECT_BUILDING_NUMBER: "Nr budynku inwestycji", A_PROJECT_POSTAL_CODE: "Kod pocztowy inwestycji", A_PROPERTY_TYPE: "Rodzaj nieruchomości", A_PROPERTY_DEVELOPER_NUMBER: "Nr lokalu lub domu nadany przez dewelopera", A_PRICE_PER_SQM: "Cena m² [zł]", A_PRICE_PER_SQM_EFFECTIVE_DATE: "Data obowiązywania ceny m²", A_TOTAL_PRICE: "Cena całkowita [zł]", A_TOTAL_PRICE_EFFECTIVE_DATE: "Data obowiązywania ceny całkowitej", A_TOTAL_PRICE_WITH_COMPONENTS: "Cena z uwzględnieniem składników [zł]", A_TOTAL_PRICE_WITH_COMPONENTS_EFFECTIVE_DATE: "Data obowiązywania ceny z uwzględnieniem składników", A_PROPERTY_PART_TYPE: "Rodzaj części nieruchomości", A_PROPERTY_PART_LABEL: "Oznaczenie części nieruchomości", A_PROPERTY_PART_PRICE: "Cena części nieruchomości [zł]", A_PROPERTY_PART_PRICE_EFFECTIVE_DATE: "Data obowiązywania ceny części nieruchomości", A_ATTACHED_ROOMS_TYPE: "Rodzaj pomieszczeń przynależnych", A_ATTACHED_ROOMS_LABEL: "Oznaczenie pomieszczeń przynależnych", A_ATTACHED_ROOMS_PRICE: "Cena pomieszczeń przynależnych [zł]", A_ATTACHED_ROOMS_PRICE_EFFECTIVE_DATE: "Data obowiązywania ceny pomieszczeń przynależnych", A_ASSOCIATED_RIGHTS_DETAILS: "Prawa niezbędne do korzystania z lokalu", A_ASSOCIATED_RIGHTS_VALUE: "Wartość praw niezbędnych [zł]", A_ASSOCIATED_RIGHTS_EFFECTIVE_DATE: "Data obowiązywania wartości praw niezbędnych", A_OTHER_PAYMENTS_DETAILS: "Rodzaje innych świadczeń pieniężnych", A_OTHER_PAYMENTS_VALUE: "Wartość innych świadczeń pieniężnych [zł]", A_OTHER_PAYMENTS_EFFECTIVE_DATE: "Data obowiązywania wartości innych świadczeń", A_PROSPECTUS_URL: "Adres prospektu informacyjnego", A_ASSETS: "Załączone pliki / obrazy", A_STATUS: "Status nieruchomości", A_ORDER: "Kolejność" };
    const hiddenKeys = [
        "_id",
        "_state",
        "_modified",
        "_created",
        "_mby",
        "_cby",
        "_hash",
        "_parent",
        "_version",
        "_uid",
        "_by",
        "A_ORDER",
        "A_STATUS",
        "A_ASSETS",
        "A_ROOMS",
        "A_FINISH_STANDARD",
        "A_INVESTMENT_PROSPECTUS",
    ];
    const BASE_URL = "https://villaverde-wola.pl/admin/storage/uploads";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://villaverde-wola.pl/admin/api/content/items/apartments?api_key=USR-220f76c840d7600267e5f1532fbef18a0854718d"
                );
                if (!res.ok) throw new Error("Błąd podczas pobierania danych");
                const json = await res.json();
                setData(json.items || json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🧾 Funkcja eksportująca dane do XLSX
    const handleExportXLSX = () => {
        if (!data.length) return;

        const exportData = data.map(item => {
            const clean = {};
            for (const key of allKeys) {
                clean[fieldNames[key.trim()] || key] = renderValue(key.trim(), item[key]);
            }
            return clean;
        });

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Dane");
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const blob = new Blob([wbout], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "dane_nieruchomosci.xlsx");
    };  

    if (loading) return <p className="text-center py-10">Ładowanie...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    // 🔧 formatuj wartości
    const renderValue = (key, value) => {
        // 1️⃣ A_ASSETS → pokaż tylko ścieżki plików
        if (key === "A_ASSETS" && Array.isArray(value)) {
            return (
                <div className="flex flex-col gap-1">
                    {value.map((v, i) =>
                        v.path ? (
                            <a
                                key={i}
                                href={`${BASE_URL}${v.path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline break-all"
                            >
                                {`${BASE_URL}${v.path}`}
                            </a>
                        ) : (
                            "X"
                        )
                    )}
                </div>
            );
        }

        // 2️⃣ Tablice z obiektami (np. historia cen) → pokaż tylko ostatni element
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
            const last = value[value.length - 1];
            const date = last.A_DATE ? ` (${last.A_DATE})` : "";
            const price = last.A_PRICE || JSON.stringify(last);
            return `${price}`;
        }

        // 3️⃣ Zwykłe wartości
        if (Array.isArray(value)) {
            return value.join(", ");
        } else if (typeof value === "object" && value !== null) {
            return JSON.stringify(value);
        } else {
            return value?.toString() || "X";
        }
    };

    // 🔍 Zbierz wszystkie klucze (kolumny)
    const allKeys = Array.from(
        new Set(data.flatMap(item => Object.keys(item)))
    ).filter(key => !hiddenKeys.includes(key.trim()));
    return (
        <>
            <div className="bg-[#F9F9F9] overflow-x-auto text-nowrap">
                <table className="min-w-[1200px] border border-gray-300 text-xs">
                    <thead className="bg-gray-100">
                        <tr>
                            {allKeys.map((key) => (
                                <th
                                    key={key}
                                    className="border border-gray-300 p-2 text-left font-semibold text-[#444]"
                                >
                                    {fieldNames[key.trim()] || key.replace(/^A_/, "")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr
                                key={item._id || i}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >
                                {allKeys.map((key) => (
                                    <td
                                        key={key}
                                        className="border border-gray-200 p-2 text-[#333] break-words"
                                    >
                                        {renderValue(key.trim(), item[key])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={handleExportXLSX}
                className="bg-slate-500 text-white p-4 fixed bottom-4 right-4 rounded-md"
            >
                Pobierz raport (xlsx)
            </button>
        </>
    );
};

export default PriceHistory;
