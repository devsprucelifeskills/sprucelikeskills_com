import Header from "@/components/common/Header";
import HeroSection from "@/components/homepage/HeroSection";
import FeatureCards from "@/components/homepage/FeatureCards";
import AuthorizedPartner from "@/components/homepage/AuthorizedPartner";
import PopularCourses from "@/components/homepage/PopularCourses";
import SuccessCorner from "@/components/homepage/SuccessCorner";
import CourseTest from "@/components/homepage/CourseTest";
import BlogSection from "@/components/homepage/BlogSection";
import HireFromSpruce from "@/components/homepage/HireFromSpruce";
import WhatStudentsSays from "@/components/homepage/WhatStudentsSays";

export default function Home() {
  return (
    <div className="relative bg-white min-h-screen">
      <Header />
      <div className="relative">
        <HeroSection />
        <PopularCourses />
        {/* Negative margin to pull cards up over the hero section */}
        <div className="relative z-20 -mt-24 pb-12 sm:-mt-28 md:-mt-32">
          <FeatureCards />
        </div>
      </div>
      <AuthorizedPartner />

      <SuccessCorner />
      <CourseTest />
      <BlogSection />
      <HireFromSpruce />
      <WhatStudentsSays />
    </div>
  );
}
