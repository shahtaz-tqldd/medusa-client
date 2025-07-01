"use client";
import PrimaryCard from "@/components/cards/primary-card";
import TitleText from "@/components/text/title-text";
import { OverviewStats } from "@/lib/overview-service";
import { Users, MessagesSquare, FileText, PenLine } from "lucide-react";

interface OverviewStatsProps {
  stats: OverviewStats;
}

export default function MetricsCards({ stats }: OverviewStatsProps) {
  const metrics = [
    {
      title: "Visitors",
      icon: Users,
      stats: [
        { label: "Total", value: stats?.visitors?.total || 0 },
        { label: "This Month", value: stats?.visitors?.this_month },
      ],
    },
    {
      title: "Conversation",
      icon: MessagesSquare,
      stats: [
        { label: "Total", value: stats?.conversations?.total || 0 },
        {
          label: "Meetings Scheduled",
          value: stats?.conversations?.meetings_scheduled || 0,
        },
      ],
    },
    {
      title: "Proposals",
      icon: FileText,
      stats: [
        { label: "Total", value: stats?.proposals?.total || 0 },
        {
          label: "Onboarded Clients",
          value: stats?.proposals?.onboarded_clients || 0,
        },
      ],
    },
    {
      title: "Blogs",
      icon: PenLine,
      stats: [
        { label: "Total", value: stats?.blogs?.total || 0 },
        { label: "Reads", value: stats?.blogs.total_reads || 0 },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric, index) => (
        <PrimaryCard key={index} className="pb-4">
          <TitleText icon={metric.icon}>{metric.title}</TitleText>
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
