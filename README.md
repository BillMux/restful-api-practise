# Tails.com Pricing Service

A hypothetical version of the Tails.com internal pricing service. This RESTful API should accept requests in the form of an order, containing a list of items and their quantities, and return individual prices and VATs of each item, and the total cost, VAT included.

#### Tech:
- JavaScript (Node v11.9.0)
- Fetch (Node v2.6.0)

#### Testing:
- Jasmine (3.4.0)
- ESLint (5.16.0)

### Setting up and running the tests

To get started, run `npm install` or `npm i` to install dependencies

To run the tests, run `npm test` or `npm t`

To run the linter, run `./node_modules/.bin/eslint .`
