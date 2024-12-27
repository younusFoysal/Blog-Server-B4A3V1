<h1 align="center">Blog Server </h1>

Live Server: [Blog-Server](https://blog-server-b4-a3-v1-omega.vercel.app/)


## Project Overview
Blog Server B4A3V1 is an Express.js application built with TypeScript, MongoDB,
and Mongoose for managing a blogs and users. This project involves building a backend for a
blogging platform with role-based access control for Admins and Users. 
Users can register, log in, and perform CRUD operations on their own blogs, 
while Admins can manage users and blogs. The platform will feature secure authentication,
a public API for accessing blogs, and functionalities for search, sort, and filter.

## Features

### Features

1. **Role-Based Access Control**: Admins can block users and delete any blog, while users can manage their own blogs.
2. **Authentication & Authorization**: Secure JWT-based login system with differentiated access for Admins and Users.
3. **Blog Management**: Users can create, update, and delete their blogs; Admins can delete any blog.
4. **Public Blog API**: View blogs with advanced search, sort, and filter functionalities.
5. **Error Handling**: Standardized error responses for validation, authentication, and server errors.
6. **Tech Stack**: Built with TypeScript, Node.js, Express.js, and MongoDB using Mongoose.

## Technologies Used
```
node
cors
dotenv
express
mongoose
ts-node-dev
typescript
```

## How to Run Locally
1. Clone the repository: `git clone https://github.com/younusFoysal/Blog-Server-B4A3V1.git`
2. Navigate to the project directory: `cd Blog-Server-B4A3V1`
3. Install dependencies: `npm install`
4. Set up environment variables as per `.env`.
5. Start the server: `npm run start:dev`