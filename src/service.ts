import { Expense } from './expense.js';


export class Service {
    private expenses: Expense[] = [];

    constructor(expenses: Expense[]) {
        this.expenses = expenses;
    }

    getAllExpenses(): Expense[] {
        return this.expenses;
    }

    getTotalAmount(): number {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0)
    }

    getTop3Expenses(): Expense[] {
        return this.expenses.sort((a, b) => b.amount - a.amount).slice(0, 3);
    }


    searchExpenses(searchedName: string): Expense[] {
        return searchedName ? this.expenses.filter(expense => expense.name.toLowerCase().includes(searchedName?.toLowerCase() ?? '')) : new Array<Expense>();
    }

    moreExpensiveExpenses(amount: number): Expense[] {
        return amount? this.expenses.filter(expense => expense.amount > amount) : new Array<Expense>();
    }

    getExpenseLength(): number {
        return this.expenses.length;
    }

    getAverageAmount(): number {
        const totalAmount = this.getTotalAmount();
        return totalAmount / this.getExpenseLength();
    }

    individualCategoryStats(): { [key: string]: { count: number; total: number } } {
        const byCategory: { [key: string]: { count: number; total: number } } = {};

        this.expenses.forEach((expense) => {
            if (!byCategory[expense.category]) {
                byCategory[expense.category] = { count: 0, total: 0 };
            }

            byCategory[expense.category].count++;
            byCategory[expense.category].total += expense.amount;
        });

        //<Record>

        return byCategory;
    }
}