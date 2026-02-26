"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tractor, Hash, Tag, ClipboardList, User, Loader2, Check, Wrench } from "lucide-react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createMachineSchema, type CreateMachineInput } from "@/app/api/machine/schema";
import { useCreateMachine } from "../_hooks/createMachine";
import { useUpdateMachine } from "../_hooks/updateMachine";
import { Machine } from "@/app/api/machine/type";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { userCanAccess } from "@/utils/user";
import { useSellers } from "../_hooks/useSellers";

const machineFormSchema = createMachineSchema.extend({
  status: z.boolean().optional(),
  maintenance: z.boolean().optional(),
});

type MachineFormValues = z.infer<typeof machineFormSchema>;

type Props = {
  machine?: Machine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
  onUpdated?: () => void;
};

const defaultValues: MachineFormValues = {
  name: "",
  serialNumber: "",
  stickerNumber: "",
  comment: "",
  userId: "",
  status: true,
  maintenance: false,
};

export function NewMachineModal({ machine, open, onOpenChange, onCreated, onUpdated }: Props) {
  const isEdit = !!machine;
  const createMachine = useCreateMachine();
  const { updateMachine, isPending: updating } = useUpdateMachine();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<MachineFormValues>({
    resolver: zodResolver(machineFormSchema),
    defaultValues,
  });

  const userId = watch("userId");
  const status = watch("status");
  const maintenance = watch("maintenance");
  const isAdmin = userCanAccess("admin");
  const { sellers } = useSellers(open && isAdmin);

  useEffect(() => {
    if (open) {
      if (machine) {
        reset({
          name: machine.name,
          serialNumber: machine.serialNumber,
          stickerNumber: machine.stickerNumber,
          comment: machine.comment ?? "",
          userId: machine.userId ?? "",
          status: machine.status,
          maintenance: machine.maintenance,
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [machine, open, reset]);

  const onSubmit = (data: MachineFormValues) => {
    if (isEdit && machine) {
      updateMachine(
        machine.id,
        {
          name: data.name,
          serialNumber: data.serialNumber,
          stickerNumber: data.stickerNumber,
          comment: data.comment ?? "",
          userId: data.userId || null,
          status: data.status ?? true,
          maintenance: data.maintenance ?? false,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            onUpdated?.();
            toast.success("Máquina atualizada!");
          },
          onError: (err: Error) => toast.error(err.message),
        }
      );
    } else {
      const createPayload: CreateMachineInput = {
        name: data.name,
        serialNumber: data.serialNumber,
        stickerNumber: data.stickerNumber,
        comment: data.comment,
        userId: data.userId,
      };
      createMachine.mutate(createPayload, {
        onSuccess: () => {
          reset(defaultValues);
          onOpenChange(false);
          onCreated?.();
          toast.success("Máquina cadastrada!");
        },
        onError: (err: Error) => toast.error(err.message),
      });
    }
  };

  const inputErrorClass = "border-destructive focus-visible:border-destructive aria-invalid:border-destructive";
  const isPending = createMachine.isPending || updating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-2xl p-0 gap-0 overflow-hidden rounded-xl [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:bg-white/20 [&_[data-slot=dialog-close]]:hover:text-white"
      >
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
              <Tractor className="size-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                {isEdit ? "Editar Máquina" : "Cadastro de Máquina"}
              </DialogTitle>
              <p className={cn("text-sm", isEdit ? "text-blue-50" : "text-emerald-50")}>
                {isEdit ? "Altere as informações da máquina" : "Preencha as informações da máquina"}
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="serial-number" className="block text-sm font-semibold text-gray-700 mb-2">
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
              <label htmlFor="sticker-number" className="block text-sm font-semibold text-gray-700 mb-2">
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
              <label htmlFor="machine-name" className="block text-sm font-semibold text-gray-700 mb-2">
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
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <Select value={status ? "active" : "inactive"} onValueChange={(v) => setValue("status", v === "active")}>
                    <SelectTrigger className="w-full h-11 border-2 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativa</SelectItem>
                      <SelectItem value="inactive">Desativada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <Checkbox
                    id="maintenance"
                    checked={maintenance}
                    onCheckedChange={(v) => setValue("maintenance", v === true)}
                  />
                  <label htmlFor="maintenance" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <Wrench className="size-4 text-amber-600" />
                    Em manutenção
                  </label>
                </div>
              </>
            <div className="md:col-span-2">
              <label htmlFor="observations" className="block text-sm font-semibold text-gray-700 mb-2">
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
            {isAdmin && (
            <div className="md:col-span-2">
              <label htmlFor="userId" className="block text-sm font-semibold text-gray-700 mb-2">
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
                  {sellers.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.userId && (
                <p className="text-sm text-destructive mt-1">{errors.userId.message}</p>
              )}
            </div>
            )}
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
              disabled={isPending}
              className={cn(
                "flex-1 h-11 rounded-lg shadow-lg",
                isEdit
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  : "bg-gradient-to-r from-primary to-emerald-600 hover:from-primary-dark hover:to-emerald-700"
              )}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {isEdit ? "Salvando..." : "Cadastrando..."}
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  {isEdit ? "Salvar alterações" : "Cadastrar Máquina"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
