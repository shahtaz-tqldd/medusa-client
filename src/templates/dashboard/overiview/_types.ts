export interface Visitor {
  country: string;
  icon: string;
  region: string;
  device: string;
  visited: string; // or Date if you're storing actual timestamps
  visitCount: number;
}