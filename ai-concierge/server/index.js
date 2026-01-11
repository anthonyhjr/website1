/**
 * AI Website Concierge - Backend API Server
 * 
 * Endpoints:
 * - POST /api/chat - Chat conversation with retrieval and compliance
 * - POST /api/leads - Lead capture with consent
 * - GET /api/health - Health check
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { chatHandler } = require('./handlers/chat');
const { leadHandler } = require('./handlers/leads');
const config = require('../config/config');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'AI Website Concierge',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Chat endpoint
app.post('/api/chat', chatHandler);

// Lead capture endpoint
app.post('/api/leads', leadHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    ok: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Website Concierge API running on port ${PORT}`);
  console.log(`📋 Brand: ${config.brandName}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
