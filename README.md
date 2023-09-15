# Weather App Client

## Introduction

`weather-app-client` is a React-based front-end application built using TypeScript.
The application serves as a client interface for the Weather App API, allowing users to check weather conditions based on city names or coordinates.
This application features user authentication, data visualization, and a modern, responsive design.

## Features

- 🌡️ Real-time weather data based on city or coordinates
- 🛠 Built with TypeScript for type safety and better DX (Developer Experience)
- 🧪 Unit-tested components and functions
- 🔒 User Authentication with JWT
- 🚀 State management with Context API
- 🛣 Navigation using React Router

## Prerequisites

- Node.js v14.x or above
- npm v6.x or above
- Access to the Weather App API

## Setup and Installation

1. **Clone the Repository**

```bash
git clone https://github.com/bewpage/weather-app-client.git
cd weather-app-client
```

2. **Install Dependencies**

```bash
npm install
```

3. **Run the Application**

```bash
npm start
```

This will start the development server at `http://localhost:3000`.

4. **Run Tests**

```bash
npm test
```

This will run all the unit tests in watch mode.

## Authentication

The app uses JWT-based authentication. User authentication state is managed using the Context API.

## Folder Structure

```
weather-app-client/
├── src/
│   ├── components/
│   ├── store/
│   ├── api/
│   ├── utils/
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
└── README.md
```

## Contributions

Feel free to submit pull requests, create issues or spread the word.

## License

MIT


