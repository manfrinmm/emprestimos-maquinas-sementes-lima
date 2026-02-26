import { Machine } from "@/app/api/machine/type";

export function statusLabel(m: Machine) {
  if (m.maintenance) return "Em manutenção";
  return m.status ? "Ativa" : "Desativada";
}

export function statusClass(m: Machine) {
  if (m.maintenance) return "bg-amber-100 text-amber-800 [&_svg]:text-amber-500";
  return m.status
    ? "bg-green-100 text-green-800 [&_svg]:text-green-500"
    : "bg-red-100 text-red-800 [&_svg]:text-red-500";
}