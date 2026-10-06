"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Budget, Category, initialBudgets, initialCategories, initialTransactions, Transaction, isDuplicate } from "@/lib/finance";

const STORAGE_KEY = "pochanko-banko:v1";
type Store = { transactions: Transaction[]; categories: Category[]; budgets: Budget[] };
type FinanceContext = Store & { hydrated: boolean; addTransaction: (item: Omit<Transaction, "id">) => void; updateTransaction: (item: Transaction) => void; deleteTransaction: (id: string) => void; addImported: (items: Omit<Transaction, "id">[]) => { added: number; duplicated: number }; resetDemo: () => void; addCategory: (item: Omit<Category, "id">) => void; updateCategory: (item: Category) => void; deleteCategory: (id: string) => void; upsertBudget: (item: Omit<Budget, "id">) => void };
const Context = createContext<FinanceContext | null>(null);
const id = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>({ transactions: initialTransactions, categories: initialCategories, budgets: initialBudgets });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { try { const saved = window.localStorage.getItem(STORAGE_KEY); if (saved) setStore(JSON.parse(saved)); } catch { /* Safe demo defaults remain active. */ } finally { setHydrated(true); } }, []);
  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); }, [hydrated, store]);
  const value = useMemo<FinanceContext>(() => ({ ...store, hydrated,
    addTransaction: (item) => setStore((s) => ({ ...s, transactions: [{ ...item, id: id() }, ...s.transactions] })),
    updateTransaction: (item) => setStore((s) => ({ ...s, transactions: s.transactions.map((current) => current.id === item.id ? item : current) })),
    deleteTransaction: (transactionId) => setStore((s) => ({ ...s, transactions: s.transactions.filter((item) => item.id !== transactionId) })),
    addImported: (items) => { const duplicatedItems = items.filter((item) => isDuplicate(item as Transaction, store.transactions)); const fresh = items.filter((item) => !isDuplicate(item as Transaction, store.transactions)).map((item) => ({ ...item, id: id() })); setStore((s) => ({ ...s, transactions: [...fresh, ...s.transactions] })); return { added: fresh.length, duplicated: duplicatedItems.length }; },
    resetDemo: () => setStore({ transactions: initialTransactions, categories: initialCategories, budgets: initialBudgets }),
    addCategory: (item) => setStore((s) => ({ ...s, categories: [...s.categories, { ...item, id: id() }] })),
    updateCategory: (item) => setStore((s) => ({ ...s, categories: s.categories.map((current) => current.id === item.id ? item : current) })),
    deleteCategory: (categoryId) => setStore((s) => ({ ...s, categories: s.categories.filter((item) => item.id !== categoryId) })),
    upsertBudget: (item) => setStore((s) => { const existing = s.budgets.find((budget) => budget.categoryId === item.categoryId && budget.period === item.period); return { ...s, budgets: existing ? s.budgets.map((budget) => budget.id === existing.id ? { ...budget, ...item } : budget) : [...s.budgets, { ...item, id: id() }] }; }),
  }), [store, hydrated]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useFinance() { const context = useContext(Context); if (!context) throw new Error("useFinance debe usarse dentro de FinanceProvider"); return context; }
