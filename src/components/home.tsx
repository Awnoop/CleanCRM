import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  Bell,
  Plus,
  Users,
  Calendar,
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import JobMetricsPanel from "@/components/dashboard/JobMetricsPanel";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import QuickActions from "@/components/dashboard/QuickActions";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold">DFW 20 Cleaners</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="Admin"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-[280px] h-[calc(100vh-60px)] border-r border-gray-200 bg-white">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 md:px-6 max-w-[800px] mx-auto w-full">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
              <p className="text-gray-500">Welcome back, Admin</p>
            </div>

            {/* Job Metrics Panel */}
            <JobMetricsPanel />

            {/* Quick Actions */}
            <QuickActions />

            {/* Notification Center */}
            <NotificationCenter />
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent = () => {
  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", active: true },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Scheduler",
      active: false,
    },
    { icon: <Users className="h-5 w-5" />, label: "Cleaners", active: false },
    { icon: <Users className="h-5 w-5" />, label: "Clients", active: false },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      active: false,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-500 h-8 w-8 rounded-md flex items-center justify-center text-white font-bold">
            DC
          </div>
          <h2 className="text-lg font-semibold">DFW 20 Cleaners</h2>
        </div>

        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${item.active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </a>
      </div>
    </div>
  );
};

export default HomePage;
