import type { LucideIcon } from "lucide-react";
import { BookOpen, FolderOpen, Gamepad2, Home, Wrench } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Assessment Studio", href: "/assessment-studio", icon: Wrench },
  { label: "Challenges", href: "/challenges", icon: Gamepad2 },
  { label: "Resources", href: "/resources", icon: FolderOpen },
];
