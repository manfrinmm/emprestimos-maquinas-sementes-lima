"use client";

import { type LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  isEdit: boolean;
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export function ModalHeader(props: Props) {
  const { isEdit, icon: Icon, title, subtitle } = props;
  return (
    <DialogHeader
      className={cn(
        "px-8 py-6 flex flex-row items-center justify-between space-y-0 rounded-t-xl",
        isEdit
          ? "bg-gradient-to-r from-blue-600 to-indigo-600"
          : "bg-gradient-to-r from-primary to-emerald-600"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-lg bg-white/20 flex items-center justify-center">
          <Icon className="size-6 text-white" />
        </div>
        <div>
          <DialogTitle className="text-2xl font-bold text-white">{title}</DialogTitle>
          <p className={cn("text-sm", isEdit ? "text-blue-50" : "text-emerald-50")}>{subtitle}</p>
        </div>
      </div>
    </DialogHeader>
  );
}
