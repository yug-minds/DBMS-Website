# Setup Guide - Admission Inquiry Form with Email

This guide will help you set up the email functionality for the Admission Inquiry form.

## Quick Start

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the `server` directory:

```bash
cd server
cp env.example .env
```

Then edit `server/.env` with your email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
RECEIVER_EMAIL=dawnbudsmodelschool@gmail.com
PORT=3001
NODE_ENV=development
```

### 3. Get Gmail App Password

**Important:** Gmail requires an App Password (not your regular password) for security.

1. Go to https://myaccount.google.com/
2. Enable **2-Step Verification** if not already enabled
3. Go to **App passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)" → Enter "The Dawn Buds Model School Website"
5. Click "Generate"
6. Copy the 16-character password
7. Use this password as `EMAIL_PASS` in your `.env` file

### 4. Configure Frontend (Optional)

If your server runs on a different URL, create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:3001
```

For production, update this to your deployed server URL.

### 5. Run the Application

**Option A: Run both frontend and backend together**
```bash
# From root directory
npm run dev:all
```

**Option B: Run separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run dev:server
```

### 6. Test the Form

1. Open http://localhost:5173 (or your Vite dev server URL)
2. Navigate to the Admissions page
3. Fill out the Admission Inquiry form
4. Click "Submit Inquiry"
5. Check your email (dawnbudsmodelschool@gmail.com) for the inquiry

## How It Works

1. User fills out the form on the Admissions page
2. Frontend sends a POST request to `/api/admission-inquiry`
3. Server receives the data and sends two emails:
   - **To you**: Contains all the inquiry details
   - **To the parent**: Confirmation email with their inquiry details

## Deployment

### Deploying the Server

You can deploy the server to:
- **Heroku**: Add a `Procfile` with `web: node index.js`
- **Railway**: Connect your GitHub repo, set environment variables
- **Render**: Create a new Web Service, set environment variables
- **DigitalOcean**: Use App Platform or a Droplet

### Environment Variables for Production

Set these in your hosting platform:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail App Password
- `RECEIVER_EMAIL`: dawnbudsmodelschool@gmail.com
- `PORT`: Usually set automatically by the platform
- `NODE_ENV`: production

### Update Frontend for Production

Update `VITE_API_URL` in your frontend build to point to your deployed server URL.

## Troubleshooting

### Email Not Sending

1. **Check App Password**: Make sure you're using an App Password, not your regular Gmail password
2. **Verify 2-Step Verification**: Must be enabled to generate App Passwords
3. **Check Email Address**: `EMAIL_USER` must match the account that generated the App Password
4. **Check Server Logs**: Look for error messages in the server console

### CORS Errors

- The server already has CORS enabled
- Make sure `VITE_API_URL` in frontend matches your server URL

### Connection Refused

- Verify the server is running: `npm run dev:server`
- Check the port in `.env` matches what you're connecting to
- Ensure no firewall is blocking the connection

## Support

If you encounter issues:
1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Test the `/api/health` endpoint: `http://localhost:3001/api/health`
