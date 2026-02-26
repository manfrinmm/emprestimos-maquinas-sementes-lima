"use client";

import { useState, useCallback } from "react";
import { Search, Plus, AlertTriangle } from "lucide-react";
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

import { cn } from "@/lib/utils";
import { NewMachineModal } from "./_components/new-machine-modal";
import { useDeleteMachine } from "./_hooks/deleteMachine";
import { Machine } from "@/app/api/machine/type";
import { useListMachines} from "./_hooks/listMachine";
import { MobileCard } from "./_components/mobile-card";
import TableDesktop from "./_components/table-desktop";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


export default function PrivateHomePage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editMachine, setEditMachine] = useState<Machine | null>(null);
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
              <SelectItem value="active">Ativa</SelectItem>
              <SelectItem value="inactive">Desativada</SelectItem>
              <SelectItem value="maintenance">Em manutenção</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="shrink-0" onClick={() => setNewMachineOpen(true)}>
          <Plus className="size-4" />
          Nova Máquina
        </Button>
      </div>

      <div className="hidden md:block rounded-lg border bg-card shadow-sm overflow-hidden">
       <TableDesktop machines={machines} setDeleteId={setDeleteId} onEdit={setEditMachine} />
      </div>

      <div className="md:hidden space-y-4">
       <MobileCard machines={machines} setDeleteId={setDeleteId} onEdit={setEditMachine} />
      </div>

      {machines.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Nenhuma máquina encontrada.
        </p>
      )}

      {total > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6">
          <p className="text-sm text-muted-foreground flex gap-1">
            Mostrando <span className="font-medium">{from}</span> a{" "}
            <span className="font-medium">{to}</span> de{" "}
            <span className="font-medium">{total}</span> resultados
          </p>
          <Pagination className="sm:justify-end w-full">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage((p) => p - 1);
                  }}
                  className={cn(page <= 1 && "pointer-events-none opacity-50")}
                  aria-disabled={page <= 1}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p =
                  totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page - 2 + i;
                if (p > totalPages) return null;
                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(p);
                      }}
                      isActive={p === page}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) setPage((p) => p + 1);
                  }}
                  className={cn(
                    page >= totalPages && "pointer-events-none opacity-50"
                  )}
                  aria-disabled={page >= totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <NewMachineModal
        machine={editMachine ?? undefined}
        open={newMachineOpen || !!editMachine}
        onOpenChange={(open) => {
          if (!open) {
            setNewMachineOpen(false);
            setEditMachine(null);
          }
        }}
        onCreated={refetch}
        onUpdated={refetch}
      />

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent showCloseButton className="w-2xl max-x-[90vw] ">
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
