import React from 'react';
import cn from 'classnames';

// Define the properties for the TextSmall component
interface TextSmallProps {
  cls?: string;             // Additional classes for styling
  label: string;            // Text content of the title
  hover?: boolean;           // Whether to apply hover styles
  decoration?: boolean;      // Whether to apply decoration styles
  el?: "p" | "a" | "button" | "h3"; // HTML element type
  href?: string;            // URL for 'a' element
  onClick?: () => void;     // Click event handler
  style?: any;
}

// TextSmall component definition
export const TextSmall = ({
  label,
  decoration = false,
  hover = false,
  el = "p",
  cls,
  ...props
}: TextSmallProps) => {
  // Dynamically determine the HTML element based on the 'el' prop
  const ElTag = `${el}` as keyof JSX.IntrinsicElements;

  // Render the TextSmall component
  return (
    <ElTag
      className={cn(`text-small ${cls}`, {
        "text-small--hover" : hover,
        "text-small--decoration" : decoration,
      })}
      {...props}
    >
      {label}
    </ElTag>
  );
};

// Example usage:
// <TextSmall label="Hello World" decoration hover el="h1" cls="custom-class" />
