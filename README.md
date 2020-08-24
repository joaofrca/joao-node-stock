# Joao APP for stock

This repository provides all dependencies in order to run the node's first project from the [MEAN/MERN Stack Developer Path](https://confluence.itc.sap.com/pages/viewpage.action?pageId=112088733). The project description can be found [here](https://confluence.itc.sap.com/display/SAPCX/Module+1+%3A%3A+NodeJS).

## Execution

#### 0. Clone repo to your local

On the folder's directory run:

```
git clone https://github.wdf.sap.corp/i343878/joao-stock.git
```

#### 1. Install the project dependencies

On the folder's directory run:

```
npm install
```

or

```
npm i
```

#### 2. Run the project

On the folder's directory run:

```
npm run start
```

or

```
npm start
```

#### 3. Test using Postman

Postman can be download from [here](https://www.postman.com/downloads/). Use the Routes section to see the requirements for each call. On the Body section, within Postman, choose "x-www-form-urlencoded" or text in JSON format and add the respective keys and values.

#### 4. Run the unit tests

On the folder's directory run:

```
npm run test -- --recursive
```

or

```
npm test -- --recursive
```

To see all of the Mocha options:

```
npm test -- --help
```

## Routes

The following routes are provided by this project:

- Scenario 1: [localhost:3000/stockLevel](localhost:3000/stockLevel)
  - get : gets all stock levels in DB.
  - post : posts a new entry in DB. If productName is not unique retrieves an error.
    Requires keys:
    - productName
    - quantity
- Scenario 2: [localhost:3000/decreaseStockLevel](localhost:3000/decreaseStockLevel)
  - post : decreases a quantity for a product. If the quantity to be decreased is higher than the StockLevel's one, retrieves an error.
    Requires keys:
    - productName
    - quantity (to be decreased)
- Scenario 3: [localhost:3000/stockLevelInfo](localhost:3000/stockLevelInfo)
  - get : fetches stock level info for a product. If productName does not exist retrieves an error.
