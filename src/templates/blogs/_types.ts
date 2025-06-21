export interface BlogData{
  img: string;
  title: string;
  body: string;
  published: string;
  topic: string;
};

export interface BlogCardProps{
  data: BlogData;
  index: number;
};
