import {
  LayoutDashboard,
  User,
  FileHeart,
  PlusCircle,
  HandHeart,
  Users,
} from "lucide-react";

export const SIDEBAR_MENU = {
  admin: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      label: "All Users",
      href: "/dashboard/all-users",
      icon: Users,
    },
    {
      label: "All Requests",
      href: "/dashboard/all-blood-donation-request",
      icon: FileHeart,
    },
  ],
  volunteer: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      label: "All Requests",
      href: "/dashboard/all-blood-donation-request",
      icon: FileHeart,
    },
  ],
  donor: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      label: "My Requests",
      href: "/dashboard/my-donation-requests",
      icon: FileHeart,
    },
    {
      label: "Create Request",
      href: "/dashboard/create-donation-request",
      icon: PlusCircle,
    },
    {
      label: "Make Donation",
      href: "/dashboard/make-donation",
      icon: HandHeart,
    },
  ],
};
