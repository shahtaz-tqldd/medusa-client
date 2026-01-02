import {
  CodeChefIcon,
  CodeForcesIcon,
  JavaScriptIcon,
  PythonIcon,
} from "@/assets/icons/tech-stacks";

export const ACHIEVEMENTS = [
  {
    type: "Certificate",
    title: "Python Basic from University of Michigan",
    subtitle: "Coursera",
    icon: <PythonIcon className="h-12 w-12" />,
    accentColor: "text-blue-600",
    link: "https://drive.google.com/file/d/1lTW7X4aa8AByjnUdIwGHcpsRcIZMbVP3/view",
  },
  {
    type: "Certificate",
    title: "JavaScript Algorithms and Data Structures",
    subtitle: "freeCodeCamp",
    icon: <JavaScriptIcon className="h-12 w-12" />,
    accentColor: "text-yellow-600",
    link: "https://www.freecodecamp.org/certification/shahtaz/javascript-algorithms-and-data-structures",
  },
  {
    type: "Competitive Programming",
    title: "CodeChef",
    rating: "1409",
    subtitle: "2★ Rating",
    icon: <CodeChefIcon className="h-12 w-12" />,
    accentColor: "text-orange-600",
    link: "https://www.codechef.com/users/shahtaz",
  },
  {
    type: "Competitive Programming",
    title: "Codeforces",
    rating: "785",
    icon: <CodeForcesIcon className="h-12 w-12" />,
    subtitle: "1★ Rating",
    accentColor: "text-green-600",
    link: "https://codeforces.com/profile/shahtaz1",
  },
];
