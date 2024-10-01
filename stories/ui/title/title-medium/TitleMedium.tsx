import React from 'react';
import cn from 'classnames';

// Define the properties for the TitleMedium component
interface TitleMediumProps {
  cls?: string;          // Additional classes for styling
  label: string;         // Text content of the title
  hover?: boolean;        // Whether to apply hover styles
  decoration?: boolean;   // Whether to apply decoration styles
  el?: "a" | "button" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote" ; // HTML element type
  href?: string;         // URL for 'a' element
  onClick?: () => void;  // Click event handler
  style?: any;
}

// TitleMedium component definition
export const TitleMedium = ({
  label,
  decoration = false,
  hover = false,
  el = "h3",
  cls,
  ...props
}: TitleMediumProps) => {
  // Dynamically determine the HTML element based on the 'el' prop
  const ElTag = `${el}` as keyof JSX.IntrinsicElements;

  // Render the TitleMedium component
  return (
    <ElTag
      className={cn(`title-medium ${cls}`, {
        "title-medium--hover" : hover,
        "title-medium--decoration" : decoration,
      })}
      {...props}
    >
      {label}
    </ElTag>
  );
};

// Example usage:
// <TitleMedium label="Hello World" decoration hover el="h1" cls="custom-class" />
