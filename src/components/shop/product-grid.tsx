import React from 'react';
import { ProductCard } from './product-card';
import { getFilteredProducts, useShopStore } from '@/store/shop-store';
import { PackageSearch } from 'lucide-react';
export function ProductGrid() {
  const store = useShopStore((s) => s);
  const products = getFilteredProducts(store);
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-16 w-16 bg-secondary flex items-center justify-center rounded-none mb-4">
          <PackageSearch className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-black uppercase tracking-tight">Zero Matches Found</h3>
        <p className="text-muted-foreground max-w-xs mt-2">
          Adjust your parameters. Our engineering department found no provisions matching these specs.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}