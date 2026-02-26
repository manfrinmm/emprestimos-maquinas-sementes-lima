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


export type FiltersValues = {
  search: string;
  status: string;
  sellerId?: string;
};

type FiltersProps = {
  onSearch: (values: FiltersValues) => void;
};

export function Filters({ onSearch }: FiltersProps) {

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [sellerFilter, setSellerFilter] = useState<string>("all");

  const { sellers } = useSellers(true);

  return (
    <Card className="mb-8">
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Vendedor</label>
            <Select value={sellerFilter} onValueChange={setSellerFilter}>
              <SelectTrigger className="w-full">
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
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
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
              className="w-full"
            />
          </div>
          <div className="space-y-2 w-full flex justify-end">
            <Button
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
        </div>
      </CardContent>
    </Card>
  );
}
