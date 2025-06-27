
# ToDo App - Backend API

This is the backend API of the **ToDo App**, developed in Java. It handles user profile management and note-taking functionalities. The API is designed to integrate seamlessly with the Angular frontend.

## 🔧 Technologies

- Java (version depending on your setup)
- Spring Boot (assumed)
- RESTful API design
- Maven (or Gradle)
- JPA / Hibernate (if used)
- Other relevant libs (specify if needed)

## 📁 Project Structure

```
ToDo_List_API/
└── ToDoList/
    ├── src/
    ├── target/
    ├── pom.xml
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- Java Development Kit (JDK) 17 or higher
- Maven (if using Maven)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alexrsd23/ToDo_App_Backend.git
   cd ToDoList
   ```

2. Build the project and download dependencies:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

4. The API will be available at:
   ```
   http://localhost:8080/
   ```

## ⚙️ Features

- ✅ User profile creation, update, and retrieval
- ✅ Note management: create, update, delete, list notes
- ✅ RESTful endpoints
- ✅ Secure and scalable architecture

## 🛠️ Development Notes

- The project is built with Spring Boot (or your chosen framework).
- API endpoints are documented (consider adding Swagger/OpenAPI if not yet done).
- Designed to integrate with the Angular frontend app.

## 📄 License

MIT © [alexrsd23](https://github.com/alexrsd23)
