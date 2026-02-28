export type MachineStatus = "available" | "maintenance" | "disabled" | "using";

export type Machine = {
  id: string;
  name: string;
  serialNumber: string;
  stickerNumber: string;
  comment: string;
  status: MachineStatus;
  userId: string | null;
  user?: { id: string; name: string; externalId: string } | null;
};