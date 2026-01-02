"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// components
import AnimateDiv from "@/components/animation/animate-div";
import { Title, Text } from "@/components/ui/typography";

// lib
import { slugify } from "@/lib/slugify";
import { colors } from "@/lib/colors";

// data, types and icons

import { BlogCardProps } from "./_types";

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  const { img, title, body, published, tags } = data;
  const blogLink = `/blogs/${slugify(title)}`;

  return (
    <Link href={blogLink}>
      <AnimateDiv>
        <Image
          src={img}
          height={500}
          width={700}
          className="w-full h-72 object-cover rounded-3xl"
          alt={slugify(title)}
        />
        <div className="space-y-2 mt-4">
          <Text variant="xs">Posted on {published}</Text>
          <Title variant="sm">{title}</Title>
        </div>
        <div className="space-y-4 mt-2">
          <Text variant="sm" className="line-clamp-2">
            {body}
          </Text>

          <div className="flex flex-wrap gap-1">
            {tags?.map((item, i) => (
              <p
                key={i}
                className={`${
                  colors[i % colors.length]
                } py-1.5 px-3 rounded-full text-xs w-fit`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </AnimateDiv>
    </Link>
  );
};

export default BlogCard;
