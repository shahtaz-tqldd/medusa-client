"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

// components
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";
import { Title, Text } from "@/components/ui/typography";

// lib
import { colors } from "@/lib/colors";
import { BlogBasicProps } from "@/lib/api-service/blog";

// data, types and icons

interface BlogCardProps {
  data: BlogBasicProps;
  index: number;
}

const BlogCard = ({ data, index }: BlogCardProps) => {
  const { title, slug, featured_image, published_at, category } = data;

  return (
    <Link href={`/blogs/${slug}`}>
      <AnimateDiv>
        <Image
          src={featured_image}
          height={500}
          width={700}
          className="w-full h-60 md:h-72 object-cover rounded-3xl"
          alt={title}
        />
        <div className="space-y-2 mt-4">
          <Text variant="xs">
            Posted on {moment(published_at).format("DD MMM YYYY")}
          </Text>
          <Title variant="sm">{title}</Title>
        </div>
        <div className="w-fit mt-4">
          <TechBadge color={colors[index % 3]}>{category?.name}</TechBadge>
        </div>
      </AnimateDiv>
    </Link>
  );
};

export default BlogCard;
