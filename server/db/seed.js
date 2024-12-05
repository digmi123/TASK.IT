const users = [
  {
    email: "a@b.com",
    password: "12345678",
    boards: [
      {
        name: "Board 1",
        columns: [
          {
            name: "To Do",
            tasks: [
              {
                title: "Set up project structure",
                description:
                  "Organize the folders and create basic project structure.",
                createdTime: new Date("2024-11-01T10:00:00"),
              },
              {
                title: "Install dependencies",
                description:
                  "Add required libraries and packages to the project.",
                createdTime: new Date("2024-11-01T11:00:00"),
              },
            ],
          },
          {
            name: "In Progress",
            tasks: [
              {
                title: "Create Home page component",
                description:
                  "Build the main Home page component with header and footer.",
                createdTime: new Date("2024-11-01T12:00:00"),
              },
              {
                title: "Integrate API",
                description:
                  "Connect to the job API for fetching job listings.",
                createdTime: new Date("2024-11-01T13:00:00"),
              },
            ],
          },
          {
            name: "Completed",
            tasks: [
              {
                title: "Implement navigation",
                description: "Set up React Router for different pages.",
                createdTime: new Date("2024-11-01T14:00:00"),
              },
            ],
          },
        ],
      },
    ],
  },

  {
    email: "c@d.com",
    password: "12345678",
    boards: [
      {
        name: "Board 2",
        columns: [
          {
            name: "To Do",
            tasks: [],
          },
          {
            name: "In Progress",
            tasks: [
              {
                title: "Integrate API",
                description:
                  "Connect to the job API for fetching job listings.",
                createdTime: new Date("2024-11-01T13:00:00"),
              },
            ],
          },
          {
            name: "Completed",
            tasks: [
              {
                title: "Implement navigation",
                description: "Set up React Router for different pages.",
                createdTime: new Date("2024-11-01T14:00:00"),
              },
            ],
          },
        ],
      },

      {
        name: "Board 3",
        columns: [
          {
            name: "To Do",
            tasks: [
              {
                title: "Set up project structure",
                description:
                  "Organize the folders and create basic project structure.",
                createdTime: new Date("2024-11-01T10:00:00"),
              },
              {
                title: "Install dependencies",
                description:
                  "Add required libraries and packages to the project.",
                createdTime: new Date("2024-11-01T11:00:00"),
              },
            ],
          },
          {
            name: "In Progress",
            tasks: [],
          },
          {
            name: "Completed",
            tasks: [
              {
                title: "Implement navigation",
                description: "Set up React Router for different pages.",
                createdTime: new Date("2024-11-01T14:00:00"),
              },
            ],
          },
        ],
      },
    ],
  },
];

const { User, Board, Column, Task } = require("./");

const seedData = async () => {
  for (const user of users) {
    const newUser = await User.create(user);
    for (const board of user.boards) {
      const newBoard = await Board.create({ ...board, owner_id: newUser.id });
      for (const column of board.columns) {
        const newColumn = await Column.create({
          ...column,
          board_id: newBoard.id,
        });
        for (const task of column.tasks) {
          const newTask = await Task.create({
            ...task,
            parent_column: newColumn.id,
          });
        }
      }
    }
  }
};

seedData().then(() => {
  console.log("Database seeded successfully.");
});
