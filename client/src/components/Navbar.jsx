import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const { state } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
    { name: "Checkout", path: "/checkout" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          Vibe<span className="text-primary">Cart</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {state.cart.length > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-primary text-white text-xs px-1.5">
                  {state.cart.length}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t bg-background/95">
          <div className="flex flex-col space-y-2 px-6 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                <ShoppingCart className="h-4 w-4 mr-2" /> Cart (
                {state.cart.length})
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
