import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/beyond-academics", label: "Beyond Academics" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      {/* Top Bar */}
      <div className="bg-secondary text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs lg:text-sm">
          <div className="flex space-x-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-accent" /> +91 88868 88275
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-accent" /> dawnbudsmodelschool@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-80">EST. 2000</span>
            <span className="w-px h-3 bg-white/20"></span>
            <span className="opacity-80">ISO 9001:2015 Certified</span>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg overflow-hidden p-1">
              <img 
                src="/DBMS Logo.jpeg" 
                alt="Dawn Buds Model School Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-primary leading-none">DAWN BUDS</span>
              <span className="text-xs text-secondary font-medium tracking-widest uppercase">Model School</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  location === link.href
                    ? "text-primary bg-primary/5"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admissions">
              <Button size="sm" className="ml-4 bg-primary hover:bg-primary/90">
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary transition-colors p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location === link.href
                      ? "bg-white text-primary shadow-sm border border-gray-100"
                      : "text-gray-600 hover:bg-white hover:text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
