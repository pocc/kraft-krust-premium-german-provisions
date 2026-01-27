import React from 'react';
import { Search, ShoppingCart, Menu, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShopStore } from '@/store/shop-store';
import { Badge } from '@/components/ui/badge';
export function SiteHeader() {
  const searchQuery = useShopStore((s) => s.searchQuery);
  const setSearchQuery = useShopStore((s) => s.setSearchQuery);
  const cartItems = useShopStore((s) => s.cartItems);
  const setIsFilterOpen = useShopStore((s) => s.setIsFilterOpen);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsFilterOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="bg-primary text-primary-foreground p-1 rounded-sm rotate-3 transition-transform group-hover:rotate-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase hidden sm:inline-block">
              Kraft <span className="text-amber-500">&</span> Krust
            </span>
          </div>
        </div>
        <div className="flex-1 max-w-md relative group">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search Provisions..."
            className="pl-9 bg-secondary border-none h-10 ring-offset-background focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-amber-500">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}