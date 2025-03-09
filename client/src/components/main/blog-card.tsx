import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

const BlogCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <AspectRatio ratio={16 / 9} className="rounded-[3px]">
            <Image
              src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
              alt="Image"
              className="rounded-md object-cover"
              fill
            />
          </AspectRatio>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <div className="rounded-full p-1.5 font-semibold bg-secondary">
            VA
          </div>
          <p className="text-sm text-neutral-600">Vasanth</p>
        </div>
        <p className="text-sm text-neutral-600">4 day ago</p>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
