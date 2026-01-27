import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useShopStore } from '@/store/shop-store';
import { PRODUCTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Plus, Info } from 'lucide-react';
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
      toast.success(`${product.name} Logged`, {
        description: "Provision successfully added to active loadout.",
      });
      handleClose();
    }
  };
  if (!product) return null;
  return (
    <Dialog open={!!quickViewProductId} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-4 border-slate-900 rounded-none bg-background gap-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left: Product Schematic (Blueprint Style) */}
          <div className="relative md:w-1/2 bg-slate-900 border-r-2 border-slate-700 flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                 style={{ 
                   backgroundImage: 'linear-gradient(#4a5568 1px, transparent 1px), linear-gradient(90deg, #4a5568 1px, transparent 1px)', 
                   backgroundSize: '30px 30px' 
                 }} />
            <div className="relative z-10">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[320px] object-contain shadow-2xl transition-all duration-700"
                style={{
                  filter: 'brightness(0.8) contrast(1.2) sepia(1) hue-rotate(180deg) saturate(2)'
                }}
              />
              {/* Engineering Overlays */}
              <div className="absolute -top-6 -left-6 border-l-2 border-t-2 border-cyan-500/50 w-16 h-16" />
              <div className="absolute -bottom-6 -right-6 border-r-2 border-b-2 border-cyan-500/50 w-16 h-16" />
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 font-mono text-[9px] rotate-90 uppercase tracking-[0.4em] text-cyan-400/60 whitespace-nowrap">
                blueprint_ref: {product.id.toUpperCase()}-XG
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-cyan-900/80 border border-cyan-500/50 text-cyan-100 px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest">
              Fig. 2.4: Tactical Assembly
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[8px] text-cyan-500/40 uppercase">
              X-RAY RENDER ENABLED // SPEC: 100%
            </div>
          </div>
          {/* Right: Technical Specs */}
          <div className="md:w-1/2 p-10 flex flex-col bg-white">
            <DialogHeader className="mb-8 space-y-1">
              <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-black uppercase mb-1 tracking-tighter">
                <ShieldCheck className="h-4 w-4" /> Kraft-Krust Certified Provision
              </div>
              <DialogTitle className="text-4xl font-black uppercase tracking-tighter leading-none text-slate-900">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 flex-grow">
              <div className="bg-slate-50 border-l-4 border-slate-900 p-5">
                <h4 className="text-xs font-mono font-black uppercase text-slate-400 mb-2 flex items-center gap-2">
                  <Info className="h-3 w-3" /> Operational Briefing
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-2 border-slate-900 divide-y-2 divide-slate-900">
                  <div className="p-3 flex justify-between items-center text-sm">
                    <span className="font-mono text-xs uppercase text-slate-400 font-bold">Class ID</span>
                    <span className="font-black uppercase text-slate-900">{product.category}</span>
                  </div>
                  <div className="p-3 flex justify-between items-center text-sm bg-amber-50">
                    <span className="font-mono text-xs uppercase text-slate-500 font-bold">Standard Unit Price</span>
                    <span className="font-black text-xl text-slate-900">€{product.price.toFixed(2)}</span>
                  </div>
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="p-3 flex justify-between items-center text-sm">
                      <span className="font-mono text-xs uppercase text-slate-400 font-bold">{spec.label}</span>
                      <span className="font-black text-slate-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 flex gap-3">
              <Button 
                onClick={handleAdd} 
                className="flex-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white rounded-none h-16 font-black uppercase tracking-[0.2em] text-sm transition-all border-none"
              >
                <Plus className="h-5 w-5 mr-2" /> Add to Loadout
              </Button>
            </div>
            <div className="mt-6 text-[9px] font-mono text-slate-400 uppercase text-center tracking-tighter">
              Quality Protocol ISO-1516-KRAFT-KRUST | Batch Verification: {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}