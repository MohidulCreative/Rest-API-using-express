# Rest-API-using-express
Restful api using epxress js and mongoose for an eccomerce web application

{

   # 💘 Todo List 💘

 Register a user ✅

Login a user ✅

Display user data ✅

Refresh the token ✅

Logout the user ✅

Add a product ✅

Update a product ✅

Get all products ✅

Get single product ✅

Delete a product ✅

# 💘 Happy End.. 💘

}

# eCommerce RESTful API

This is a RESTful API built using Express and Mongoose, providing backend functionalities for an eCommerce application. It includes user authentication using JSON Web Tokens (JWT).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To set up the API locally, follow these steps:

1. Clone the repository: `git clone https://github.com/MohidulCreative/Rest-API-using-express.git`
2. Navigate to the project directory: `cd ecommerce-api`
3. Install dependencies: `npm install`
4. Configure environment variables: Rename `.env.example` to `.env` and update the necessary variables (e.g., database connection URL, JWT secret).
5. Start the development server: `npm run dev`

## Usage

Once the server is running, the API will be available at `http://localhost:5000` (or the specified port). You can test the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## Authentication

This API uses JWT (JSON Web Tokens) for user authentication. To access protected routes, clients need to include the JWT token in the `Authorization` header of their requests with the following format:

```
Authorization: Bearer <JWT_TOKEN>
```

To obtain a JWT token, users should first register with the API and then login to receive the token. The token has an expiration time, which can be configured in the environment variables.

## API Endpoints

The API provides the following endpoints:

- **Authentication**:
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Authenticate and receive a JWT token.

- **Users**:
  - `GET /api/users`: Get a list of all users (admin access only).
  - `GET /api/users/:id`: Get a specific user by ID (admin access only).
  - `PUT /api/users/:id`: Update a specific user's information (admin access only).
  - `DELETE /api/users/:id`: Delete a specific user (admin access only).

- **Products**:
  - `GET /api/products`: Get a list of all products.
  - `GET /api/products/:id`: Get a specific product by ID.
  - `POST /api/products`: Add a new product (admin access only).
  - `PUT /api/products/:id`: Update a specific product's information (admin access only).
  - `DELETE /api/products/:id`: Delete a specific product (admin access only).

- **Orders**:
  - `GET /api/orders`: Get a list of all orders (admin access only).
  - `GET /api/orders/:id`: Get a specific order by ID (admin access only).
  - `POST /api/orders`: Create a new order for the authenticated user.
  - `PUT /api/orders/:id`: Update the status of a specific order (admin access only).
  - `DELETE /api/orders/:id`: Delete a specific order (admin access only).

## Data Models

The API uses the following Mongoose data models:

- `User`: Represents a user in the eCommerce application.
- `Product`: Represents a product available for purchase.
- `Order`: Represents an order placed by a user.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact [Mohidul Islam](mailto:techexplorer420@gmail.com).
