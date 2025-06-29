export interface BlogContentBlock {
  type: string;
  value: string | string[];
}

export interface BlogData {
  img: string;
  title: string;
  body: string;
  published: string;
  topic: string;
  content: BlogContentBlock[];
  read_mins: number;
}

export interface BlogCardProps {
  data: BlogData;
  index: number;
}
