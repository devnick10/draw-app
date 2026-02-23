import { TablerIcon } from "@tabler/icons-react";
import React from "react";

interface IconButtonProps {
  onClick: () => void;
  Icon: TablerIcon;
  isActive: boolean;
  size?: number;
}
export const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <button onClick={props.onClick}>
      <props.Icon
        size={props.size || 40}
        className={`${props.isActive ? "text-red-300" : "text-white"}`}
      />
    </button>
  );
};
