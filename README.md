# Express TypeScript Boilerplate

A modern, production-ready Express.js boilerplate built with TypeScript, featuring a clean architecture, comprehensive testing setup, and development tools.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Express 5**: Latest version of Express.js framework
- **Modern ES Modules**: Uses ES modules with import/export syntax
- **Path Mapping**: Clean imports using `#` prefix for internal modules
- **Error Handling**: Centralized error handling middleware
- **Testing**: Comprehensive testing setup with Vitest and Supertest
- **Code Quality**: Prettier for code formatting
- **Development Tools**: Hot reload with tsx and watch mode
- **Environment Configuration**: Environment-based configuration management

## 📁 Project Structure

```
express_boilerplate/
├── src/
│   ├── __tests__/          # Test files
│   │   └── helloworld.spec.ts
│   ├── config/             # Configuration files
│   │   └── config.ts
│   ├── controllers/        # Route controllers
│   │   └── helloworld.ts
│   ├── middlewares/        # Express middlewares
│   │   └── errorHandler.ts
│   ├── routes/             # Route definitions
│   │   └── helloworld.ts
│   ├── index.ts            # Express app setup
│   └── server.ts           # Server entry point
├── dist/                   # Compiled JavaScript output
├── .env                    # Environment variables
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── tsconfig.build.json     # Build-specific TypeScript config
```

## 🛠️ Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd express_boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env  # If you have an example file
# Or create .env with:
# PORT=3000
# NODE_ENV=development
```

## 🚀 Getting Started

### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```
The server will start at `http://localhost:3000`

### Production Build
Build the project for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm start` | Start production server |
| `npm run build` | Build the project for production |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run test:run` | Run tests once |
| `npm run test:ui` | Run tests with UI interface |
| `npm run coverage` | Run tests with coverage report |

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for testing and [Supertest](https://github.com/visionmedia/supertest) for HTTP assertions.

Run tests:
```bash
npm run test:run
```

Run tests with UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run coverage
```

### Example Test
```typescript
import { describe, expect, it } from "vitest";
import request from "supertest";

describe("Hello World", () => {
  it("should return Hello World", async () => {
    const response = await request("http://localhost:3000").get("/helloworld");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Hello World Again!",
    });
  });
});
```

## 🏗️ Architecture

### Path Mapping
The project uses TypeScript path mapping for clean imports:
```typescript
// Instead of: import { config } from '../../../config/config.js'
import config from '#config/config.js';
```

### Error Handling
Centralized error handling with custom error interface:
```typescript
export interface AppError extends Error {
  status?: number;
}
```

### Configuration Management
Environment-based configuration with TypeScript interfaces:
```typescript
interface Config {
  port: number;
  nodeEnv: string;
}
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (default: development)

### TypeScript Configuration
- **tsconfig.json**: Main TypeScript configuration
- **tsconfig.build.json**: Production build configuration (excludes test files)

### Prettier Configuration
- Print width: 150 characters
- Ignores `dist` directory

## 📚 API Endpoints

### Hello World
- **GET** `/helloworld` - Returns a hello world message

Example response:
```json
{
  "message": "Hello World Again!"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run test:run`
5. Format code: `npm run format`
6. Commit changes: `git commit -m 'Add feature'`
7. Push to branch: `git push origin feature-name`
8. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Dependencies

### Production Dependencies
- **express**: Web framework for Node.js

### Development Dependencies
- **typescript**: TypeScript compiler
- **tsx**: TypeScript execution engine
- **vitest**: Testing framework
- **supertest**: HTTP testing library
- **prettier**: Code formatter
- **@types/express**: TypeScript definitions for Express
- **@types/node**: TypeScript definitions for Node.js
- **@types/supertest**: TypeScript definitions for Supertest

## 🚀 Deployment

This boilerplate is ready for deployment to various platforms:

1. **Build the project**: `npm run build`
2. **Set environment variables** on your hosting platform
3. **Start the server**: `npm start`

The compiled JavaScript will be in the `dist` directory.
