"use client";

import BlogCard from "@/components/main/blog-card";
import blogCardWithActions from "@/components/main/blog-card-with-actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BlogCardWithAction = blogCardWithActions(BlogCard);

const UserBlogs = () => {
  const handleEdit = () => {
    console.log("Edit");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <div className="flex flex-col gap-3">
      <Link href={"/articles"}>
        <Button variant={"outline"}>
          <ArrowLeft size={24} />
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
        <BlogCardWithAction onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default UserBlogs;
