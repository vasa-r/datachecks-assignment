"use client";

import BlogCard from "@/components/main/blog-card";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, NotebookPen, Search } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { getAllBlogs } from "@/api/blog";
import PageLoader from "@/components/page-loader";
import { Blog, BlogsResponse } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

const Articles = () => {
  const [curPage, setCurPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<BlogsResponse>({
    queryKey: ["all_blogs", curPage],
    queryFn: async () => {
      const cachedData = queryClient.getQueryData<BlogsResponse>([
        "all_blogs",
        curPage,
      ]);
      if (cachedData) return cachedData;

      const response = await getAllBlogs((curPage - 1) * PAGE_SIZE, PAGE_SIZE);

      queryClient.setQueryData(["all_blogs", curPage], response);
      return response;
    },
    placeholderData: (prevData) => prevData,
    staleTime: 1000 * 60 * 5,
  });

  const blogs = useMemo(() => data?.data.blogs || [], [data]);

  const totalPages = useMemo(
    () => Math.ceil((data?.data.meta?.total_blogs ?? 1) / PAGE_SIZE),
    [data]
  );

  // searching blogs (fetched)
  const filteredBlogs: Blog[] = useMemo(() => {
    return blogs.filter((blog: Blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
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

        {isLoading ? (
          <PageLoader />
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filteredBlogs?.map((blog) => (
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
      <div className="flex items-center justify-center gap-2.5">
        <Button
          onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
          disabled={curPage === 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => setCurPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={curPage === totalPages}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Articles;
