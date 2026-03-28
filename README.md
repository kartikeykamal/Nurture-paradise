# 🌿 Nurture Paradise

A full-stack plant care web application built for Indian users — discover plants suited to your city's climate, diagnose plant health with AI, manage your garden, and shop for plants & accessories.

---

## 🚀 Live Demo

https://nurture-paradise.onrender.com/

---

## ✨ Features

### 🔐 Authentication
- Firebase Email/Password Auth
- Login & Registration with inline validation
- User profile stored in Firestore

### 🏠 Home
- Luxury Noir Botanical dark theme with light mode toggle
- Animated hero section with CTA

### 🌱 Discover
- City-based plant recommendation system
- Climate zone data for **79 plants** across **40+ Indian cities**
- Filter by sunlight, watering needs, and indoor/outdoor type
- Detailed plant info pages

### 🏪 Shop
- Browse plant & accessory cards
- Add to cart with quantity management
- Two-step payment modal — **UPI**, **Card**, **Net Banking**, **Cash on Delivery**
- Orders saved to Firestore

### 🪴 Garden Dashboard
- Personal garden — add & track your plants
- Watering reminders & care guides per plant
- Activity logs saved to Firestore

### 🔬 AI Plant Diagnose
- Upload a photo of your plant
- Powered by **Google Gemini API** (image + text)
- Returns diagnosis, cause, and treatment advice
- Diagnosis history saved per user

### 🛠️ Admin Panel
- Separate `admin.html` interface
- Live order management (view, update status, delete)
- Protected by Firebase Auth role check

### 🌦️ Weather Widget
- Real-time weather via **Open-Meteo API**
- City-aware — shows temperature, humidity, and conditions

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| AI | Google Gemini API |
| Weather | Open-Meteo API |
| Fonts | Google Fonts (Playfair Display, DM Sans) |

---

## 📁 Project Structure

```
NURTURE PARADISE/
├── index.html          # Main SPA — all pages rendered here
├── admin.html          # Admin panel
├── server.js           # Express backend (Gemini proxy + Firebase config)
├── package.json
├── .env.example        # Environment variable template
├── css/
│   ├── style.css       # Main stylesheet (Luxury Noir Botanical theme)
│   └── admin.css       # Admin panel styles
└── js/
    ├── firebase.js     # Firebase init & auth helpers
    ├── app.js          # Core app logic & navigation
    ├── plants.js       # Plant data & city-climate logic
    ├── garden.js       # Garden dashboard logic
    ├── diagnose.js     # AI diagnosis feature
    ├── design.js       # UI/theme helpers
    └── enhancements.js # UX enhancements (toast, scroll, etc.)
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- A Firebase project (free tier is enough)
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nurture-paradise.git
cd "nurture-paradise/NURTURE PARADISE"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Gemini AI
GEMINI_DIAGNOSE_API_KEY=your_gemini_key_for_diagnose
GEMINI_GROW_API_KEY=your_gemini_key_for_grow
GEMINI_MODEL=gemini-1.5-flash
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com) → Create a project
2. **Authentication** → Get started → Enable **Email/Password**
3. **Firestore Database** → Create database → Start in **test mode**
4. **Project Settings** → Your apps → Add Web app → Copy the config

### 5. Run the app

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/gemini/diagnose` | AI plant disease diagnosis (image) |
| `POST` | `/api/gemini/grow` | AI plant care tips (text) |
| `GET` | `/config/firebase` | Serve Firebase config to frontend |
| `GET` | `/health` | Server health check |

---

## 📱 Mobile Responsive

Optimized for three breakpoints — desktop, tablet, and mobile — with a hamburger navigation drawer on smaller screens.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 👨‍💻 Author

**Kartikey Kamal**  
B.Tech Computer Science — Kanpur Institute of Technology (Batch 2026)  

---
