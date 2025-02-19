# REST API with Express and TypeScript

This application is a REST API developed using Express and TypeScript for an example online shop app.

## Features
- Framework: Express.js
- Language: TypeScript
- Middleware: Body-parser, CORS, Helmet, and more
- Secure authentication with JWT and bcrypt
- Input validation using Zod
- Database access via Prisma ORM
- Rate limiting and sanitization for security
- Product management
- User authentication and authorization
- Order processing
- Midtrans payment method
- Documentation using Swagger UI

## Requirements
Make sure you have installed:
- [Node.js](https://nodejs.org/) (latest version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/mrizkinm/express-online-shop.git
   cd express-online-shop
   ```
2. Install dependencies:
   ```sh
   npm install
   # or with yarn
   yarn install
   ```
3. Contact the author to obtain the `.env` file and Prisma schema before running the application.

## Prisma Schema
The `prisma/schema.prisma` file is not included in the repository. Please contact the author to obtain it.

## Running the Server
To run the server in development mode:
```sh
npm run dev
# or with yarn
yarn dev
```

To run the server in production mode:
```sh
npm run build
npm start
# or with yarn
yarn build
yarn start
```

## REST API Documentation
To view the Swagger UI REST API documentation, please go to http://localhost:{PORT}/api-docs


## Technologies Used
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Zod](https://zod.dev/) (for schema validation)
- [Helmet](https://helmetjs.github.io/) (for security)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) (for rate limiting)
- [xss-clean](https://www.npmjs.com/package/xss-clean) (to prevent XSS attacks)
- [midtrans-client](https://www.npmjs.com/package/midtrans-client) (payment method)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) (documentation)

## Contact
For any questions or to obtain the Prisma schema, please contact the author.

---

If you have any questions or would like to contribute, feel free to open an issue or submit a pull request!

