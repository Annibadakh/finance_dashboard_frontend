import { apiHandler } from "../../api/apiHandler";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const transactionService = {
  getAll: apiHandler(async (_, { getAll }) => {
    await delay(600);

    const data = getAll().sort((a, b) => b.date - a.date);
    console.log(data)
    return {
      status: 200,
      data: {
        message: "Transactions fetched successfully",
        data,
      },
    };
  }),

  getById: apiHandler(async (id, { getAll }) => {
    await delay(400);

    const tx = getAll().find((t) => t.id === id);

    if (!tx) {
      throw {
        response: {
          status: 400,
          data: { message: "Transaction not found" },
        },
      };
    }

    return {
      status: 200,
      data: {
        message: "Transaction fetched successfully",
        data: tx,
      },
    };
  }),

  create: apiHandler(async (data, { add }) => {
    await delay(800);

    const newTx = {
      ...data,
      id: Date.now().toString(),
      amount: Number(data.amount),
    };

    add(newTx); // ✅ context

    return {
      status: 201,
      data: {
        message: "Transaction created successfully",
        data: newTx,
      },
    };
  }),

  update: apiHandler(async (id, data, { getAll, update }) => {
    await delay(800);

    const existing = getAll().find((t) => t.id === id);

    if (!existing) {
      throw {
        response: {
          status: 400,
          data: { message: "Transaction not found" },
        },
      };
    }

    const updatedTx = {
      ...data,
      amount: Number(data.amount),
    };

    update(id, updatedTx); // ✅ context

    return {
      status: 201,
      data: {
        message: "Transaction updated successfully",
        data: { ...existing, ...updatedTx },
      },
    };
  }),

  delete: apiHandler(async (id, { getAll, remove }) => {
    await delay(600);

    const exists = getAll().some((t) => t.id === id);

    if (!exists) {
      throw {
        response: {
          status: 400,
          data: { message: "Transaction not found" },
        },
      };
    }

    remove(id); // ✅ context

    return {
      status: 201,
      data: {
        message: "Transaction deleted successfully",
        data: true,
      },
    };
  }),
};