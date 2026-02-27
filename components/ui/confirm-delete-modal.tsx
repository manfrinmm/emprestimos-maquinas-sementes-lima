"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
  text: string;
};

export function ConfirmDeleteModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
  text,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="max-w-[min(32rem,90vw)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="size-5 text-red-600" />
            </div>
            Confirmar Exclusão
          </DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">
          Tem certeza que deseja excluir{" "}
          <span className="font-medium text-foreground">{text}</span>?
          Esta ação não pode ser desfeita.
        </p>
        <DialogFooter className="gap-2 flex">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
