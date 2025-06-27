
# ToDo App - Frontend

This is the frontend of the **ToDo App**, built with **Angular v20.0.3**. It provides a user-friendly interface to manage personal notes and user profiles, communicating seamlessly with the Java-based backend API.

## 🔧 Technologies

- [Angular 20.0.3](https://angular.io/)
- TypeScript
- RxJS
- SCSS / CSS3
- Font Awesome
- Angular Standalone APIs (no NgModules)
- Angular Router
- Angular Forms

## 📁 Project Structure

```
ToDo_List_Front/
├── src/
│   ├── app/
│   ├── assets/
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
└── ...
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://angular.io/cli) (v20.0.3)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alexrsd23/ToDo_App_Frontend.git
   cd ToDo_App_Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   ng serve
   ```

4. Open your browser at:
   ```
   http://localhost:4200/
   ```

## ⚙️ Features

- ✅ Create, edit and delete personal notes
- ✅ Manage user profiles
- ✅ Clean and responsive layout
- ✅ Angular modern architecture with Standalone Components
- ✅ Integration with Java Spring Boot backend API

## 🛠️ Development Notes

- This project uses Angular's **standalone component architecture** (introduced in Angular 14+).
- HTTP requests are configured using `provideHttpClient()` instead of `HttpClientModule`.
- Font Awesome is used for iconography.

## 📄 License

MIT © [alexrsd23](https://github.com/alexrsd23)
