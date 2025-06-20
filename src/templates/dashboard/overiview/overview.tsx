"use client";
import PrimaryCard from "@/components/cards/primary-card";
import { Users, MessagesSquare, FileText, PenLine } from "lucide-react";

const metrics = [
  {
    title: "Visitors",
    icon: Users,
    stats: [
      { label: "Total", value: "12,340" },
      { label: "This Month", value: "1,230" },
    ],
  },
  {
    title: "Messages",
    icon: MessagesSquare,
    stats: [
      { label: "Total", value: "354" },
      { label: "Meetings Scheduled", value: "45" },
    ],
  },
  {
    title: "Proposals",
    icon: FileText,
    stats: [
      { label: "Total", value: "87" },
      { label: "Onboarded Clients", value: "12" },
    ],
  },
  {
    title: "Blogs",
    icon: PenLine,
    stats: [
      { label: "Total", value: "16" },
      { label: "Reads", value: "4,500" },
    ],
  },
];

export default function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric, index) => (
        <PrimaryCard key={index} className="pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/10 dark:bg-white/5 p-2 rounded-xl">
              <metric.icon
                className="h-5 w-5 text-blue-500"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-lg font-medium dark:text-gray-200 text-slate-800">
              {metric.title}
            </h2>
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
        </PrimaryCard>
      ))}
    </div>
  );
}
