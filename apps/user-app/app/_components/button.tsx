"use client";

import { ReactNode } from "react";
import { Button } from "@repo/ui/components/ui/button";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const ButtonComp = ({ onClick, children }: ButtonProps) => {
  return (
    <Button onClick={onClick} type="button">
      {children}
    </Button>

  );
};
