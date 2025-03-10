# Stratify: Planner App 📚

## About 📖
The **Stratify** is a modern solution for college students to manage their academic and personal tasks efficiently. With an intuitive interface and robust features, the app is tailored to meet the unique needs of students, helping them stay on top of their coursework, goals, and deadlines. Whether you're managing course schedules, tracking goals, or organizing to-do lists, this app provides the structure needed for success.

## Why? 🤔

**Stratify** is built with the following key purposes in mind:

+ **Made for Students, Not Enterprises 🧑‍🎓:** Unlike enterprise-grade software, this app is optimized for individual use, focusing on features that students need, like course tracking, goal setting, and task management.
+ **Best College Tracking Experience 🏆:**  Designed to provide the most streamlined experience for college students. The app allows users to track courses, assignments, and even save important files and links to stay organized and prepared for their academic journey.
+ **Focused on Enhancing Productivity ⏳:** The app is built with the sole purpose of increasing students' productivity. By consolidating course details, tasks, goals, and important links/files in one place, it eliminates the need to juggle multiple apps or paper planners. This streamlined approach allows students to focus more on learning and less on organizing, helping them stay efficient and effective throughout their academic life.

## Tech Stack & Why We Chose It ⚙️

Building a planner app for students requires speed, reliability, and scalability, ensuring tasks, schedules, and goals are always accessible. Every technology in this stack was carefully selected to provide the best experience for students.

+ **Next.js 🚀** – Chosen for its Server-Side Rendering (SSR) and Static Site Generation (SSG), ensuring fast load times and a smooth experience, even on slower networks. SSR improves SEO for public features, while SSG helps pre-render important pages for instant loading.
+ **TypeScript 🔒** - Used for type safety and better code maintainability. It reduces runtime errors and helps developers write more robust and scalable code, ensuring fewer bugs in student data management.
+ **Go (Gin Framework) ⚡** – Built with concurrency and performance in mind, Go allows the backend to handle multiple user requests efficiently. The Gin framework adds speed and lightweight routing, making API calls fast and reducing response times for students managing their coursework.
+ **PostgreSQL 💾** – A highly reliable relational database, ensuring data consistency for student schedules, tasks, and stored files. Chosen for its strong ACID compliance, PostgreSQL prevents data loss and corruption while handling complex queries efficiently.
+ **Vitest + React Testing Library 🧪** – A lightning-fast testing framework designed for modern applications. It ensures the planner’s core functionality remains stable, helping developers catch issues before they reach users. Focuses on testing user interactions, ensuring buttons, forms, and features behave as expected, improving the overall user experience.
