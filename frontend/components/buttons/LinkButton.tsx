"use client";

import { ReactNode } from "react";

export const LinkButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="py-2 px-2 text-sm font-light rounded cursor-pointer hover:bg-slate-100"
    >
      {children}
    </div>
  );
};
