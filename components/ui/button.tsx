import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive tr [&_svg]:-translate-x-1 [&_svg]:-mr-1",
  {
    variants: {
      variant: {
        default:
          "bg-gray-800 dark:bg-slate-100 text-slate-200 dark:text-gray-800",
        secondary:
          "bg-emerald-500/10 dark:bg-lime-500/10 hover:dark:bg-lime-500/20 hover:bg-emerald-500/20 text-emerald-700 dark:text-lime-400",
        ghost: "hover:dark:bg-white/10 hover:bg-blue-500/10",
        destroy: "bg-red-600 text-white",
        outline:
          "border border-blue-500 dark:border-blue-500/60 ring-transparent hover:ring-blue-500/20 ring-[3px] bg-blue-500/10 tr",
      },
      size: {
        xl: "py-3 px-6",
        lg: "px-5 py-2.5",
        default: "px-4 py-2",
        sm: "py-1.5 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
