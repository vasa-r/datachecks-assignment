"use client";

import { deleteBlogById } from "@/api/blog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteDialog {
  triggerLabel: React.ReactNode | string;
  description?: string;
  tableId: string;
}

export function DeleteDialog({
  triggerLabel,
  description,
  tableId,
}: DeleteDialog) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteBlog = useMutation({
    mutationFn: async (tableId: string) => deleteBlogById(tableId),
    onSuccess: async () => {
      toast.success("Blog deleted successfully!");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["all_blogs"] }),
        queryClient.invalidateQueries({ queryKey: ["user_blogs"] }),
      ]);
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete blog. Try again.");
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{triggerLabel}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            blog.
            {description}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <Button variant="destructive" onClick={() => onDelete} text="dialog">
            Delete
          </Button> */}
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              deleteBlog.mutate(tableId);
            }}
            disabled={deleteBlog.isPending}
          >
            {deleteBlog.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
