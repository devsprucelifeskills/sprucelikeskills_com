import {
    Stethoscope,
    FileText,
    Banknote,
    FlaskConical,
    Handshake,
    BadgePercent,
    LayoutTemplate,
    Box,
    BookOpen,
    Briefcase,
    Cpu,
    Palette,
    Lightbulb,
    GraduationCap,
} from "lucide-react";

export const iconMapping: Record<string, any> = {
    "Healthcare": Stethoscope,
    "Finance & Banking": Banknote,
    "Media & Tech": LayoutTemplate,
    "Business": Briefcase,
    "IT & Software": Cpu,
    "Multimedia": Palette,
    "Personal Development": Lightbulb,
    "Credit Courses": GraduationCap,
    // Add more mappings as needed based on your category strings
    "Medical Coding": Stethoscope,
    "Medical Billing": FileText,
    "Clinical Research": FlaskConical,
    "Debt Recovery": Handshake,
    "Credit Professional": BadgePercent,
    "3D Animation": Box,
};

export const getIconForCategory = (category: string) => {
    return iconMapping[category] || BookOpen; // Default icon
};
