# 🌟 Stratify 📚

**Stratify** is an all-in-one platform designed to help students manage their academic life. It allows users to organize courses, track assignments, and set academic goals. The app also provides secure storage for important files like PDFs, Word documents, and links.

🎥 **Live Demo Video**  
🧠 **[DB Diagrams](https://drive.google.com/file/d/1IwtmqZZxZeMgUa2cu2eVfP4zB-AEoH3v/view)**

---

## 🔍 Why this application?

### 🎓 Made for Students, Not Enterprises  
Unlike complex software like Jira, Stratify is designed specifically for students, focusing on simplicity and ease of use. It removes unnecessary features, ensuring students can manage their academic tasks without being overwhelmed by enterprise-level tools.

### ✨ Simplicity and Minimalism  
With a clean, minimalist design, Stratify offers a distraction-free, intuitive experience that keeps students focused on what matters most. Every feature is designed to be straightforward and user-friendly, eliminating clutter and making it easy to navigate the app effortlessly.

---

## 🧰 Tech Stack & Why I Chose It

- ⚡ **Next.js**: Enables fast, SEO-friendly web apps with SSR, SSG, and API routes. Its built-in features improve performance and make scaling easier.
- 🧠 **TypeScript (TS)**: Enhances code quality with static typing, improving debugging, IntelliSense, and overall development experience.
- 🚀 **Go/Golang**: Chosen for its simplicity, speed, and concurrency support—ideal for scalable microservices with low resource usage.
- 🗃️ **PostgreSQL + Prisma**: PostgreSQL offers reliable, high-performance relational data storage, while Prisma provides elegant, type-safe DB interactions.

---

## 🚀 Key Features

- 📚 **Course Management**: Add, edit, and delete courses with professor details and class schedules.  
- 📝 **Assignment Tracking**: Stay on top of assignments and deadlines.  
- 📁 **File Storage**: Securely upload/manage academic files (PDFs, Word documents, links).  
- 🎯 **Goal Setting**: Define and track academic goals to stay motivated.

---

## 🛠️ Getting Started

To run Stratify locally:

### 🔁 Clone the Repository
```bash
git clone https://github.com/tarun-veeraraghavan-mv/Stratify.git


## Getting Started 🛠️

To get started with Stratify locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/tarun-veeraraghavan-mv/Stratify.git
   ```

2. Setup Postgres and Redis databases for server to connect to:
   In root of directory run
   ```bash
   docker-compose up --build
   ```

3. Provision AWS resources using terraform: (Make sure terraform is installed locally in your system if not visit 👉 [here!](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli))
   ```bash
   terraform init
   terraform apply
   ```


4. Run the server: (Can also use inbuilt tool in your favorite Java IDE)
   ```bash
   cd server
   mvn clean install
   ```

4. To run the client:
   ```bash
   cd client
   npm install
   npm run dev
   ```

5. Now, open your browser and visit 👉 http://localhost:3000
