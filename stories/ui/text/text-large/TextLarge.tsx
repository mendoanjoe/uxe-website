import React from 'react';
import cn from 'classnames';

// Define the properties for the TextLarge component
interface TextLargeProps {
  cls?: string;             // Additional classes for styling
  label: string;            // Text content of the title
  hover?: boolean;           // Whether to apply hover styles
  decoration?: boolean;      // Whether to apply decoration styles
  el?: "p" | "a" | "button" | "li"; // HTML element type
  href?: string;            // URL for 'a' element
  onClick?: () => void;     // Click event handler
  style?: any;
}

// TextLarge component definition
export const TextLarge = ({
  label,
  decoration = false,
  hover = false,
  el = "p",
  cls,
  ...props
}: TextLargeProps) => {
  // Dynamically determine the HTML element based on the 'el' prop
  const ElTag = `${el}` as keyof JSX.IntrinsicElements;

  // Render the TextLarge component
  return (
    <ElTag
      className={cn(`text-large ${cls}`, {
        "text-large--hover" : hover,
        "text-large--decoration" : decoration,
      })}
      {...props}
    >
      {label}
    </ElTag>
  );
};

// Example usage:
// <TextLarge label="Hello World" decoration hover el="h1" cls="custom-class" />
