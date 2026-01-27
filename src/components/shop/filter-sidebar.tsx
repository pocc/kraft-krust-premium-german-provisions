import React from 'react';
import { useShopStore } from '@/store/shop-store';
import { ProductCategory } from '@/lib/mock-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
const CATEGORIES: ProductCategory[] = ['Liquid Bread', 'Twisted Dough', 'Cured Meats'];
export function FilterSidebar() {
  const selectedCategories = useShopStore((s) => s.selectedCategories);
  const toggleCategory = useShopStore((s) => s.toggleCategory);
  const priceRange = useShopStore((s) => s.priceRange);
  const setPriceRange = useShopStore((s) => s.setPriceRange);
  const clearFilters = useShopStore((s) => s.clearFilters);
  return (
    <div className="space-y-8 w-full max-w-[280px]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Filter Protocols</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["categories", "price"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-bold uppercase tracking-tight py-3">Engineering Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox 
                    id={cat} 
                    checked={selectedCategories.includes(cat)} 
                    onCheckedChange={() => toggleCategory(cat)}
                  />
                  <Label htmlFor={cat} className="text-sm font-medium leading-none cursor-pointer">
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-bold uppercase tracking-tight py-3">Cost Threshold</AccordionTrigger>
          <AccordionContent>
            <div className="pt-6 px-2 space-y-6">
              <Slider
                min={0}
                max={50}
                step={1}
                value={[priceRange[1]]}
                onValueChange={(val) => setPriceRange([0, val[0]])}
              />
              <div className="flex justify-between text-xs font-mono font-bold">
                <span>€0.00</span>
                <span>€{priceRange[1].toFixed(2)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="p-4 bg-secondary/50 border border-border rounded-sm">
        <p className="text-[10px] font-mono uppercase text-muted-foreground leading-tight">
          Warning: Consumption of non-certified provisions may result in sub-optimal efficiency.
        </p>
      </div>
    </div>
  );
}