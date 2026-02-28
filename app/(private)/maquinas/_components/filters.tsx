"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions } from "@/utils/machine";
import { useState } from "react";
import { useSellers } from "../_hooks/useSellers";
import { Plus } from "lucide-react";
import { useCan } from "@/utils/user";


export type FiltersValues = {
  search: string;
  status: string;
  sellerId?: string;
};

type FiltersProps = {
  onSearch: (values: FiltersValues) => void;
  isAdmin: boolean;
  onNewMachine: () => void;
};

export function Filters({ onSearch, isAdmin, onNewMachine }: FiltersProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [sellerFilter, setSellerFilter] = useState<string>("all");
  const canCreate = useCan("machine", "create");

  const { sellers } = useSellers(isAdmin);

  return (
    <div className="mb-8">
      <CardContent className="p-0">
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isAdmin ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} items-end`}>
          {isAdmin && (
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Vendedor</label>
              <Select value={sellerFilter} onValueChange={setSellerFilter}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Vendedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os vendedores</SelectItem>
                  {sellers && sellers.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="-1">Não atribuído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Buscar</label>
            <Input
              placeholder="Nome/Série/Adesivo..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-white"
            />
          </div>
          <div className="space-y-2 w-full flex justify-start">
            <Button
              className="w-full sm:w-auto"
              variant="secondary"
              onClick={() =>
                onSearch({
                  search: searchFilter,
                  status: statusFilter,
                  sellerId: sellerFilter === "all" ? undefined : sellerFilter,
                })
              }
            >
              Buscar
            </Button>
          </div>
          {canCreate && (
            <div className="space-y-2 w-full flex justify-end">
              <Button className="shrink-0 w-full sm:w-auto" onClick={onNewMachine}>
                <Plus className="size-4" />
                Nova Máquina
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}
