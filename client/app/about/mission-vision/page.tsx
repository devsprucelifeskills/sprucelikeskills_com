import Header from "@/components/common/Header";
import MissionVisionHero from "@/components/about/MissionVisionHero";
import MissionVisionContent from "@/components/about/MissionVisionContent";
import FacultySection from "@/components/about/FacultySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mission & Vision | Spruce Lifeskills",
    description: "Explore the mission, vision, and core values of Spruce Lifeskills, bridging the gap in healthcare education.",
};

export default function MissionVisionPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <MissionVisionHero />
            <MissionVisionContent />
            <FacultySection />
        </main>
    )
}
