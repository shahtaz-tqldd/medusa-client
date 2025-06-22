"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Link2, Save, Text } from "lucide-react";
import { slugify } from "@/lib/slugify";
import Capsule from "@/components/status/capsule";

import { useRouter } from "next/navigation";
import BodyText from "@/components/text/body-text";
import { HeaderText } from "@/components/text/title-text";

import { BlogCardProps } from "./_types";
import EllipsisDropdown from "@/components/dropdowns/ellipsis-dropdown";

import { motion, useInView } from "framer-motion";
import { toast } from "sonner";

const BlogCard: React.FC<BlogCardProps> = ({ data, index }) => {
  const { img, title, body, published, topic } = data;
  const blogLink = `/blogs/${slugify(title)}`;

  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const handleReadBlog = () => router.push(blogLink);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${blogLink}`
      );
      toast("Blog Link Copied to Clipboard");
    } catch (err) {
      toast("Failed to copy link.");
    }
  };

  const handleSave = () => {
    const existing = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
    if (!existing.includes(blogLink)) {
      existing.push(blogLink);
      localStorage.setItem("savedBlogs", JSON.stringify(existing));
      toast("Article Link saved for Later");
    } else {
      toast("This article was already saved for you!");
    }
  };

  const menuData = [
    { icon: Text, title: "Read Full Article", handleClick: handleReadBlog },
    { icon: Link2, title: "Copy Article Link", handleClick: handleCopy },
    { icon: Save, title: "Save for Later", handleClick: handleSave },
  ];

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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
        >
          <Capsule
            size="sm"
            variant={
              topic.toLocaleLowerCase() === "docker"
                ? "success"
                : topic.toLocaleLowerCase() === "react js"
                ? "primary"
                : "warning"
            }
          >
            {topic}
          </Capsule>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
        >
          <HeaderText className="mt-2.5">{title}</HeaderText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
        >
          <BodyText className="line-clamp-2 mt-2">{body}</BodyText>
        </motion.div>
      </Link>

      <motion.div
        className="flbx mt-6 px-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.6, duration: 0.3 }}
      >
        <p className="dark:text-white/60 text-slate-600 text-sm">
          Published on {published}
        </p>
        <EllipsisDropdown items={menuData} />
      </motion.div>
    </motion.div>
  );
};

export default BlogCard;
