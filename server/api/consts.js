const templateBoards = {
  Product: {
    backgroundImage:
      "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1644/b77f5659e46279bceaacd1e58f180fc1/photo-1727121798717-5dd950142c00.webp",
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
    backgroundImage:
      "https://www.shutterstock.com/image-photo/calm-weather-on-sea-ocean-600nw-2212935531.jpg",
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
    backgroundImage:
      "https://static.vecteezy.com/system/resources/thumbnails/040/890/255/small_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg",
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
