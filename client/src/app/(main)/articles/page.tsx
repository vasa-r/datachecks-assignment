import BlogCard from "@/components/main/blog-card";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Input } from "@/components/ui/input";
import { NotebookPen, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const Articles = () => {
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
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <Link href={"/blog"}>
          <div className="fixed bottom-4 right-2.5 md:right-[calc((100vw-65vw)/2)] rounded-full bg-teal-600 p-4 text-white shadow-lg cursor-pointer">
            <TooltipWrapper content="Create you blog post" side="top">
              <NotebookPen />
            </TooltipWrapper>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Articles;
