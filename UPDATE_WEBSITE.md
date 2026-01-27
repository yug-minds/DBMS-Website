# How to Update Your Website on Hostinger

This guide explains how to push your changes to the live website on Hostinger.

## 🔄 Quick Update Process

### 1. Make Your Changes
Edit your code files locally (in your code editor)

### 2. Build the Project
```bash
npm run build:hostinger
```

### 3. Upload to Hostinger
- Go to **Hostinger hPanel** → **File Manager**
- Navigate to `public_html`
- Upload all files from `dist/public` folder
- **Replace existing files** when prompted

### 4. Clear Cache & Test
- Hard refresh browser: **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac)
- Visit your website and test the changes

---

## 📋 Detailed Steps

### Step 1: Build Your Changes

After making code changes, always rebuild:

```bash
npm run build:hostinger
```

This command:
- Compiles your React code
- Optimizes assets
- Copies `.htaccess` automatically
- Creates production-ready files in `dist/public`

### Step 2: Access Hostinger

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Click on **File Manager**
3. Navigate to `public_html` (your website's root directory)

### Step 3: Upload Updated Files

**Method 1: Replace All Files (Recommended)**

1. In File Manager, select all files in `public_html`
2. Click **Delete** (or backup first by downloading)
3. Upload all files from your local `dist/public` folder
4. Make sure `.htaccess` is uploaded (enable "Show Hidden Files")

**Method 2: Selective Upload (For Minor Changes)**

Only upload what changed:
- **Code changes**: Upload entire `assets/` folder (new file hashes)
- **Content changes**: Upload `index.html` if modified
- **New images**: Upload only new/changed image files
- **Always upload**: `.htaccess` file

### Step 4: Verify Permissions

Ensure file permissions are correct:
- **Folders**: `755`
- **Files**: `644`

### Step 5: Test Your Updates

1. **Clear browser cache**:
   - Chrome/Edge: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Or hard refresh: Ctrl+F5 or Cmd+Shift+R

2. **Visit your website** and test:
   - Homepage loads correctly
   - Changed features work
   - All routes work (`/about`, `/gallery`, etc.)
   - Forms submit correctly
   - No console errors (F12 → Console tab)

---

## 🎯 Common Update Scenarios

### Scenario 1: Changed Text/Content
```bash
# 1. Edit your React components (e.g., Home.tsx, About.tsx)
# 2. Build
npm run build:hostinger

# 3. Upload index.html and assets/ folder
```

### Scenario 2: Added New Images
```bash
# 1. Add images to client/public/ folder
# 2. Build
npm run build:hostinger

# 3. Upload new image files + assets/ folder
```

### Scenario 3: Changed Styling/CSS
```bash
# 1. Edit CSS files or Tailwind classes
# 2. Build
npm run build:hostinger

# 3. Upload entire assets/ folder (CSS files have new hashes)
```

### Scenario 4: Added New Page/Route
```bash
# 1. Create new page component
# 2. Add route in App.tsx
# 3. Build
npm run build:hostinger

# 4. Upload everything (index.html, assets/, .htaccess)
```

### Scenario 5: Fixed Bug
```bash
# 1. Fix the bug in your code
# 2. Test locally: npm run dev
# 3. Build: npm run build:hostinger
# 4. Upload assets/ folder (and index.html if routing changed)
```

---

## ⚠️ Important Tips

1. **Always rebuild** before uploading - never upload source files directly
2. **Test locally first** with `npm run dev` to catch errors early
3. **Backup before major updates** - download current `public_html` files
4. **Upload entire `assets/` folder** when code changes (new file hashes)
5. **Clear browser cache** to see changes immediately
6. **Check browser console** (F12) if something doesn't work

---

## 🐛 Troubleshooting Updates

### Changes Not Showing?

1. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)
2. **Check file upload** - verify files were actually uploaded
3. **Check file permissions** - should be 644 for files, 755 for folders
4. **Check browser console** (F12) for errors

### Website Broken After Update?

1. **Check browser console** for JavaScript errors
2. **Verify all files uploaded** - especially `index.html` and `assets/`
3. **Check `.htaccess` exists** in `public_html`
4. **Restore from backup** if needed (download previous files)

### Old Version Still Showing?

1. **Hard refresh**: Ctrl+F5 or Cmd+Shift+R
2. **Clear browser cache** completely
3. **Try incognito/private window**
4. **Check CDN cache** (if using Cloudflare or similar)

---

## 📝 Update Checklist

Before uploading:
- [ ] Made and tested changes locally
- [ ] Built project (`npm run build:hostinger`)
- [ ] Verified `dist/public` folder has latest files
- [ ] Backed up current website (optional but recommended)

After uploading:
- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file is present
- [ ] File permissions set correctly (644/755)
- [ ] Cleared browser cache
- [ ] Tested website in browser
- [ ] Tested all routes
- [ ] Checked browser console for errors

---

## 🚀 Quick Command Reference

```bash
# Development (test locally)
npm run dev

# Build for production
npm run build:hostinger

# Preview build locally (optional)
npm run preview
```

---

**Need help?** Check the full deployment guide: `HOSTINGER_DEPLOYMENT.md`
