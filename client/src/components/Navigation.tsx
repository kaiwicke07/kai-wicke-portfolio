import { useLocation } from "wouter";

export default function Navigation() {
  const [location, navigate] = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Me", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "CV", href: "/cv" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Portfolio
        </button>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive(item.href)
                  ? "text-primary border border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-foreground hover:text-primary transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
