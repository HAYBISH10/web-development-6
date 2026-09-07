# Expense Tracker JavaScript

Expense Tracker JavaScript is a simple JavaScript project that demonstrates fundamental programming concepts for managing and analyzing sample expense data.

The project uses JavaScript variables, conditional statements, arrays, and loops to analyze expenses and compare total spending with a monthly income.

## Project Structure

```text
expense-tracker-js/
│
├── README.md
├── index.html
└── script.js
```

## What Was Completed

### Part 1 — Store Sample Expenses

Six expense variables were created to represent different spending categories:

* Rent
* Food
* Transport
* Internet
* Entertainment
* Utilities

Each expense is stored as a numeric value.

### Part 2 — Flag High Spending

Conditional statements are used to check each expense individually.

An expense greater than $100 is classified as:

```text
High Spending
```

Expenses of $100 or less are classified as:

```text
Normal Spending
```

### Part 3 — Calculate Total Expenses

All six expense values are stored inside an array.

A `for...of` loop is used to calculate the total expenses.

The expenses are not manually added together.

The calculated total is:

```text
Total Expenses: $645
```

### Part 4 — Budget Check

A variable named `monthlyIncome` stores the monthly income.

The total expenses are compared with the monthly income.

For this project:

```text
Monthly Income: $800
Total Expenses: $645
Status: Within Budget
```

The project displays `Within Budget` because the total expenses are less than the monthly income.

## JavaScript Concepts Used

This project demonstrates:

* Variables
* Numeric values
* Functions
* `if` statements
* `else if` statements
* `else` statements
* Arrays
* `for...of` loops
* Comparison operators
* Addition
* `console.log()`

## Output

All JavaScript output is displayed in the browser console.

There is intentionally no interactive user interface in this assignment because the purpose of the exercise is to practice JavaScript fundamentals using console output.

To view the output:

1. Open `index.html` in a browser.
2. Right-click the page.
3. Select **Inspect**.
4. Open the **Console** tab.

## Current Status

The project successfully stores sample expenses, identifies high spending, calculates total expenses using a loop, and checks whether spending is within the monthly budget.

## Future Improvements

Future versions can include:

* Adding a user interface
* Allowing users to enter expenses
* Adding expenses dynamically
* Calculating totals automatically
* Displaying expenses on the webpage
* Adding expense categories
* Adding charts and reports
* Storing expense data

## Author

HassAz Tech Hub

---

**Expense Tracker JavaScript — JavaScript Fundamentals Project**
