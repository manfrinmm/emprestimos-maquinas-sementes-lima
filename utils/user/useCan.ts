"use client";

import { useUserStore } from "@/store/user";
import { can, type Resource, type Action } from "./can";

export const useCan = (resource: Resource, action: Action): boolean => {
    const { user } = useUserStore();
    return can(user, resource, action);
};
