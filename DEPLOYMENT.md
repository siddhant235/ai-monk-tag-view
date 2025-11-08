# GitHub Pages Deployment Guide

## 🚀 Deployment Setup

This project is configured to deploy to GitHub Pages automatically.

### Configuration Done:
- ✅ `gh-pages` package installed
- ✅ `vite.config.js` configured with base path
- ✅ `package.json` updated with deploy scripts
- ✅ Homepage URL set

### Live URL:
**https://siddhant235.github.io/ai-monk-tag-view**

---

## 📦 Deploy Commands

### First Time Deployment:
```bash
npm run deploy
```

This will:
1. Build the production bundle (`npm run build`)
2. Deploy the `dist` folder to `gh-pages` branch
3. Make your app live on GitHub Pages

### Subsequent Deployments:
After making changes, simply run:
```bash
npm run deploy
```

---

## 🔧 Manual Deployment Steps (if needed)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

3. **Wait 1-2 minutes** for GitHub Pages to update

4. **Visit your site:**
   https://siddhant235.github.io/ai-monk-tag-view

---

## ⚙️ GitHub Pages Settings

After first deployment, verify GitHub Pages settings:

1. Go to your repository: https://github.com/siddhant235/ai-monk-tag-view
2. Click **Settings** → **Pages**
3. Ensure:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `root`
   - Status should show: ✅ Your site is live

---

## 🔄 Update Workflow

1. Make changes to your code
2. Test locally: `npm run dev`
3. Commit changes: `git add . && git commit -m "Your message"`
4. Push to GitHub: `git push origin master`
5. Deploy to Pages: `npm run deploy`

---

## 🐛 Troubleshooting

### Site not loading?
- Check GitHub Pages settings in repository
- Wait 1-2 minutes after deployment
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### 404 errors on page refresh?
- This is expected with GitHub Pages and single-page apps
- The app will still work when accessing from the homepage

### Build errors?
- Check for linting errors: `npm run lint`
- Ensure all dependencies are installed: `npm install`

---

## 📝 Notes

- The `gh-pages` branch is auto-generated and managed by the deploy script
- Don't manually edit the `gh-pages` branch
- Production builds are optimized and minified
- Source maps are included for debugging

---

## 🎉 Success!

Your Nested Tag View app is now deployed and accessible to the world! 🌍

