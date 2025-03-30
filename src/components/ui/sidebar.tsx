import { Link, useLocation } from "wouter";

interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
}

function NavLink({ href, icon, label }: NavLinkProps) {
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <li className="mb-1">
      <Link href={href}>
        <a className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? "text-primary bg-green-50"
            : "text-gray-600 hover:bg-green-50 hover:text-primary"
        }`}>
          <i className={`bx ${icon} text-xl`}></i>
          <span className="ml-3">{label}</span>
        </a>
      </Link>
    </li>
  );
}

interface SidebarProps {
  user: {
    name: string;
    level: string;
    avatar?: string;
  };
}

export function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-full bg-white shadow-soft border-r border-gray-100">
      {/* Logo */}
      <div className="flex items-center px-6 py-5 border-b border-gray-100">
        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16C16 13.7909 14.2091 12 12 12C9.79086 12 8 13.7909 8 16Z" fill="currentColor"/>
          <path d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z" fill="currentColor"/>
          <path d="M18 12C19.1046 12 20 11.1046 20 10C20 8.89543 19.1046 8 18 8C16.8954 8 16 8.89543 16 10C16 11.1046 16.8954 12 18 12Z" fill="currentColor"/>
          <path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" fill="currentColor"/>
        </svg>
        <span className="ml-3 text-lg font-bold font-accent text-primary">EcoSync</span>
      </div>
      
      {/* User Profile */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <img 
          className="w-10 h-10 rounded-full" 
          src={user.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
          alt={`${user.name}'s avatar`} 
        />
        <div className="ml-3">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">Eco Level: {user.level}</p>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul>
          <NavLink href="/" icon="bxs-dashboard" label="Dashboard" />
          <NavLink href="/diet" icon="bx-food-menu" label="Diet & Nutrition" />
          <NavLink href="/health" icon="bx-heart" label="Health & Fitness" />
          <NavLink href="/finance" icon="bx-dollar-circle" label="Finance & Savings" />
          <NavLink href="/productivity" icon="bx-calendar-check" label="Productivity" />
          <NavLink href="/shopping" icon="bx-shopping-bag" label="Smart Shopping" />
          <NavLink href="/sustainability" icon="bx-leaf" label="Sustainability" />
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <Link href="/settings">
          <a className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <i className="bx bx-cog text-xl"></i>
            <span className="ml-3 text-sm">Settings</span>
          </a>
        </Link>
      </div>
    </aside>
  );
}
