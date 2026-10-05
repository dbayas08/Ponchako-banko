import { describe, expect, it } from "vitest";
import { calculateSummary, categoryTotals, type Transaction } from "../lib/finance";

const sample: Transaction[] = [
  { id: "a", date: "2025-01-01", description: "Sueldo", amount: 1000, type: "income", categoryId: "income", account: "Santander", merchant: "Empresa" },
  { id: "b", date: "2025-01-02", description: "Compra", amount: 80, type: "expense", categoryId: "groceries", account: "Revolut", merchant: "Tienda" },
  { id: "c", date: "2025-01-03", description: "Cena", amount: 20, type: "expense", categoryId: "food", account: "Revolut", merchant: "Bar" },
];

describe("finance calculations", () => {
  it("calculates income, expenses, balance, and budget remaining", () => {
    expect(calculateSummary(sample, 150)).toEqual({ income: 1000, expenses: 100, balance: 900, budgetUsed: 100, budgetRemaining: 50 });
  });

  it("groups expenses by category", () => {
    expect(categoryTotals(sample)).toEqual({ groceries: 80, food: 20 });
  });
});
