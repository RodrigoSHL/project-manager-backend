<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="NestJS Logo" /></a>
</p>

<h1 align="center">NestJS Project</h1>

## Getting Started: Development Environment

Follow these steps to run the project in a development environment:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Nest CLI globally (if not already installed):**
   ```bash
   npm i -g @nestjs/cli
   ```

4. **Start the database:**
   ```bash
   docker-compose up -d
   ```

5. **Configure environment variables:**
   - Duplicate the `.env.template` file and rename the copy to `.env`.
   - Fill in the required environment variables in the `.env` file.

6. **Run the application in development mode:**
   ```bash
   npm run start:dev
   ```

---

## Technology Stack

- **NestJS** - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **PostgreSQL** - An advanced, enterprise-class open-source relational database.
