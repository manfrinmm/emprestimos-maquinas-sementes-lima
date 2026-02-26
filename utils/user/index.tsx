import { useUserStore } from "@/store/user";

export const roleLabels: Record<string, string> = {
    seller: 'Vendedor',
    admin: 'Administrador',
}

export const checkUserCanAccess = (user: { role?: string } | null, roleNeeded: string): boolean =>
    user?.role === roleNeeded || user?.role === 'admin';

export const useUserCanAccess = (roleNeeded: string): boolean => {
    const { user } = useUserStore();
    return checkUserCanAccess(user, roleNeeded);
}

export const normalUserRoles = ['seller'];

export const adminUserRoles = ['admin', 'order_manager'];