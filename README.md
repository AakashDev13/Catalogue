 Catalogue API – Food Management System

A RESTful API built using Node.js and Express.js to manage a food catalogue. It includes secure user authentication using JWT (JSON Web Tokens), password hashing with bcrypt, and role-based authorization.

Features

View all food items.
Get a single food item by ID.
Add new food items.
Secure login using email and password.
Password hashing using bcryptjs.
JWT-based authentication.
Role-based authorization.
Protected API routes.
Environment variables for secret configuration.
🛠️ Technologies Used
Node.js
Express.js
JSON Web Token (jsonwebtoken)
bcryptjs
dotenv
Postman

📁 Project Structure

text
Catalogue/
│
├── public/
│   ├── index.html
│   └── style.css
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

⚙️ Installation and Setup

1. Clone the repository
   bash
   git clone https://github.com/AakashDev13/Catalogue.git
2. Navigate to the project folder
   bash
   cd Catalogue
3. Install dependencies
   bash
   npm install
4. Create a .env file

Add the following configuration:

env
PORT=3000
JWT_SECRET=secret_key

5. Start the server
   bash
   node server.js

Server will run at:

text
http://localhost:3000

 Authentication

The application provides two demo users:

User	Email	Password	Role
Customer	asha@campus.edu	customer123	customer
Restaurant	mealhub@campus.edu	resto123	restaurant

Passwords are hashed using bcryptjs.

After successful login, the server generates a JWT token that expires after one hour.

📡API Endpoints

1. Login

POST /login

Request body:

json
{
  "email": "asha@campus.edu",
  "password": "customer123"
}

Response:

json
{
  "token": "your_jwt_token"
}

2. Get All Items

GET /items

Requires a valid JWT token.

Authorization header:

text
Authorization: Bearer YOUR_TOKEN

3. Get Item by ID

GET /items/:id

Example:

text
GET /items/1

Requires authentication.

4. Add New Item

POST /items

Only restaurant and admin users can add items.

Authorization header:

text
Authorization: Bearer YOUR_TOKEN

Request body:

json
{
  "name": "Masala Dosa",
  "price": 80
}

Successful response:

json
{
  "id": 3,
  "name": "Masala Dosa",
  "price": 80
}

Security Implementation
Password Hashing

Passwords are hashed using bcryptjs instead of storing plain-text passwords.

JWT Authentication

JWT verifies the identity of users before allowing access to protected routes.

Role-Based Authorization

Different users have different permissions:


Customer: Can view the food catalogue.
Restaurant: Can view and add food items.
Admin: Can view and add food items if granted the admin role.
Middleware

Two middleware functions protect the API:

auth – verifies the JWT token.
requireRole – checks user permissions.
📋 HTTP Status Codes
Status Code	Meaning
200	OK
201	Resource created
400	Bad request
401	Unauthorized / Invalid token
403	Forbidden
404	Item not found
422	Validation error

Testing

The API can be tested using Postman or Thunder Client.

Test the following scenarios:

Login with valid customer credentials.
Login with valid restaurant credentials.


Access /items without a token – expect 401.
Access /items with a valid token – expect 200.
Try adding an item as a customer – expect 403.
Add an item as a restaurant – expect 201.
Try logging in with incorrect credentials – expect 401.


]

gitignore
node_modules/
.env
config.env

 Author

Aakash Jarwal

GitHub: https://github.com/AakashDev13

License

This a collage tutotial no 9
