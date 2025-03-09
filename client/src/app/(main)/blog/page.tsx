"use client";

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
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      imageUrl: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof blogSchema>) => {
    console.log("Blog Data:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <RoughNotation
        type="highlight"
        animate
        show
        color="#009689"
        animationDuration={1000}
      >
        <span className="text-2xl text-white font-bold">Write your blog</span>
      </RoughNotation>{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <BlogEditor onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Save Blog</Button>
        </form>
      </Form>
    </div>
  );
};

export default Blog;
