// In-memory mock data
let transactions = [
  { id: "1", description: "TechCorp Salary", amount: 5200, category: "Salary", type: "income", date: new Date(2023, 9, 25) },
  { id: "2", description: "AWS Hosting", amount: 150, category: "Software", type: "expense", date: new Date(2023, 9, 26) },
  { id: "3", description: "Client Freelance", amount: 850, category: "Freelance", type: "income", date: new Date(2023, 9, 28) },
  { id: "4", description: "WeWork Office", amount: 400, category: "Rent", type: "expense", date: new Date(2023, 9, 29) },
  { id: "5", description: "Figma Sub", amount: 15, category: "Software", type: "expense", date: new Date(2023, 9, 30) },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const transactionService = {
  getAll: async () => {
    await delay(600); // Simulate network
    return [...transactions].sort((a, b) => b.date - a.date);
  },

  getById: async (id) => {
    await delay(400);
    const tx = transactions.find((t) => t.id === id);
    if (!tx) throw new Error("Transaction not found");
    return { ...tx };
  },

  create: async (data) => {
    await delay(800);
    const newTx = { ...data, id: Date.now().toString(), amount: Number(data.amount) };
    transactions.unshift(newTx);
    return newTx;
  },

  update: async (id, data) => {
    await delay(800);
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Not found");
    transactions[index] = { ...transactions[index], ...data, amount: Number(data.amount) };
    return transactions[index];
  },

  delete: async (id) => {
    await delay(600);
    transactions = transactions.filter((t) => t.id !== id);
    return true;
  }
};