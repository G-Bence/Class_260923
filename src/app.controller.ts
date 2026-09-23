import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Expense } from './expense.js';
import { Query } from '@nestjs/common';


const expenses: Expense[] = [
  { name: 'Groceries', amount: 15000, category: 'food' },
  { name: 'Electricity Bill', amount: 8000, category: 'utilities' },
  { name: 'Movie Tickets', amount: 3000, category: 'entertainment' },
  { name: 'Miscellaneous', amount: 5000, category: 'misc' },
  { name: 'Dining Out', amount: 12000, category: 'food' },
  { name: 'Water Bill', amount: 4000, category: 'utilities' },
  { name: 'Concert Tickets', amount: 10000, category: 'entertainment' },
  { name: 'Gym Membership', amount: 7000, category: 'misc' },
  { name: 'Internet Bill', amount: 3000, category: 'utilities' },
  { name: 'Birthday Party', amount: 20000, category: 'entertainment' },
  { name: 'New Year\'s Eve', amount: 25000, category: 'entertainment' },
];

const colorCodes: Record<Expense['category'], string> = {
  food: '#FF5733',          // Red for food
  utilities: '#33C1FF',     // Blue for utilities
  entertainment: '#9D33FF', // Purple for entertainment
  misc: '#33FF57',          // Green for miscellaneous
};


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      allExpenses: expenses,
      totalAmount: expenses.reduce((total, expense) => total + expense.amount, 0),
      title: "Expense Tracker - Home",
    }
  }

  @Get('/all')
  @Render('all')
  getAllExpenses() {
    return {
      allExpenses: expenses,
      totalAmount: expenses.reduce((total, expense) => total + expense.amount, 0),
      colorCodes: colorCodes,
      title: "All Expenses",
    }
  }

  @Get('/top3')
  @Render('all')
  getTop3Expenses() {
    return {
      allExpenses: expenses.sort((a, b) => b.amount - a.amount).slice(0, 3),
      totalAmount: expenses.reduce((total, expense) => total + expense.amount, 0),
      colorCodes: colorCodes,
      title: "Top 3 Expenses",
    }
  }



  @Get('/search')
  @Render('search')
  searchExpenses(@Query('searchedName') searchedName: string ) {
    return {
      allExpenses: searchedName? expenses.filter(expense => expense.name.toLowerCase().includes(searchedName?.toLowerCase() ?? '')) : new Array<Expense>(),
      colorCodes: colorCodes,
      title: "Search Expenses",
    }
  }


  @Get('/expensive')
  @Render('expensive')
  getExpensiveExpenses(@Query('amount') amount: number ) {
    console.log("Amount query parameter:", amount);
    return {
      allExpenses: amount? expenses.filter(expense => expense.amount > amount) : new Array<Expense>(),
      colorCodes: colorCodes,
      title: "Filter by Amount",
    }
  }


  @Get('/stats')
  @Render('stats')
  getStats() {
    const amountOfExpenses = expenses.length;
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    const averageAmount = totalAmount / expenses.length;
    const byCategory = {
      food: { count: 0, total: 0 },
      utilities: { count: 0, total: 0 },
      entertainment: { count: 0, total: 0 },
      misc: { count: 0, total: 0 },
    };

    expenses.forEach((expense) => {
      byCategory[expense.category].count++;
      byCategory[expense.category].total += expense.amount;
    });
    //What is this "Record" type? It is a built-in TypeScript utility type that allows you to create an object type with specific keys and values. In this case, it is used to create an object where the keys are of type Expense['category'] (which can be "food", "utilities", "entertainment", or "misc") and the values are objects containing a count and total for each category.
    //So, basically a dictionary on steroids, right? Exactly! It's a way to define an object with dynamic keys and specific value types, making it very useful for aggregating data like this.
    //Interesting, and what about this acc in the reduce function? The acc parameter in the reduce function stands for "accumulator." It's an object that accumulates the results of the reduction as you iterate through the expenses array. In this case, it's used to keep track of the count and total amount for each expense category. As you process each expense, you update the accumulator with the relevant information for that category.
    //So, it's like a running total that gets updated with each expense? Exactly! The accumulator starts as an empty object and gets populated with the count and total for each category as you iterate through the expenses. By the end of the reduction, you'll have a complete summary of all expenses categorized by their type.

    return {
      amountOfExpenses: amountOfExpenses,
      totalAmount: totalAmount,
      averageAmount: averageAmount.toFixed(2),
      byCategory: byCategory,
      title: "Statistics",
    }
  }

  /*
Kategóriánként:
Hány darab költés volt?
Összeg
Átlag */
}
