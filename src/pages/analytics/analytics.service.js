import { isWithinInterval, format } from "date-fns";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const analyticsService = {
    getReport: async (filters, transactions) => {
        await delay(800);
        const { startDate, endDate, category } = filters;

        const allTx = transactions;

        // 1. Filter by Date and Category
        const filteredTx = allTx.filter(tx => {
            const inDateRange = isWithinInterval(tx.date, { start: startDate, end: endDate });
            const matchCategory = category === "all" || tx.category.toLowerCase() === category.toLowerCase();
            return inDateRange && matchCategory;
        });

        // 2. Summary Calculations
        let totalIncome = 0;
        let totalExpense = 0;

        filteredTx.forEach(tx => {
            if (tx.type === 'income') totalIncome += tx.amount;
            if (tx.type === 'expense') totalExpense += tx.amount;
        });

        const netSavings = totalIncome - totalExpense;
        const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) + "%" : "0%";

        // 3. Group by Month for Charts
        const monthMap = {};
        const categoryMap = {};

        // Sort ascending for cumulative calculations
        filteredTx.sort((a, b) => a.date - b.date).forEach(tx => {
            const monthKey = format(tx.date, 'MMM yy'); // e.g., 'Oct 23'

            if (!monthMap[monthKey]) {
                monthMap[monthKey] = { month: monthKey, income: 0, expense: 0 };
            }

            if (tx.type === 'income') monthMap[monthKey].income += tx.amount;
            if (tx.type === 'expense') {
                monthMap[monthKey].expense += tx.amount;
                categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
            }
        });

        // 4. Build Comparison and Cumulative Balance Arrays
        const comparisonData = [];
        const balanceData = [];
        let runningBalance = 0;

        Object.values(monthMap).forEach(data => {
            comparisonData.push({ month: data.month, income: data.income, expense: data.expense });
            runningBalance += (data.income - data.expense);
            balanceData.push({ month: data.month, balance: runningBalance });
        });

        // 5. Build Category Breakdown
        const categoryBreakdown = Object.keys(categoryMap).map(key => ({
            name: key,
            value: categoryMap[key]
        })).sort((a, b) => b.value - a.value);

        return {
            summary: {
                totalIncome,
                totalExpense,
                netSavings,
                savingsRate,
            },
            comparisonData,
            balanceData,
            categoryBreakdown
        };
    }
};