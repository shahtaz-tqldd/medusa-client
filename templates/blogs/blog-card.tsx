"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// components

import { Title, Text } from "@/components/ui/typography";

// lib
import { slugify } from "@/lib/slugify";
import { colors } from "@/lib/colors";

// data, types and icons

import { BlogCardProps } from "./_types";

const BlogCard: React.FC<BlogCardProps> = ({ data, index }) => {
  const { img, title, body, published, tags } = data;
  const blogLink = `/blogs/${slugify(title)}`;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="h-full"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <Image
          src={img}
          height={500}
          width={700}
          className="w-full h-72 object-cover rounded-3xl"
          alt={slugify(title)}
        />
      </motion.div>

      <Link href={blogLink} className="block pt-4 px-1">
        <Text variant="xs">Posted on {published}</Text>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
        >
          <Title variant="sm" className="mt-1">
            {title}
          </Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
        >
          <Text variant="sm" className="line-clamp-2 mt-2">
            {body}
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
          className="flex flex-wrap gap-1 mt-4"
        >
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
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
