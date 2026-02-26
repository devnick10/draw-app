import { TablerIcon } from "@tabler/icons-react";
import React from "react";

interface IconButtonProps {
  onClick: () => void;
  Icon: TablerIcon;
  isActive: boolean;
  size?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  Icon,
  isActive,
  size = 22,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-xl transition-all duration-200
        ${
          isActive
            ? "bg-black text-white shadow-md"
            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
        }
      `}
    >
      <Icon size={size} />
    </button>
  );
};
