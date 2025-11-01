import Example from "./components/sections/Example";

export default function SectionRenderer({ sections }) {
    return (
        <>
            {sections.map(section => {
                switch (section.type) {
                    case "example": return <Example key={section.id} {...section} />;
                    default: return null;
                }
            })}
        </>
    );
}
