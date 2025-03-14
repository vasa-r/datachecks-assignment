"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/main/blog-card";
import blogCardWithActions from "@/components/main/blog-card-with-actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { BlogsResponse } from "@/types/types";
import { getUserBlogs } from "@/api/blog";
import PageLoader from "@/components/page-loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const BlogCardWithAction = blogCardWithActions(BlogCard);

const PAGE_SIZE = 10;

const UserBlogs = () => {
  const [curPage, setCurPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<BlogsResponse>({
    queryKey: ["user_blogs", curPage],
    queryFn: async () => {
      const cachedData = queryClient.getQueryData<BlogsResponse>([
        "user_blogs",
        curPage,
      ]);
      if (cachedData) return cachedData;

      const response = await getUserBlogs((curPage - 1) * PAGE_SIZE, PAGE_SIZE);

      queryClient.setQueryData(["user_blogs", curPage], response);

      return response;
    },
    placeholderData: (oldData) => oldData,
    staleTime: 1000 * 60 * 5,
  });

  const userBlogs = useMemo(() => data?.data.blogs, [data]);

  const totalPages = useMemo(
    () => Math.ceil((data?.data.meta?.total_blogs ?? 1) / PAGE_SIZE),
    [data]
  );

  return (
    <div className="flex flex-col gap-3">
      <Link href={"/articles"} className="w-fit">
        <Button variant="outline" className="cursor-pointer">
          <ArrowLeft size={24} />
        </Button>
      </Link>

      {isLoading ? (
        <PageLoader />
      ) : !data?.success ? (
        <p className="text-center text-gray-500">
          No blogs found. Please{" "}
          <Link
            href={"/blog"}
            className="text-foreground underline underline-offset-2"
          >
            create one
          </Link>{" "}
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userBlogs?.map((blog) => (
            <BlogCardWithAction key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {data?.success && (
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
      )}
    </div>
  );
};

export default UserBlogs;
