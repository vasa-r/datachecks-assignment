"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/main/blog-card";
import blogCardWithActions from "@/components/main/blog-card-with-actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Blog } from "@/types/types";
import { getUserBlogs } from "@/api/blog";
import PageLoader from "@/components/page-loader";

const BlogCardWithAction = blogCardWithActions(BlogCard);

const UserBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await getUserBlogs();
      if (response.success) {
        setBlogs(response.data);
      } else {
        console.error("Error fetching blogs:", response.data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit blog:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete blog:", id);
  };

  return (
    <div className="flex flex-col gap-3">
      <Link href={"/articles"}>
        <Button variant="outline">
          <ArrowLeft size={24} />
        </Button>
      </Link>

      {loading ? (
        <PageLoader />
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <BlogCardWithAction
              key={blog.id}
              blog={blog}
              onEdit={() => handleEdit(blog.id)}
              onDelete={() => handleDelete(blog.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
