import { Machine } from "@/app/api/machine/type";
import { Tractor, UserCheck, UserMinus, Wrench, Zap } from "lucide-react";

export function DashCards({ machines, total }: {
  machines: Machine[];
  total: number;
}) {
  const assignedCount = machines.filter((m) => m.userId).length;
  const unassignedCount = total - assignedCount;
  const inUseCount = machines.filter((m) => m.status === "using").length;
  const maintenanceCount = machines.filter((m) => m.status === "maintenance").length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-bold">Total de Máquinas</p>
            <p className="text-2xl font-bold text-blue-500">{total}</p>
          </div>
          <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Tractor className="size-6 text-blue-500" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-bold">Atribuídas</p>
            <p className="text-2xl font-bold text-green-600">{assignedCount}</p>
          </div>
          <div className="size-12 rounded-lg bg-green-500/10 flex items-center justify-center">
            <UserCheck className="size-6 text-green-500" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-bold">Não Atribuídas</p>
            <p className="text-2xl font-bold text-orange-600">{unassignedCount}</p>
          </div>
          <div className="size-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <UserMinus className="size-6 text-orange-500" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-bold">Em uso</p>
            <p className="text-2xl font-bold text-cyan-600">{inUseCount}</p>
          </div>
          <div className="size-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Zap className="size-6 text-cyan-500" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-bold">Em manutenção</p>
            <p className="text-2xl font-bold text-amber-600">{maintenanceCount}</p>
          </div>
          <div className="size-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Wrench className="size-6 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  )
}