> [!CAUTION]
> OpenTicket is still under development. Features, functionalities, and the user interface are subject to change as the project evolves.

# OpenTicket

OpenTicket is an open-source IT ticketing platform to create, manage and observe tickets.

<!-- ## Project goal -->

<!-- 
project goals: angular, spring boot, get familiar working with github (issues, workflows) -->

## Techstack

The project is developed using the following technologies:


[Angular](https://angular.dev/) as frontend framework\
[Tailwind CSS](https://tailwindcss.com/) as CSS framework

[Spring Boot](https://spring.io/projects/spring-boot) as Java backend framework\
[PostgreSQL](https://www.postgresql.org/) as database

## Frontend

### Installation and Running

Install all dependencies by running this command in the `frontend` folder:
```sh
npm install
```

To start a local development server, run:

```sh
npm start
```
Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.

You can auto generate all models and services for the http client by running:

```sh
npm run generate:api
```

The required information is taken from the OpenAPI specification, so be sure that the backend is running while executing the command.
By default the script will look for the OpenAPI specification at http://localhost:8080/v3/api-docs.


### Linting and Testing

Run the following command to check for code quality and linting issues:

```sh
npm run lint
```

To fix all auto fixable issues, run:

```sh
npm run lint:fix
```

To execute all unit tests, run:

```sh
npm run test
```

### Folder structure

This section highlights important files and folders along with descriptions.

```
frontend
├── .prettierrc                     # Prettier configuration
├── angular.json                    # Angular project configuration
├── eslint.config.js                # ESLint configuration
├── public                          # Static assets
└── src                             # Application source code
    ├── index.html                  # Main html entry point
    ├── main.ts                     # App bootstrap entrypoint
    ├── styles.css                  # Global styles
    ├── app 
    │   ├── app.ts                  # Root app component
    │   ├── common
    │   │   ├── icons               # Icon components
    │   ├── core
    │   │   ├── api-generated       # Auto generated models and services 
    │   │   ├── directives          # Custom directives
    │   │   ├── pipes               # Cutom pipes                  
    │   │   └── services            # Custom service files
    │   └── features                # Application features
    ├── models                      # Types and interfaces
    └── environments                # env files
```

## Backend

### How to start

Install all maven dependencies by running this command in the `backend` folder:

```sh
mvn clean install
```

Before running the backend make sure you have a database up and running.
You can change the database configuration inside the `application.properties` file.

You can start the backend by running:

```sh
mvn spring-boot:run
```

By default, the REST API will be accessible at http://localhost:8080/api/v1 afterwards.

The swagger UI can be accessed here: http://localhost:8080/swagger-ui/index.html.

### How to test

To check for formatting issues, run:
```sh
mvn spotless:check
```

To run checkstyle, run:
```sh
mvn checkstyle:check
```

To run the tests, run:
```sh
mvn test
```

### Folder structure

```
backend
├── checkstyle.xml                                  # Checkstyle configuration
└── src                                            
    ├── main/.../OpenTicket                         # Application files
    │   │        ├── OpenTicketApplication.java     # Spring Boot entry point
    │   │        ├── config                         # Configuration files
    │   │        ├── controllers                    # REST controllers
    │   │        ├── domain                         # Domain models
    │   │        │   ├── dto                        # DTO files
    │   │        │   └── entity                     # Entity files
    │   │        ├── mapper                         # DTO mappers (interfaces)
    │   │        │   └── impl                       # Concrete implementation of DTO mappers
    │   │        ├── repository                     # Repositories
    │   │        └── service                        # Service logic (interfaces)
    │   │            └── impl                       # Concrete implementation of services
    │   └── resources/                              # Spring Boot resources
    │       └── application.properties              # Spring Boot configuration
    └── test/.../OpenTicket                         # Test files
```