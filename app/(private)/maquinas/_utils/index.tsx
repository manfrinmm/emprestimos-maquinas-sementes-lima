import { Machine } from "@/app/api/machine/type";

export function statusLabel(m: Machine) {
    if (m.maintenance) return "Manutenção";
    if (!m.status) return "Emprestada";
    return "Disponível";
  }
  
export function statusClass(m: Machine) {
    if (m.maintenance)
      return "bg-amber-100 text-amber-800 [&_svg]:text-amber-500";
    if (!m.status) return "bg-yellow-100 text-yellow-800 [&_svg]:text-yellow-500";
    return "bg-green-100 text-green-800 [&_svg]:text-green-500";
  }