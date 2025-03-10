"use client";

import BlogCard from "@/components/main/blog-card";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Input } from "@/components/ui/input";
import { NotebookPen, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllBlogs } from "@/api/blog";
import { toast } from "react-hot-toast";
import PageLoader from "@/components/page-loader";
import { Blog } from "@/types/types";

const Articles = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const response = await getAllBlogs();
      if (response.success) {
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } else {
        toast.error("Failed to fetch blogs");
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-col gap-4 mt-5 md:mt-10 relative">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Discover. Write. Inspire.
          </h1>
          <p className="text-lg font-medium text-neutral-500">
            Blogi is where ideas come to life—read, write, and connect.
          </p>
        </div>
        <div className="border border-border rounded-[3px] flex items-center gap-2 py-1 px-1.5">
          <Search />
          <Input
            placeholder="Search for blogs..."
            className="border-none flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <PageLoader />
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filteredBlogs.map((blog) => (
              <Link href={`/blog/article/${blog.id}`} key={blog.id}>
                <BlogCard blog={blog} />
              </Link>
            ))}
          </div>
        )}

        <Link href={"/blog"}>
          <div className="fixed bottom-4 right-2.5 md:right-[calc((100vw-65vw)/2)] rounded-full bg-teal-600 p-4 text-white shadow-lg cursor-pointer">
            <TooltipWrapper content="Create your blog post" side="top">
              <NotebookPen />
            </TooltipWrapper>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Articles;
