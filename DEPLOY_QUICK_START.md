# Quick Deployment Guide - Hostinger

## 🚀 Initial Deployment Steps

1. **Build the project:**
   ```bash
   npm run build:hostinger
   ```

2. **Upload to Hostinger:**
   - Go to Hostinger hPanel → File Manager
   - Navigate to `public_html`
   - Upload ALL files from `dist/public` folder
   - Make sure `.htaccess` is uploaded (enable "Show Hidden Files")

3. **Set permissions:**
   - Folders: `755`
   - Files: `644`

4. **Test your website:**
   - Visit: `https://yourdomain.com`
   - Test routes: `/about`, `/gallery`, `/admissions`, etc.

---

## 🔄 Updating Your Website

**After making changes to your code:**

1. **Build again:**
   ```bash
   npm run build:hostinger
   ```

2. **Upload updated files:**
   - Go to Hostinger hPanel → File Manager
   - Navigate to `public_html`
   - Upload all files from `dist/public` (replace existing)
   - Or upload only changed files (usually `assets/` folder)

3. **Clear cache & test:**
   - Hard refresh: **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac)
   - Visit your website and verify changes

📖 **See `UPDATE_WEBSITE.md` for detailed update instructions**

---

## 📁 What to Upload

Upload everything from `dist/public/` to `public_html/`:
- ✅ `index.html`
- ✅ `.htaccess` (IMPORTANT!)
- ✅ `assets/` folder
- ✅ All images and public files
- ✅ `robots.txt`
- ✅ `sitemap.xml`

## ⚠️ Common Issues

**404 errors on routes?**
→ Check `.htaccess` is uploaded and has 644 permissions

**White screen?**
→ Check browser console for errors
→ Verify all files uploaded correctly

**Images not loading?**
→ Check file paths and permissions

**Changes not showing?**
→ Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
→ Verify files were uploaded correctly

## 📖 Full Guides

- **Initial Deployment**: See `HOSTINGER_DEPLOYMENT.md`
- **Updating Website**: See `UPDATE_WEBSITE.md`
