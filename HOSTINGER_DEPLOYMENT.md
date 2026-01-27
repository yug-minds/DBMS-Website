# Hostinger Deployment Guide

This guide will walk you through deploying the Dawn Buds Model School website to Hostinger hosting.

## Prerequisites

- Hostinger hosting account with cPanel access
- Node.js installed on your local machine (for building)
- FTP/SFTP access or File Manager access in cPanel
- Domain name configured in Hostinger

## Step 1: Build the Project Locally

1. **Open terminal/command prompt** in the project root directory.

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Build the project for production**:
   
   For Hostinger deployment, use the special build command that automatically copies the `.htaccess` file:
   ```bash
   npm run build:hostinger
   ```
   
   Or use the regular build and then copy `.htaccess` manually:
   ```bash
   npm run build
   npm run copy-htaccess
   ```

   This will create a `dist/public` folder with all the production-ready files, including the `.htaccess` file.

## Step 2: Verify Build Output

After building, check that your `dist/public` folder contains:
- `index.html`
- `.htaccess` file (important for routing!)
- `assets/` folder (with CSS, JS files)
- All public assets (images, etc.)
- `robots.txt`
- `sitemap.xml`
- `404.html`

## Step 3: Access Hostinger cPanel

1. Log in to your **Hostinger account**
2. Go to **hPanel** (or cPanel if available)
3. Navigate to **File Manager** or use **FTP/SFTP**

## Step 4: Upload Files to Hostinger

### Option A: Using File Manager (Recommended)

1. In **File Manager**, navigate to `public_html` (or `www` or your domain's root directory)
2. **Delete all existing files** in `public_html` (if any) - **BACKUP FIRST if needed!**
3. **Upload all files** from your `dist/public` folder:
   - Select all files in `dist/public`
   - Upload them to `public_html`
   - Make sure `.htaccess` is uploaded (it might be hidden - enable "Show Hidden Files" in File Manager)

### Option B: Using FTP/SFTP

1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your Hostinger FTP server:
   - **Host**: `ftp.yourdomain.com` or IP provided by Hostinger
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: 21 (FTP) or 22 (SFTP)
3. Navigate to `public_html` directory
4. Upload all files from `dist/public` to `public_html`
5. Ensure `.htaccess` is uploaded (enable "Show hidden files" in your FTP client)

## Step 5: Set File Permissions

In File Manager or via FTP, set the following permissions:

- **Folders**: `755` (rwxr-xr-x)
- **Files**: `644` (rw-r--r--)
- **`.htaccess`**: `644` (rw-r--r--)

To set permissions in File Manager:
1. Right-click on file/folder → **Change Permissions**
2. Set the numeric value (755 for folders, 644 for files)

## Step 6: Verify Deployment

1. **Visit your website** in a browser: `https://yourdomain.com`
2. **Test all routes**:
   - Home page: `/`
   - About: `/about`
   - Academics: `/academics`
   - Admissions: `/admissions`
   - Gallery: `/gallery`
   - Contact: `/contact`
   - Admin: `/login` and `/admin`

3. **Check browser console** (F12) for any errors
4. **Test form submissions** (Admissions and Contact forms)

## Step 7: Configure Domain (if not already done)

If your domain isn't configured:

1. In Hostinger hPanel, go to **Domains**
2. Point your domain to the hosting
3. Update DNS settings if needed
4. Wait for DNS propagation (can take up to 48 hours, usually much faster)

## Troubleshooting

### Issue: 404 errors on routes (e.g., `/about`, `/gallery`)

**Solution**: 
- Ensure `.htaccess` file is uploaded and in the root directory (`public_html`)
- Check that `.htaccess` has correct permissions (644)
- Verify mod_rewrite is enabled on your Hostinger server (contact support if needed)

### Issue: White screen or blank page

**Solution**:
- Check browser console for JavaScript errors
- Verify all files were uploaded correctly
- Check that `index.html` exists in `public_html`
- Ensure file paths are correct (case-sensitive on Linux servers)

### Issue: Images not loading

**Solution**:
- Check image paths in the code (should be relative paths like `/image.jpg`)
- Verify images exist in the correct folders
- Check file permissions (should be 644)

### Issue: CSS/JS files not loading

**Solution**:
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check browser console for 404 errors on assets
- Verify `assets/` folder was uploaded correctly
- Check file permissions

### Issue: Forms not submitting

**Solution**:
- Check browser console for errors
- Verify Supabase credentials are hardcoded in `supabase.ts` (they should be)
- Check network tab to see if API calls are being made
- Ensure Supabase project is active and accessible

### Issue: Admin login not working

**Solution**:
- Verify Supabase authentication is configured correctly
- Check Supabase project settings
- Verify admin credentials in Supabase dashboard

## Updating the Website

When you need to update the website after making changes:

### Step-by-Step Update Process

1. **Make your changes** to the code locally (edit files, add features, fix bugs, etc.)

2. **Test locally** (optional but recommended):
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` to test your changes

3. **Build the updated project**:
   ```bash
   npm run build:hostinger
   ```
   This creates a fresh `dist/public` folder with your latest changes.

4. **Access Hostinger File Manager**:
   - Log in to Hostinger hPanel
   - Go to **File Manager**
   - Navigate to `public_html`

5. **Upload updated files**:
   - **Option A - Replace all files** (Recommended for major updates):
     - Select all files in `public_html` and delete them (or backup first)
     - Upload all files from `dist/public` to `public_html`
   
   - **Option B - Selective update** (For minor changes):
     - Only upload the changed files
     - For code changes: Upload the entire `assets/` folder (new JS/CSS files)
     - For content changes: Upload `index.html` if it changed
     - For new images: Upload only the new/changed image files
     - **Always upload `.htaccess`** if you made routing changes

6. **Clear cache**:
   - **Browser cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - **Hostinger cache** (if available): Clear via hPanel → Cache settings

7. **Verify the update**:
   - Visit your website
   - Test the changed features
   - Check browser console for errors (F12)

### Quick Update Command Summary

```bash
# 1. Make your code changes
# 2. Build
npm run build:hostinger

# 3. Upload dist/public/* to public_html on Hostinger
# 4. Clear browser cache and test
```

### Important Notes for Updates

- **Always rebuild** before uploading (`npm run build:hostinger`)
- **Upload `.htaccess`** every time (the build script handles this)
- **Upload entire `assets/` folder** if you changed any code (new file hashes)
- **Clear browser cache** to see changes immediately
- **Backup before major updates** (download current `public_html` files)

## File Structure on Hostinger

After deployment, your `public_html` should look like:

```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── DBMS Logo.jpeg
├── Principal Photo.jpeg
├── Building photo.JPG
├── acadamic wings images/
├── Dbms Event Pics/
├── Our Collaborations/
├── Our Facilities/
├── robots.txt
├── sitemap.xml
└── 404.html
```

## Important Notes

1. **Supabase Configuration**: The Supabase URL and API key are now hardcoded in the code, so no `.env` file is needed on the server.

2. **Build Output**: The build creates files in `dist/public` - upload everything from this folder to `public_html`.

3. **`.htaccess` File**: This file is crucial for React Router to work correctly. Make sure it's uploaded.

4. **SSL Certificate**: Hostinger usually provides free SSL certificates. Enable it in hPanel if not already active.

5. **Backup**: Always backup your current website before uploading new files.

## Support

If you encounter issues:
1. Check Hostinger's knowledge base
2. Contact Hostinger support
3. Check browser console for specific error messages
4. Verify all files were uploaded correctly

## Quick Deployment Checklist

- [ ] Built the project (`npm run build:hostinger` or `npm run build` + `npm run copy-htaccess`)
- [ ] Verified `.htaccess` exists in `dist/public`
- [ ] Backed up existing website (if any)
- [ ] Uploaded all files from `dist/public` to `public_html`
- [ ] Set correct file permissions (755 for folders, 644 for files)
- [ ] Verified `.htaccess` is in `public_html` root
- [ ] Tested website in browser
- [ ] Tested all routes
- [ ] Tested forms (Admissions, Contact)
- [ ] Tested admin login
- [ ] Enabled SSL certificate (if not already active)

---

**Congratulations!** Your website should now be live on Hostinger! 🎉
