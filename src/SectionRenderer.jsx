import AboutUs from "./components/sections/AboutUs";
import Contact from "./components/sections/Contact";
import Cta from "./components/sections/Cta";
import Example from "./components/sections/Example";
import Feature from "./components/sections/Feature";
import Footer from "./components/sections/Footer";
import Gallery from "./components/sections/Gallery";
import Hero from "./components/sections/Hero";
import HousePlanMap from "./components/sections/HousePlanMap";
import Houses from "./components/sections/Houses";
import Localization from "./components/sections/Localization";

export default function SectionRenderer({ sections }) {
    return (
        <>
            {sections.map(section => {
                switch (section.component) {
                    case "example": return <Example key={section.id} {...section} />;
                    case "Hero": return <Hero key={section.id} {...section} />;
                    case "AboutUs": return <AboutUs key={section.id} {...section} />;
                    case "Feature": return <Feature key={section.id} {...section} />;
                    case "HousePlanMap": return <HousePlanMap key={section.id} {...section} />;
                    case "Houses": return <Houses key={section.id} {...section} />;
                    case "Gallery": return <Gallery key={section.id} {...section} />;
                    case "Localization": return <Localization key={section.id} {...section} />;
                    case "Cta": return <Cta key={section.id} {...section} />;
                    case "Contact": return <Contact key={section.id} {...section} />;
                    case "Footer": return <Footer key={section.id} {...section} />;
                    default: return null;
                }
            })}
        </>
    );
}
