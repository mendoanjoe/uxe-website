import React from 'react';
import cn from 'classnames';

// Define the properties for the TextHuge component
interface TextHugeProps {
  cls?: string;             // Additional classes for styling
  label: string;            // Text content of the title
  hover?: boolean;           // Whether to apply hover styles
  decoration?: boolean;      // Whether to apply decoration styles
  el?: "p" | "a" | "button" | "blockquote"; // HTML element type
  href?: string;            // URL for 'a' element
  onClick?: () => void;     // Click event handler
  style?: any;
}

// TextHuge component definition
export const TextHuge = ({
  label,
  decoration = false,
  hover = false,
  el = "p",
  cls,
  ...props
}: TextHugeProps) => {
  // Dynamically determine the HTML element based on the 'el' prop
  const ElTag = `${el}` as keyof JSX.IntrinsicElements;

  // Render the TextHuge component
  return (
    <ElTag
      className={cn(`text-huge ${cls}`, {
        "text-huge--hover" : hover,
        "text-huge--decoration" : decoration,
      })}
      {...props}
    >
      {label}
    </ElTag>
  );
};

// Example usage:
// <TextHuge label="Hello World" decoration hover el="h1" cls="custom-class" />
