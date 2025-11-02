
# Next.js + Auth.js + Drizzle Starter

> **Based on**  
> - [Strapi LaunchPad](https://github.com/strapi/LaunchPad/tree/main)  
> - [Next.js + Auth.js + Drizzle Starter](https://github.com/tobyscott25/next-auth-drizzle-starter)

This project combines two templates from the Strapi and Next.js communities, plus custom modifications that allow you to build pages via Strapi without writing code for each page.

---

### Click on image to watch demo
[![Demo Video](./image.png)](https://youtu.be/BsWpY6c8S-U)

---

## Introduction

This is a simple [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) boilerplate that uses [Auth.js](https://authjs.dev/) for authentication and session management. When a user logs in, their data is upserted to a [PostgreSQL](https://www.postgresql.org/) database with Auth.js’s [@auth/drizzle-adapter](https://authjs.dev/reference/adapter/drizzle).

The SQL models required by Auth.js are available in the [database models](https://authjs.dev/getting-started/adapters#models) documentation. This project uses [@auth/drizzle-adapter](https://authjs.dev/reference/adapter/drizzle) so we can rely on the pre-defined Drizzle schema for PostgreSQL to generate correct migrations.

Unlike the original Docker-based template, this version is meant to run **locally**. You can set up your own local database (PostgreSQL) or use any remote database connection you prefer.

---

## Project Structure

**Main folder to explore**: `src/app`

- **`layout.tsx`**  
  Provides a global layout for the entire application. It includes providers (e.g., context providers) and handles locale setup.

- **`[locale]` folder**  
  Almost all pages reside here, organized by locale. For example, you might have `en`, `fr`, or other language folders.

- **`[locale]/marketing/[slug]`**  
  Demonstrates how you can create pages purely from Strapi, without writing extra code. The project is configured to load predefined “dynamic-zone” components that are mapped to Strapi fields.

### Dynamic Zone & Strapi
The “dynamic-zone” concept allows you to create or edit pages in Strapi’s admin panel. You can drag and drop different blocks (hero sections, cards, etc.) to build pages. Then, Next.js automatically renders them based on the content definition, with minimal or no additional coding.

---

## Deployment

1. **Strapi and next js**:
  ```bash
  pm2 start npm --name "starpi" -- run develop
  pm2 save
  
  pm2 start npm --name "next-js" -- run dev
  pm2 save
  
  pm2 startup

  ```

## Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Install dependencies**:
   ```bash
   cd ./next-js
   pnpm install
   ```
   and
   ```bash
   cd ./strapi
   #nvm use 20 (RECOMMENDED! need to install nvm)
   npm  install
   npx strapi ts:generate-types
   npx strapi import -f "./data/export_20250116105447.tar.gz"  
   ```
(also read local README in each dir)

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
```
