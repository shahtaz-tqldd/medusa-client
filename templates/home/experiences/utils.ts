
const company_color = {
  echo: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
  },
  ayykori: {
    bg: "bg-emerald-500/10",
    text: "dark:text-emerald-400 text-emerald-700",
  },
};

export const getCompanyColor = (companyName: string) => {
  const name = companyName.toLowerCase();

  for (const key in company_color) {
    if (name.includes(key)) {
      return company_color[key as keyof typeof company_color];
    }
  }

  return {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
  };
};