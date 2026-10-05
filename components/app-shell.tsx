"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Home, Menu, Settings2, WalletCards, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Resumen", icon: Home },
  { href: "/movimientos", label: "Movimientos", icon: WalletCards },
  { href: "/informes", label: "Informes", icon: FileText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen lg:flex">
    <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-[#dce4dc] bg-[#fbfcf9] p-6 transition-transform lg:static lg:translate-x-0`}>
      <div className="flex items-center justify-between"><Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="grid h-10 w-10 place-items-center rounded-2xl bg-moss text-xl text-white">₽</span><span><span className="block text-lg font-bold tracking-tight">pochanko</span><span className="block text-xs text-slate-500">banko · local-first</span></span></Link><button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X size={20} /></button></div>
      <nav className="mt-12 space-y-2" aria-label="Navegación principal">{nav.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${pathname === href ? "bg-mint text-moss" : "text-slate-600 hover:bg-slate-100"}`}><Icon size={19} strokeWidth={1.8} />{label}</Link>)}</nav>
      <div className="mt-auto rounded-2xl border border-[#dce4dc] bg-white p-4 shadow-soft"><div className="flex items-center gap-2 text-xs font-semibold text-moss"><span className="h-2 w-2 rounded-full bg-emerald-500" />Datos solo en este dispositivo</div><p className="mt-2 text-xs leading-5 text-slate-500">Tus datos financieros no salen de tu ordenador.</p></div>
    </aside>
    {open && <button className="fixed inset-0 z-10 bg-slate-900/20 lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú" />}
    <main className="min-w-0 flex-1"><header className="flex items-center justify-between border-b border-[#e3e9e1] bg-[#fbfcf9]/90 px-5 py-4 backdrop-blur lg:px-10"><button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu size={22} /></button><div className="hidden lg:block"><p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Mi espacio financiero</p></div><div className="ml-auto flex items-center gap-4"><button className="text-slate-500" aria-label="Configuración"><Settings2 size={19} /></button><div className="grid h-9 w-9 place-items-center rounded-full bg-[#e7d7bf] text-sm font-bold text-[#795d36]">DB</div></div></header><div className="mx-auto max-w-[1440px] p-5 lg:p-10">{children}</div></main>
  </div>;
}
