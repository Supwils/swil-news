"use client";

import Link, { LinkProps } from "next/link";
import React from "react";

type Props = LinkProps & {
  className?: string;
  children: React.ReactNode;
  draggable?: boolean;
};

/**
 * Link that allows text selection: if the user has selected text when clicking,
 * navigation is prevented so the selection is preserved.
 */
export function SelectableLink({
  className,
  children,
  draggable = false,
  ...props
}: Props) {
  const handleClickCapture = (e: React.MouseEvent) => {
    const selection = window.getSelection()?.toString() ?? "";
    if (selection.trim().length > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link
      {...props}
      className={className}
      draggable={draggable}
      onClickCapture={handleClickCapture}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </Link>
  );
}
