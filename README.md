# Express TypeScript Boilerplate

A modern, production-ready Express.js boilerplate built with TypeScript, featuring a clean architecture, comprehensive testing setup, and development tools.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Express 5**: Latest version of Express.js framework
- **Modern ES Modules**: Uses ES modules with import/export syntax
- **Path Mapping**: Clean imports using `#` prefix for internal modules
- **Input Validation**: Schema validation with Zod for type-safe request validation
- **Authentication**: JWT-based authentication with secure cookie sessions
- **Database**: PostgreSQL integration with connection pooling
- **Migrations**: Database schema management with node-pg-migrate
- **Password Security**: Secure password hashing using Node.js crypto
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
│   │   ├── auth.ts         # Authentication controllers
│   │   └── helloworld.ts   # Hello world controller
│   ├── db/                 # Database configuration
│   │   └── db.ts           # PostgreSQL connection pool
│   ├── middlewares/        # Express middlewares
│   │   └── errorHandler.ts # Global error handler
│   ├── routes/             # Route definitions
│   │   ├── auth.ts         # Authentication routes
│   │   └── helloworld.ts   # Hello world routes
│   ├── schemas/            # Zod validation schemas
│   │   └── user.ts         # User schema definitions
│   ├── services/           # Business logic services
│   │   └── password.ts     # Password hashing service
│   ├── index.ts            # Express app setup
│   └── server.ts           # Server entry point
├── migrations/             # Database migration files
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
- PostgreSQL 12 or higher
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
# DATABASE_URL=postgresql://username:password@localhost:5432/database_name
# JWT_KEY=your_jwt_secret_key
```

4. Set up the database:
```bash
# Create a PostgreSQL database
createdb your_database_name

# Run migrations
npm run migrate up
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
| `npm run migrate` | Run database migrations |

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

### Database Architecture
PostgreSQL integration with connection pooling and migrations:
```typescript
// Database connection with pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Connection verification
export async function verifyConnection(): Promise<void> {
  const client = await pool.connect();
  console.log('✅ Connected to PostgreSQL database');
  client.release();
}
```

### Authentication System
JWT-based authentication with secure password hashing:
```typescript
// Password hashing service
export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString("hex") === hashedPassword;
  }
}

// JWT token creation
const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);
```

### Input Validation with Zod
The project includes Zod for runtime type validation and schema definition:
```typescript
import { z } from 'zod';

// Define validation schemas
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0).max(120)
});

// Use in controllers
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = userSchema.parse(req.body);
    // Process validated data...
  } catch (error) {
    next(error); // Zod validation errors are automatically handled
  }
};
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (default: development)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_KEY`: Secret key for JWT token signing

### Validation with Zod
Zod provides runtime type checking and validation for your API endpoints. Benefits include:
- **Type Safety**: Automatic TypeScript type inference from schemas
- **Runtime Validation**: Catch invalid data at runtime
- **Error Messages**: Detailed validation error messages
- **Schema Composition**: Reusable and composable validation schemas

Example validation middleware:
```typescript
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors
        });
      }
      next(error);
    }
  };
};
```

### TypeScript Configuration
- **tsconfig.json**: Main TypeScript configuration
- **tsconfig.build.json**: Production build configuration (excludes test files)

### Prettier Configuration
- Print width: 150 characters
- Ignores `dist` directory

## 📚 API Endpoints

### Hello World
- **GET** `/helloworld/:name` - Returns a personalized hello world message

Example response:
```json
{
  "message": "Hello John Again!"
}
```

### Authentication
- **POST** `/auth/signup` - Register a new user
- **POST** `/auth/signin` - Sign in an existing user

#### Signup Request Body:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Signin Request Body:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Authentication Response:
```json
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2024-01-01T00:00:00.000Z"
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
- **zod**: TypeScript-first schema validation library
- **pg**: PostgreSQL client for Node.js
- **jsonwebtoken**: JWT implementation for authentication
- **cookie-session**: Cookie-based session middleware
- **crypto**: Node.js crypto module for password hashing

### Development Dependencies
- **typescript**: TypeScript compiler
- **tsx**: TypeScript execution engine
- **vitest**: Testing framework
- **supertest**: HTTP testing library
- **prettier**: Code formatter
- **@types/express**: TypeScript definitions for Express
- **@types/node**: TypeScript definitions for Node.js
- **@types/supertest**: TypeScript definitions for Supertest
- **@types/pg**: TypeScript definitions for PostgreSQL
- **@types/jsonwebtoken**: TypeScript definitions for JWT
- **@types/cookie-session**: TypeScript definitions for cookie-session
- **node-pg-migrate**: Database migration tool for PostgreSQL

## 🚀 Deployment

This boilerplate is ready for deployment to various platforms:

1. **Set up PostgreSQL database** on your hosting platform
2. **Set environment variables** on your hosting platform:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_KEY`: Secret key for JWT signing
   - `PORT`: Server port
   - `NODE_ENV`: Set to "production"
3. **Run database migrations**: `npm run migrate up`
4. **Build the project**: `npm run build`
5. **Start the server**: `npm start`

The compiled JavaScript will be in the `dist` directory.

### Popular Deployment Platforms
- **Heroku**: Supports PostgreSQL add-on and automatic deployments
- **Railway**: Easy PostgreSQL setup with environment variable management
- **Vercel**: Requires serverless PostgreSQL (like Neon or PlanetScale)
- **DigitalOcean App Platform**: Supports managed PostgreSQL databases
