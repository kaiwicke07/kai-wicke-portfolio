import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";

/**
 * Design Philosophy: Modern Minimalist Engineering
 * Hero section with centered name, subtitle, and two CTAs
 * Dark navy background with bright blue primary action
 */
export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Kai Wicke
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12" style={{ fontFamily: "'Inter', sans-serif" }}>
            First year Mechanical Engineering Student at Northeastern University Boston
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-6 text-base font-medium transition-all duration-200 hover:scale-105"
              onClick={() => navigate("/projects")}
            >
              View My Projects →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-muted-foreground text-foreground hover:bg-muted/20 rounded-lg px-8 py-6 text-base font-medium transition-all duration-200"
              onClick={() => navigate("/contact")}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
