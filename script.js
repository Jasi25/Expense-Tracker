const API_URL = '/expenseTracker';

async function fetchExpenses() {
    const response = await fetch(API_URL);
    const expenses = await response.json();
    displayExpenses(expenses);
}

async function addExpense(expense) {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
    });
    fetchExpenses();
}

async function deleteExpense(id) {
    await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
    fetchExpenses();
}

document.getElementById("expense-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    const category = document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;

    await addExpense({ name, amount, category, date });
    e.target.reset();
});

document.getElementById("expense-list").addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        await deleteExpense(id);
    }
});

fetchExpenses();
