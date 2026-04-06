
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Leaf, ChevronsUpDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { courses } from "@/lib/courses";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const inquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  education: z.string().optional(),
  course: z.array(z.string()).refine(value => value.length > 0, { message: "Please select at least one course." }),
  message: z.string().optional().or(z.literal("")),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export function EnrollmentForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [dbCourses, setDbCourses] = React.useState<{ id: string; title: string }[]>([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v2/course/get-courses?limit=100`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.courses) {
            setDbCourses(data.courses.map((c: any) => ({ id: c._id || c.id, title: c.title })));
          }
        }
      } catch (error) {
        console.error("Failed to fetch courses for EnrollmentForm", error);
      }
    };
    fetchCourses();
  }, []);
  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      education: "",
      course: [],
      message: "",
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          education: data.education,
          courses: data.course,
          message: data.message,
        }),
      });

      if (res.ok) {
        toast({
          title: "Request Submitted",
          description: "We have received your request and will call you back shortly.",
        });
        form.reset();

        // Optional: Still open WhatsApp if needed, or remove this block if purely backend is desired.
        // For now, we'll focus on the DB success as the primary feedback.
      } else {
        const errorData = await res.json();
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: errorData.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to the server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="py-20 md:py-28 bg-white border-t border-gray-100">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <div className="md:pr-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#13523f]">TAKE THE NEXT STEP</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold font-serif text-[#111827] leading-tight">
              Align Your Career with NEP 2020
            </h2>
            <p className="mt-6 text-base text-gray-500 leading-relaxed">
              Submit your details to receive the official course prospectus and speak with a counselor about securing your NEP-aligned credits.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-10 shadow-sm">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#111827]">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Full Name" {...field} autoComplete="name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#111827]">Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your 10-digit Phone Number" {...field} autoComplete="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#111827]">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your Email Address" {...field} autoComplete="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#111827]">Education Background</FormLabel>
                        <FormControl>
                          <Input placeholder="Highest Qualification" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-sm font-semibold text-[#111827]">Course of Interest</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full h-auto min-h-14 justify-between text-body text-left font-normal",
                                  !field.value?.length && "text-muted-foreground"
                                )}
                              >
                                <div className="flex gap-1 flex-wrap">
                                  {field.value?.length > 0 ? (
                                    field.value.map(courseTitle => (
                                      <Badge key={courseTitle} variant="secondary" className="mr-1 mb-1">
                                        {courseTitle}
                                      </Badge>
                                    ))
                                  ) : (
                                    "Choose course of interest"
                                  )}
                                </div>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                              <CommandInput placeholder="Search courses..." />
                              <CommandEmpty>No course found.</CommandEmpty>
                              <CommandList>
                                <CommandGroup>
                                  {dbCourses.map((course) => (
                                    <CommandItem
                                      value={course.title}
                                      key={course.id}
                                      onSelect={() => {
                                        const selectedCourses = field.value || [];
                                        const isSelected = selectedCourses.includes(course.title);
                                        const newSelection = isSelected
                                          ? selectedCourses.filter((c) => c !== course.title)
                                          : [...selectedCourses, course.title];
                                        field.onChange(newSelection);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value?.includes(course.title)
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {course.title}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#111827]">Your Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us anything else you'd like to know..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-[#13523f] hover:bg-[#0f3f30] text-white font-semibold py-3 rounded-lg text-base" disabled={isSubmitting}>
                      {isSubmitting && <Leaf className="mr-2 h-4 w-4 animate-pulse" />}
                      {isSubmitting ? "Submitting..." : "Request a Callback"}
                    </Button>
                    <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                      <Lock className="h-3 w-3" />
                      Your information is kept confidential and secure.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
