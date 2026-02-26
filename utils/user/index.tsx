import { useUserStore } from "@/store/user";

export const roleLabels: Record<string, string> = {
    seller: 'Vendedor',
    admin: 'Administrador',
}

export const userCanAccess = (roleNeeded: string): boolean => {
    const { user } = useUserStore();
    return user?.role === roleNeeded || user?.role === 'admin';
}