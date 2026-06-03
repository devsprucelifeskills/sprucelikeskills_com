"use client";

import { useEffect } from "react";

export default function SchemaMarkup() {
  useEffect(() => {
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Medical Coding Professional Course",
      "description": "Get industry-focused Medical Coding training with practical learning, AAPC-aligned curriculum, recorded sessions & placement assistance.",
      "provider": {
        "@type": "EducationOrganization",
        "name": "Spruce Lifeskills",
        "sameAs": "https://sprucelifeskills.com",
        "location": {
          "@type": "Place",
          "name": "Nagpur, India",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "3rd Floor, NavPrabhat Chambers, Beside ICICI Bank, Near Lokmat Square, Ramdaspeth",
            "addressLocality": "Nagpur",
            "addressRegion": "Maharashtra",
            "postalCode": "440010",
            "addressCountry": "IN"
          }
        }
      },
      "educationalCredentialAwarded": "RTMNU Approved Medical Coding Certificate",
      "courseMode": "Online & Offline",
      "financialAidEligible": "EMI & Flexible Payments",
      "offers": {
        "@type": "Offer",
        "category": "Education",
        "availability": "https://schema.org/LimitedAvailability",
        "validThrough": "2026-06-30"
      }
    };

    const scriptId = "spruce-schema-ld";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;

    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }

    scriptElement.innerHTML = JSON.stringify(courseSchema, null, 2);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
