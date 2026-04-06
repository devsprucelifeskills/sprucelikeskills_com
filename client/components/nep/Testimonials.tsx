
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/app/actions";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TestimonialsProps {
  reviews: GoogleReview[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const onDotButtonClick = React.useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  return (
    <section id="testimonials" className="bg-white border-y border-gray-100">
      <div className="container py-20 md:py-28">

        {/* Header */}
        <div className="mb-14 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-[#111827]">
            Proof from Students Who Got Ahead
          </h2>
          <p className="mt-5 text-base text-gray-500 leading-relaxed">
            Hear from students who transformed their career prospects with our university-approved programs.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2 h-full">
                  <div className="relative bg-white border border-gray-200 rounded-xl p-8 h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                    {/* Large quote mark */}
                    <span className="absolute top-4 right-6 text-7xl text-gray-200 font-serif leading-none select-none">"</span>
                    <h3 className="text-lg font-bold text-[#13523f] mb-3 relative z-10">{review.name}</h3>
                    <blockquote className="text-sm text-gray-600 leading-relaxed flex-grow relative z-10">
                      "{review.review}"
                    </blockquote>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: Math.min(count, 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "h-3 rounded-full transition-all duration-300",
                current === index ? "w-6 bg-[#13523f]" : "w-3 bg-gray-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Read All Reviews */}
        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 border border-gray-300 rounded-lg px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-gray-700 hover:border-[#13523f] hover:text-[#13523f] transition-colors"
          >
            Read All Reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
