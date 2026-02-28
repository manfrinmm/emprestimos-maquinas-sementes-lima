import { useUserStore } from "@/store/user";

export const roleLabels: Record<string, string> = {
    seller: 'Vendedor',
    admin: 'Administrador',
    order_manager: 'Gerente de pedidos',
    production: 'Produção',
};

export type Resource = 'machine';
export type Action = 'view' | 'create' | 'edit' | 'delete';

export const accessByRole: Record<string, Partial<Record<Resource, Action[]>>> = {
    seller: { machine: ['view'] },
    admin: { machine: ['view', 'create', 'edit', 'delete'] },
    order_manager: { machine: ['view', 'create', 'edit', 'delete'] },
    production: { machine: ['view', 'create'] },
};

export const can = (user: { role?: string } | null, resource: Resource, action: Action): boolean => {
    const role = user?.role;
    if (!role) return false;
    const actions = accessByRole[role]?.[resource];
    return Array.isArray(actions) && actions.includes(action);
};

export const useCan = (resource: Resource, action: Action): boolean => {
    const { user } = useUserStore();
    return can(user, resource, action);
};
