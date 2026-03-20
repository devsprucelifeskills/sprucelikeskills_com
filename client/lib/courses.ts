export interface CourseSection {
    id: string;
    title: string;
    content?: string;
    list?: string[];
}

export interface CourseFeatureColumn {
    title: string;
    features: (string | "checkmark" | "-")[];
}

export interface Course {
    slug: string;
    title: string;
    description: string;
    image: string;
    price: number;
    discountPrice?: number;
    sections: CourseSection[];
    featuresTable?: {
        headers: string[];
        columns: CourseFeatureColumn[];
    };
}

export const courses: Course[] = [
    {
        slug: "medical-coding",
        title: "Medical Coding",
        description:
            "Medical coding is the transformation of healthcare diagnoses, procedures, medical services, and equipment into standardized alphanumeric codes used in medical records and billing systems.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218282/y03cggrcglzgr7cnkddv.webp",
        price: 45000,
        discountPrice: 39999,
        sections: [
            {
                id: "intro",
                title: "Medical Coding",
                content: "Medical coding is the transformation of healthcare diagnosis, procedures, medical services, and equipment into universal medical alphanumeric codes. The diagnoses and procedure codes are taken from medical record documentation, such as transcription of physician's notes, laboratory and radiologic results, etc.\n\nMedical coding professionals help ensure the codes are applied correctly during the medical billing process, which includes abstracting the information from documentation, assigning the appropriate codes, and creating a claim to be paid by insurance carriers."
            },
            {
                id: "job-roles",
                title: "Job Roles in Medical Coding",
                list: [
                    "Medical Coder",
                    "Coding Assistant",
                    "Certified Professional Coder (CPC)",
                    "Medical Coding Specialist",
                    "Coding Auditor",
                    "Coding Manager",
                    "Medical Coding Manager",
                    "Revenue Cycle Manager"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Medical Coders",
                list: [
                    "Hospitals and Clinics",
                    "Insurance Companies",
                    "Medical Billing Companies",
                    "Government Agencies",
                    "Remote Work Opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Anyone with a background in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or a strong interest in the healthcare industry and coding can enroll in these programs."
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "AAPC 2025 Study Material",
                "650+ Practice Questions",
                "Regular Tests",
                "Placement Support"
            ],
            columns: [
                {
                    title: "Post Graduate Diploma in Clinical Research & Medical Coding",
                    features: ["12 Months", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                {
                    title: "Advance Diploma in Medical Coding",
                    features: ["6 Months", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                {
                    title: "Diploma In Medical Coding (Foundation)",
                    features: ["3 Months", "checkmark", "-", "checkmark", "checkmark", "-", "-", "checkmark", "checkmark"]
                },
                {
                    title: "Diploma In Certified Professional Coder (CPC)",
                    features: ["3 Months", "checkmark", "checkmark", "-", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                }
            ]
        }
    },
      {
        slug: "medical-coding-foundation-medical-coding",
        title: "Foundation in Medical Coding",
        description:
            "Medical coding is the transformation of healthcare diagnoses, procedures, medical services, and equipment into standardized alphanumeric codes used in medical records and billing systems.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218282/y03cggrcglzgr7cnkddv.webp",
        price: 45000,
        discountPrice: 39999,
        sections: [
            {
                id: "intro",
                title: "Foundation in Medical Coding",
                content: "Medical coding is the transformation of healthcare diagnosis, procedures, medical services, and equipment into universal medical alphanumeric codes. The diagnoses and procedure codes are taken from medical record documentation, such as transcription of physician's notes, laboratory and radiologic results, etc.\n\nMedical coding professionals help ensure the codes are applied correctly during the medical billing process, which includes abstracting the information from documentation, assigning the appropriate codes, and creating a claim to be paid by insurance carriers."
            },
            {
                id: "job-roles",
                title: "Job Roles in Medical Coding",
                list: [
                    "Medical Coder",
                    "Coding Assistant",
                    "Certified Professional Coder (CPC)",
                    "Medical Coding Specialist",
                    "Coding Auditor",
                    "Coding Manager",
                    "Medical Coding Manager",
                    "Revenue Cycle Manager"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Medical Coders",
                list: [
                    "Hospitals and Clinics",
                    "Insurance Companies",
                    "Medical Billing Companies",
                    "Government Agencies",
                    "Remote Work Opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Anyone with a background in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or a strong interest in the healthcare industry and coding can enroll in these programs."
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "AAPC 2025 Study Material",
                "650+ Practice Questions",
                "Regular Tests",
                "Placement Support"
            ],
            columns: [
               
                {
                    title: "Diploma In Medical Coding (Foundation)",
                    features: ["3 Months", "checkmark", "-", "checkmark", "checkmark", "-", "-", "checkmark", "checkmark"]
                },
                
            ]
        }
    },
     {
        slug: "medical-coding-certified-proffesional-coder",
        title: "Certified Professional Coder (CPC)",
        description:
            "Medical coding is the transformation of healthcare diagnoses, procedures, medical services, and equipment into standardized alphanumeric codes used in medical records and billing systems.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218282/y03cggrcglzgr7cnkddv.webp",
        price: 45000,
        discountPrice: 39999,
        sections: [
            {
                id: "intro",
                title: "Medical Coding",
                content: "Medical coding is the transformation of healthcare diagnosis, procedures, medical services, and equipment into universal medical alphanumeric codes. The diagnoses and procedure codes are taken from medical record documentation, such as transcription of physician's notes, laboratory and radiologic results, etc.\n\nMedical coding professionals help ensure the codes are applied correctly during the medical billing process, which includes abstracting the information from documentation, assigning the appropriate codes, and creating a claim to be paid by insurance carriers."
            },
            {
                id: "job-roles",
                title: "Job Roles in Medical Coding",
                list: [
                    "Medical Coder",
                    "Coding Assistant",
                    "Certified Professional Coder (CPC)",
                    "Medical Coding Specialist",
                    "Coding Auditor",
                    "Coding Manager",
                    "Medical Coding Manager",
                    "Revenue Cycle Manager"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Medical Coders",
                list: [
                    "Hospitals and Clinics",
                    "Insurance Companies",
                    "Medical Billing Companies",
                    "Government Agencies",
                    "Remote Work Opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Anyone with a background in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or a strong interest in the healthcare industry and coding can enroll in these programs."
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "AAPC 2025 Study Material",
                "650+ Practice Questions",
                "Regular Tests",
                "Placement Support"
            ],
            columns: [
               
                {
                    title: "Diploma In Certified Professional Coder (CPC)",
                    features: ["3 Months", "checkmark", "checkmark", "-", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                }
            ]
        }
    },
     {
        slug: "medical-coding-advance-diploma-in-medical-coding",
        title: "Advance Diploma in Medical Coding",
        description:
            "Medical coding is the transformation of healthcare diagnoses, procedures, medical services, and equipment into standardized alphanumeric codes used in medical records and billing systems.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218282/y03cggrcglzgr7cnkddv.webp",
        price: 45000,
        discountPrice: 39999,
        sections: [
            {
                id: "intro",
                title: "Advance Diploma in Medical Coding",
                content: "Medical coding is the transformation of healthcare diagnosis, procedures, medical services, and equipment into universal medical alphanumeric codes. The diagnoses and procedure codes are taken from medical record documentation, such as transcription of physician's notes, laboratory and radiologic results, etc.\n\nMedical coding professionals help ensure the codes are applied correctly during the medical billing process, which includes abstracting the information from documentation, assigning the appropriate codes, and creating a claim to be paid by insurance carriers."
            },
            {
                id: "job-roles",
                title: "Job Roles in Medical Coding",
                list: [
                    "Medical Coder",
                    "Coding Assistant",
                    "Certified Professional Coder (CPC)",
                    "Medical Coding Specialist",
                    "Coding Auditor",
                    "Coding Manager",
                    "Medical Coding Manager",
                    "Revenue Cycle Manager"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Medical Coders",
                list: [
                    "Hospitals and Clinics",
                    "Insurance Companies",
                    "Medical Billing Companies",
                    "Government Agencies",
                    "Remote Work Opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Anyone with a background in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or a strong interest in the healthcare industry and coding can enroll in these programs."
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "AAPC 2025 Study Material",
                "650+ Practice Questions",
                "Regular Tests",
                "Placement Support"
            ],
            columns: [
                
                {
                    title: "Advance Diploma in Medical Coding",
                    features: ["6 Months", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
               
            ]
        }
    },
     {
        slug: "medical-coding-post-graduate-diploma",
        title: "Post Graduate Diploma in Medical Coding",
        description:
            "Medical coding is the transformation of healthcare diagnoses, procedures, medical services, and equipment into standardized alphanumeric codes used in medical records and billing systems.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218282/y03cggrcglzgr7cnkddv.webp",
        price: 45000,
        discountPrice: 39999,
        sections: [
            {
                id: "intro",
                title: "Post Graduate Diploma in Medical Coding",
                content: "Medical coding is the transformation of healthcare diagnosis, procedures, medical services, and equipment into universal medical alphanumeric codes. The diagnoses and procedure codes are taken from medical record documentation, such as transcription of physician's notes, laboratory and radiologic results, etc.\n\nMedical coding professionals help ensure the codes are applied correctly during the medical billing process, which includes abstracting the information from documentation, assigning the appropriate codes, and creating a claim to be paid by insurance carriers."
            },
            {
                id: "job-roles",
                title: "Job Roles in Medical Coding",
                list: [
                    "Medical Coder",
                    "Coding Assistant",
                    "Certified Professional Coder (CPC)",
                    "Medical Coding Specialist",
                    "Coding Auditor",
                    "Coding Manager",
                    "Medical Coding Manager",
                    "Revenue Cycle Manager"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Medical Coders",
                list: [
                    "Hospitals and Clinics",
                    "Insurance Companies",
                    "Medical Billing Companies",
                    "Government Agencies",
                    "Remote Work Opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Anyone with a background in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or a strong interest in the healthcare industry and coding can enroll in these programs."
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "AAPC 2025 Study Material",
                "650+ Practice Questions",
                "Regular Tests",
                "Placement Support"
            ],
            columns: [
                {
                    title: "Post Graduate Diploma in Clinical Research & Medical Coding",
                    features: ["12 Months", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                
            ]
        }
    },
    {
        slug: "clinical-research",
        title: "Clinical Research",
        description:
            "Clinical research involves studying the safety and effectiveness of medications, medical devices, and treatment procedures through structured clinical trials and scientific investigation.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218400/svnnwtsfqnlz85fd2kdt.jpg",
        price: 55000,
        discountPrice: 49999,
        sections: [
            {
                id: "intro",
                title: "Clinical Research",
                content: "Clinical research refers to the structured investigation of medical interventions, such as drugs, devices, diagnostics, and treatment regimens, in human volunteers. It aims to evaluate their safety, efficacy, and effectiveness before they are introduced to the broader population.\n\nClinical Research Consists of:\n1. Clinical Research\n2. Pharmacovigilance\n3. Regulatory Affairs\n4. Clinical Data Management\n5. Medical Writing"
            },
            {
                id: "job-roles",
                title: "Opportunities in Clinical Research",
                list: [
                    "Clinical Research Coordinator (CRC)",
                    "Clinical Trial Assistant (CTA)",
                    "Regulatory Affairs Assistant",
                    "Clinical Research Associate (CRA)",
                    "Data Analyst/Manager",
                    "Quality Assurance Specialist",
                    "Medical Writer",
                    "Pharmacovigilance Officer",
                    "Biostatistician",
                    "Ethics Committee Coordinator"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Clinical Research Professionals",
                list: [
                    "Pharmaceutical companies",
                    "Biotechnology firms",
                    "Contract Research Organizations (CROs)",
                    "Site Management Organization (SMO)",
                    "Academic research institutions",
                    "Government agencies",
                    "Hospitals and healthcare organizations"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Graduates or Post-graduates in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or professionals seeking to enter the pharmaceutical and clinical research industry."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "International Certifications",
                "AAPC 2025 Study Material",
                "Repeat Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
                {
                    title: "Post Graduate Diploma (1)",
                    features: ["12 Months", "checkmark", "checkmark", "checkmark", "checkmark", "4", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                {
                    title: "Advance Diploma (1)",
                    features: ["6 Months", "checkmark", "-", "-", "-", "3", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                {
                    title: "Advance Diploma IT (2)",
                    features: ["6 Months", "checkmark", "-", "checkmark", "checkmark", "3", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                {
                    title: "Diploma (Any One Subject)",
                    features: ["3 Months", "checkmark", "-", "-", "-", "-", "-", "checkmark", "checkmark", "-", "checkmark"]
                }
            ]
        }
    },
    {
        slug: "clinical-research-post-graduate-diploma",
        title: "Clinical Research Post Graduate Diploma",
        description:
            "Clinical research involves studying the safety and effectiveness of medications, medical devices, and treatment procedures through structured clinical trials and scientific investigation.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218400/svnnwtsfqnlz85fd2kdt.jpg",
        price: 55000,
        discountPrice: 49999,
        sections: [
            {
                id: "intro",
                title: "Post Graduate Diploma in Clinical Research",
                content: "Clinical research refers to the structured investigation of medical interventions, such as drugs, devices, diagnostics, and treatment regimens, in human volunteers. It aims to evaluate their safety, efficacy, and effectiveness before they are introduced to the broader population.\n\nClinical Research Consists of:\n1. Clinical Research\n2. Pharmacovigilance\n3. Regulatory Affairs\n4. Clinical Data Management\n5. Medical Writing"
            },
            {
                id: "job-roles",
                title: "Opportunities in Clinical Research",
                list: [
                    "Clinical Research Coordinator (CRC)",
                    "Clinical Trial Assistant (CTA)",
                    "Regulatory Affairs Assistant",
                    "Clinical Research Associate (CRA)",
                    "Data Analyst/Manager",
                    "Quality Assurance Specialist",
                    "Medical Writer",
                    "Pharmacovigilance Officer",
                    "Biostatistician",
                    "Ethics Committee Coordinator"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Clinical Research Professionals",
                list: [
                    "Pharmaceutical companies",
                    "Biotechnology firms",
                    "Contract Research Organizations (CROs)",
                    "Site Management Organization (SMO)",
                    "Academic research institutions",
                    "Government agencies",
                    "Hospitals and healthcare organizations"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Graduates or Post-graduates in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or professionals seeking to enter the pharmaceutical and clinical research industry."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "International Certifications",
                "AAPC 2025 Study Material",
                "Repeat Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
                {
                    title: "Post Graduate Diploma (1)",
                    features: ["12 Months", "checkmark", "checkmark", "checkmark", "checkmark", "4", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
               
            ]
        }
    },
     {
        slug: "clinical-research-advance-diploma",
        title: "Advance Diploma in Clinical Research",
        description:
            "Clinical research involves studying the safety and effectiveness of medications, medical devices, and treatment procedures through structured clinical trials and scientific investigation.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218400/svnnwtsfqnlz85fd2kdt.jpg",
        price: 55000,
        discountPrice: 49999,
        sections: [
            {
                id: "intro",
                title: "Advance Diploma in Clinical Research",
                content: "Clinical research refers to the structured investigation of medical interventions, such as drugs, devices, diagnostics, and treatment regimens, in human volunteers. It aims to evaluate their safety, efficacy, and effectiveness before they are introduced to the broader population.\n\nClinical Research Consists of:\n1. Clinical Research\n2. Pharmacovigilance\n3. Regulatory Affairs\n4. Clinical Data Management\n5. Medical Writing"
            },
            {
                id: "job-roles",
                title: "Opportunities in Clinical Research",
                list: [
                    "Clinical Research Coordinator (CRC)",
                    "Clinical Trial Assistant (CTA)",
                    "Regulatory Affairs Assistant",
                    "Clinical Research Associate (CRA)",
                    "Data Analyst/Manager",
                    "Quality Assurance Specialist",
                    "Medical Writer",
                    "Pharmacovigilance Officer",
                    "Biostatistician",
                    "Ethics Committee Coordinator"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Clinical Research Professionals",
                list: [
                    "Pharmaceutical companies",
                    "Biotechnology firms",
                    "Contract Research Organizations (CROs)",
                    "Site Management Organization (SMO)",
                    "Academic research institutions",
                    "Government agencies",
                    "Hospitals and healthcare organizations"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Graduates or Post-graduates in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or professionals seeking to enter the pharmaceutical and clinical research industry."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "International Certifications",
                "AAPC 2025 Study Material",
                "Repeat Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
               
                {
                    title: "Advance Diploma (1)",
                    features: ["6 Months", "checkmark", "-", "-", "-", "3", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
              
            ]
        }
    },
     {
        slug: "clinical-research-advance-diploma-it",
        title: "Clinical Research Advance Diploma IT",
        description:
            "Clinical research involves studying the safety and effectiveness of medications, medical devices, and treatment procedures through structured clinical trials and scientific investigation.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218400/svnnwtsfqnlz85fd2kdt.jpg",
        price: 55000,
        discountPrice: 49999,
        sections: [
            {
                id: "intro",
                title: "Clinical Research Advance Diploma IT",
                content: "Clinical research refers to the structured investigation of medical interventions, such as drugs, devices, diagnostics, and treatment regimens, in human volunteers. It aims to evaluate their safety, efficacy, and effectiveness before they are introduced to the broader population.\n\nClinical Research Consists of:\n1. Clinical Research\n2. Pharmacovigilance\n3. Regulatory Affairs\n4. Clinical Data Management\n5. Medical Writing"
            },
            {
                id: "job-roles",
                title: "Opportunities in Clinical Research",
                list: [
                    "Clinical Research Coordinator (CRC)",
                    "Clinical Trial Assistant (CTA)",
                    "Regulatory Affairs Assistant",
                    "Clinical Research Associate (CRA)",
                    "Data Analyst/Manager",
                    "Quality Assurance Specialist",
                    "Medical Writer",
                    "Pharmacovigilance Officer",
                    "Biostatistician",
                    "Ethics Committee Coordinator"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Clinical Research Professionals",
                list: [
                    "Pharmaceutical companies",
                    "Biotechnology firms",
                    "Contract Research Organizations (CROs)",
                    "Site Management Organization (SMO)",
                    "Academic research institutions",
                    "Government agencies",
                    "Hospitals and healthcare organizations"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Graduates or Post-graduates in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or professionals seeking to enter the pharmaceutical and clinical research industry."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "International Certifications",
                "AAPC 2025 Study Material",
                "Repeat Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
              
                {
                    title: "Advance Diploma IT (2)",
                    features: ["6 Months", "checkmark", "-", "checkmark", "checkmark", "3", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
             
            ]
        }
    },
     {
        slug: "clinical-research-diploma-in-one-subject",
        title: "Clinical Research Diploma",
        description:
            "Clinical research involves studying the safety and effectiveness of medications, medical devices, and treatment procedures through structured clinical trials and scientific investigation.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218400/svnnwtsfqnlz85fd2kdt.jpg",
        price: 55000,
        discountPrice: 49999,
        sections: [
            {
                id: "intro",
                title: "Clinical Research",
                content: "Clinical research refers to the structured investigation of medical interventions, such as drugs, devices, diagnostics, and treatment regimens, in human volunteers. It aims to evaluate their safety, efficacy, and effectiveness before they are introduced to the broader population.\n\nClinical Research Consists of:\n1. Clinical Research\n2. Pharmacovigilance\n3. Regulatory Affairs\n4. Clinical Data Management\n5. Medical Writing"
            },
            {
                id: "job-roles",
                title: "Opportunities in Clinical Research",
                list: [
                    "Clinical Research Coordinator (CRC)",
                    "Clinical Trial Assistant (CTA)",
                    "Regulatory Affairs Assistant",
                    "Clinical Research Associate (CRA)",
                    "Data Analyst/Manager",
                    "Quality Assurance Specialist",
                    "Medical Writer",
                    "Pharmacovigilance Officer",
                    "Biostatistician",
                    "Ethics Committee Coordinator"
                ]
            },
            {
                id: "industries",
                title: "Industries Hiring Clinical Research Professionals",
                list: [
                    "Pharmaceutical companies",
                    "Biotechnology firms",
                    "Contract Research Organizations (CROs)",
                    "Site Management Organization (SMO)",
                    "Academic research institutions",
                    "Government agencies",
                    "Hospitals and healthcare organizations"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Graduates or Post-graduates in Life Sciences (Biology, Pharmacy, Nursing, Medical, etc.) or professionals seeking to enter the pharmaceutical and clinical research industry."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "International Certifications",
                "AAPC 2025 Study Material",
                "Repeat Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
                
                {
                    title: "Diploma (Any One Subject)",
                    features: ["3 Months", "checkmark", "-", "-", "-", "-", "-", "checkmark", "checkmark", "-", "checkmark"]
                }
            ]
        }
    },
    {
        slug: "medical-billing",
        title: "Medical Billing",
        description:
            "Medical billing is the process of translating healthcare services rendered by providers into a standardized billing format to submit claims to insurance companies for reimbursement.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218491/icsiug15qwxyjhmj0bao.jpg",
        price: 35000,
        discountPrice: 29999,
        sections: [
            {
                id: "intro",
                title: "Medical Billing",
                content: "Medical billing is the process of translating healthcare services rendered by providers into a standardized billing format to submit claims to insurance companies for reimbursement. It acts as the financial backbone of the healthcare system, ensuring that providers are compensated for their services and patients’ insurance benefits are properly utilized.\n\nMedical billers work closely with healthcare providers, insurance companies, and patients to ensure accuracy in billing and timely payment of claims."
            },
            {
                id: "job-roles",
                title: "Job Roles in Medical Billing",
                list: [
                    "Medical Biller",
                    "Medical Coding Specialist",
                    "Revenue Cycle Specialist",
                    "Healthcare Compliance Officer",
                    "Billing Manager or Supervisor"
                ]
            },
            {
                id: "industries",
                title: "Work Environments",
                list: [
                    "Hospitals and healthcare clinics",
                    "Private medical practices",
                    "Insurance companies",
                    "Billing service companies",
                    "Remote work opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Any graduate with strong communication skills and basic computer knowledge. Life science background is preferred but not mandatory for billing roles."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "AAPC Study Material",
                "Regular Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
                {
                    title: "Diploma In Medical Billing",
                    features: ["2 Months", "checkmark", "-", "-", "-", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                {
                    title: "Diploma In Coding & Billing",
                    features: ["3 Months", "checkmark", "-", "checkmark", "checkmark", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                }
            ]
        }
    },
     {
        slug: "diploma-in-medical-billing",
        title: "Diploma In Medical Billing",
        description:
            "Medical billing is the process of translating healthcare services rendered by providers into a standardized billing format to submit claims to insurance companies for reimbursement.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218491/icsiug15qwxyjhmj0bao.jpg",
        price: 35000,
        discountPrice: 29999,
        sections: [
            {
                id: "intro",
                title: "Diploma In Medical Billing",
                content: "Diploma In Medical billing is the process of translating healthcare services rendered by providers into a standardized billing format to submit claims to insurance companies for reimbursement. It acts as the financial backbone of the healthcare system, ensuring that providers are compensated for their services and patients’ insurance benefits are properly utilized.\n\nMedical billers work closely with healthcare providers, insurance companies, and patients to ensure accuracy in billing and timely payment of claims."
            },
            {
                id: "job-roles",
                title: "Job Roles in Medical Billing",
                list: [
                    "Medical Biller",
                    "Medical Coding Specialist",
                    "Revenue Cycle Specialist",
                    "Healthcare Compliance Officer",
                    "Billing Manager or Supervisor"
                ]
            },
            {
                id: "industries",
                title: "Work Environments",
                list: [
                    "Hospitals and healthcare clinics",
                    "Private medical practices",
                    "Insurance companies",
                    "Billing service companies",
                    "Remote work opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Any graduate with strong communication skills and basic computer knowledge. Life science background is preferred but not mandatory for billing roles."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "AAPC Study Material",
                "Regular Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
                {
                    title: "Diploma In Medical Billing",
                    features: ["2 Months", "checkmark", "-", "-", "-", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                
            ]
        }
    },
   {
        slug: "medical-billing-diploma-in-coding-billing",
        title: "Diploma In Coding & Billing",
        description:
            "Medical billing is the process of translating healthcare services rendered by providers into a standardized billing format to submit claims to insurance companies for reimbursement.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218491/icsiug15qwxyjhmj0bao.jpg",
        price: 35000,
        discountPrice: 29999,
        sections: [
            {
                id: "intro",
                title: "Diploma In Coding & Billing",
                content: "Medical billing is the process of translating healthcare services rendered by providers into a standardized billing format to submit claims to insurance companies for reimbursement. It acts as the financial backbone of the healthcare system, ensuring that providers are compensated for their services and patients’ insurance benefits are properly utilized.\n\nMedical billers work closely with healthcare providers, insurance companies, and patients to ensure accuracy in billing and timely payment of claims."
            },
            {
                id: "job-roles",
                title: "Job Roles in Medical Billing",
                list: [
                    "Medical Biller",
                    "Medical Coding Specialist",
                    "Revenue Cycle Specialist",
                    "Healthcare Compliance Officer",
                    "Billing Manager or Supervisor"
                ]
            },
            {
                id: "industries",
                title: "Work Environments",
                list: [
                    "Hospitals and healthcare clinics",
                    "Private medical practices",
                    "Insurance companies",
                    "Billing service companies",
                    "Remote work opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Any graduate with strong communication skills and basic computer knowledge. Life science background is preferred but not mandatory for billing roles."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "Spruce® LMS",
                "AAPC LMS",
                "RTMNU Certificate",
                "NEP Credits (3)",
                "AAPC Study Material",
                "Regular Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
                
                {
                    title: "Diploma In Coding & Billing",
                    features: ["3 Months", "checkmark", "-", "checkmark", "checkmark", "-", "checkmark", "checkmark", "checkmark", "checkmark"]
                }
            ]
        }
    },
    {
        slug: "account-receivable",
        title: "Account Receivable",
        description:
            "Accounts receivable in healthcare focuses on tracking outstanding payments from patients and insurance companies and ensuring that healthcare providers receive timely reimbursements.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218559/korhbctay1hdtkdwjf1g.webp",
        price: 30000,
        discountPrice: 24999,
        sections: [
            {
                id: "intro",
                title: "Account Receivable",
                content: "An AR Caller (also known as an Accounts Receivable Caller) is a professional responsible for managing and following up on outstanding medical or healthcare-related accounts that are owed by patients or insurance companies.\n\nAR Callers contact insurance companies and patients to resolve outstanding debts, handle payment disputes, and ensure that claims are processed correctly."
            },
            {
                id: "job-roles",
                title: "Job Roles in Accounts Receivable",
                list: [
                    "Accounts Receivable Caller",
                    "AR Specialist",
                    "AR Supervisor/Manager",
                    "Medical Collections Specialist",
                    "Revenue Cycle Manager"
                ]
            },
            {
                id: "industries",
                title: "Work Environments",
                list: [
                    "Hospitals and Healthcare Facilities",
                    "Private Medical Practices",
                    "Billing Service Companies",
                    "Insurance Companies",
                    "Remote Work Opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Ideal for fresh graduates looking for a career in Revenue Cycle Management (RCM). Requires good analytical skills and persistency."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "RTMNU CERTIFICATE",
                "NEP Credits (3)",
                "Spruce® LMS",
                "Regular Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
                {
                    title: "Diploma In AR",
                    features: ["2 Months", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                {
                    title: "Diploma In AR & Billing",
                    features: ["3 Months", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                }
            ]
        }
    },
        {
        slug: "diploma-in-account-receivable",
        title: "Diploma In Account Receivable",
        description:
            "Accounts receivable in healthcare focuses on tracking outstanding payments from patients and insurance companies and ensuring that healthcare providers receive timely reimbursements.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218559/korhbctay1hdtkdwjf1g.webp",
        price: 30000,
        discountPrice: 24999,
        sections: [
            {
                id: "intro",
                title: "Diploma In AR",
                content: "An AR Caller (also known as an Accounts Receivable Caller) is a professional responsible for managing and following up on outstanding medical or healthcare-related accounts that are owed by patients or insurance companies.\n\nAR Callers contact insurance companies and patients to resolve outstanding debts, handle payment disputes, and ensure that claims are processed correctly."
            },
            {
                id: "job-roles",
                title: "Job Roles in Accounts Receivable",
                list: [
                    "Accounts Receivable Caller",
                    "AR Specialist",
                    "AR Supervisor/Manager",
                    "Medical Collections Specialist",
                    "Revenue Cycle Manager"
                ]
            },
            {
                id: "industries",
                title: "Work Environments",
                list: [
                    "Hospitals and Healthcare Facilities",
                    "Private Medical Practices",
                    "Billing Service Companies",
                    "Insurance Companies",
                    "Remote Work Opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Ideal for fresh graduates looking for a career in Revenue Cycle Management (RCM). Requires good analytical skills and persistency."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "RTMNU CERTIFICATE",
                "NEP Credits (3)",
                "Spruce® LMS",
                "Regular Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
                {
                    title: "Diploma In AR",
                    features: ["2 Months", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                },
                
            ]
        }
    },
        {
        slug: "diploma-in-account-receivable-billing",
        title: "Diploma In Account Receivable",
        description:
            "Accounts receivable in healthcare focuses on tracking outstanding payments from patients and insurance companies and ensuring that healthcare providers receive timely reimbursements.",
        image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773218559/korhbctay1hdtkdwjf1g.webp",
        price: 30000,
        discountPrice: 24999,
        sections: [
            {
                id: "intro",
                title: "Diploma In AR Billing",
                content: "An AR Caller (also known as an Accounts Receivable Caller) is a professional responsible for managing and following up on outstanding medical or healthcare-related accounts that are owed by patients or insurance companies.\n\nAR Callers contact insurance companies and patients to resolve outstanding debts, handle payment disputes, and ensure that claims are processed correctly."
            },
            {
                id: "job-roles",
                title: "Job Roles in Accounts Receivable",
                list: [
                    "Accounts Receivable Caller",
                    "AR Specialist",
                    "AR Supervisor/Manager",
                    "Medical Collections Specialist",
                    "Revenue Cycle Manager"
                ]
            },
            {
                id: "industries",
                title: "Work Environments",
                list: [
                    "Hospitals and Healthcare Facilities",
                    "Private Medical Practices",
                    "Billing Service Companies",
                    "Insurance Companies",
                    "Remote Work Opportunities"
                ]
            },
            {
                id: "who-can-enroll",
                title: "Who Can Enroll",
                content: "Ideal for fresh graduates looking for a career in Revenue Cycle Management (RCM). Requires good analytical skills and persistency."
            },
            {
                id: "features-table",
                title: "Courses & Course Features"
            }
        ],
        featuresTable: {
            headers: [
                "Duration",
                "RTMNU CERTIFICATE",
                "NEP Credits (3)",
                "Spruce® LMS",
                "Regular Tests",
                "Placement Support",
                "Exam Preparation",
                "Daily/Weekly Batches"
            ],
            columns: [
               
                {
                    title: "Diploma In AR & Billing",
                    features: ["3 Months", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark", "checkmark"]
                }
            ]
        }
    },
    {
        slug: "campus-corporate",
        title: "Campus To Corporate",
        description:
            "Campus to Corporate training programs help students transition from academic life to professional workplaces by developing communication, interview, and corporate readiness skills.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        price: 15000,
        discountPrice: 12999,
        sections: [
            {
                id: "intro",
                title: "Campus To Corporate",
                content: "Campus to Corporate training programs help students transition from academic life to professional workplaces by developing communication, interview, and corporate readiness skills."
            }
        ]
    }
];