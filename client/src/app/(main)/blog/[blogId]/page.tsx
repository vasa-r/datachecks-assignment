// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import BlogEditor from "@/components/main/blog-text-editor";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { RoughNotation } from "react-rough-notation";
// import { toast } from "react-hot-toast";
// import { createBlog } from "@/api/blog";
// import { useRouter } from "next/navigation";

// const blogSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters"),
//   subtitle: z.string().min(16, "Sub title must be at least 15 characters"),
//   imageUrl: z
//     .string()
//     .url("Invalid URL format")
//     .regex(
//       /\.(jpg|jpeg|png|gif|webp)$/,
//       "URL must be a valid image (jpg, png, gif, webp)"
//     ),
//   content: z.string().min(10, "Blog content must be at least 10 characters"),
// });

// const Blog = () => {
//   const form = useForm({
//     resolver: zodResolver(blogSchema),
//     defaultValues: {
//       title: "",
//       subtitle: "",
//       imageUrl: "",
//       content: "",
//     },
//   });

//   const router = useRouter();

//   const onSubmit = async (data: z.infer<typeof blogSchema>) => {
//     const response = await createBlog(
//       data.title,
//       data.subtitle,
//       data.imageUrl,
//       data.content
//     );
//     if (response.success) {
//       toast.success("Blog published successfully!");
//       router.push("/user-blogs");
//     } else {
//       toast.error(response.data);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-4">
//       <RoughNotation
//         type="highlight"
//         animate
//         show
//         color="#009689"
//         animationDuration={1000}
//       >
//         <span className="text-2xl text-white font-bold">Write your blog</span>
//       </RoughNotation>{" "}
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-4"
//           onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
//         >
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter blog title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="subtitle"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Subtitle</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter blog subtitle" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="imageUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Image URL</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter image URL" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Blog Content</FormLabel>
//                 <FormControl>
//                   <BlogEditor onChange={field.onChange} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" disabled={form.formState.isSubmitting}>
//             {form.formState.isSubmitting ? "Publishing..." : "Publish"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default Blog;

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import BlogEditor from "@/components/main/blog-text-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RoughNotation } from "react-rough-notation";
import { toast } from "react-hot-toast";
import { createBlog, updateBlogById, getBlogById } from "@/api/blog";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  subtitle: z.string().min(16, "Sub title must be at least 15 characters"),
  imageUrl: z
    .string()
    .url("Invalid URL format")
    .regex(
      /\.(jpg|jpeg|png|gif|webp)$/,
      "URL must be a valid image (jpg, png, gif, webp)"
    ),
  content: z.string().min(10, "Blog content must be at least 10 characters"),
});

const Blog = () => {
  const { blogId } = useParams(); // Get blogId from URL
  const router = useRouter();
  const [loading, setLoading] = useState(!!blogId); // Show loading if editing
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      imageUrl: "",
      content: "",
    },
  });

  // Fetch blog data for editing
  useEffect(() => {
    if (!blogId) return; // Only fetch if editing

    const fetchBlog = async () => {
      const response = await getBlogById(blogId as string);
      if (response.success) {
        form.reset(response.data); // Prefill form with blog data
      } else {
        toast.error("Failed to load blog.");
      }
      setLoading(false);
    };

    fetchBlog();
  }, [blogId, form]);

  const onSubmit = async (data: z.infer<typeof blogSchema>) => {
    let response;
    if (blogId) {
      // Editing existing blog
      response = await updateBlogById(blogId as string, data); // PATCH request
    } else {
      // Creating new blog
      response = await createBlog(
        data.title,
        data.subtitle,
        data.imageUrl,
        data.content
      );
    }

    if (response.success) {
      toast.success(`Blog ${blogId ? "updated" : "published"} successfully!`);
      router.push("/user-blogs");
    } else {
      toast.error(response.data);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  return (
    <>
      <Link href={"/articles"}>
        <Button variant="outline">
          <ArrowLeft size={24} />
        </Button>
      </Link>
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <RoughNotation
          type="highlight"
          animate
          show
          color="#009689"
          animationDuration={1000}
        >
          <span className="text-2xl text-white font-bold">
            {blogId ? "Edit your blog" : "Write your blog"}
          </span>
        </RoughNotation>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Content</FormLabel>
                  <FormControl>
                    <BlogEditor onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? blogId
                  ? "Updating..."
                  : "Publishing..."
                : blogId
                ? "Update"
                : "Publish"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Blog;
