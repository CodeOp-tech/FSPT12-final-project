# FSPT12-final-project

### Setting up Database

###

###

### Setting up the Payment feature

* Install the Stripe dependency: npm install react-stripe-checkout
* Install the following in the project folder: npm install stripe uuid cors
* Install Axios: npm install axios
* For user alerts about payment: npm install --save react-toastify
* Generate your own Stripe API key and add it in Payment.js (inside the stripeKey attribute of the StripeCheckout component)
* in index.js (in the root) add your Secret Key from your Stripe dashboard in the second paranthesis of const stripe
Safi's feature
Kriska's feature
Hi..

# How to run mySQL database

1. Create .env file in the root directory with the following structure:

DB_HOST=localhost
DB_USER=root
DB_NAME=recipe_app
DB_PASS=your_password

2. Open a new terminal for mysql and run: 

mysql -u root -p

Provide your password. 

Create a database called "recipe_app" with the command "create database recipe_app" 

3. In the root folder, run another terminal, run "npm run migrate". This should create all four tables: users, recipes_saved, ingredients and orders 


