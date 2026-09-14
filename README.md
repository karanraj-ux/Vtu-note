# VTU Notes Tracker 🎓

An advanced, intuitive VTU notes and academic hub built with React, Vite, TypeScript, and Tailwind CSS.

## Features
- **Smart Notes & Question Papers**: Access comprehensive modules, model papers, and interactive notes.
- **Official Autonomous Timetable**: Complete physics and chemistry cycle timetables for Acharya Institute of Technology.
- **SGPA Calculator**: Custom 2022 Scheme calculator with live grade points, credit weighting, and percentage calculation.
- **Community Feed**: Verified college email student collaboration and note sharing.

---

## 🚀 Deploying to GitHub Pages (Automated via GitHub Actions)

This repository includes a pre-configured GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds and deploys your site automatically whenever you push code.

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit with GitHub Actions"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Enable GitHub Pages in Repository Settings
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Source**, select **GitHub Actions**.

### Step 3: View Your Live Website!
Once you enable GitHub Actions, the deployment workflow will trigger automatically. Within 1–2 minutes, your website will be live at:
`https://<your-username>.github.io/<your-repo-name>/`
