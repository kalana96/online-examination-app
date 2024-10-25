# s

# Online Examination System

This is an **Online Examination System** built using **React** for the frontend and **Spring Boot** for the backend.
The project is designed to handle exam management with RESTful APIs powered by Spring Boot and a user-friendly interface created with React.

---

## Project Structure

```plaintext
employee-management-app/
├── employee-management-client/ # React Frontend Project
└── employee-management-server/ # Spring Boot Backend Project
```

---

## Technologies Used

### Frontend (React)

- **React** (JavaScript library for building user interfaces)
- **Axios** (for HTTP requests)
- **React Router** (for navigation)
- **HTML/CSS** (for styling)
- **Tailwind CSS** (for styling)

### Backend (Spring Boot)

- **Spring Boot** (Java framework for building RESTful APIs)
- **MySQL** (as the database)
- **Maven** (for build and dependency management)
- **Spring Data JPA** (for database interactions)
- **Lombok**: Reduces boilerplate code
- **ModelMapper**: For object mapping between DTOs and entities
- **Spring Security**: For securing the application
- **JWT (JSON Web Tokens)**: For authentication and authorization

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Java 17** (for Spring Boot backend)
- **Node.js** and **npm** (for React frontend)
- **Maven** (for backend builds)
- **MySQL** or another database

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kalana96/online-examination-app.git
   cd online-exam-system-app
   ```

### Running the Frontend (React)

1. **Navigate to the frontend directory:**:

   ```bash
   cd online-exam-system-client

   ```

2. **Install dependencies:**:

   ```bash
   npm install

   ```

3. **Run the development server:**:
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:3000.

4. **Build for production**:
   ```bash
   npm run build
   ```

### Running the Backend (Spring Boot)

1. **Navigate to the backend directory:**:

   ```bash
   cd online-exam-system-server

   ```

2. **Update application.properties with your database connection details:**:

   ```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/examination
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    spring.jpa.hibernate.ddl-auto=update

   ```

3. **Build the backend using Maven:**:

   ```bash
   mvn clean install

   ```

4. **Run the Spring Boot application:**:

   ```bash
   mvn spring-boot:run

   ```

The backend will run on http://localhost:8080.
