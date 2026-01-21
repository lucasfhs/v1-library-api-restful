# REST API Documentation  
**Legacy Library Management System**  

## Introduction  

![API Cover Image](./preview/domestic-life-illustrated.jpg)  

This documentation describes a REST API built with Node.js and Express for an academic project in the *Database I* course at CEFET-MG. The system manages library operations, including user accounts, books, libraries, loans, and reporting without using odm.  

---

## Features  

### 1. User Management  
- Register, update, delete, and authenticate users.  
- Secure login-based authentication.  

### 2. Book Control  
- Add new books with metadata (title, author, ISBN).  
- Search, list, and remove books.  

### 3. Library Administration  
- Register libraries and associate them with books.  
- Manage library names and locations.  

### 4. Loan System  
- Track book loans by users.  
- Set deadlines and handle returns.  

### 5. Reporting  
- Generate analytics on users, books, and loans.  
- Provide administrative insights.  

---

## Project Structure  
The code follows a layered architecture:  

- **Controllers**: Business logic for API endpoints.  
- **Models**: Data structures and database interactions.  
- **Repositories**: Data access layer.  
- **Services**: Application logic (mediates between controllers and repositories).  
- **Routers**: API route definitions.  

---

## Technologies  
- **Backend**: Node.js, Express  
- **Database**: PostgreSQL  
- **Authentication**: JWT  

---

## Setup Instructions  

1. Clone the repository:  
   ```sh
   git clone <repository-url>
   ```

2. Install dependencies:  
   ```sh
   npm install
   ```

3. Set up PostgreSQL:  
   - Create a server and restore the database using `postgre-database-dump.sql`.  

4. Configure environment variables (e.g., database credentials, JWT secret).  

5. Run the application:  
   ```sh
   npm run dev
   ```
---
---

## Notes  
- This project was developed for academic purposes as a legacy system.  
- The codebase is maintained in Portuguese for institutional consistency.  

---
---

## References  
Cover Image: [Freepik AI Illustration](https://www.freepik.com/free-ai-image/domestic-life-illustrated_381099438.htm)  

--- 
---

