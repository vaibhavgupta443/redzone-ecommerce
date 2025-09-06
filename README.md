# Redzone Ecommerce 

A full-stack ecommerce application built with Spring Boot, featuring JWT authentication, secure user management, and modern web technologies.

## 🚀 Features

- **User Authentication & Authorization** - JWT-based secure authentication
- **Spring Security** - Role-based access control
- **RESTful API** - Clean and well-structured REST endpoints
- **Database Integration** - JPA with H2 database
- **Data Validation** - Input validation using Spring Boot Validation
- **Lombok Integration** - Reduced boilerplate code
- **Maven Build System** - Dependency management and build automation

## 🛠️ Tech Stack

- **Backend**: Spring Boot 3.5.5
- **Security**: Spring Security with JWT
- **Database**: H2 (in-memory database)
- **ORM**: Spring Data JPA
- **Build Tool**: Maven
- **Java Version**: 17
- **Additional Libraries**: 
  - Lombok for code reduction
  - JWT (jsonwebtoken) for authentication

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Git

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/vaibhavgupta443/redzone-ecommerce.git
cd redzone-ecommerce
```

### Navigate to backend directory
```bash
cd backend
```

### Run the application
```bash
./mvnw spring-boot:run
```

Or on Windows:
```bash
mvnw.cmd spring-boot:run
```

### Access the application
The application will be available at `http://localhost:8080`

## 📁 Project Structure

```
redzone/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/amazonclone/
│   │   │   │       └── AmazoncloneApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   ├── .gitignore
│   └── README.md
├── .gitignore
└── README.md
```

## 🔧 Configuration

The application uses H2 in-memory database by default. You can access the H2 console at:
`http://localhost:8080/h2-console`

Default database configuration:
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (empty)

## 🚀 API Endpoints

*API documentation will be added as the project develops*

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Vaibhav Gupta**
- GitHub: [@vaibhavgupta443](https://github.com/vaibhavgupta443)
- Email: vaibhavgupta4432@gmail.com

## 🎯 Future Plans

- [ ] Add frontend (React/Angular)
- [ ] Implement product catalog
- [ ] Add shopping cart functionality
- [ ] Payment integration
- [ ] Order management system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Advanced search and filtering

## 📊 Project Status

🚧 **Under Development** - This project is currently in active development.

---

⭐ Don't forget to give this project a star if you found it helpful!
