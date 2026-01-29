import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

/**
 * Home Page Component
 *
 * This is the main landing page of the portfolio with:
 * - Animated curtain reveal effect on page load
 * - Welcome message centered on screen
 * - Two navigation buttons to access the projects
 * - Dark theme with navy blue and purple accents
 *
 * The curtain animation creates a theatrical effect where
 * the content is revealed as the curtain opens from both sides.
 */
export default function Home() {
  const [, navigate] = useLocation();
  const [curtainOpen, setCurtainOpen] = useState(false);

  // Trigger curtain animation on component mount
  useEffect(() => {
    // Small delay to ensure smooth CSS animation
    const timer = setTimeout(() => {
      setCurtainOpen(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Animated Curtain Left */}
      <div
        className={`absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-accent via-accent to-transparent z-50 transition-transform duration-1000 ease-in-out ${
          curtainOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          background:
            "linear-gradient(to right, oklch(0.55 0.25 280), oklch(0.55 0.25 280) 70%, transparent)",
        }}
      />

      {/* Animated Curtain Right */}
      <div
        className={`absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-accent via-accent to-transparent z-50 transition-transform duration-1000 ease-in-out ${
          curtainOpen ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          background:
            "linear-gradient(to left, oklch(0.55 0.25 280), oklch(0.55 0.25 280) 70%, transparent)",
        }}
      />

      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
        {/* Welcome Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-500 ${
            curtainOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
            Bienvenido a mi web
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Explora mis proyectos innovadores con IA
          </p>
        </div>

        {/* Projects Navigation Buttons */}
        <div
          className={`flex flex-col md:flex-row gap-8 transition-all duration-1000 delay-700 ${
            curtainOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Project 1 Button - SQL Generator */}
          <button
            onClick={() => navigate("/proyecto-1")}
            className="group relative px-8 py-6 md:px-12 md:py-8 bg-card border-2 border-accent rounded-lg hover:bg-accent/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
                Proyecto 1
              </h2>
              <p className="text-base md:text-lg text-foreground">
                Generador de Esquemas SQL
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Genera tablas optimizadas con IA
              </p>
            </div>

            {/* Decorative border animation */}
            <div className="absolute inset-0 border-2 border-accent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Project 2 Button - Product Finder */}
          <button
            onClick={() => navigate("/proyecto-2")}
            className="group relative px-8 py-6 md:px-12 md:py-8 bg-card border-2 border-accent rounded-lg hover:bg-accent/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
                Proyecto 2
              </h2>
              <p className="text-base md:text-lg text-foreground">
                Buscador de Productos
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Encuentra y compara productos online
              </p>
            </div>

            {/* Decorative border animation */}
            <div className="absolute inset-0 border-2 border-accent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-accent/50 transition-all duration-1000 ${
                curtainOpen ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${curtainOpen ? 1 + i * 0.2 : 0}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
