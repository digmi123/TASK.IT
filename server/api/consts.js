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

  Marketing: {
    boards: [
      {
        name: "Marketing",
        columns: [
          { name: "Marketing Phase A" },
          { name: "Marketing Phase B" },
          { name: "Marketing Phase C" },
        ],
      },
    ],
  },
};

module.exports = { templateBoards };
