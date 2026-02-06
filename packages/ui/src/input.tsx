import React from "react";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <div>
      <input ref={ref} {...props} />
    </div>
  );
});

Input.displayName = "Input";
