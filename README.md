![LaunchPad](https://raw.githubusercontent.com/strapi/LaunchPad/main/LaunchPad.jpg)

# Next.js + Auth.js + Drizzle Starter

> **Based on**  
> - [Strapi LaunchPad](https://github.com/strapi/LaunchPad/tree/main)  
> - [Next.js + Auth.js + Drizzle Starter](https://github.com/tobyscott25/next-auth-drizzle-starter)

This project combines two templates from the Strapi and Next.js communities, plus custom modifications that allow you to build pages via Strapi without writing code for each page.

---

## Introduction

A [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) boilerplate using [Auth.js](https://authjs.dev/) for authentication, with user data persisted to [PostgreSQL](https://www.postgresql.org/) via Auth.js's [@auth/drizzle-adapter](https://authjs.dev/reference/adapter/drizzle). Unlike the original Docker-based template, this version runs **locally** against any PostgreSQL instance you provide.

---

## Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Install dependencies**:
   ```bash
   cd ./next-js
   npm install
   ```
   and
   ```bash
   cd ./strapi
   #nvm use 20 (RECOMMENDED! need to install nvm)
   npm  install
   npx strapi ts:generate-types
   ```

3. **Configure environment**:
   - Create a `.env.local` file (ignored by Git) for storing secrets:
     ```bash
     cp .env .env.local
     ```
   - Edit `.env.local` with your own values (e.g., database connection string, Auth.js secret, OAuth credentials).

4. **Run the dev server**:
   ```bash
   npm run dev #in next-js
   ```
   and
   ```bash
   npm run develop #in strapi
   ```
   Then visit [http://localhost:3000](http://localhost:3000).

---

## Setting Up PostgreSQL (Optional)

You can use any PostgreSQL instance (local or remote). For local development, install PostgreSQL on your machine and update the connection URL in your `.env.local`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

---

## Creating Pages from Strapi

1. **Dynamic Zones**  
   Define your dynamic-zone fields in Strapi for each page. For example, you might have a “Hero” block, a “Card” block, etc.

---

## Useful Commands

- **Start local dev**:
  ```bash
  npm run dev
  ```
- **Build for production**:
  ```bash
  npm run build
  ```
- **Run migrations (Drizzle)**:
  ```bash
  npx drizzle-kit up
  ```
  Adjust your Drizzle config as needed in `drizzle.config.ts`.

---

## Acknowledgments

- [Strapi LaunchPad](https://github.com/strapi/LaunchPad/tree/main) – for providing an excellent base to integrate Strapi quickly.
- [Next.js + Auth.js + Drizzle Starter](https://github.com/tobyscott25/next-auth-drizzle-starter) – for the authentication and Drizzle integration setup.

We combined and modified these templates to create our own boilerplate, tailored to our needs.

---

## License

This project inherits licenses from the original templates. Please refer to their respective repositories for details on license terms:

- [Strapi LaunchPad License](https://github.com/strapi/LaunchPad/blob/main/LICENSE)
- [Next.js + Auth.js + Drizzle Starter License](https://github.com/tobyscott25/next-auth-drizzle-starter/blob/main/LICENSE)

---

Happy coding! If you run into any issues or have suggestions, feel free to open an issue or submit a pull request.
