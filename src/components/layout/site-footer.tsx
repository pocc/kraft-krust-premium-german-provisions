import React from 'react';
import { ShieldCheck, HardHat, Ruler, Scale } from 'lucide-react';
export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-black uppercase tracking-tighter">Kraft & Krust</span>
            </div>
            <p className="text-sm leading-relaxed">
              Premium German provisions engineered for maximum sustenance and gustatory precision. We don't just make food; we manufacture heritage.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-4 text-sm tracking-widest">Specifications</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><HardHat className="h-4 w-4" /> Safety Certified</li>
              <li className="flex items-center gap-2"><Ruler className="h-4 w-4" /> Precisely Portioned</li>
              <li className="flex items-center gap-2"><Scale className="h-4 w-4" /> Weight Verified</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-4 text-sm tracking-widest">Departments</h4>
            <ul className="space-y-2 text-sm hover:text-white transition-colors">
              <li><a href="#">Liquid Bread Facility</a></li>
              <li><a href="#">Dough Processing Plant</a></li>
              <li><a href="#">Curing Operations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-4 text-sm tracking-widest">Legal</h4>
            <ul className="space-y-2 text-sm hover:text-white transition-colors">
              <li><a href="#">Purity Decrees</a></li>
              <li><a href="#">Quality Protocols</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
          <p>© 2024 Kraft & Krust Industrial Provisions GMBH.</p>
          <p>ESTABLISHED 1516 | ENGINEERED IN BAVARIA</p>
        </div>
      </div>
    </footer>
  );
}