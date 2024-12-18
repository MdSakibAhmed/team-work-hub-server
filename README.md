# Team Work Hub - Server Side

## Live Link: https://team-work-hub-server.onrender.com

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [API Documentation](#api-documentation)
  - [Documents API](#documents-api)
  - [Feedback API](#feedback-api)
  - [Users API](#users-api)
- [Socket.IO Real-Time Features](#socketio-real-time-features)
- [Testing](#testing)

## Introduction

This is the server-side component of the Project Management and Collaboration Tool. It provides RESTful APIs and real-time features for managing projects, documents, feedback, and user communication using Node.js, Express.js, MongoDB, and Socket.IO.

## Features

1. **Document Management**

   - CRUD operations for documents within projects.

2. **Feedback System**

   - CRUD operations for adding feedback to documents.

3. **User Management**

   - User authentication and authorization.

4. **Real-Time Collaboration**
   - Real-time document editing and chat features using Socket.IO.

## Technologies Used

- **Backend Framework**: Node.js, Express.js
- **Database**: PostgreSQL, TypeORM
- **Real-Time Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v6 or higher) or **yarn** (v1.22 or higher)
- **PostgreSQL** (local or cloud instance)

### Steps

1. Clone the repository:

```
git clone https://github.com/MdSakibAhmed/team-work-hub-server.git

cd team-work-hub-server

```

2. Install dependencies:

```
npm install
```

3. Create a .env.local file in the root of the frontend directory with the following content:
4. Start the development server:

```
npm run dev
```

## API documentation

**Documents API**

- GET /api/
  /document: Retrieve all documents for a specific project.

- POST /api/
  /documents: Create a new document in a project.

- PATH /api/
  /documents/
  : Update a document by its ID.

- DELETE /api/
  /documents/
  : Delete a document by its ID

**Feedback API**

- GET /api/
  /feedback: Retrieve all feedback for a specific project.

- POST /api/
  /feedback: Create new feedback in a project.

** User API**

- POST /api/
  /register: register a new user.

- POST /api/
  /login: log in as a user.

## Socket.IO Real-Time Features

Socket.IO is used for real-time document collaboration and chat. Here's a brief overview of the real-time functionalities:

1. Socket Setup: Initialize the Socket.IO server and handle connections
2. Joining Rooms: Users join specific rooms for different documents to receive and broadcast updates only to relevant clients.
3. Handling Events: Manage incoming and outgoing events for real-time updates.

## Testing

Ensure your server-side application is thoroughly tested using the following steps:

1. Use Jest and Supertest for unit and integration testing of your APIs.
2. Define test cases for each endpoint in the routes and controllers.

To test run :

```
npm run test
```
