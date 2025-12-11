import React from "react";

interface TagBadgeProps {
  tag: string;
  onClick?: (tag: string) => void;
}

export default function TagBadge({ tag, onClick }: TagBadgeProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(tag);
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        onClick ? 'cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700' : ''
      } bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}
      onClick={handleClick}
    >
      {tag}
    </span>
  );
}
