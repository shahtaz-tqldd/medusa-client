"use client";
import { card } from "@/lib/styles";
import { Users, MessagesSquare, FileText, PenLine } from "lucide-react";
import Image from "next/image";

const metrics = [
  {
    title: "Visitors",
    icon: Users,
    stats: [
      { label: "Total", value: "12,340" },
      { label: "This Month", value: "1,230" },
    ],
    image:"/elipse_4.svg",
  },
  {
    title: "Messages",
    icon: MessagesSquare,
    stats: [
      { label: "Total", value: "354" },
      { label: "Meetings Scheduled", value: "45" },
    ],
    image:"/elipse_3.svg",
  },
  {
    title: "Proposals",
    icon: FileText,
    stats: [
      { label: "Total", value: "87" },
      { label: "Onboarded Clients", value: "12" },
    ],
    image:"/elipse_2.svg",
  },
  {
    title: "Blogs",
    icon: PenLine,
    stats: [
      { label: "Total", value: "16" },
      { label: "Reads", value: "4,500" },
    ],
    image:"/elipse_1.svg",
  },
];

export default function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric, index) => (
        <div key={index} className={`${card} pb-3 relative overflow-hidden`}>
          <Image
            src={metric.image}
            height={280}
            width={280}
            alt="bg"
            className="absolute -top-16 -left-16 dark:opacity-30 opacity-20"
          />
          
          <div className="flex items-center gap-3">
            <metric.icon size={18} color="#81E7AF" />
            <h3 className="text-zinc-900 dark:text-zinc-50">{metric.title}</h3>
          </div>
          <div className="space-y-2 mt-6">
            <h2 className="text-3xl">{metric.stats[0].value}</h2>
            <hr className="border-t border-dashed border-t-white/20 mt-6" />
            <div className="flex justify-between items-center text-xs mt-3 px-1">
              <span className="text-zinc-500 dark:text-zinc-400">
                {metric.stats[1].label}
              </span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">
                {metric.stats[1].value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
