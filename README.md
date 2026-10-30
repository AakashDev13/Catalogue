🍽️ CampusEats Catalogue

A simple web application built using HTML, CSS, JavaScript, Node.js, and Express.js.

Users can view a list of dishes and add new dishes using a form. The frontend communicates with the backend through a REST API.

Features

View all dishes.
Get a dish by ID.
Add a new dish.
REST API using GET and POST methods.
Simple and user-friendly interface.

Technologies Used

HTML
CSS
JavaScript
Node.js
Express.js
📂 Project Structure
text
catalogue/
│
├── server.js
├── package.json
├── README.md
│
└── public/
    ├── index.html
    └── style.css

⚙️ Installation & Setup

Download and install Node.js (version 18 or newer).

https://nodejs.org/

Check installation:

node -v
npm -v


1. Clone the repository
   git clone https://github.com/AakashDev13/Catalogue


bash
git clone https://github.com/AakashDev13/Catalogue


2. Open the project folder

bash
cd catalogue


3. Install dependencies

bash
npm install


4. Start the server

bash
node server.js


5. Open in browser

http://localhost:3000

API Endpoints

Method	Endpoint	Description
GET	/items	Get all dishes
GET	/items/:id	Get dish by ID
POST	/items	Add a new dish
📖 How It Works
The webpage fetches dishes from the API.
Express sends the menu data in JSON format.
Users can add a new dish through the form.
The API saves the dish in an array.
The webpage refreshes and displays the updated menu.

Note

Data is stored in an in-memory array. When the server restarts, the added dishes are lost.

Learning Outcomes
Understanding Node.js and Express.js.
Creating REST APIs.
Using GET and POST requests.
Connecting frontend with backend.
Handling JSON data. 
