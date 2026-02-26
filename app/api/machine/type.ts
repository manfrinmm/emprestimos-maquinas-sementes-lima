export type Machine = {
  id: string;
  name: string;
  serialNumber: string;
  stickerNumber: string;
  comment: string;
  status: boolean;
  maintenance: boolean;
  userId: string | null;
  user?: { id: string; name: string; externalId: string } | null;
};