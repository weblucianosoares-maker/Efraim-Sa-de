import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { Icons } from "./Icons";

const menuItems = [
  { icon: Icons.Dashboard, label: "Dashboard", path: "/" },
  { icon: Icons.Leads, label: "Leads", path: "/leads" },
  { icon: Icons.Funnel, label: "Sales Funnel", path: "/funnel" },
  { icon: Icons.Contracts, label: "Contracts", path: "/contracts" },
  { icon: Icons.Carriers, label: "Carriers", path: "/carriers" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-slate-50 border-r border-slate-200 py-6 z-50">
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Icons.CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-blue-900 leading-none">Efraim</h1>
            <p className="text-[0.6875rem] tracking-wider uppercase text-slate-500 mt-1 font-semibold">Insurance Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center pl-6 py-3 transition-all group",
              isActive 
                ? "text-blue-700 font-semibold bg-white rounded-l-lg ml-2 pl-4 shadow-sm" 
                : "text-slate-500 hover:text-blue-600 hover:translate-x-1"
            )}
          >
            <item.icon className={cn("w-5 h-5 mr-3", "group-hover:text-blue-600")} />
            <span className="text-[0.6875rem] tracking-wider uppercase">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-6 px-6 space-y-1">
        <button className="flex items-center w-full text-slate-500 py-3 hover:text-blue-600 transition-all">
          <Icons.Support className="w-5 h-5 mr-3" />
          <span className="text-[0.6875rem] tracking-wider uppercase font-medium">Support</span>
        </button>
        <button className="flex items-center w-full text-slate-500 py-3 hover:text-blue-600 transition-all">
          <Icons.Logout className="w-5 h-5 mr-3" />
          <span className="text-[0.6875rem] tracking-wider uppercase font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export function TopBar({ title }: { title: string }) {
  return (
    <header className="flex justify-between items-center w-full px-8 py-4 sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-blue-900">{title}</h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <Icons.Notifications className="w-6 h-6 text-slate-500 hover:text-blue-700 cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <Icons.Settings className="w-6 h-6 text-slate-500 hover:text-blue-700 cursor-pointer" />
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">Ricardo Alves</p>
            <p className="text-[0.625rem] text-slate-500 uppercase font-bold tracking-tighter">Corretor Senior</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
          />
        </div>
      </div>
    </header>
  );
}
