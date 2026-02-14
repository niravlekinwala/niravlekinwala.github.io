# Nirav Lekinwala - Personal Website

A modern, responsive personal website built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Framer Motion](https://www.framer.com/motion/).

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 How to Manage Content

### 1. Adding a New Blog Post
Blog posts are Markdown files located in the `posts/` directory.

1.  Create a new file in `posts/` (e.g., `posts/my-new-research.md`).
2.  Add the required **Frontmatter**:
    ```markdown
    ---
    title: "My New Research on PM2.5"
    date: "2026-03-15"
    description: "Brief summary."
    ---
    
    # Introduction
    Content goes here.
    ```

### 2. Adding a Project
Projects are Markdown files in the `projects/` directory.

1.  Create a new file (e.g., `projects/new-project.md`).
2.  Add the required **Frontmatter** (Note: removed code/demo links):
    ```markdown
    ---
    title: "Project Name"
    date: "2026-04-01"
    description: "Brief description for the card."
    tags: ["Python", "Machine Learning"]
    ---
    
    # Details
    Write full details here. You can include code blocks:
    
    \`\`\`python
    print("Hello World")
    \`\`\`
    ```

### 3. Visual Customization
-   **Theme**: The `src/app/globals.css` file contains the CSS variables for colors.
-   **Hero Animation**: `src/components/HeroAnimation.tsx` controls the particles.

## 🛠 Deployment
Push to `main`. GitHub Actions handles the rest.
