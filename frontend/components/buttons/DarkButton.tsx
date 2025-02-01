import { ReactNode } from "react";

export const DarkButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center px-8 py-2 cursor-pointer text-center hover:shadow-md text-white rounded bg-purple-700`}
    >
      {children}
    </div>
  );
};
