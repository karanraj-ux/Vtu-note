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
> **Note**: If you see `Get Pages site failed. Please verify that the repository has Pages enabled`, it means GitHub Pages source is not yet set to GitHub Actions!
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top).
3. In the left sidebar under *Code and automation*, click **Pages**.
4. Under **Build and deployment** > **Source**, change the dropdown from "Deploy from a branch" to **GitHub Actions**.

### Step 3: View Your Live Website!
Once you select **GitHub Actions**, re-run the workflow (or push a commit). The deployment workflow will run successfully. Within 1–2 minutes, your website will be live at:
`https://<your-username>.github.io/<your-repo-name>/`
