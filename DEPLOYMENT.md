# Akira Movie App - Deployment Guide for Render

This guide provides step-by-step instructions for deploying the Akira Movie App to Render.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: Have your MongoDB connection string ready

## Architecture

- **Backend**: NestJS API (Node.js Web Service)
- **Frontend**: Angular 21 Static Site
- **Database**: MongoDB Atlas (external)

---

## Part 1: Backend Deployment

### Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Navigate to **Network Access** → **Add IP Address**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Copy your MongoDB connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### Step 2: Deploy Backend to Render

1. **Log in to Render** and click **"New +"** → **"Web Service"**

2. **Connect Repository**:
   - Connect your GitHub account
   - Select the `Akira-Movie-App` repository
   - Click **"Connect"**

3. **Configure Service**:
   - **Name**: `akira-movie-backend` (or your preferred name)
   - **Region**: Choose closest to you (e.g., Oregon)
   - **Branch**: `main`
   - **Root Directory**: `NestJsBackend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Instance Type**: `Free`

4. **Set Environment Variables**:
   Click **"Advanced"** and add these environment variables:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `STAGE` | `prod` |
   | `PORT` | `10000` |
   | `MODB_URL` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Generate a secure random string (use [passwordsgenerator.net](https://passwordsgenerator.net/)) |
   | `TOKEN_EXP` | `1800` |
   | `FRONTEND_URL` | Leave blank for now (will update after frontend deployment) |

5. **Create Web Service**: Click **"Create Web Service"**

6. **Wait for Deployment**: Monitor the logs. Once deployed, copy your backend URL (e.g., `https://akira-movie-backend.onrender.com`)

7. **Test Backend**:
   - Visit `https://your-backend-url.onrender.com/api`
   - You should see the Swagger API documentation

---

## Part 2: Frontend Deployment

### Step 1: Update Frontend Environment

1. **Update Production Environment File**:
   - Open `akira-web/src/environments/environment.prod.ts`
   - Replace `https://your-backend-app.onrender.com` with your actual backend URL from Part 1, Step 6
   
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://akira-movie-backend.onrender.com', // Your actual backend URL
     tmdbApiKey: '113b9c813e2749e6edd312ae164e46f6',
     tmdbBaseUrl: 'https://api.themoviedb.org/3'
   };
   ```

2. **Commit and Push Changes**:
   ```bash
   git add akira-web/src/environments/environment.prod.ts
   git commit -m "Update production environment with backend URL"
   git push origin main
   ```

### Step 2: Deploy Frontend to Render

1. **Create New Static Site**:
   - In Render Dashboard, click **"New +"** → **"Static Site"**

2. **Connect Repository**:
   - Select the same `Akira-Movie-App` repository

3. **Configure Static Site**:
   - **Name**: `akira-movie-frontend` (or your preferred name)
   - **Branch**: `main`
   - **Root Directory**: `akira-web`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist/akira-web/browser`

4. **Create Static Site**: Click **"Create Static Site"**

5. **Wait for Deployment**: Monitor the build logs

6. **Copy Frontend URL**: Once deployed, copy your frontend URL (e.g., `https://akira-movie-frontend.onrender.com`)

---

## Part 3: Update Backend CORS

Now that you have the frontend URL, update the backend to allow CORS from your frontend:

1. **Go to Backend Service** in Render Dashboard
2. **Navigate to Environment** tab
3. **Update Environment Variable**:
   - Find `FRONTEND_URL`
   - Set value to your frontend URL (e.g., `https://akira-movie-frontend.onrender.com`)
4. **Save Changes**: This will trigger a redeploy

---

## Part 4: Verify Deployment

### Backend Verification
- ✅ Visit `https://your-backend-url.onrender.com/api` - Swagger docs should load
- ✅ Check Render logs for "Application listening on port 10000"
- ✅ Check logs for successful MongoDB connection

### Frontend Verification
- ✅ Visit your frontend URL
- ✅ Homepage should load with movie data from TMDB
- ✅ Navigation should work
- ✅ Search functionality should work

### Integration Testing
- ✅ Try registering a new user account
- ✅ Try logging in
- ✅ Verify authentication works across pages

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed**:
- Verify MongoDB Atlas Network Access allows `0.0.0.0/0`
- Check `MODB_URL` environment variable is correct
- Ensure MongoDB user has correct permissions

**Build Failed**:
- Check Node.js version compatibility
- Review build logs for specific errors
- Ensure all dependencies are in `package.json`

**CORS Errors**:
- Verify `FRONTEND_URL` environment variable is set correctly
- Check backend logs for CORS configuration

### Frontend Issues

**Build Failed**:
- Check that `environment.prod.ts` exists
- Verify all imports are correct
- Review build logs for TypeScript errors

**API Calls Failing**:
- Verify `environment.prod.ts` has correct backend URL
- Check browser console for CORS errors
- Ensure backend is running and accessible

**Blank Page**:
- Check browser console for errors
- Verify publish directory is correct (`dist/akira-web/browser`)
- Check that routes are configured for SPA

---

## Free Tier Limitations

⚠️ **Important Notes about Render Free Tier**:

1. **Cold Starts**: Free tier services spin down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

2. **Monthly Limits**: 
   - 750 hours per month for web services
   - Unlimited bandwidth for static sites

3. **Performance**: Free tier has limited resources. Consider upgrading for production use.

---

## Custom Domain (Optional)

To use a custom domain:

1. Go to your service in Render Dashboard
2. Navigate to **"Settings"** → **"Custom Domain"**
3. Add your domain and follow DNS configuration instructions
4. Update `FRONTEND_URL` environment variable if using custom domain for frontend

---

## Maintenance

### Updating the Application

1. Make changes locally
2. Commit and push to GitHub
3. Render will automatically redeploy on push to `main` branch

### Viewing Logs

- Go to Render Dashboard
- Select your service
- Click **"Logs"** tab to view real-time logs

### Environment Variables

- Go to service → **"Environment"** tab
- Add/edit variables as needed
- Save changes to trigger redeploy

---

## Support

For issues specific to:
- **Render Platform**: [Render Documentation](https://render.com/docs)
- **MongoDB Atlas**: [MongoDB Documentation](https://docs.atlas.mongodb.com/)
- **NestJS**: [NestJS Documentation](https://docs.nestjs.com/)
- **Angular**: [Angular Documentation](https://angular.io/docs)
