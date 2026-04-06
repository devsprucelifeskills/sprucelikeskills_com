
"use server";

export interface GoogleReview {
    name: string;
    review: string;
    rating?: number;
    date?: string;
    avatar?: string;
}

const reviewsData: GoogleReview[] = [
    {
        name: "Shweta Ramteke",
        review: "I highly recommend Spruce Clinical Research and Medical Coding Institute. They offer quality courses at reasonable prices with no extra fees. The faculty provides personal attention and the facilities are clean. Excellent! The staff is very supportive and helps in every step of the learning process. I am glad I chose this institute for my career growth.",
        rating: 5,
        date: "2 months ago"
    },
    {
        name: "Triveni Mutyalwar",
        review: "I have done advance diploma from Spruce Clinical Research and Medical Coding Institute. I got to learn many more things about medical coding — it is helping me achieve my goals as a medical coder. I am truly thankful. The practical knowledge shared here is very valuable and directly applicable in the industry. Highly recommended for aspiring coders.",
        rating: 5,
        date: "1 month ago"
    },
    {
        name: "Rahul Sharma",
        review: "The training at Spruce is very comprehensive and the faculty is extremely knowledgeable. I got placed at a reputed company right after completing my course. Highly recommend to everyone! The placement assistance is real and they prepare you well for the interviews. Truly a life-changing experience for me.",
        rating: 5,
        date: "3 months ago"
    },
    {
        name: "Priya Desai",
        review: "Amazing institute with dedicated faculty members. The course content is up to date with industry standards. I have seen tremendous growth in my career after joining Spruce. They provide a very professional environment and the study material is very easy to understand. Best place for clinical research and medical coding.",
        rating: 5,
        date: "2 weeks ago"
    },
    {
        name: "Ankit Joshi",
        review: "Best institute in Nagpur for clinical research training. The practical exposure and placement assistance they provide is unmatched. I am proud to be a Spruce alumnus. The curriculum is designed in such a way that even someone from a non-science background can understand the concepts easily. Thank you Spruce!",
        rating: 5,
        date: "4 months ago"
    },
    {
        name: "Neha Kulkarni",
        review: "Spruce gave me the confidence and skills I needed to enter the healthcare industry. The small batch size ensures personalised attention from every trainer. I was able to clear my certification in the first attempt thanks to their rigorous training and mock tests. Highly satisfied with the course.",
        rating: 5,
        date: "6 months ago"
    },
    {
        name: "Amit Patel",
        review: "Excellent faculty and great placement support. I completed my Medical Coding course here and within a month I got placed in a top MNC. The trainers are very patient and explain each topic with real-world examples. I would highly recommend Spruce Lifeskills to anyone looking for a career in healthcare.",
        rating: 5,
        date: "5 months ago"
    },
    {
        name: "Sneha Reddy",
        review: "The best part about Spruce is their focus on practical skills. We had many hands-on sessions which helped me understand the complexities of clinical research. The infrastructure is good and the staff is very friendly. It's affordable and worth every penny spent. Truly happy with my decision.",
        rating: 5,
        date: "7 months ago"
    }
];

export async function getGoogleReviews(): Promise<GoogleReview[]> {
    // In a real application, this would fetch from an API
    // For now, returning mock data to resolve build errors
    return reviewsData;
}
