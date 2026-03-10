import React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className="w-full bg-black border border-white text-white px-3 py-2 text-sm font-mono focus:outline-none placeholder:text-white/50"
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export default Input;
