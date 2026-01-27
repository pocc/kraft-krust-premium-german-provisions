import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Ruler, Star } from 'lucide-react';
import { Product } from '@/lib/mock-data';
import { useShopStore } from '@/store/shop-store';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useShopStore((s) => s.addToCart);
  const handleAdd = () => {
    addToCart(product.id);
    toast.success(`${product.name} added to loadout`, {
      description: "Item processed successfully.",
    });
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden border-2 border-border bg-card rounded-none group h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          {product.isNew && (
            <Badge className="absolute top-3 left-3 rounded-none bg-amber-500 text-slate-900 font-bold border-none">
              NEW
            </Badge>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-none">
              <Ruler className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="flex items-center gap-1 text-[10px] font-mono uppercase text-muted-foreground mb-1">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> 
            Certified {product.category}
          </div>
          <h3 className="font-black text-lg uppercase tracking-tight leading-tight mb-2 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4">
            {product.description}
          </p>
          <div className="grid grid-cols-2 gap-2 mt-auto">
            {product.specs.map((spec) => (
              <div key={spec.label} className="bg-secondary p-2 rounded-none">
                <span className="block text-[8px] font-mono uppercase text-muted-foreground">{spec.label}</span>
                <span className="block text-xs font-bold">{spec.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-2xs font-mono uppercase text-muted-foreground">Unit Price</span>
            <span className="text-xl font-black text-primary">€{product.price.toFixed(2)}</span>
          </div>
          <Button onClick={handleAdd} size="sm" className="bg-primary hover:bg-amber-500 text-primary-foreground hover:text-slate-900 rounded-none h-10 flex-1 font-bold uppercase transition-colors">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}