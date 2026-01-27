import React from 'react';
import { useShopStore, EfficiencyGrade } from '@/store/shop-store';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2, Fuel } from 'lucide-react';
const CATEGORIES: ProductCategory[] = ['Liquid Bread', 'Twisted Dough', 'Cured Meats'];
export function FilterSidebar() {
  const selectedCategories = useShopStore((s) => s.selectedCategories);
  const toggleCategory = useShopStore((s) => s.toggleCategory);
  const priceRange = useShopStore((s) => s.priceRange);
  const setPriceRange = useShopStore((s) => s.setPriceRange);
  const efficiencyFilter = useShopStore((s) => s.efficiencyFilter);
  const setEfficiencyFilter = useShopStore((s) => s.setEfficiencyFilter);
  const clearFilters = useShopStore((s) => s.clearFilters);
  return (
    <div className="space-y-8 w-full max-w-[280px]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Filter Protocols</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["categories", "price", "efficiency"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-bold uppercase tracking-tight py-3 text-left">Engineering Type</AccordionTrigger>
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
        <AccordionItem value="efficiency">
          <AccordionTrigger className="text-sm font-bold uppercase tracking-tight py-3 text-left">Fuel Efficiency</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <RadioGroup 
                value={efficiencyFilter} 
                onValueChange={(val) => setEfficiencyFilter(val as EfficiencyGrade)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="eff-all" />
                  <Label htmlFor="eff-all" className="text-sm font-medium cursor-pointer">All Grades</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="eff-high" />
                  <Label htmlFor="eff-high" className="text-sm font-medium cursor-pointer">High Performance (&gt;5%)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="eff-standard" />
                  <Label htmlFor="eff-standard" className="text-sm font-medium cursor-pointer">Standard Issue</Label>
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-bold uppercase tracking-tight py-3 text-left">Price per Unit</AccordionTrigger>
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
        <div className="flex items-start gap-2">
          <Fuel className="h-4 w-4 text-amber-500 mt-0.5" />
          <p className="text-[10px] font-mono uppercase text-muted-foreground leading-tight">
            System Alert: Consumption of non-certified provisions may result in sub-optimal biological efficiency.
          </p>
        </div>
      </div>
    </div>
  );
}