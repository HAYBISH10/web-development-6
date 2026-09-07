// ==========================================
// EXPENSE TRACKER JAVASCRIPT
// Assignment: JavaScript Fundamentals
// ==========================================


// ==========================================
// PART 1: STORE SAMPLE EXPENSES
// ==========================================

// Create variables for six different expenses.
// Each expense stores a numeric value.

let rent = 150;
let food = 85;
let transport = 60;
let internet = 120;
let entertainment = 75;
let utilities = 155;


// ==========================================
// PART 2: FLAG HIGH SPENDING
// ==========================================

// Function to check an individual expense.
// An expense above $100 is considered
// High Spending.

function checkSpending(category, amount) {

    if (amount > 100) {

        console.log(category + ": High Spending");

    } else if (amount >= 0) {

        console.log(category + ": Normal Spending");

    } else {

        console.log(category + ": Invalid Expense");

    }
}


// Check each expense individually.

checkSpending("Rent", rent);

checkSpending("Food", food);

checkSpending("Transport", transport);

checkSpending("Internet", internet);

checkSpending("Entertainment", entertainment);

checkSpending("Utilities", utilities);


// ==========================================
// PART 3: CALCULATE TOTAL EXPENSES
// ==========================================

// Store all six expense values inside an array.

let expenses = [
    rent,
    food,
    transport,
    internet,
    entertainment,
    utilities
];


// Create a variable to store the total.

let totalExpenses = 0;


// Use a loop to calculate the total.
// The expenses are NOT manually added together.

for (let expense of expenses) {

    totalExpenses = totalExpenses + expense;

}


// Display the calculated total.

console.log("--------------------------------");

console.log(
    "Total Expenses: $" + totalExpenses
);


// ==========================================
// PART 4: BUDGET CHECK
// ==========================================

// Store the monthly income.

let monthlyIncome = 800;


// Display the monthly income.

console.log(
    "Monthly Income: $" + monthlyIncome
);


// Compare total expenses with monthly income.

if (totalExpenses <= monthlyIncome) {

    console.log("Status: Within Budget");

} else {

    console.log("Status: Over Budget");

}


// ==========================================
// FINAL SUMMARY
// ==========================================

console.log("--------------------------------");

console.log("Expense Tracker Summary");

console.log("Monthly Income: $" + monthlyIncome);

console.log("Total Expenses: $" + totalExpenses);

if (totalExpenses <= monthlyIncome) {

    console.log("Status: Within Budget");

} else {

    console.log("Status: Over Budget");

}

console.log("--------------------------------");