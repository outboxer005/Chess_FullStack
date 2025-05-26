# Chess Trainer & Practice Website ♟️
 ![Java](https://img.shields.io/badge/backend-Java%20SpringBoot-green.svg) ![Angular](https://img.shields.io/badge/frontend-Angular-red.svg)
This is a single-player chess web application that helps users **learn and practice chess** using the **Stockfish engine**. The frontend is built with **Angular**, and the backend is developed using **Java Spring Boot**. The project is fully integrated with a SQL database and a chess module.

---

## 🛠️ Tech Stack

- **Frontend**: Angular
- **Backend**: Java Spring Boot
- **Chess Engine**: Stockfish
- **Database**: SQL
- **Tools**: IntelliJ IDEA, Visual Studio Code

---

## 🚀 Features

- ✅ Play chess against the Stockfish engine
- ✅ Train and learn through an interactive UI
- ✅ Move validation and board rendering
- ✅ Clean modular code with API integration

---

## 📁 Project Structure
chess-project/
├── chess-frontend/ # Angular frontend
│ └── ...
└── chess-backend/ # Spring Boot backend
└── ...

---

## ⚙️ Setup Instructions

### 📦 Backend (Spring Boot)

1. Open the `chess-backend` folder in **IntelliJ IDEA**
2. Update the SQL database settings in `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/<your-database-name>
    spring.datasource.username=<your-username>
    spring.datasource.password=<your-password>
    ```
3. Run the main class to start the Spring Boot application.

---

### 🖥️ Frontend (Angular)

1. Open the `chess-frontend` folder in **Visual Studio Code**
2. Run the following commands in the terminal:

    ```bash
    npm install
    npm install -g @angular/cli
    ng serve
    ```

3. Open your browser and visit: [http://localhost:4200](http://localhost:4200)

---

## 🤖 Stockfish Integration

- The backend communicates with the **Stockfish engine** to calculate optimal moves.
- Make sure the Stockfish binary is accessible and properly configured in the backend logic.

---

## 📌 Notes

- Ensure your SQL server is up and running before starting the backend.
- CORS policies may need configuration if deploying frontend and backend separately.
- To customize difficulty or engine settings, modify the Stockfish parameters in the backend service.

---

## 📬 Contact

If you have any questions or suggestions, feel free to [open an issue](https://github.com/your-repo/issues) or contact the developer.

---
