
/* =====================================
   SPENDWISE - WEEK 6
   Interactive Budgeting Application
===================================== */

// 1. SELECT HTML ELEMENTS

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");

const expenseList = document.getElementById("expenseList");
const totalBudgetElement = document.getElementById("totalBudget");
const totalExpensesElement = document.getElementById("totalExpenses");
const remainingBalanceElement = document.getElementById("remainingBalance");
const expenseCountElement = document.getElementById("expenseCount");

const budgetInput = document.getElementById("budgetInput");
const updateBudgetBtn = document.getElementById("updateBudgetBtn");

const budgetStatus = document.getElementById("budgetStatus");
const budgetProgress = document.getElementById("budgetProgress");
const budgetPercentage = document.getElementById("budgetPercentage");
const budgetMessage = document.getElementById("budgetMessage");

const formMessage = document.getElementById("formMessage");
const emptyMessage = document.getElementById("emptyMessage");
const clearExpensesBtn = document.getElementById("clearExpensesBtn");


// 2. APPLICATION DATA

let budget = Number(localStorage.getItem("spendwiseBudget")) || 20000;

let expenses = [];

try {
    const savedExpenses = JSON.parse(
        localStorage.getItem("spendwiseExpenses")
    );

    if (Array.isArray(savedExpenses)) {
        expenses = savedExpenses.filter(expense =>
            expense &&
            typeof expense.name === "string" &&
            typeof expense.category === "string" &&
            Number.isFinite(Number(expense.amount)) &&
            Number(expense.amount) > 0 &&
            typeof expense.id === "string"
        );
    }
} catch (error) {
    expenses = [];
    console.error("Could not load saved expenses:", error);
}


// 3. FORMAT CURRENCY

function formatCurrency(amount) {
    return "KSh " + Number(amount).toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// 4. SAVE DATA TO LOCAL STORAGE

function saveData() {
    localStorage.setItem("spendwiseBudget", budget);

    localStorage.setItem(
        "spendwiseExpenses",
        JSON.stringify(expenses)
    );
}


// 5. CALCULATE TOTAL EXPENSES USING A LOOP

function calculateTotalExpenses() {
    let total = 0;

    for (const expense of expenses) {
        total += Number(expense.amount);
    }

    return total;
}


// 6. UPDATE DASHBOARD USING DOM MANIPULATION

function updateDashboard() {

    const total = calculateTotalExpenses();
    const remaining = budget - total;

    totalBudgetElement.textContent = formatCurrency(budget);
    totalExpensesElement.textContent = formatCurrency(total);
    remainingBalanceElement.textContent = formatCurrency(remaining);
    expenseCountElement.textContent = expenses.length;

    budgetInput.value = budget;

    // Calculate budget utilization

    let percentage = 0;

    if (budget > 0) {
        percentage = (total / budget) * 100;
    }

    const progressWidth = Math.min(percentage, 100);

    budgetProgress.style.width = progressWidth + "%";

    budgetPercentage.textContent = percentage.toFixed(1) + "%";

    // 7. CONDITIONAL STATEMENTS FOR BUDGET DECISIONS

    budgetStatus.className = "status-badge";

    if (budget === 0) {

        budgetStatus.textContent = "Set Your Budget";
        budgetMessage.textContent =
            "Please set a monthly budget to monitor your spending.";

        budgetStatus.classList.add("status-warning");

    } else if (total > budget) {

        budgetStatus.textContent = "Over Budget";

        budgetMessage.textContent =
            "Warning! You have exceeded your monthly budget by " +
            formatCurrency(total - budget) + ".";

        budgetStatus.classList.add("status-danger");

    } else if (percentage >= 80) {

        budgetStatus.textContent = "Almost Reached";

        budgetMessage.textContent =
            "Be careful! You have used " +
            percentage.toFixed(1) +
            "% of your monthly budget.";

        budgetStatus.classList.add("status-warning");

    } else {

        budgetStatus.textContent = "Within Budget";

        budgetMessage.textContent =
            "Good job! You are managing your expenses well.";

    }

    // Change remaining balance color

    if (remaining < 0) {
        remainingBalanceElement.style.color = "#dc3545";
    } else {
        remainingBalanceElement.style.color = "#173b70";
    }

    saveData();
}


// 8. DISPLAY EXPENSES USING A LOOP AND DOM MANIPULATION

function displayExpenses() {

    expenseList.innerHTML = "";

    // Check whether there are expense records

    if (expenses.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

    // Sort newest records first

    const sortedExpenses = [...expenses].reverse();

    // Process each expense using forEach()

    sortedExpenses.forEach(function(expense) {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        const categoryCell = document.createElement("td");
        const dateCell = document.createElement("td");
        const amountCell = document.createElement("td");
        const actionCell = document.createElement("td");

        // Use textContent to safely display user input

        nameCell.textContent = expense.name;

        const categoryBadge = document.createElement("span");
        categoryBadge.className = "category";
        categoryBadge.textContent = expense.category;

        categoryCell.appendChild(categoryBadge);

        dateCell.textContent = expense.date;

        amountCell.textContent = formatCurrency(expense.amount);

        // Create delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";
        deleteButton.dataset.id = expense.id;

        actionCell.appendChild(deleteButton);

        // Add cells to the table row

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        // Add row to the webpage

        expenseList.appendChild(row);

    });

}


// 9. HANDLE FORM SUBMISSION USING AN EVENT LISTENER

expenseForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing

    event.preventDefault();

    // Get user input

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;
    const date = expenseDate.value;

    // Validate user input

    if (
        !name ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        !category ||
        !date
    ) {

        showMessage("Please enter valid expense details.", "error");
        return;

    }

    // Create a new expense object

    const newExpense = {

        id: crypto.randomUUID(),

        name: name,

        amount: amount,

        category: category,

        date: date

    };

    // Store the expense in the array

    expenses.push(newExpense);

    // Save the updated array

    saveData();

    // Update dashboard and transactions

    updateDashboard();

    displayExpenses();

    // Reset form

    expenseForm.reset();

    setTodayDate();

    showMessage("Expense added successfully!", "success");

});


// 10. UPDATE MONTHLY BUDGET

updateBudgetBtn.addEventListener("click", function() {

    const newBudget = Number(budgetInput.value);

    if (!Number.isFinite(newBudget) || newBudget < 0) {

        showMessage("Please enter a valid budget.", "error");

        return;

    }

    budget = newBudget;

    updateDashboard();

    showMessage("Budget updated successfully!", "success");

});


// 11. DELETE EXPENSES USING EVENT DELEGATION

expenseList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        const expenseId = event.target.dataset.id;

        expenses = expenses.filter(function(expense) {

            return expense.id !== expenseId;

        });

        saveData();

        updateDashboard();

        displayExpenses();

        showMessage("Expense deleted successfully!", "success");

    }

});


// 12. CLEAR ALL EXPENSES

clearExpensesBtn.addEventListener("click", function() {

    if (expenses.length === 0) {

        showMessage("There are no expenses to clear.", "error");

        return;

    }

    const confirmation = confirm(
        "Are you sure you want to delete all expenses?"
    );

    if (confirmation) {

        expenses = [];

        saveData();

        updateDashboard();

        displayExpenses();

        showMessage("All expenses have been cleared.", "success");

    }

});


// 13. DISPLAY SUCCESS AND ERROR MESSAGES

function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className = "form-message";

    if (type === "success") {

        formMessage.classList.add("success-message");

    } else {

        formMessage.classList.add("error-message");

    }

}


// 14. SET TODAY'S DATE

function setTodayDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    expenseDate.value = `${year}-${month}-${day}`;

}


// 15. INITIALIZE APPLICATION

function initializeSpendWise() {

    setTodayDate();

    updateDashboard();

    displayExpenses();

    console.log("SpendWise application initialized successfully.");

}

// Start the application

initializeSpendWise();
