# GitHub Setup Guide

This guide will help you set up GitHub for your portfolio website project.

## Step 1: Install Git

### Option A: Download Git for Windows (Recommended)
1. Visit: https://git-scm.com/download/win
2. Download the latest version
3. Run the installer and follow the setup wizard
4. Choose the default options (they work well for most users)
5. After installation, **restart your terminal/PowerShell**

### Option B: Install via Winget (if available)
Open PowerShell as Administrator and run:
```powershell
winget install --id Git.Git -e --source winget
```

### Verify Installation
After installing, restart your terminal and run:
```bash
git --version
```

## Step 2: Configure Git (First Time Only)

Set your name and email (use your GitHub account email):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Create a GitHub Account (If You Don't Have One)

1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process
4. Verify your email address

## Step 4: Create a New Repository on GitHub

1. Log in to GitHub
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `website1` (or any name you prefer)
5. Description: "My portfolio website"
6. Choose: **Public** (so you can use GitHub Pages for free hosting)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 5: Initialize Git in Your Project

Open terminal/PowerShell in your project folder (`c:\Users\User\website1`) and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Make your first commit
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/website1.git

# Rename default branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username in the remote URL.

## Step 6: Authentication with GitHub

When you run `git push`, you'll need to authenticate. Options:

### Option A: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "My Portfolio Project"
4. Select scopes: Check `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When prompted for password, paste the token instead

### Option B: GitHub Desktop (Easier for beginners)
1. Download: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Use the GUI to push/pull instead of command line

### Option C: SSH Keys (Advanced)
If you prefer SSH, see: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

## Step 7: Enable GitHub Pages (Free Hosting!)

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Branch: `main` / Folder: `/ (root)`
6. Click "Save"
7. Your site will be live at: `https://YOUR_USERNAME.github.io/website1/`

Wait a few minutes for the site to build, then visit your URL!

## Step 8: Future Updates

When you make changes to your website:

```bash
# Check what changed
git status

# Add changed files
git add .

# Commit with a message
git commit -m "Updated portfolio content"

# Push to GitHub
git push
```

Your GitHub Pages site will automatically update within a few minutes!

## Troubleshooting

### "git: command not found"
- Git is not installed or not in PATH
- Restart your terminal after installing Git
- Make sure you selected "Git from the command line" during installation

### "Permission denied (publickey)"
- You need to set up authentication (see Step 6)
- Use a Personal Access Token or GitHub Desktop

### "fatal: remote origin already exists"
- Run: `git remote remove origin`
- Then run the `git remote add origin` command again

### Can't push to GitHub
- Make sure you're authenticated (see Step 6)
- Check that your repository URL is correct
- Verify you have write access to the repository

## Additional Tips

- **Commit often**: Make small, frequent commits with clear messages
- **Use branches**: Create branches for new features: `git checkout -b new-feature`
- **Pull before push**: If working on multiple computers, always `git pull` first
- **Check GitHub Pages**: Settings → Pages shows your site URL and deployment status

## Need Help?

- GitHub Docs: https://docs.github.com
- Git Documentation: https://git-scm.com/doc
- GitHub Community: https://github.community
