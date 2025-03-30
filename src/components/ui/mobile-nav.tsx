import { Link, useLocation } from "wouter";

export function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
      <div className="flex justify-between">
        <Link href="/">
          <a className={`flex flex-col items-center px-2 py-1 ${location === "/" ? "text-primary" : "text-gray-500"}`}>
            <i className="bx bxs-dashboard text-xl"></i>
            <span className="text-xs mt-1">Dashboard</span>
          </a>
        </Link>
        <Link href="/diet">
          <a className={`flex flex-col items-center px-2 py-1 ${location === "/diet" ? "text-primary" : "text-gray-500"}`}>
            <i className="bx bx-food-menu text-xl"></i>
            <span className="text-xs mt-1">Diet</span>
          </a>
        </Link>
        <Link href="/health">
          <a className={`flex flex-col items-center px-2 py-1 ${location === "/health" ? "text-primary" : "text-gray-500"}`}>
            <i className="bx bx-heart text-xl"></i>
            <span className="text-xs mt-1">Health</span>
          </a>
        </Link>
        <Link href="/shop">
          <a className={`flex flex-col items-center px-2 py-1 ${location === "/shop" ? "text-primary" : "text-gray-500"}`}>
            <i className="bx bx-shopping-bag text-xl"></i>
            <span className="text-xs mt-1">Shop</span>
          </a>
        </Link>
        <button className="flex flex-col items-center px-2 py-1 text-gray-500">
          <i className="bx bx-menu text-xl"></i>
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </nav>
  );
}
