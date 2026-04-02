const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const dashboardService = {
  getSummary: async (filter = '30days') => {
    await delay(700); // Simulate network

    // Mock response based on filters
    if (filter === '7days') {
      return {
        stats: { balance: 12500, income: 3200, expenses: 850, growth: "+2.4%" },
        insights: { topCategory: "Software", topCategoryAmount: 450 },
        trendData: [
          { date: "Mon", income: 400, expense: 200 },
          { date: "Tue", income: 300, expense: 150 },
          { date: "Wed", income: 800, expense: 100 },
          { date: "Thu", income: 200, expense: 50 },
          { date: "Fri", income: 500, expense: 200 },
          { date: "Sat", income: 1000, expense: 150 },
          { date: "Sun", income: 0, expense: 0 },
        ],
        categoryData: [
          { name: "Software", value: 450 },
          { name: "Rent", value: 200 },
          { name: "Food", value: 100 },
          { name: "Transport", value: 100 },
        ]
      };
    }

    if (filter === 'year') {
      return {
        stats: { balance: 45000, income: 85000, expenses: 40000, growth: "+18.5%" },
        insights: { topCategory: "Rent", topCategoryAmount: 14400 },
        trendData: [
          { date: "Jan", income: 6000, expense: 3200 },
          { date: "Feb", income: 6200, expense: 3100 },
          { date: "Mar", income: 7500, expense: 4000 },
          { date: "Apr", income: 5800, expense: 2900 },
          { date: "May", income: 8000, expense: 3500 },
          { date: "Jun", income: 9000, expense: 4200 },
        ],
        categoryData: [
          { name: "Rent", value: 14400 },
          { name: "Software", value: 8500 },
          { name: "Marketing", value: 12000 },
          { name: "Travel", value: 5100 },
        ]
      };
    }

    // Default to '30days'
    return {
      stats: { balance: 24500, income: 12400, expenses: 4200, growth: "+8.2%" },
      insights: { topCategory: "Marketing", topCategoryAmount: 1800 },
      trendData: [
        { date: "Week 1", income: 3000, expense: 1200 },
        { date: "Week 2", income: 2500, expense: 900 },
        { date: "Week 3", income: 4100, expense: 1500 },
        { date: "Week 4", income: 2800, expense: 600 },
      ],
      categoryData: [
        { name: "Marketing", value: 1800 },
        { name: "Software", value: 1200 },
        { name: "Rent", value: 800 },
        { name: "Office", value: 400 },
      ]
    };
  }
};