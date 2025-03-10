"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogById } from "@/api/blog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { Blog } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const validImageUrl = blog?.image_url?.startsWith("http")
    ? blog.image_url
    : "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg";

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      const response = await getBlogById(blogId as string);
      if (response.success) {
        setBlog(response.data);
      } else {
        toast.error("Failed to load blog.");
      }
      setLoading(false);
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (!blog) {
    return <p className="center text-gray-500">Blog not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 gap-1.5">
      <Link href={"/articles"}>
        <Button variant="outline">
          <ArrowLeft size={24} />
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{blog.title}</CardTitle>
          <p className="text-gray-500">{blog.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full h-96">
            <Image
              src={validImageUrl}
              alt={blog.title}
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
          <Separator />
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPage;
