# Prisma 2025

Welcome to the Prisma 2025 project! This repository contains the codebase for the official website of Prisma 2025, the techno-cultural fest of SRM University Delhi-NCR. Below you will find an overview of the project, its structure, and instructions on how to get started.

## Project structure

The project is organized into several directories and files, each serving a specific purpose. Here is an overview of the main components:

* `app/`: Contains the main application code, including pages and components.
  * `app/about/page.tsx`: The "About" page of the website.
  * `app/components/`: Contains reusable components used throughout the application.
    * `app/components/Auth.tsx`: Authentication component for beta access.
    * `app/components/Background.tsx`: Background animation using Three.js.
    * `app/components/BookModel.tsx`: 3D book model component.
    * `app/components/Navigation.tsx`: Navigation bar component.
    * `app/components/Sponsors.tsx`: Sponsors section component.
  * `app/contact/page.tsx`: The "Contact" page of the website.
  * `app/events/page.tsx`: The "Events" page of the website.
  * `app/globals.css`: Global CSS styles for the application.
  * `app/layout.tsx`: Layout component for the application.
  * `app/page.tsx`: The main landing page of the website.
  * `app/with-nav/`: Contains pages with a specific layout that includes navigation.
* `components/`: Contains additional UI components and utilities.
  * `components/theme-provider.tsx`: Theme provider for the application.
* `public/`: Contains static assets such as images and models.
* `scripts/`: Contains utility scripts.
* `styles/`: Contains additional CSS styles.
* `next.config.js`: Next.js configuration file.
* `package.json`: Project dependencies and scripts.
* `tailwind.config.js`: Tailwind CSS configuration file.
* `tsconfig.json`: TypeScript configuration file.

## Getting started

To get started with the project, follow these steps:

1. **Clone the repository**: Clone the repository to your local machine using Git.
2. **Install dependencies**: Run `npm install` to install the required dependencies.
3. **Run the development server**: Use `npm run dev` to start the development server. The application will be available at `http://localhost:3000`.
4. **Build the project**: Use `npm run build` to build the project for production.
5. **Start the production server**: Use `npm start` to start the production server.

## Features

The Prisma 2025 website includes the following features:

* **Authentication**: Beta access authentication using the `Auth` component.
* **Background animation**: A dynamic background animation using Three.js.
* **3D models**: Integration of 3D models such as the book model.
* **Responsive navigation**: A responsive navigation bar for easy access to different sections of the website.
* **Event details**: Detailed information about various events happening during the fest.
* **Sponsor showcase**: A section to showcase the sponsors of the event.
* **Contact information**: Contact details of the organizing team.

## Contributing

We welcome contributions to the Prisma 2025 project! If you would like to contribute, please follow these steps:

1. **Fork the repository**: Fork the repository to your GitHub account.
2. **Create a new branch**: Create a new branch for your feature or bug fix.
3. **Make your changes**: Implement your changes and commit them to your branch.
4. **Submit a pull request**: Submit a pull request to the main repository for review.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

Thank you for your interest in Prisma 2025! We hope you enjoy exploring and contributing to the project.
