import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return <input className={`input-base ${className}`} ref={ref} {...props} />;
  },
);

Input.displayName = "Input";

export default Input;
