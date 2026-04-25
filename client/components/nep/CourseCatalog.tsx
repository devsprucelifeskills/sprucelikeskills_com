
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { courses } from "@/components/nep/lib/courses";
// import { cn } from "@/lib/utils";

// const categories = ["Healthcare", "Finance & Banking", "Media & Tech"];

// export function CourseCatalog() {
//   const [activeCategory, setActiveCategory] = useState(categories[0]);

//   const filteredCourses = courses.filter((c) => c.category === activeCategory);

//   return (
//     <>
//       <section id="courses" className="py-20 md:py-28 bg-white border-y border-gray-100">
//         <div className="container">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-[#111827]">
//               Your Next Career Move Starts Here
//             </h2>
//             <p className="mt-5 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
//               Ready to launch your career? Explore our university-approved, credit-based programs. Each one is a launchpad designed to <span className="text-[#13523f]">make you not just a graduate</span>, but a job-ready pro.
//             </p>
//           </div>

//           {/* Mobile dropdown */}
//           <div className="md:hidden mb-8">
//             <select
//               value={activeCategory}
//               onChange={(e) => setActiveCategory(e.target.value)}
//               className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#13523f]"
//             >
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           {/* Desktop: sidebar + grid */}
//           <div className="hidden md:grid md:grid-cols-[220px_1fr] md:gap-12 mt-10">
//             {/* Sidebar */}
//             <aside>
//               <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Course Categories</h3>
//               <div className="flex flex-col gap-1">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setActiveCategory(category)}
//                     className={cn(
//                       "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
//                       activeCategory === category
//                         ? "bg-[#13523f]/10 text-[#13523f] font-semibold"
//                         : "text-gray-600 hover:bg-gray-100"
//                     )}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </aside>

//             {/* Course cards grid */}
//             <main>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCourses.map((course) => (
//                   <div
//                     key={course.id}
//                     className="flex flex-col text-left bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition-shadow"
//                   >
//                     <div className="mb-4">
//                       <course.Icon className="w-9 h-9 text-[#13523f]" />
//                     </div>
//                     <h3 className="font-bold text-lg text-[#111827] mb-2 leading-snug">{course.title}</h3>
//                     <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow">{course.description}</p>
//                     {course.link ? (
//                       <Link
//                         href={course.link}
//                         target="_blank"
//                         className="text-sm font-semibold text-[#13523f] hover:underline"
//                       >
//                         Dive into the Details
//                       </Link>
//                     ) : (
//                       <span className="text-sm font-semibold text-gray-400">Dive into the Details</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </main>
//           </div>

//           {/* Mobile: course cards */}
//           <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-6">
//             {filteredCourses.map((course) => (
//               <div
//                 key={course.id}
//                 className="flex flex-col text-left bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition-shadow"
//               >
//                 <div className="mb-4">
//                   <course.Icon className="w-9 h-9 text-[#13523f]" />
//                 </div>
//                 <h3 className="font-bold text-lg text-[#111827] mb-2 leading-snug">{course.title}</h3>
//                 <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow">{course.description}</p>
//                 {course.link ? (
//                   <Link
//                     href={course.link}
//                     target="_blank"
//                     className="text-sm font-semibold text-[#13523f] hover:underline"
//                   >
//                     Dive into the Details
//                   </Link>
//                 ) : (
//                   <span className="text-sm font-semibold text-gray-400">Dive into the Details</span>
//                 )}
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useNepStore } from "@/store/useNepStore";
import { getIconForCategory } from "@/lib/iconMapping";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseCatalog() {
  const { nepCourses, isLoading, fetchNepCourses } = useNepStore();
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    fetchNepCourses();
  }, [fetchNepCourses]);

  // Extract unique subcategories from the Credit Courses
  const categories = useMemo(() => {
    const subs = nepCourses
      .map((c) => c.subCategory)
      .filter((sub): sub is string => !!sub && sub !== "None");
    return Array.from(new Set(subs));
  }, [nepCourses]);

  // Set initial active category once categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const filteredCourses = useMemo(() => {
    return nepCourses.filter((c) => c.subCategory === activeCategory);
  }, [nepCourses, activeCategory]);

  if (isLoading && nepCourses.length === 0) {
    return (
      <section id="courses" className="py-20 md:py-28 bg-white border-y border-gray-100">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-12">
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="courses" className="py-20 md:py-28 bg-white border-y border-gray-100">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-[#111827]">
              Your Next Career Move Starts Here
            </h2>
            <p className="mt-5 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Ready to launch your career? Explore our university-approved, credit-based programs. Each one is a launchpad designed to <span className="text-[#13523f]">make you not just a graduate</span>, but a job-ready pro.
            </p>
          </div>

          {/* Mobile dropdown */}
          {categories.length > 1 && (
            <div className="md:hidden mb-8">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#13523f]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Desktop: sidebar + grid */}
          <div className="hidden md:grid md:grid-cols-[220px_1fr] md:gap-12 mt-10">
            {/* Sidebar */}
            <aside>
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Course Categories</h3>
              <div className="flex flex-col gap-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      activeCategory === category
                        ? "bg-[#13523f]/10 text-[#13523f] font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </aside>

            {/* Course cards grid */}
            <main>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const CourseIcon = getIconForCategory(course.title) || getIconForCategory(course.subCategory || "Credit Courses");
                  return (
                    <div
                      key={course._id}
                      className="flex flex-col text-left bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition-shadow"
                    >
                      <div className="mb-4">
                        <CourseIcon className="w-9 h-9 text-[#13523f]" />
                      </div>
                      <h3 className="font-bold text-lg text-[#111827] mb-2 leading-snug">{course.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow line-clamp-3">{course.description}</p>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_FRONTEND_ACADEMIA_API}/courses/${course._id}`}
                        className="text-sm font-semibold text-[#13523f] hover:underline"
                      >
                        Dive into the Details
                      </Link>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>

          {/* Mobile: course cards */}
          <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredCourses.map((course) => {
              const CourseIcon = getIconForCategory(course.title) || getIconForCategory(course.subCategory || "Credit Courses");
              return (
                <div
                  key={course._id}
                  className="flex flex-col text-left bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">
                    <CourseIcon className="w-9 h-9 text-[#13523f]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#111827] mb-2 leading-snug">{course.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow line-clamp-3">{course.description}</p>
                  <Link
                    href={`/courses/${course._id}`}
                    className="text-sm font-semibold text-[#13523f] hover:underline"
                  >
                    Dive into the Details
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
