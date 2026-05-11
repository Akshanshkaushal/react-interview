# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended for Testing)

### Steps:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with username and password
5. Get your connection string
6. Update `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/authdb?retryWrites=true&w=majority
   ```

## Option 2: Docker (Local MongoDB)

### Prerequisites:
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Steps:
1. Create Docker container:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. Verify it's running:
   ```bash
   docker ps
   ```

3. Keep `.env.local` as is:
   ```env
   MONGODB_URI=mongodb://localhost:27017/authdb
   ```

### Start/Stop MongoDB Container:
```bash
docker start mongodb      # Start
docker stop mongodb       # Stop
docker rm mongodb         # Remove
```

## Option 3: Local MongoDB Installation

### Windows:
1. Download from [MongoDB Community](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. Start MongoDB service
4. Keep `.env.local` as is

### Verify MongoDB is Running:
```bash
mongosh
```

## Testing the App

Once MongoDB is running:
1. Run dev server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Test signup and login