import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useShopStore } from '@/store/shop-store';
import { PRODUCTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Plus, Package, Ruler, Info } from 'lucide-react';
import { toast } from 'sonner';
export function ProductQuickView() {
  const quickViewProductId = useShopStore((s) => s.quickViewProductId);
  const setQuickViewProduct = useShopStore((s) => s.setQuickViewProduct);
  const addToCart = useShopStore((s) => s.addToCart);
  const product = PRODUCTS.find((p) => p.id === quickViewProductId);
  const handleClose = () => setQuickViewProduct(null);
  const handleAdd = () => {
    if (product) {
      addToCart(product.id);
      toast.success(`${product.name} Added`, {
        description: "Provision logged in your current loadout.",
      });
      handleClose();
    }
  };
  if (!product) return null;
  return (
    <Dialog open={!!quickViewProductId} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-4 border-slate-900 rounded-none bg-background">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left: Product Schematic */}
          <div className="relative md:w-1/2 bg-slate-100 border-r-2 border-slate-900 flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[300px] object-contain shadow-2xl grayscale contrast-125"
              />
              {/* Engineering Overlays */}
              <div className="absolute -top-4 -left-4 border-l-2 border-t-2 border-slate-900 w-12 h-12" />
              <div className="absolute -bottom-4 -right-4 border-r-2 border-b-2 border-slate-900 w-12 h-12" />
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 font-mono text-[8px] rotate-90 uppercase tracking-widest text-slate-500">
                schematic_ref: {product.id.toUpperCase()}
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-slate-900 text-white px-2 py-1 text-[10px] font-mono font-black uppercase">
              Fig. 01: Product Deployment
            </div>
          </div>
          {/* Right: Technical Specs */}
          <div className="md:w-1/2 p-8 flex flex-col bg-white">
            <DialogHeader className="mb-8 space-y-1">
              <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-black uppercase mb-1">
                <ShieldCheck className="h-4 w-4" /> Certified Provision
              </div>
              <DialogTitle className="text-4xl font-black uppercase tracking-tighter leading-none">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 flex-grow">
              <div className="bg-slate-50 border-l-4 border-slate-900 p-4">
                <h4 className="text-xs font-mono font-black uppercase text-slate-500 mb-2 flex items-center gap-2">
                  <Info className="h-3 w-3" /> Operational Briefing
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-slate-200 divide-y divide-slate-200">
                  <div className="p-3 flex justify-between items-center text-sm">
                    <span className="font-mono text-xs uppercase text-slate-400">Class</span>
                    <span className="font-bold uppercase">{product.category}</span>
                  </div>
                  <div className="p-3 flex justify-between items-center text-sm">
                    <span className="font-mono text-xs uppercase text-slate-400">Unit Price</span>
                    <span className="font-black text-lg">��{product.price.toFixed(2)}</span>
                  </div>
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="p-3 flex justify-between items-center text-sm bg-slate-50/50">
                      <span className="font-mono text-xs uppercase text-slate-400">{spec.label}</span>
                      <span className="font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <Button onClick={handleAdd} className="flex-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white rounded-none h-14 font-black uppercase tracking-widest text-sm transition-all">
                <Plus className="h-5 w-5 mr-2" /> Add to Loadout
              </Button>
            </div>
            <div className="mt-4 text-[9px] font-mono text-slate-400 uppercase text-center tracking-tighter">
              Quality Protocol ISO-1516-GMBH | Verified Provision Series 3
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}