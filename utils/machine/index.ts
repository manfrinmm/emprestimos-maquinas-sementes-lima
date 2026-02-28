export const statusOptions = [
  { value: "all", label: "Todos os status" },
  { value: "available", label: "Disponível" },
  { value: "maintenance", label: "Em manutenção" },
  { value: "disabled", label: "Desativada" },
  { value: "using", label: "Em uso" },
];

export const machineStatusFormOptions = [
  { value: "available", label: "Disponível" },
  { value: "maintenance", label: "Em manutenção" },
  { value: "disabled", label: "Desativada" },
  { value: "using", label: "Em uso" },
] as const;
