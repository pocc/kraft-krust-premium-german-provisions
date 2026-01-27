import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShopStore } from '@/store/shop-store';
export function HeroSection() {
  const setQuickViewProduct = useShopStore((s) => s.setQuickViewProduct);
  const scrollToInventory = () => {
    const element = document.getElementById("inventory");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  const handleShowFeaturedSpecs = () => {
    // Show technical specs for the lead product: Edel-Pilsner Precision (p1)
    setQuickViewProduct('p1');
  };
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-white/20 aspect-square" />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-amber-500 font-mono text-sm mb-6 tracking-[0.3em] uppercase"
          >
            <Settings2 className="h-4 w-4 animate-spin-slow" />
            Industrial Standard Provisions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
          >
            PRECISION <span className="text-amber-500">ENGINEERING</span> FOR YOUR STOMACH
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl font-medium"
          >
            Salami sliced to the nearest micron. Beer brewed to exact 1516 specifications. Dough twisted for aerodynamic excellence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              size="lg" 
              onClick={scrollToInventory}
              className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold uppercase rounded-none h-14 px-8"
            >
              Explore Inventory
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleShowFeaturedSpecs}
              className="border-slate-500 bg-slate-800/50 text-slate-100 hover:bg-slate-100 hover:text-slate-900 font-bold uppercase tracking-wider rounded-none h-14 px-8 transition-all duration-200 border-2"
            >
              <Hammer className="mr-2 h-5 w-5" /> Technical specs
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}