import React from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { HeroSection } from '@/components/shop/hero-section';
import { FilterSidebar } from '@/components/shop/filter-sidebar';
import { ProductGrid } from '@/components/shop/product-grid';
import { ProductQuickView } from '@/components/shop/product-quick-view';
import { useShopStore } from '@/store/shop-store';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';
import { LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function HomePage() {
  const isFilterOpen = useShopStore((s) => s.isFilterOpen);
  const setIsFilterOpen = useShopStore((s) => s.setIsFilterOpen);
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-amber-500 selection:text-slate-900 scroll-smooth">
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        <div id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Desktop Sidebar */}
              <aside className="hidden md:block w-72 shrink-0">
                <div className="sticky top-24">
                  <FilterSidebar />
                </div>
              </aside>
              {/* Main Content Area */}
              <div className="flex-1 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-2">
                      <LayoutGrid className="h-6 w-6 text-amber-500" /> Active Inventory
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">
                      Select high-performance fuel for your biological systems.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="md:hidden rounded-none border-2 h-10 px-4 font-bold uppercase tracking-tight"
                      onClick={() => setIsFilterOpen(true)}
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                    </Button>
                    <div className="text-xs font-mono font-bold uppercase bg-secondary px-3 py-2 border border-border">
                      Verified Stock: 100%
                    </div>
                  </div>
                </div>
                <ProductGrid />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modals & Overlays */}
      <ProductQuickView />
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-black uppercase tracking-tighter text-left">Filter Protocols</SheetTitle>
          </SheetHeader>
          <div className="px-1">
            <FilterSidebar />
          </div>
        </SheetContent>
      </Sheet>
      <SiteFooter />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}