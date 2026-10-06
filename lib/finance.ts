export type TransactionType = "income" | "expense";
export type Category = { id: string; name: string; color: string };
export type Transaction = { id: string; date: string; description: string; amount: number; type: TransactionType; categoryId: string; account: string; merchant: string; notes?: string; externalId?: string };
export type Budget = { id: string; categoryId: string; period: "weekly" | "monthly"; amount: number };

export const initialCategories: Category[] = [
  ["groceries", "Supermercado", "#75a98d"], ["food", "Restaurantes y comida", "#ec806c"], ["transport", "Transporte", "#efbd54"],
  ["clothes", "Ropa", "#b286d8"], ["personal", "Cuidado personal", "#e59ab3"], ["subscriptions", "Suscripciones", "#8d88d7"],
  ["health", "Salud", "#5fb7b0"], ["leisure", "Ocio", "#6b9fd2"], ["travel", "Viajes", "#d39456"], ["bills", "Facturas", "#9d8e80"],
  ["hobbies", "Hobbies", "#9ba7d7"], ["other", "Otros", "#94a3b8"],
].map(([id, name, color]) => ({ id, name, color }));
export const initialTransactions: Transaction[] = [
  { id: "1", date: "2025-01-27", description: "Nómina enero", amount: 2450, type: "income", categoryId: "income", account: "Santander", merchant: "Empresa" },
  { id: "2", date: "2025-01-26", description: "Compra semanal", amount: 68.4, type: "expense", categoryId: "groceries", account: "Revolut", merchant: "Mercadona" },
  { id: "3", date: "2025-01-25", description: "Cena con amigos", amount: 42.5, type: "expense", categoryId: "food", account: "Revolut", merchant: "La Trattoria" },
  { id: "4", date: "2025-01-24", description: "Abono transporte", amount: 30, type: "expense", categoryId: "transport", account: "Santander", merchant: "Consorcio" },
  { id: "5", date: "2025-01-22", description: "Netflix", amount: 17.99, type: "expense", categoryId: "subscriptions", account: "Revolut", merchant: "Netflix" },
  { id: "6", date: "2025-01-20", description: "Compra supermercado", amount: 54.2, type: "expense", categoryId: "groceries", account: "Santander", merchant: "Carrefour" },
  { id: "7", date: "2025-01-18", description: "Cine", amount: 24, type: "expense", categoryId: "leisure", account: "Revolut", merchant: "Cinesa" },
  { id: "8", date: "2025-01-15", description: "Luz", amount: 48.75, type: "expense", categoryId: "bills", account: "Santander", merchant: "Iberdrola" },
];
export const initialBudgets: Budget[] = [
  { id: "b1", categoryId: "food", period: "monthly", amount: 180 }, { id: "b2", categoryId: "groceries", period: "monthly", amount: 300 },
  { id: "b3", categoryId: "transport", period: "monthly", amount: 100 }, { id: "b4", categoryId: "leisure", period: "monthly", amount: 120 },
];
export function calculateSummary(items: Transaction[], budget: number) { const income = items.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0); const expenses = items.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0); return { income, expenses, balance: income - expenses, budgetUsed: expenses, budgetRemaining: budget - expenses }; }
export function categoryTotals(items: Transaction[]) { return items.filter((item) => item.type === "expense").reduce<Record<string, number>>((totals, item) => { totals[item.categoryId] = (totals[item.categoryId] ?? 0) + item.amount; return totals; }, {}); }
export function formatCurrency(value: number) { return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value); }
export function getCategory(categoryId: string, list: Category[] = initialCategories) { return list.find((category) => category.id === categoryId); }
export function isDuplicate(candidate: Transaction, items: Transaction[]) { return Boolean(candidate.externalId && items.some((item) => item.externalId === candidate.externalId)) || items.some((item) => item.date === candidate.date && item.amount === candidate.amount && item.description.trim().toLowerCase() === candidate.description.trim().toLowerCase()); }
