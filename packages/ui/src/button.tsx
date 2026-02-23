"use client";

import React, { ReactNode } from "react";
import { cn } from "./cn.js";
type ButtonVariants = "primary" | "secondary";

interface ButtonProps {
  children: ReactNode;
  variant: ButtonVariants;
  className?: string;
  onClick?: () => void;
}

const variants = {
  primary:
    "w-full max-w-sm text-background bg-foreground py-1 px-2 cursor-pointer rounded text-xl",
  secondary:
    "w-full max-w-sm text-foreground bg-background py-1 px-2 cursor-pointer rounded text-xl border border-foreground",
};

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={cn(props.className, variants[props.variant])}
      {...props.onClick}
      {...Object.fromEntries(
        Object.entries(props).filter(([key]) => key !== "className"),
      )}
    >
      {props.children}
    </button>
  );
};
