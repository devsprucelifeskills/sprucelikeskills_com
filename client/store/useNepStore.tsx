import { create } from 'zustand';

interface Course {
    _id: string;
    title: string;
    description: string;
    category: string;
    subCategory?: string;
    // ... add other fields as needed
}

interface NepStore {
    nepCourses: Course[];
    isLoading: boolean;
    error: string | null;
    fetchNepCourses: () => Promise<void>;
}

export const useNepStore = create<NepStore>((set, get) => ({
    nepCourses: [],
    isLoading: false,
    error: null,
    fetchNepCourses: async () => {
        // Only fetch if we don't have courses yet to satisfy the "cached" requirement
        if (get().nepCourses.length > 0) return;

        set({ isLoading: true, error: null });
        try {
            // Fetch courses where category is "Credit Courses"
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ACADEMIA_API}/api/v2/course/get-courses?page=1&limit=100&category=${encodeURIComponent('Credit Courses')}`);
            const data = await response.json();
            
            if (data.success) {
                set({ nepCourses: data.courses, isLoading: false });
            } else {
                set({ error: data.message || 'Failed to fetch NEP courses', isLoading: false });
            }
        } catch (err: any) {
            set({ error: err.message || 'Error occurred while fetching NEP courses', isLoading: false });
        }
    }
}));
