import React from "react";
import { Text, Title } from "@/components/ui/typography";
import { Laptop, Monitor, Smartphone } from "lucide-react"; // Using lucide-react for icons
import { Visitor } from "@/lib/api-service/visitor";
import { country } from "@/lib/country";

const getCountryFlag = (country_name: string) => {
  return country.find((c) => c.name === country_name)?.flag || "🌍";
};

// Function to get device icon
const getDeviceIcon = (type: string) => {
  switch (type) {
    case "desktop":
      return <Monitor className="h-3 w-3" />;
    case "mobile":
      return <Smartphone className="h-3 w-3" />;
    case "tablet":
      return <Laptop className="h-3 w-3" />;
    default:
      return <Monitor className="h-3 w-3" />;
  }
};

// Function to format the last visit date to a relative time
const formatLastVisit = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString(); // Fallback to date string
};

// --- 4. The Component ---

const VisitorList = ({ visitors }: { visitors: Visitor[] }) => {
  return (
    <div className="rounded-2xl p-6 border dark:border-white/20 border-emerald-500 flex flex-col">
      <Title variant="xs" className="mb-6">
        Recent Visitors
      </Title>

      {/* This container will be scrollable if content overflows */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {visitors.map((visitor) => (
          <div
            key={visitor.id}
            className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="text-2xl flex-shrink-0 pt-1">
              {getCountryFlag(visitor.country)}
            </div>
            <div className="flex-1 min-w-0">
              <Title variant="xs" className="!text-lg">
                {visitor.city}, {visitor.country}
              </Title>
              <Text variant="xs" className="flx gap-2.5">
                {getDeviceIcon(visitor.device_type)}
                <span>{visitor.device_name}</span>
                <span>•</span>
                <span>{formatLastVisit(visitor.last_visit)}</span>
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorList;
