"use client";

import { Button } from "@/components/ui/button";
import { Text, Title } from "@/components/ui/typography";
import { OverviewStats } from "@/lib/api-service/overview";
import {
  MessagesSquare,
  FileText,
  PenLine,
  Clock1,
  Users2,
  Monitor,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

interface OverviewStatsProps {
  stats: OverviewStats;
}

const OverviewMetrics = ({ stats }: OverviewStatsProps) => {
  console.log(stats);
  const conversations = [
    {
      title: "Conversations",
      icon: MessagesSquare,
      subtitle: `Unread conversation ${stats?.conversations?.unread || 20}`,
      total: stats.conversations?.total || 0,
    },
    {
      title: "Meeting Scheduled",
      icon: Clock1,
      subtitle: `Upcoming meeting ${
        stats?.conversations?.upcoming_meetings || 3
      }`,
      total: stats?.conversations?.meetings_scheduled || 0,
    },
  ];

  // Blog and Proposal Status Data
  const contentStatus = [
    {
      label: "Blog Reads",
      icon: PenLine,
      total: stats?.blogs?.total_reads || 0,
      subtitle: `${stats?.blogs?.total || 0} total blogs`,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      label: "Proposals",
      icon: FileText,
      total: stats?.proposals?.total || 0,
      subtitle: `${stats?.proposals?.onboarded_clients || 0} clients onboarded`,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
    },
  ];

  // Browser Statistics
  const browserStats = {
    desktop: stats?.visitors.device_wise.desktop || 0,
    mobile: stats?.visitors.device_wise.mobile || 0,
    total:
      stats?.visitors?.device_wise?.desktop ||
      0 + stats?.visitors?.device_wise?.mobile ||
      0,
  };

  const desktopPercentage = Math.round(
    (browserStats.desktop / browserStats.total) * 100
  );
  const mobilePercentage = Math.round(
    (browserStats.mobile / browserStats.total) * 100
  );

  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-5 md:col-span-3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conversations.map((metric, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 pb-4 dark:bg-white/5 bg-white"
              >
                <div className="flx gap-3">
                  <div className="dark:bg-white/5 bg-blue-50 rounded-lg h-8 w-8 center">
                    <metric.icon size={16} className="text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <Title variant="xs" className="line-clamp-1">
                      {metric.title}
                    </Title>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <h2 className="text-3xl">{metric.total}</h2>
                  <Text variant="xs">{metric.subtitle}</Text>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-8 border border-blue-400">
            <div className="flx gap-3">
              <div className="dark:bg-white/5 bg-blue-50 rounded-lg h-10 w-10 center">
                <Users2 size={18} className="text-blue-500" />
              </div>
              <div>
                <Title variant="xs">Visitors</Title>
                <Text variant="xs">Visitors Landed on the Site</Text>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-12">
              <div>
                <Title variant="lg" className="!font-bold">
                  {stats?.visitors?.total || 302}
                </Title>
                <Text variant="sm">All time site visitor</Text>
              </div>
              <div>
                <Title variant="lg" className="!font-bold">
                  {stats?.visitors?.this_month || 20}
                </Title>
                <Text variant="sm">Visited this month</Text>
              </div>
            </div>

            <div className="flbx mt-14">
              <div className="flx">
                <div className="h-9 w-9 rounded-full bg-rose-300 -mr-2.5"></div>
                <div className="h-9 w-9 rounded-full bg-green-300 -mr-2.5"></div>
                <div className="h-9 w-9 rounded-full bg-blue-300 -mr-2.5"></div>
                <div className="h-9 w-9 rounded-full bg-orange-300"></div>
                <Text variant="xs" className="ml-3">
                  +20 more countries
                </Text>
              </div>

              <Link href="/admin/visitors">
                <Button variant="secondary">View All Visitors</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-5 md:col-span-2 space-y-4">
          {/* Blog & Proposal Status Card */}
          <div className="border border-white/20 bg-blue-200 p-6 rounded-2xl h-60">
            <Title variant="xs" className="mb-8 !text-gray-700 font-semibold">
              Content & Proposals
            </Title>

            <div className="space-y-6">
              {contentStatus.map((item, index) => (
                <div key={index}>
                  <div className="flx gap-3">
                    <div
                      className={`${item.bgColor} rounded-lg h-8 w-8 center`}
                    >
                      <item.icon size={16} className={item.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flbx">
                        <div>
                          <Text
                            variant="xs"
                            className="font-medium !text-gray-800"
                          >
                            {item.label}
                          </Text>
                          <Text
                            variant="xs"
                            className="text-gray-500 !text-gray-600"
                          >
                            {item.subtitle}
                          </Text>
                        </div>
                        <Title
                          variant="xs"
                          className="!font-bold !text-gray-700"
                        >
                          {item.total}
                        </Title>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Statistics Card */}
          <div className="dark:bg-white/5 bg-white p-6 rounded-2xl">
            <Title variant="xs" className="mb-6">
              Browser Statistics
            </Title>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flx gap-3">
                  <div className="dark:bg-white/5 bg-orange-50 rounded-lg h-10 w-10 center">
                    <Monitor size={18} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flbx mb-1">
                      <Text variant="xs" className="font-medium">
                        Desktop
                      </Text>
                      <Text variant="sm" className="font-bold">
                        {browserStats.desktop}
                      </Text>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${desktopPercentage}%` }}
                      ></div>
                    </div>
                    <Text
                      variant="xs"
                      className="text-gray-500 dark:text-gray-400 mt-1"
                    >
                      {desktopPercentage}% of total
                    </Text>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flx gap-3">
                  <div className="dark:bg-white/5 bg-emerald-50 rounded-lg h-10 w-10 center">
                    <Smartphone size={18} className="text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flbx mb-1">
                      <Text variant="xs" className="font-medium">
                        Mobile
                      </Text>
                      <Text variant="sm" className="font-bold">
                        {browserStats.mobile}
                      </Text>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${mobilePercentage}%` }}
                      ></div>
                    </div>
                    <Text
                      variant="xs"
                      className="text-gray-500 dark:text-gray-400 mt-1"
                    >
                      {mobilePercentage}% of total
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewMetrics;
