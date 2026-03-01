"use client";

import { type Resource, type Action } from "./can";
import { useCan } from "./useCan";

type CanProps = {
  resource: Resource;
  action: Action;
  children: React.ReactNode;
};

export function Can({ resource, action, children }: CanProps) {
  const allowed = useCan(resource, action);
  if (!allowed) return null;
  return <>{children}</>;
}
