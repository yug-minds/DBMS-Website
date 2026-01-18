# Gmail Email Setup Guide for Dawn Buds Model School

This guide will help you set up Gmail to send emails from your website forms.

## 📧 Email Configuration Overview

All form submissions (Admissions & Contact/Join Our Team) will be sent to:
- **Recipient Email**: `dawnbudsmodelschool@gmail.com`

The emails will be sent **FROM** the same Gmail account using an App Password.

---

## 🔐 Step-by-Step Gmail App Password Setup

### Step 1: Enable 2-Step Verification

1. **Sign in** to your Google Account: `dawnbudsmodelschool@gmail.com`
2. Go to **Google Account Settings**: https://myaccount.google.com/
3. Click on **Security** in the left sidebar
4. Under **Signing in to Google**, find **2-Step Verification**
5. If it's **OFF**, click on it and follow the prompts to enable it
   - You'll need a phone number to receive verification codes
   - This is **required** to generate App Passwords

### Step 2: Generate App Password

1. Go directly to **App Passwords**: https://myaccount.google.com/apppasswords
   - Or navigate: **Google Account** → **Security** → **2-Step Verification** → Scroll down to **App passwords**
2. Select app: Choose **"Mail"** from the dropdown
3. Select device: Choose **"Other (Custom name)"** and type: `Dawn Buds Website Server`
4. Click **"Generate"**
5. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **IMPORTANT**: You can only see this password once! Save it immediately.
   - Remove spaces when using it: `abcdefghijklmnop`

### Step 3: Create .env File in Server Directory

1. Navigate to the `server` folder in your project
2. Create a file named `.env` (if it doesn't exist)
3. Copy the contents from `env.example` and fill in your details:

```env
# Email Configuration - The Gmail account that will send emails
EMAIL_USER=dawnbudsmodelschool@gmail.com

# App Password (NOT your regular password - use the 16-char password from Step 2)
EMAIL_PASS=abcdefghijklmnop

# Email address to receive all form submissions
RECEIVER_EMAIL=dawnbudsmodelschool@gmail.com

# Server Port
PORT=3001

# Environment
NODE_ENV=development
```

**Replace `abcdefghijklmnop` with your actual 16-character App Password (without spaces)**

### Step 4: Verify Setup

1. Make sure the `server` folder has a `.env` file with the correct values
2. Install dependencies (if not already done):
   ```bash
   cd server
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```
4. Test by submitting a form from your website
5. Check `dawnbudsmodelschool@gmail.com` inbox for the email

---

## ✅ Quick Checklist

- [ ] 2-Step Verification enabled on Gmail account
- [ ] App Password generated (16 characters, no spaces)
- [ ] `.env` file created in `server` folder
- [ ] `EMAIL_USER` = `dawnbudsmodelschool@gmail.com`
- [ ] `EMAIL_PASS` = Your App Password (16 chars, no spaces)
- [ ] `RECEIVER_EMAIL` = `dawnbudsmodelschool@gmail.com`
- [ ] Server dependencies installed (`npm install` in server folder)
- [ ] Server running successfully

---

## 🎯 What Happens When Forms Are Submitted?

### Admission Inquiry Form:
1. User fills form on **Admissions** page
2. Email sent **TO**: `dawnbudsmodelschool@gmail.com` (notification)
3. Confirmation email sent **TO**: Parent's email (automatic response)

### Career Application Form:
1. User fills form on **Contact** page ("Join Our Team")
2. Email sent **TO**: `dawnbudsmodelschool@gmail.com` (notification)
3. Confirmation email sent **TO**: Applicant's email (automatic response)

---

## 🛠️ Troubleshooting

### ❌ "Invalid login" or "Authentication failed"
- **Solution**: Make sure you're using the **App Password**, not your regular Gmail password
- Verify the App Password has no spaces (16 characters total)
- Re-generate App Password if needed

### ❌ "2-Step Verification required"
- **Solution**: Enable 2-Step Verification first (Step 1 above)
- App Passwords only work if 2-Step Verification is enabled

### ❌ Emails not being received
- Check spam/junk folder in `dawnbudsmodelschool@gmail.com`
- Verify `.env` file exists in `server` folder (not in root)
- Check server console for error messages
- Verify `RECEIVER_EMAIL` is correct in `.env`

### ❌ Server won't start
- Make sure all dependencies are installed: `cd server && npm install`
- Verify `.env` file is in the correct location (`server/.env`)
- Check that PORT 3001 is available

---

## 📝 Important Notes

1. **Never commit `.env` file to Git** - It contains sensitive passwords
2. **App Password vs Regular Password**: Always use App Password for email sending
3. **Security**: The App Password only works for sending emails, not full account access
4. **Multiple Servers**: You can generate multiple App Passwords for different servers/devices

---

## 🚀 For Production Deployment

When deploying to production (Heroku, Railway, Render, etc.):

1. Set these environment variables in your hosting platform's dashboard:
   - `EMAIL_USER=dawnbudsmodelschool@gmail.com`
   - `EMAIL_PASS=your-app-password`
   - `RECEIVER_EMAIL=dawnbudsmodelschool@gmail.com`
   - `PORT=3001` (or your platform's assigned port)

2. Update frontend `.env` with production server URL:
   ```env
   VITE_API_URL=https://your-server-url.com
   ```

---

## 📞 Need Help?

If you encounter issues:
1. Check server console logs for specific error messages
2. Verify all steps above are completed
3. Try generating a new App Password if the current one doesn't work
4. Make sure Gmail account `dawnbudsmodelschool@gmail.com` is accessible

---

**Setup completed!** ✅ Forms will now send emails to `dawnbudsmodelschool@gmail.com`
