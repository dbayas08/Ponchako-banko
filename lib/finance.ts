export type TransactionType = "income" | "expense";

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  account: string;
  merchant: string;
};

export const categories: Category[] = [
  { id: "food", name: "Restaurantes y comida", color: "#ec806c" },
  { id: "groceries", name: "Supermercado", color: "#75a98d" },
  { id: "transport", name: "Transporte", color: "#efbd54" },
  { id: "subscriptions", name: "Suscripciones", color: "#8d88d7" },
  { id: "leisure", name: "Ocio", color: "#6b9fd2" },
  { id: "bills", name: "Facturas", color: "#9d8e80" },
  { id: "health", name: "Salud", color: "#e59ab3" },
];

export const transactions: Transaction[] = [
  { id: "1", date: "2025-01-27", description: "Nómina enero", amount: 2450, type: "income", categoryId: "income", account: "Santander", merchant: "Empresa" },
  { id: "2", date: "2025-01-26", description: "Compra semanal", amount: 68.4, type: "expense", categoryId: "groceries", account: "Revolut", merchant: "Mercadona" },
  { id: "3", date: "2025-01-25", description: "Cena con amigos", amount: 42.5, type: "expense", categoryId: "food", account: "Revolut", merchant: "La Trattoria" },
  { id: "4", date: "2025-01-24", description: "Abono transporte", amount: 30, type: "expense", categoryId: "transport", account: "Santander", merchant: "Consorcio" },
  { id: "5", date: "2025-01-22", description: "Netflix", amount: 17.99, type: "expense", categoryId: "subscriptions", account: "Revolut", merchant: "Netflix" },
  { id: "6", date: "2025-01-20", description: "Compra supermercado", amount: 54.2, type: "expense", categoryId: "groceries", account: "Santander", merchant: "Carrefour" },
  { id: "7", date: "2025-01-18", description: "Cine", amount: 24, type: "expense", categoryId: "leisure", account: "Revolut", merchant: "Cinesa" },
  { id: "8", date: "2025-01-15", description: "Luz", amount: 48.75, type: "expense", categoryId: "bills", account: "Santander", merchant: "Iberdrola" },
];

export function calculateSummary(items: Transaction[], budget: number) {
  const income = items.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const expenses = items.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
  return { income, expenses, balance: income - expenses, budgetUsed: expenses, budgetRemaining: budget - expenses };
}

export function categoryTotals(items: Transaction[]) {
  return items.filter((item) => item.type === "expense").reduce<Record<string, number>>((totals, item) => {
    totals[item.categoryId] = (totals[item.categoryId] ?? 0) + item.amount;
    return totals;
  }, {});
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}
