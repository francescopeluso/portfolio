import React from "react"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className="w-full min-h-[120px] bg-black border border-white text-white px-3 py-2 text-sm font-mono focus:outline-none placeholder:text-white/50"
        ref={ref}
        {...props}
      />
    )
  }
)
TextArea.displayName = "Textarea"

export default TextArea
