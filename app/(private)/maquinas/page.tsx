"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { NewMachineModal } from "./_components/new-machine-modal";
import { useDeleteMachine } from "./_hooks/deleteMachine";
import { useListMachines, type MachineWithUser } from "./_hooks/listMachine";

function statusLabel(m: MachineWithUser) {
  if (m.maintenance) return "Manutenção";
  if (!m.status) return "Emprestada";
  return "Disponível";
}

function statusClass(m: MachineWithUser) {
  if (m.maintenance)
    return "bg-amber-100 text-amber-800 [&_svg]:text-amber-500";
  if (!m.status) return "bg-yellow-100 text-yellow-800 [&_svg]:text-yellow-500";
  return "bg-green-100 text-green-800 [&_svg]:text-green-500";
}

export default function PrivateHomePage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newMachineOpen, setNewMachineOpen] = useState(false);

  const { machines, total, refetch } = useListMachines({
    page,
    limit,
    search,
    status: statusFilter,
  });
  const { deleteMachine, isPending: deleting } = useDeleteMachine();

  const handleConfirmDelete = useCallback(() => {
    if (!deleteId) return;
    deleteMachine(deleteId, {
      onSuccess: () => setDeleteId(null),
    });
  }, [deleteId, deleteMachine]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="py-6 md:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar máquina..."
              className="pl-9"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSearch(searchInput)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => setSearch(searchInput)}>
            Buscar
          </Button>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="available">Disponível</SelectItem>
              <SelectItem value="borrowed">Emprestada</SelectItem>
              <SelectItem value="maintenance">Manutenção</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="shrink-0" onClick={() => setNewMachineOpen(true)}>
          <Plus className="size-4" />
          Nova Máquina
        </Button>
      </div>

      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Nome
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Nº de Série
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Nº do Adesivo
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Vendedor
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Observação
              </TableHead>
              <TableHead className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.map((m) => (
              <TableRow key={m.id} className="hover:bg-muted/30">
                <TableCell className="px-6 py-4 font-semibold text-foreground">
                  {m.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-foreground">
                  {m.serialNumber}
                </TableCell>
                <TableCell className="px-6 py-4 text-foreground">
                  {m.stickerNumber}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusClass(m)
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current opacity-70" />
                    {statusLabel(m)}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">{m.user?.name ?? "—"}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 max-w-xs">
                  <span className="text-sm text-muted-foreground truncate block" title={m.comment}>
                    {m.comment || "—"}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button variant="ghost" size="icon-sm" asChild>
                      <Link href={`/maquinas/${m.id}/editar`}>
                        <Pencil className="size-4 text-blue-600" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleteId(m.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {machines.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Nenhuma máquina encontrada.
        </p>
      )}

      {total > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{from}</span> a{" "}
            <span className="font-medium">{to}</span> de{" "}
            <span className="font-medium">{total}</span> resultados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page - 2 + i;
              if (p > totalPages) return null;
              return (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon-sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      <NewMachineModal open={newMachineOpen} onOpenChange={setNewMachineOpen} onCreated={refetch} />

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent showCloseButton className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="size-5 text-red-600" />
              </div>
              Confirmar Exclusão
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Tem certeza que deseja excluir a máquina{" "}
            <span className="font-medium text-foreground">
              {machines.find((m) => m.id === deleteId)?.serialNumber ?? deleteId}
            </span>
            ? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter className="gap-2 flex">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleting}
            >
              {deleting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
