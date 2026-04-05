import { subDays, isAfter, format } from "date-fns";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const dashboardService = {
  getSummary: async (filter = '30days', transactions) => {
    await delay(700);
    const allTx = transactions;

    // 1. Determine date threshold based on filter
    let daysToSubtract = 30;
    let dateFormat = "dd MMM"; // Default for 30 days
    if (filter === '7days') { daysToSubtract = 7; dateFormat = "EEE"; } // Mon, Tue
    if (filter === 'year') { daysToSubtract = 365; dateFormat = "MMM"; } // Jan, Feb

    const thresholdDate = subDays(new Date(), daysToSubtract);

    // 2. Filter transactions
    const filteredTx = allTx.filter(tx => isAfter(tx.date, thresholdDate));

    // 3. Calculate Stats
    let totalIncome = 0;
    let totalExpenses = 0;

    filteredTx.forEach(tx => {
      if (tx.type === 'income') totalIncome += tx.amount;
      if (tx.type === 'expense') totalExpenses += tx.amount;
    });

    const balance = totalIncome - totalExpenses;

    // 4. Calculate Category Breakdown & Top Category
    const categoryMap = {};
    filteredTx.forEach(tx => {
      if (tx.type === 'expense') {
        categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
      }
    });

    const categoryData = Object.keys(categoryMap)
      .map(key => ({
        name: key,
        value: categoryMap[key]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const topCategory = categoryData.length > 0 ? categoryData[0].name : "None";
    const topCategoryAmount = categoryData.length > 0 ? categoryData[0].value : 0;

    // 5. Calculate Trend Data (Group by date format)
    const trendMap = {};
    // Pre-fill last N days/months to ensure continuous chart (simplified here to just existing data)
    filteredTx.sort((a, b) => a.date - b.date).forEach(tx => {
      const dateKey = format(tx.date, dateFormat);
      if (!trendMap[dateKey]) trendMap[dateKey] = { date: dateKey, income: 0, expense: 0 };

      if (tx.type === 'income') trendMap[dateKey].income += tx.amount;
      if (tx.type === 'expense') trendMap[dateKey].expense += tx.amount;
    });

    const trendData = Object.values(trendMap);

    return {
      stats: {
        balance,
        income: totalIncome,
        expenses: totalExpenses,
        growth: "+5.2%" // Mocked growth
      },
      insights: { topCategory, topCategoryAmount },
      trendData,
      categoryData
    };
  }
};