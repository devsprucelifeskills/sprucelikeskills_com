

import { Suspense } from "react";
import Header from '@/components/common/Header';
import { Hero } from "@/components/nep/Hero";
import { TrustSection } from "@/components/nep/AboutUs";
import { EnrollmentForm } from "@/components/nep/EnrollmentForm";
import { Testimonials } from "@/components/nep/Testimonials";
import { AppFooter } from "@/components/nep/Footer";
import { Certificate } from "@/components/nep/Certificate";
import { Placements } from "@/components/nep/Placements";
import { getGoogleReviews } from "@/app/actions";
import { Faq } from "@/components/nep/Faq";
import { CourseCatalog } from "@/components/nep/CourseCatalog";

export const revalidate = 60;

export default async function Home() {
    const reviews = await getGoogleReviews();

    const longReviews = reviews.filter(review => review.review.length > 150);
    const homePageReviews = longReviews.slice(0, 7);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
                <Hero />
                <Placements />
                <TrustSection />
                <Suspense fallback={null}>
                    <CourseCatalog />
                </Suspense>
                <Certificate />
                <Testimonials reviews={homePageReviews} />
                <Faq />
                <EnrollmentForm />
            </main>
            <AppFooter />
        </div>
    );
}