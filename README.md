# Audience QA Full Stack App
This project is a React application integrated with Supabase for backend services, including authentication and database management. Follow the instructions below to set up and run the project.

![banner](https://github.com/user-attachments/assets/779f84ed-5902-4fec-b308-aed45fdc521d)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Clone the Repository](#1-clone-the-repository)
  - [Create a Supabase Project](#2-create-a-supabase-project)
  - [Install Dependencies](#3-install-dependencies)
  - [Configure Supabase](#4-configure-supabase)
  - [Run the Application](#5-run-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (preferably the latest LTS version)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (optional)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone git@github.com:allsimpledevcode/audience-qa.git
cd audience-qa
```
Replace yourusername and your-repo-name with your GitHub username and repository name.

### 2. Create a Supabase Project
Sign up for a free account on Supabase.
Create a new project in your Supabase dashboard.
`Note down the SUPABASE_URL and SUPABASE_ANON_KEY from the "Settings" -> "API" section of your Supabase project`.

### 3. Install Dependencies
Install the required npm packages:
```
npm install
```
or if you’re using Yarn:
```
yarn install
```
### 4. Configure Supabase
Add your Supabase credentials to the `src/utils.ts` file:
```
createClient("<SUPABASE_URL>", "<SUPABASE_ANON_KEY>")
```
Replace your-supabase-url and your-supabase-anon-key with the values obtained from your Supabase project.

### 5. Run the Application
Start the development server:
```
npm run dev
```
or if you’re using Yarn:

```
yarn dev
```
Open your browser and navigate to `http://localhost:5173/` to view the application.

### Usage
**Authentication**: Users can sign in using email and password.
**Data Fetching**: The application fetches data from a Supabase table. Make sure to configure your database schema as needed.
Contributing

If you’d like to contribute to this project, please fork the repository and submit a pull request with your changes. Make sure to follow the contributing guidelines and ensure your code adheres to the project's coding standards.

### License
This project is licensed under the MIT License. See the LICENSE file for details.