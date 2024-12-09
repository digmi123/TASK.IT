const templateBoards = {
  Product: {
    boards: [
      {
        name: "Product",
        columns: [
          { name: "To Do" },
          { name: "In Progress" },
          { name: "Completed" },
        ],
      },
    ],
  },

  Testing: {
    boards: [
      {
        name: "Testing",
        columns: [
          { name: "Testing Phase A" },
          { name: "Testing Phase B" },
          { name: "Testing Phase C" },
        ],
      },
    ],
  },
};

module.exports = { templateBoards };
