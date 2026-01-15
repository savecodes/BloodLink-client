import {
  LayoutDashboard,
  User,
  FileHeart,
  PlusCircle,
  HandHeart,
  Users,
  DollarSign,
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
  Volunteer: [
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
      href: "/dashboard/funding",
      icon: HandHeart,
    },
  ],
};
