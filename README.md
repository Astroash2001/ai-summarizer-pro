# 🤖 AI Summarizer Pro

AI-powered document summarization and interactive chat application built with React and Django.

## ✨ Features

- 📄 **Document Summarization** - Upload PDF or TXT files and get AI-generated summaries
- 💬 **Chat with Documents** - Ask questions about your documents and get intelligent answers
- ⚡ **Fast Processing** - Quick text extraction and AI responses
- 🎨 **Modern UI** - Beautiful, responsive interface with dark theme
- 🔒 **Secure** - File validation, size limits, and API key protection

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **React Router** - Navigation

### Backend
- **Django 5.0** - Python web framework
- **Django REST Framework** - API toolkit
- **OpenAI API** - GPT-4o-mini for AI processing
- **PostgreSQL** - Production database (SQLite for local dev)
- **pypdf** - PDF text extraction
- **Gunicorn** - Production server

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd ai-summarizer-pro
```

#### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

Frontend will be running at **http://localhost:8081**

#### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
.\venv\Scripts\activate.bat
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from example)
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_key_here

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

Backend API will be running at **http://localhost:8000**

### 4. Test the Application

1. Open http://localhost:8081 in your browser
2. Upload a PDF or TXT file on the home page
3. Click "Chat with Document" to try the chat feature

## 📝 Environment Variables

### Frontend (`.env` in root)

```bash
VITE_API_URL=http://localhost:8000/api  # Backend API URL
```

### Backend (`backend/.env`)

```bash
# Django Settings
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:8081,http://localhost:5173

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.7

# Database (for production)
# DATABASE_URL=postgresql://user:password@host:5432/dbname
```

## 🌐 Deployment

### Deploy to Render (Recommended)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step instructions.

**Quick Overview:**
1. Deploy backend as Web Service with PostgreSQL
2. Deploy frontend as Static Site
3. Set environment variables on Render
4. Connect the services

**Estimated deployment time:** 15-20 minutes

### Other Platforms

- **Vercel + Railway** - Frontend on Vercel, Backend on Railway
- **Heroku** - Full-stack deployment
- **DigitalOcean** - App Platform or Docker deployment
- **AWS** - EC2 + S3 + CloudFront (advanced)

## 📖 API Documentation

### Endpoints

#### **POST** `/api/summarize/`
Summarize a document

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF or TXT)

**Response:**
```json
{
  "summary": "AI-generated summary...",
  "status": "success"
}
```

#### **POST** `/api/extract-text/`
Extract text from document

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF or TXT)

**Response:**
```json
{
  "text": "Extracted text...",
  "filename": "document.pdf",
  "status": "success"
}
```

#### **POST** `/api/chat-document/`
Chat with document

**Request:**
```json
{
  "question": "What is this about?",
  "context": "Document text..."
}
```

**Response:**
```json
{
  "answer": "AI-generated answer...",
  "status": "success"
}
```

## 🧪 Testing

### Run Backend Tests

```bash
cd backend
python test_api.py        # Test summarization
python test_chat.py        # Test chat functionality
```

### Manual Testing

1. Upload valid PDF/TXT files
2. Test file validation (wrong type, too large)
3. Test summarization accuracy
4. Test chat responses
5. Test error handling

## 📁 Project Structure

```
ai-summarizer-pro/
├── backend/                    # Django backend
│   ├── config/                 # Django settings
│   │   ├── settings.py         # Main configuration
│   │   ├── urls.py             # URL routing
│   │   └── wsgi.py             # WSGI application
│   ├── summarizer/             # Main app
│   │   ├── views.py            # API endpoints
│   │   ├── chat_views.py       # Chat endpoints
│   │   ├── serializers.py      # Request validation
│   │   ├── urls.py             # App URLs
│   │   └── utils/              # Utilities
│   │       ├── text_extractor.py  # PDF/TXT extraction
│   │       └── ai_summarizer.py   # OpenAI integration
│   ├── requirements.txt        # Python dependencies
│   ├── build.sh                # Render build script
│   └── .env.example            # Environment variables template
├── src/                        # React frontend
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation
│   │   ├── Footer.tsx          # Footer
│   │   ├── HeroSection.tsx     # Upload interface
│   │   └── ui/                 # Shadcn components
│   ├── pages/                  # Page components
│   │   ├── Index.tsx           # Home page
│   │   └── ChatWithDocument.tsx # Chat page
│   ├── services/               # API services
│   │   ├── api.ts              # Summarization API
│   │   └── chat-api.ts         # Chat API
│   └── main.tsx                # Entry point
├── public/                     # Static assets
├── .env                        # Frontend environment
├── package.json                # Node dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind configuration
├── DEPLOYMENT.md               # Deployment guide
└── README.md                   # This file
```

## 🔒 Security

- ✅ API keys stored in environment variables (not in code)
- ✅ `.env` files gitignored
- ✅ File upload validation (type and size)
- ✅ CORS configured for specific origins
- ✅ HTTPS enforced in production
- ✅ Security middleware enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**"Failed to connect to backend"**
- Ensure backend server is running on port 8000
- Check `VITE_API_URL` in frontend `.env`

**"OpenAI API not configured"**
- Verify `OPENAI_API_KEY` in backend `.env`
- Ensure API key is valid and has credits

**"CORS error"**
- Check `CORS_ALLOWED_ORIGINS` in backend settings
- Verify frontend URL is included

**"Failed to extract text from PDF"**
- Ensure PDF has text layer (not scanned image)
- Try with different PDF file

### Getting Help

- Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide
- Review error messages in browser console
- Check backend logs for detailed errors
- Open an issue on GitHub

## 🎯 Roadmap

- [ ] User authentication and accounts
- [ ] Document history and saved summaries
- [ ] Support for more file formats (DOCX, PPTX)
- [ ] Audio transcription and summarization
- [ ] Video transcription
- [ ] Multi-language support
- [ ] Advanced chat with multiple documents
- [ ] Export summaries and chats

## 📊 Performance

- **Upload limit:** 10MB per file
- **Supported formats:** PDF, TXT
- **Response time:** 2-5 seconds (depends on file size)
- **AI model:** GPT-4o-mini (fast and cost-effective)

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for GPT API
- [Shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Render](https://render.com) for easy deployment
- [Lovable](https://lovable.dev) for project scaffolding

---

**Built with ❤️ using React, Django, and OpenAI**

🌟 Star this repo if you find it helpful!
