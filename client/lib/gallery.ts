export interface GalleryItem {
    id: number;
    title: string;
    category: "Events" | "Classroom" | "Achievements" | "Campus";
    image: string;
}

export const galleryItems: GalleryItem[] = [
    // Events
    { id: 1, title: "Annual Day 2024", category: "Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87" },
    { id: 2, title: "Cultural Fest", category: "Events", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622" },
    { id: 3, title: "Workshop on Medical Coding", category: "Events", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952" },
    
    // Classroom
    { id: 4, title: "Modern Training Lab", category: "Classroom", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655" },
    { id: 5, title: "Interactive Learning Session", category: "Classroom", image: "https://images.unsplash.com/photo-1544531585-98308485a7a2" },
    { id: 6, title: "Group Discussion Area", category: "Classroom", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" },
    
    // Achievements
    { id: 7, title: "Best Training Institute Award", category: "Achievements", image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad" },
    { id: 8, title: "100% Placement Milestone", category: "Achievements", image: "https://images.unsplash.com/photo-1531545517246-167e1cc10565" },
    { id: 9, title: "Top Performer 2023", category: "Achievements", image: "https://images.unsplash.com/photo-1491333078588-55b6733c7de6" },
];
