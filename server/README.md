# The Dawn Buds Model School Website Server

Backend server for handling admission inquiries and sending emails via nodemailer.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Email address to receive inquiries
RECEIVER_EMAIL=dawnbudsmodelschool@gmail.com

# Server Port
PORT=3001

# Environment
NODE_ENV=development
```

### 3. Gmail App Password Setup

Since Gmail requires App Passwords for third-party applications:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
3. Go to **App passwords**: https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it as `EMAIL_PASS` in your `.env` file

**Note:** Use the App Password, NOT your regular Gmail password.

### 4. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3001` by default.

### 5. Frontend Configuration

In your frontend `.env` file (or `.env.local`), add:

```env
VITE_API_URL=http://localhost:3001
```

For production, update this to your deployed server URL.

## API Endpoints

### POST `/api/admission-inquiry`

Submit an admission inquiry form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "classInterest": "nursery",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully"
}
```

### POST `/api/career-application`

Submit a career application form.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 98765 43210",
  "position": "Math Teacher",
  "experience": "3 Years",
  "resumeLink": "https://drive.google.com/...",
  "message": "Optional cover letter message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Deployment

### Option 1: Deploy as Standalone Server

Deploy the server to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean
- AWS EC2

Make sure to set environment variables in your hosting platform.

### Option 2: Serverless Functions

For Netlify or Vercel, you can convert this to serverless functions. See the respective platform documentation.

## Troubleshooting

1. **Email not sending**: 
   - Verify App Password is correct
   - Check that 2-Step Verification is enabled
   - Ensure EMAIL_USER matches the account generating the App Password

2. **CORS errors**:
   - Make sure CORS is enabled (already configured in the server)
   - Check that the frontend URL is allowed

3. **Connection refused**:
   - Verify the server is running
   - Check the PORT in .env matches the one you're connecting to
