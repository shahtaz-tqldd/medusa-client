"use client";

import { Button } from "@/components/ui/button";
import { Text, Title } from "@/components/ui/typography";
import { OverviewStats } from "@/lib/api-service/overview";
import {
  MessagesSquare,
  PenLine,
  Users2,
  Monitor,
  Smartphone,
  Layers,
  ChartNoAxesGantt,
} from "lucide-react";
import Link from "next/link";

interface OverviewStatsProps {
  stats: OverviewStats;
}

const OverviewMetrics = ({ stats }: OverviewStatsProps) => {
  const conversations = [
    {
      title: "Conversations",
      icon: MessagesSquare,
      subtitle: `${
        stats?.conversations?.meetings_scheduled || 0
      } meeting scheduled `,
      total: stats.conversations?.total || 0,
    },
    {
      title: "Proposal",
      icon: ChartNoAxesGantt,
      subtitle: `${stats?.proposals?.onboarded_clients || 0} onboarded clients`,
      total: stats?.projects?.total || 0,
    },
  ];

  // Blog and Proposal Status Data
  const contentStatus = [
    {
      label: "Blog Reads",
      icon: PenLine,
      total: stats?.blogs?.total_reads || 0,
      subtitle: `total ${stats?.blogs?.total || 0} blogs`,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Project Views",
      icon: Layers,
      total: stats?.projects?.total_views || 0,
      subtitle: `total ${stats?.projects?.total || 0} projects`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ];

  // Browser Statistics
  const browserStats = {
    desktop: stats?.visitors.device_wise.desktop || 0,
    mobile: stats?.visitors.device_wise.mobile || 0,
    total:
      (stats?.visitors?.device_wise?.desktop || 0) +
      (stats?.visitors?.device_wise?.mobile || 0),
  };

  const desktopPercentage = Math.round(
    (browserStats.desktop / browserStats.total) * 100
  );
  const mobilePercentage = Math.round(
    (browserStats.mobile / browserStats.total) * 100
  );

  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-5 md:col-span-3 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversations.map((metric, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 pb-4 dark:bg-white/5 bg-white"
            >
              <div className="flx gap-3">
                <div className="dark:bg-white/5 bg-emerald-500/10 rounded-lg h-8 w-8 center">
                  <metric.icon
                    size={16}
                    className="dark:text-lime-400 text-emerald-600"
                  />
                </div>
                <div className="flex-1">
                  <Title variant="xs" className="line-clamp-1">
                    {metric.title}
                  </Title>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <h2 className="text-3xl">{metric.total}</h2>
                <Text variant="xs" className="dark:!text-lime-400 !text-emerald-600">{metric.subtitle}</Text>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-8 border dark:border-lime-400 border-emerald-800">
          <div className="flx gap-3">
            <div className="dark:bg-white/5 bg-emerald-500/10 rounded-lg h-10 w-10 center">
              <Users2
                size={18}
                className="text-emerald-600 dark:text-lime-400"
              />
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
            <CountryVisitors countries={stats.visitors.country_wise} />

            <Link href="/admin/visitors">
              <Button variant="secondary">View All Visitors</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-5 md:col-span-2 space-y-4">
        {/* Blog & Proposal Status Card */}
        <ContentCard contentStatus={contentStatus} />

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
  );
};

export default OverviewMetrics;

interface ContentStatusItem {
  label: string;
  icon: React.ElementType;
  total: number;
  subtitle: string;
  color: string;
  bgColor: string;
}

const ContentCard = ({
  contentStatus,
}: {
  contentStatus: ContentStatusItem[];
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-lime-400 via-lime-300 to-emerald-400 p-6 rounded-2xl w-full">
      {/* Circular gradient overlays */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-lime-200 rounded-full blur-3xl opacity-60 -translate-y-12 translate-x-12"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-300 rounded-full blur-3xl opacity-50 translate-y-16 -translate-x-16"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-200 rounded-full blur-2xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Content */}
      <div className="relative z-10">
        <Title variant="xs" className="mb-5 font-semibold !text-gray-800">
          Projects & Content
        </Title>

        <div className="space-y-2.5">
          {contentStatus.map((item, index: number) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-white/30 border border-white/40 rounded-2xl p-3 hover:bg-white/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex gap-3 items-center">
                <div
                  className={`${item.bgColor} backdrop-blur-md rounded-xl h-11 w-11 flex items-center justify-center shadow-sm`}
                >
                  <item.icon
                    size={20}
                    className={item.color}
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-700">{item.subtitle}</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {item.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CountryStat {
  country: string;
  visitor_count: number;
}

interface Props {
  countries: CountryStat[];
}

const CountryVisitors = ({ countries }: Props) => {
  const maxVisible = 4;
  const visibleCountries = countries.slice(0, maxVisible);
  const remainingCount = countries.length - maxVisible;

  // Simple color palette
  const colors = [
    "bg-rose-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-orange-300",
  ];

  return (
    <div className="flx -space-x-2">
      {visibleCountries.map((country, index) => (
        <div
          key={country.country}
          className={`h-9 w-9 rounded-full flex items-center justify-center text-white font-semibold ${
            colors[index % colors.length]
          }`}
          title={country.country}
        >
          {country.country[0].toUpperCase()}
        </div>
      ))}
      {remainingCount > 0 && (
        <Text variant="xs" className="ml-3">
          +{remainingCount} more countries
        </Text>
      )}
    </div>
  );
};
