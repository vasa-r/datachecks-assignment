"use client";

import React, { ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import TooltipWrapper from "../tooltip-wrapper";

interface BlogActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const blogCardWithActions = (BlogCard: ComponentType) => {
  const WrappedComponent = ({ onEdit, onDelete }: BlogActionsProps) => {
    return (
      <div className="relative">
        <BlogCard />

        <div className="absolute top-2 right-2 flex gap-2">
          <TooltipWrapper content="Edit your blog" side="left">
            <Button
              size="sm"
              variant="outline"
              onClick={onEdit}
              className="center bg-transparent text-blue-800 border-none cursor-pointer"
            >
              <Pencil className="size-4" />
            </Button>
          </TooltipWrapper>

          <TooltipWrapper content="Delete your blog">
            <Button
              size="sm"
              variant="outline"
              onClick={onDelete}
              className="center bg-transparent text-red-500 border-none hover:text-red-500 cursor-pointer"
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
    );
  };

  WrappedComponent.displayName = `WithActions(${
    BlogCard.displayName || "BlogCard"
  })`;

  return WrappedComponent;
};

export default blogCardWithActions;
