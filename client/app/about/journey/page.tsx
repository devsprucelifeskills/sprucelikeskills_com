import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutHighlights from "@/components/about/AboutHighlights";
import StudentTestimonials from "@/components/about/StudentTestimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Journey | Spruce Lifeskills",
  description: "Learn more about the journey of Spruce Lifeskills, Central India's leading institute for Medical Coding and Clinical Research.",
};

export default function JourneyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <AboutHero />
            <AboutHighlights />
            <StudentTestimonials />
            <Footer />
        </main>
    )
}
