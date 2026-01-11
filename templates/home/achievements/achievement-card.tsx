import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Text, Title } from "@/components/ui/typography";
import AnimateDiv from "@/components/animation/animate-div";
import { Button } from "@/components/ui/button";
import { AchievementProps } from "@/lib/api-service/achievement";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, PenLine, Trash2 } from "lucide-react";

interface AchievementCardProps {
  achievement: AchievementProps;
  index: number;
  is_admin?: boolean;
  handleDelete?: () => void;
  handleEdit?: () => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  index,
  is_admin = false,
  handleDelete = () => {},
  handleEdit = () => {},
}) => {
  const color = [
    { bg: "bg-blue-100/50", text: "text-blue-600" },
    { bg: "bg-green-100/50", text: "text-green-600" },
    { bg: "bg-purple-100/50", text: "text-purple-600" },
    { bg: "bg-yellow-100/50", text: "text-yellow-600" },
  ];
  return (
    <Card>
      <AnimateDiv>
        <div>
          <div className="flex justify-between">
            <Image
              src={achievement.icon_image}
              height={100}
              width={100}
              className="h-12 w-12"
              alt={achievement.title}
            />

            {is_admin && (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full h-fit">
                  <Ellipsis className="h-9 w-9 p-2.5 rounded-full dark:hover:bg-white/10 hover:bg-gray-200 tr" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleEdit}>
                    <PenLine className="mr-0.5 !h-3.5 !w-3.5 opacity-60" />
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash2 className="mr-0.5 !h-3.5 !w-3.5 opacity-60" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p
            className={`text-sm mt-4 font-medium ${color[index].text} uppercase tracking-wide`}
          >
            {achievement.type}
          </p>
        </div>

        <Title variant="xs" className="mt-3">
          {achievement.title}
        </Title>

        <div className="mt-3 flex justify-between items-end">
          <div>
            {achievement.score && (
              <h2 className={`text-2xl font-bold ${color[index].text} mt-2`}>
                {achievement.score}
              </h2>
            )}
            {achievement.subtitle && (
              <Text variant="xs">{achievement.subtitle}</Text>
            )}
          </div>

          <Link href={achievement.credential_url || ""} target="__blank">
            <Button variant="secondary" size="sm">
              View
            </Button>
          </Link>
        </div>
      </AnimateDiv>
    </Card>
  );
};

export default AchievementCard;
