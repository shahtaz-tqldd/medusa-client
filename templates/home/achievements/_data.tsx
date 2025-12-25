import {
  CodeChefIcon,
  CodeForcesIcon,
  JavaScriptIcon,
  PythonIcon,
} from "@/assets/icons/tech-stacks";

export const ACHIEVEMENTS = [
  {
    type: "Certificate",
    title: "Python Programming",
    issuer: "Coursera",
    icon: <PythonIcon className="h-12 w-12" />,
    accentColor: "text-blue-600",
  },
  {
    type: "Certificate",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    icon: <JavaScriptIcon className="h-12 w-12" />,
    accentColor: "text-yellow-600",
  },
  {
    type: "Competitive Programming",
    title: "CodeChef",
    rating: "1409",
    subtitle: "2★ Rating",
    icon: <CodeChefIcon className="h-12 w-12" />,
    accentColor: "text-orange-600",
  },
  {
    type: "Competitive Programming",
    title: "Codeforces",
    rating: "789",
    icon: <CodeForcesIcon className="h-12 w-12" />,
    subtitle: "1★ Rating",
    accentColor: "text-green-600",
  },
];
