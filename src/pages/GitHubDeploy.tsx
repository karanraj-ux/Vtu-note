import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  ChevronLeft, 
  Rocket, 
  Settings, 
  Terminal, 
  FileCode, 
  ExternalLink,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function GitHubDeploy() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const workflowContent = `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          if [ -f package-lock.json ]; then
            npm ci || npm install
          else
            npm install
          fi

      - name: Build with Vite
        run: |
          npx vite build --base=/\${{ github.event.repository.name }}/
          cp dist/index.html dist/404.html

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(workflowContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      title: 'Workflow Already Created',
      icon: FileCode,
      desc: 'The GitHub Actions workflow file is already generated at .github/workflows/deploy.yml in this project.',
      badge: 'Ready'
    },
    {
      title: 'Push Code to Your GitHub Repository',
      icon: Terminal,
      desc: 'Export or push your project files to your GitHub repository on the main or master branch.',
      code: `git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main`
    },
    {
      title: 'Enable GitHub Pages in Repository Settings',
      icon: Settings,
      desc: 'In your GitHub repository, navigate to Settings → Pages. Under "Build and deployment", change the Source dropdown to "GitHub Actions".',
      badge: 'Important'
    },
    {
      title: 'Automatic Deployment',
      icon: Rocket,
      desc: 'GitHub Actions will automatically run the build and deploy pipeline. Your website will be live at https://<your-username>.github.io/<repo-name>/',
      badge: 'Live'
    }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Bar */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 rounded-full transition-colors border border-zinc-800"
          title="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-extrabold text-white">GitHub Pages Deployment</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Workflow Ready
            </span>
          </div>
          <p className="text-zinc-400 mt-1">Host and publish your VTU Notes website directly on GitHub Pages using GitHub Actions.</p>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-gradient-to-br from-blue-950/40 via-zinc-900 to-zinc-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 font-semibold text-sm">
              <Globe className="h-4 w-4" />
              <span>Free Automated Static Hosting</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Automated GitHub Actions Pipeline</h2>
            <p className="text-zinc-300 text-sm max-w-2xl leading-relaxed">
              Whenever you push updates to your GitHub repository, the pre-configured GitHub Actions workflow will automatically run Vite's production build, prepare SPA fallback routes (404.html), and publish your website to GitHub Pages without any manual server maintenance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-emerald-400" />
                  Copied Workflow!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Workflow YAML
                </>
              )}
            </button>
            <a
              href="https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm shadow-blue-500/20"
            >
              GitHub Docs
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Terminal className="h-5 w-5 mr-2 text-blue-400" />
          Setup Steps to Host on GitHub
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-sm hover:border-zinc-700/80 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-zinc-800 text-blue-400 p-2.5 rounded-xl border border-zinc-700/60 shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Step {idx + 1}</span>
                        <h4 className="text-base font-bold text-white">{step.title}</h4>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{step.desc}</p>
                      
                      {step.code && (
                        <div className="mt-3 bg-zinc-950 border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                          <pre>{step.code}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                  {step.badge && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700 shrink-0">
                      {step.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workflow File Viewer */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center space-x-2">
            <FileCode className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-white">.github/workflows/deploy.yml</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-800"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
        <div className="p-6 bg-zinc-950/70 overflow-x-auto">
          <pre className="text-xs font-mono text-zinc-300 leading-relaxed">
            {workflowContent}
          </pre>
        </div>
      </div>

      {/* SPA & Routing Note */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 flex items-start space-x-3 text-sm text-zinc-400">
        <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-zinc-200">SPA Deep-Link Routing Included: </span>
          The workflow automatically duplicates <code className="text-zinc-300 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800">index.html</code> to <code className="text-zinc-300 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800">404.html</code>, ensuring that refreshing on sub-pages like <code className="text-zinc-300 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800">/sgpa</code> or <code className="text-zinc-300 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800">/timetable</code> on GitHub Pages loads seamlessly without 404 errors.
        </div>
      </div>
    </div>
  );
}
