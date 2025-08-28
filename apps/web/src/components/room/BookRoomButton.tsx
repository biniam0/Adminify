"use client";

import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookRoomButtonProps {
  label: string;
  onClick: () => void;
}

export function BookRoomButton({ label, onClick }: BookRoomButtonProps) {
  return (
    <Button className="w-full max-w-[255px] mt-4" size="sm" onClick={onClick}>
      <Book className="!size-5" />
      <span className="text-base font-semibold">{label}</span>
    </Button>
  );
}
