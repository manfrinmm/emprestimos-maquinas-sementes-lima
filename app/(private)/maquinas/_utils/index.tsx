import { Machine } from "@/app/api/machine/type";

const statusLabels: Record<Machine["status"], string> = {
  available: "Disponível",
  maintenance: "Em manutenção",
  disabled: "Desativada",
  using: "Em uso",
};

export function statusLabel(m: Machine) {
  return statusLabels[m.status];
}

const statusClasses: Record<Machine["status"], string> = {
  available: "bg-green-100 text-green-800 [&_svg]:text-green-500",
  maintenance: "bg-amber-100 text-amber-800 [&_svg]:text-amber-500",
  disabled: "bg-red-100 text-red-800 [&_svg]:text-red-500",
  using: "bg-blue-100 text-blue-800 [&_svg]:text-blue-500",
};

export function statusClass(m: Machine) {
  return statusClasses[m.status];
}