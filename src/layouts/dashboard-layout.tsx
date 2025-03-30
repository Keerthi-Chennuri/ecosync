import { Sidebar } from "@/components/ui/sidebar";
import { MobileNav } from "@/components/ui/mobile-nav";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { useState } from "react";
import { useCherryBlossoms } from "@/hooks/use-cherry-blossoms";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user/current'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showBlossoms, setShowBlossoms] = useState(true);
  
  // Cherry blossom effect
  const cherryBlossomRef = useCherryBlossoms({
    numPetals: 20,
    fallSpeed: 1.5,
    swayFactor: 2.5,
    colors: ['#ffdbeb', '#ffc6e7', '#ffccff', '#ffe1f0', '#ffdbdb'],
  });

  function getQueryFn({ on401 }: { on401: "returnNull" }) {
    return async () => {
      const res = await fetch('/api/user/current', {
        credentials: 'include',
      });
      
      if (on401 === "returnNull" && res.status === 401) {
        return null;
      }
      
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status}: ${text || res.statusText}`);
      }
      
      return await res.json();
    };
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      {user && (
        <Sidebar 
          user={{
            name: user.fullName,
            level: user.ecoLevel,
            avatar: user.avatarUrl as string | undefined,
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Cherry Blossom Container - positioned absolutely but contained within main */}
        {showBlossoms && (
          <div 
            ref={cherryBlossomRef} 
            className="absolute inset-0 pointer-events-none z-10"
            aria-hidden="true" 
          />
        )}
        
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="flex items-center">
            <button className="mr-4 text-gray-600" aria-label="Open menu">
              <i className="bx bx-menu text-2xl"></i>
            </button>
            <div className="flex items-center">
              <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16C16 13.7909 14.2091 12 12 12C9.79086 12 8 13.7909 8 16Z" fill="currentColor"/>
                <path d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z" fill="currentColor"/>
                <path d="M18 12C19.1046 12 20 11.1046 20 10C20 8.89543 19.1046 8 18 8C16.8954 8 16 8.89543 16 10C16 11.1046 16.8954 12 18 12Z" fill="currentColor"/>
                <path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" fill="currentColor"/>
              </svg>
              <span className="ml-2 text-lg font-bold font-accent text-primary">EcoSync</span>
            </div>
          </div>
          <div>
            <button className="p-1 text-gray-600" aria-label="Notifications">
              <i className="bx bx-bell text-2xl"></i>
            </button>
          </div>
        </header>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold">{title || "Dashboard"}</h1>
            <p className="text-gray-500 mt-1">
              {subtitle || (user ? `Welcome back, ${user.firstName || ''}. Here's your sustainability overview.` : "Loading...")}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {/* Animation toggle */}
            <div className="flex items-center gap-2">
              <Label htmlFor="blossom-mode" className="text-sm text-gray-600">
                Cherry Blossoms
              </Label>
              <Switch
                id="blossom-mode"
                checked={showBlossoms}
                onCheckedChange={setShowBlossoms}
                className="data-[state=checked]:bg-pink-400"
              />
            </div>
            
            <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100" aria-label="Notifications">
              <i className="bx bx-bell text-2xl"></i>
            </button>
            <div className="relative">
              <input 
                type="search" 
                placeholder="Search..." 
                className="py-2 pl-10 pr-4 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
              <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              
              {isSearchOpen && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-20">
                  <p className="text-xs text-gray-500 mb-2">Quick Search</p>
                  <div className="space-y-2">
                    <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <p className="text-sm font-medium">Diet & Nutrition</p>
                    </div>
                    <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <p className="text-sm font-medium">Eco Tips</p>
                    </div>
                    <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <p className="text-sm font-medium">Carbon Calculator</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-20 lg:pb-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </main>
    </div>
  );
}
