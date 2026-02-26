"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tractor, Hash, Tag, ClipboardList, User, Loader2, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createMachineSchema, type CreateMachineInput } from "@/app/api/machine/schema";
import { useCreateMachine } from "../_hooks/createMachine";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
};

export function NewMachineModal({ open, onOpenChange, onCreated }: Props) {
  const createMachine = useCreateMachine();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateMachineInput>({
    resolver: zodResolver(createMachineSchema),
    defaultValues: {
      name: "",
      serialNumber: "",
      stickerNumber: "",
      comment: "",
      userId: "",
    },
  });

  const userId = watch("userId");

  const onSubmit = (data: CreateMachineInput) => {
    createMachine.mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
        onCreated?.();
        toast.success("Máquina cadastrada!");
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });
  };

  const inputErrorClass = "border-destructive focus-visible:border-destructive aria-invalid:border-destructive";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-2xl p-0 gap-0 overflow-hidden rounded-xl [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:bg-white/20 [&_[data-slot=dialog-close]]:hover:text-white"
      >
        <DialogHeader className="bg-gradient-to-r from-primary to-emerald-600 px-8 py-6 flex flex-row items-center justify-between space-y-0 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Tractor className="size-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                Cadastro de Máquina
              </DialogTitle>
              <p className="text-emerald-50 text-sm">
                Preencha as informações da máquina
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="serial-number"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Número de Série <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="serial-number"
                  placeholder="Digite o número de série"
                  className={cn("pl-10 h-11 border-2 rounded-lg", errors.serialNumber && inputErrorClass)}
                  {...register("serialNumber")}
                />
              </div>
              {errors.serialNumber && (
                <p className="text-sm text-destructive mt-1">{errors.serialNumber.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="sticker-number"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Número do Adesivo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="sticker-number"
                  placeholder="Digite o número do adesivo"
                  className={cn("pl-10 h-11 border-2 rounded-lg", errors.stickerNumber && inputErrorClass)}
                  {...register("stickerNumber")}
                />
              </div>
              {errors.stickerNumber && (
                <p className="text-sm text-destructive mt-1">{errors.stickerNumber.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="machine-name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nome da Máquina <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Tractor className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="machine-name"
                  placeholder="Digite o nome/modelo da máquina"
                  className={cn("pl-10 h-11 border-2 rounded-lg", errors.name && inputErrorClass)}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="observations"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Observações
              </label>
              <div className="relative">
                <ClipboardList className="absolute left-3 top-4 size-4 text-muted-foreground" />
                <textarea
                  id="observations"
                  placeholder="Digite observações sobre a máquina (opcional)"
                  rows={3}
                  className={cn(
                    "flex w-full rounded-lg border-2 border-input bg-transparent px-3 py-2 pl-10 text-sm shadow-xs transition-[color,box-shadow] outline-none resize-none",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "placeholder:text-muted-foreground disabled:opacity-50",
                    errors.comment && inputErrorClass
                  )}
                  {...register("comment")}
                />
              </div>
              {errors.comment && (
                <p className="text-sm text-destructive mt-1">{errors.comment.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="userId"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Vendedor
              </label>
              <Select value={userId} onValueChange={(v) => setValue("userId", v)}>
                <SelectTrigger className={cn("relative w-full pl-10 h-11 border-2 rounded-lg", errors.userId && inputErrorClass)}>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <User className="size-4 text-muted-foreground" />
                  </span>
                  <SelectValue placeholder="Selecione um vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {/* {SELLERS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
              {errors.userId && (
                <p className="text-sm text-destructive mt-1">{errors.userId.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-11 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createMachine.isPending}
              className="flex-1 h-11 rounded-lg bg-gradient-to-r from-primary to-emerald-600 hover:from-primary-dark hover:to-emerald-700 shadow-lg"
            >
              {createMachine.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Cadastrar Máquina
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
