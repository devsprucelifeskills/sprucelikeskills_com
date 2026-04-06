import { AppFooter } from "@/components/nep/Footer";
import { Header } from "@/components/nep/Header";
import { StudentReviews } from "@/components/nep/StudentReviews";
import { getGoogleReviews } from "@/app/actions";

export default async function ReviewsPage() {
    const reviews = await getGoogleReviews();

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow">
                <section className="py-16 md:py-20 border-b border-gray-100">
                    <div className="container text-center pb-12 md:pb-16 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-[#111827]">
                            Straight from the Source
                        </h1>
                        <p className="mt-5 text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
                            Hear what our students have to say about their journey and success with Spruce Lifeskills.
                        </p>
                    </div>
                    <div className="container">
                        <StudentReviews reviews={reviews} />
                    </div>
                </section>
            </main>
            <AppFooter />
        </div>
    )
}