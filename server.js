require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT       = process.env.PORT        || 3000;
const JWT_SECRET  = process.env.JWT_SECRET  || 'fallback-dev-secret-change-in-production';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Admin Credentials (loaded from .env)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dev-password-change-me';

// CORS — only allow requests from the configured frontend URL
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json({ limit: '10mb' }));

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No authentication token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Session expired or invalid token.' });
    }
    req.user = user;
    next();
  });
};

// API: Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username: ADMIN_USERNAME }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড!' });
});

// API: Get Content Database
app.get('/api/content', (req, res) => {
  const contentPath = path.join(__dirname, 'content.json');
  
  if (!fs.existsSync(contentPath)) {
    return res.status(404).json({ success: false, message: 'Content database not found.' });
  }

  try {
    const contentData = fs.readFileSync(contentPath, 'utf8');
    return res.json(JSON.parse(contentData));
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error reading content database.' });
  }
});

// API: Save Content Database (Authenticated)
app.post('/api/save-content', authenticateToken, (req, res) => {
  const contentPath = path.join(__dirname, 'content.json');
  const newContent = req.body;

  if (!newContent || !newContent.translations || !newContent.courses || !newContent.faqs || !newContent.testimonials) {
    return res.status(400).json({ success: false, message: 'Invalid content format.' });
  }

  try {
    fs.writeFileSync(contentPath, JSON.stringify(newContent, null, 2), 'utf8');
    return res.json({ success: true, message: 'Content updated successfully!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error writing to content database.' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// API: Upload Image (Authenticated)
//
//  Strategy:
//    • PRODUCTION  → Cloudinary (cloud CDN, survives redeployments)
//    • DEVELOPMENT → Local disk fallback (no Cloudinary keys needed locally)
//
//  Required .env vars for Cloudinary:
//    CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
// ─────────────────────────────────────────────────────────────────────────────

const CLOUDINARY_CONFIGURED =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

// Lazily initialise the Cloudinary SDK only when credentials are present
let cloudinaryUpload = null;
if (CLOUDINARY_CONFIGURED) {
  const { v2: cloudinary } = require('cloudinary');
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:     true, // always use HTTPS URLs
  });
  // Wrap the SDK upload call so we can await it cleanly
  cloudinaryUpload = (dataURI, folder) =>
    cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: 'image',
      // Auto-convert to WebP for smaller sizes in production
      format: 'webp',
      quality: 'auto',
    });
  console.log('✅ Cloudinary upload enabled (production mode)');
} else {
  console.log('⚠️  Cloudinary env vars not set — using local disk upload (dev mode)');
}

app.post('/api/upload', authenticateToken, async (req, res) => {
  const { filename, base64Data } = req.body;

  if (!filename || !base64Data) {
    return res.status(400).json({ success: false, message: 'Filename and base64Data are required.' });
  }

  // Allow only image extensions
  const allowedExtensions = /\.(png|jpg|jpeg|gif|webp)$/i;
  if (!allowedExtensions.test(filename)) {
    return res.status(400).json({
      success: false,
      message: 'Only image files (png, jpg, jpeg, gif, webp) are allowed.',
    });
  }

  // ── PRODUCTION: Upload to Cloudinary ────────────────────────────────────
  if (cloudinaryUpload) {
    try {
      // Cloudinary SDK accepts a base64 data URI directly
      const mimeMatch = filename.match(/\.(png|jpg|jpeg|gif|webp)$/i);
      const mime = mimeMatch ? `image/${mimeMatch[1].replace('jpg', 'jpeg')}` : 'image/jpeg';
      const dataURI = `data:${mime};base64,${base64Data}`;

      const result = await cloudinaryUpload(dataURI, 'najmul-academy');
      return res.json({ success: true, fileUrl: result.secure_url });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return res.status(500).json({ success: false, message: 'Cloud upload failed. Please try again.' });
    }
  }

  // ── DEVELOPMENT FALLBACK: Save to local disk ─────────────────────────────
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const cleanFilename = path.basename(filename).replace(/\s+/g, '_');
    const uniqueFilename = `${Date.now()}_${cleanFilename}`;
    const uploadPath = path.join(__dirname, 'assets', 'images', uniqueFilename);

    fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
    fs.writeFileSync(uploadPath, buffer);

    const fileUrl = `/assets/images/${uniqueFilename}`;
    return res.json({ success: true, fileUrl });
  } catch (error) {
    console.error('Local upload error:', error);
    return res.status(500).json({ success: false, message: 'Failed to save uploaded image.' });
  }
});

// Serve Static Frontend Assets (Production Fallback)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use(express.static(path.join(__dirname, 'assets'))); // serve local assets too
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Simple check route for development when served separately
  app.get('/', (req, res) => {
    res.send('Najmul Academy Backend is running. Frontend should be served via Vite.');
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`   Upload mode : ${CLOUDINARY_CONFIGURED ? 'Cloudinary (production)' : 'Local disk (development)'}`);
  console.log(`   CORS origin : ${FRONTEND_URL}`);
});
