"use client";

import { Building, LayoutDashboard, ShieldCheck, Users } from "lucide-react";

export type NavigationItem = {
  id: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  linkText: string;
};

export const adminDashboardTabsList = [
  {
    id: crypto.randomUUID(),
    path: "/",
    icon: LayoutDashboard,
    linkText: "Overview",
  },
  {
    id: crypto.randomUUID(),
    path: "/professionals",
    icon: Users,
    linkText: "Professionals",
  },
  {
    id: crypto.randomUUID(),
    path: "/merchants",
    icon: Users,
    linkText: "Merchants",
  },
  {
    id: crypto.randomUUID(),
    path: "/organizations",
    icon: Building,
    linkText: "Organizations",
  },
  {
    id: crypto.randomUUID(),
    path: "/verifier",
    icon: ShieldCheck,
    linkText: "Verifier",
  },
] as NavigationItem[];
