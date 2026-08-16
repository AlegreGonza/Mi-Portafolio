"use client";

import { useEffect } from "react";

interface ClientTitleProps {
  title: string;
}

export default function ClientTitle({ title }: ClientTitleProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}