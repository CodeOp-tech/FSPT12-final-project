# FSPT12-final-project

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


