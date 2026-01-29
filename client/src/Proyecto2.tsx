import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, ExternalLink, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

/**
 * Proyecto 2 - Product Finder (TripAdvisor-like)
 *
 * This component provides a search interface to find and compare products
 * across different online retailers, similar to TripAdvisor but for products.
 *
 * Features:
 * - Search bar to find products
 * - Results display with product image, price, description
 * - Links to original product pages
 * - Price comparison across retailers
 * - Responsive grid layout
 *
 * The component uses tRPC for backend communication with product search service.
 */
export default function Proyecto2() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: string;
      name: string;
      price: string;
      image: string;
      description: string;
      url: string;
      retailer: string;
    }>
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  // tRPC mutation for searching products
  const searchProductsMutation = trpc.productSearch.search.useMutation();

  /**
   * Handle product search
   * This function:
   * 1. Validates the search query
   * 2. Sends the query to the backend
   * 3. Receives and displays product results
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Call the tRPC mutation to search for products
      const results = await searchProductsMutation.mutateAsync({
        query: searchQuery,
      });

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * Handle search on Enter key press
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSearching) {
      handleSearch(e as any);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header with navigation */}
      <header className="border-b border-border bg-card p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Volver a inicio"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-accent">
                Buscador de Productos
              </h1>
              <p className="text-sm text-muted-foreground">
                Encuentra y compara productos online
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search section */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Busca un producto... (ej: mesa de escritorio, laptop, silla gamer)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSearching}
                className="w-full bg-card border-border pl-4 pr-12 py-3 text-base"
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 text-accent animate-spin" />
                ) : (
                  <Search className="w-5 h-5 text-accent" />
                )}
              </button>
            </div>
            <Button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </>
              )}
            </Button>
          </form>

          {/* Search tips */}
          <div className="mt-4 p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Consejo:</strong> Intenta ser específico en tu búsqueda
              (ej: "mesa de escritorio blanca 120cm" en lugar de solo "mesa")
            </p>
          </div>
        </div>

        {/* Results section */}
        {searchResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Resultados para "{searchQuery}"
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <Card
                  key={product.id}
                  className="bg-card border-border hover:border-accent transition-colors overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23333' width='300' height='200'/%3E%3Ctext x='50%' y='50%' font-size='16' fill='%23999' text-anchor='middle' dy='.3em'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Retailer badge */}
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs font-semibold rounded">
                        {product.retailer}
                      </span>
                    </div>

                    {/* Product name */}
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Product description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="mb-4 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-accent">
                        {product.price}
                      </span>
                    </div>

                    {/* Visit button */}
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors font-semibold"
                    >
                      Ver producto
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isSearching && searchResults.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-muted-foreground">
              Intenta con otra búsqueda o sé más específico
            </p>
          </div>
        )}

        {/* Initial state */}
        {!isSearching && searchResults.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Comienza tu búsqueda
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Usa la barra de búsqueda para encontrar productos de diferentes
              tiendas online y compara precios
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
