# NutriScan-AI 🥗🤖

**AI-Powered Nutrition Tracking & Calorie Management with Neural Vision**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)
![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-8.3+-13AA52.svg)

## 🌟 Overview

NutriScan-AI is a cutting-edge full-stack web application that leverages artificial intelligence and computer vision to transform how users track their nutrition. Simply point your camera at food, and our AI instantly analyzes it to provide detailed calorie counts, macro breakdowns, and personalized health recommendations.

### Key Capabilities
- 📸 **Neural Vision Scanner** - AI-powered food recognition from photos
- 📊 **Smart Calorie Diary** - Real-time tracking of intake vs. goals
- 🧮 **Harris-Benedict BMR Calculator** - Personalized metabolic rate calculations
- 📈 **Advanced Analytics** - Comprehensive nutrition insights and trends
- 🎯 **Personalized Recommendations** - AI-driven dietary suggestions
- 👤 **User Profiles** - Customizable health and fitness settings
- 🔐 **Secure Authentication** - JWT-based session management

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI framework
- **Vite 5.4** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first styling
- **React Router 6.22** - Client-side routing
- **Framer Motion 11.1** - Smooth animations
- **Axios 1.6** - HTTP client
- **React Webcam 7.2** - Camera integration
- **Recharts 2.12** - Data visualization
- **React Hot Toast 2.4** - Toast notifications
- **Lucide React 0.372** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.19** - Web server framework
- **MongoDB 8.3** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT (jsonwebtoken 9.0)** - Authentication tokens
- **BCryptjs 2.4** - Password hashing
- **Multer 1.4** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Dotenv 16.4** - Environment configuration

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** instance (local or Atlas)
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/vijay4632/NutriScan-AI.git
cd NutriScan-AI
```

2. **Install dependencies**
```bash
npm run install:all
# or manually:
npm install --prefix server
npm install --prefix client
```

3. **Configure environment variables**

Create a `.env` file in the `server/` directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

4. **Start the development server**
```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 5173) concurrently.

### Individual Server Commands
```bash
# Start backend only
npm run server

# Start frontend only
npm run client

# Build frontend for production
npm run build
```

---

## 📁 Project Structure

```
NutriScan-AI/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/                  # Route pages (Home, Dashboard, Scanner, etc.)
│   │   ├── components/             # Reusable components (Sidebar, etc.)
│   │   ├── context/                # React Context (AuthContext)
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                          # Express backend
│   ├── config/                     # Database configuration
│   ├── controllers/                # Business logic (auth, food, meals, user)
│   ├── models/                     # MongoDB schemas (User, Meal)
│   ├── routes/                     # API endpoints
│   ├── middleware/                 # Auth & custom middleware
│   ├── utils/                      # Helper functions
│   ├── uploads/                    # User uploaded files
│   ├── index.js                   # Server entry point
│   └── package.json
│
├── package.json                     # Root package config
└── README.md                        # This file
```

---

## 🔐 Authentication Flow

NutriScan-AI uses JWT-based authentication:

1. **User Registration** - Create account with email and password
2. **Login** - Receive JWT token valid for the session
3. **Protected Routes** - All dashboard routes require valid JWT
4. **Session Management** - Automatic token validation on page load
5. **Admin Routes** - Special access for admin users

---

## 📊 Core Features

### 1. Neural Vision Scanner
- Upload photos of food
- AI analyzes image to identify food items
- Returns confidence scores for accuracy
- Estimates calorie and macro content

### 2. Smart Calorie Diary
- Track daily calorie intake
- Monitor remaining calorie budget
- Log water intake
- Visual progress indicators

### 3. BMR & Nutrition Calculator
- Harris-Benedict formula implementation
- Personalized daily calorie recommendations
- Macro ratio suggestions (carbs, protein, fats)
- BMI tracking

### 4. Analytics Dashboard
- Daily/weekly/monthly insights
- Trending visualizations
- Nutritional breakdowns
- Goal progress tracking

### 5. Personalized Recommendations
- AI-driven dietary suggestions
- Meal recommendations based on goals
- Nutrient optimization tips

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout

### User Profile
- `GET /api/user/profile` - Get user data
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/settings` - Update settings

### Meals
- `GET /api/meals` - Get user's meals
- `POST /api/meals` - Create meal entry
- `GET /api/meals/:id` - Get specific meal
- `DELETE /api/meals/:id` - Delete meal

### Food Database
- `GET /api/food/search` - Search food items
- `GET /api/food/:id` - Get food details

### Admin
- `GET /api/admin/stats` - Admin dashboard statistics

---

## 🎨 Design Features

- **Dark Theme** - Eye-friendly dark UI optimized for evening use
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion for polished UX
- **Intuitive Navigation** - Sidebar navigation with mobile toggle
- **Real-time Feedback** - Toast notifications for user actions
- **Accessibility** - WCAG compliant components

---

## 📱 Pages & Routes

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Landing page |
| Login | `/login` | User authentication |
| Register | `/register` | New user signup |
| Dashboard | `/dashboard` | Main user dashboard |
| Scanner | `/scanner` | Food recognition camera |
| History | `/history` | Meal history log |
| Analytics | `/analytics` | Nutrition analytics |
| Recommendations | `/recommendations` | AI suggestions |
| Profile | `/profile` | User settings |
| Admin Panel | `/admin` | Admin dashboard |

---

## 🔧 Configuration

### Environment Variables

**Server (.env)**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_key
PORT=5000
NODE_ENV=development
```

### Database

MongoDB collections:
- **users** - User accounts and profiles
- **meals** - Food intake logs
- **foods** - Food database with nutrition info

---

## 🚦 Development Workflow

### Make Changes
```bash
# Frontend changes are hot-reloaded automatically
# Backend changes require server restart (nodemon watches for changes)

# Edit files in client/src or server/
```

### Debugging
```bash
# Browser DevTools for React debugging
# Backend console for server logs
# MongoDB Compass for database inspection
```

### Building for Production
```bash
npm run build --prefix client
# Generates optimized build in client/dist/
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork the repository**
```bash
git clone https://github.com/YOUR_USERNAME/NutriScan-AI.git
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
```bash
# Edit files, test thoroughly
```

4. **Commit with clear messages**
```bash
git commit -m "Add amazing feature: description"
```

5. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Include before/after screenshots if applicable
   - Link any related issues

### Code Standards
- Use meaningful variable names
- Add comments for complex logic
- Test before submitting PR
- Follow existing code style

---

## 🐛 Bug Reports & Feature Requests

Found a bug? Have a great idea? Let us know!

- **Report Bugs**: [GitHub Issues](https://github.com/vijay4632/NutriScan-AI/issues)
- **Feature Requests**: [Discussions](https://github.com/vijay4632/NutriScan-AI/discussions)

---

## 📊 Performance Metrics

- **Frontend Load Time**: < 2s (optimized with Vite)
- **API Response Time**: < 200ms (average)
- **Database Queries**: Indexed for performance
- **Image Processing**: Real-time AI analysis

---

## 🔒 Security Features

- ✅ Password hashing with BCrypt
- ✅ JWT token validation
- ✅ CORS protection
- ✅ Request validation
- ✅ Secure HTTP headers
- ✅ MongoDB injection prevention

---

## 📈 Roadmap

### Upcoming Features
- [ ] Google & GitHub OAuth integration
- [ ] Mobile app (React Native)
- [ ] Barcode scanning
- [ ] Recipe suggestions
- [ ] Social sharing
- [ ] Meal planning
- [ ] Nutritionist integration
- [ ] Advanced AI models for better accuracy

---

## 📚 Learning Resources

### Frontend
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

### Backend
- [Express.js](https://expressjs.com)
- [MongoDB](https://docs.mongodb.com)
- [JWT Auth](https://jwt.io)
- [REST API Best Practices](https://restfulapi.net)

---
WEBSITE LOOK
<img width="1918" height="975" alt="Screenshot 2026-05-20 212957" src="https://github.com/user-attachments/assets/9697b3cd-5146-4cdb-a076-328a8bf7876a" />
<img width="1917" height="966" alt="Screenshot 2026-05-20 213128" src="https://github.com/user-attachments/assets/8967bc99-ceae-4719-a76d-e7a054ea44b8" />
<img width="1901" height="960" alt="Screenshot 2026-05-20 213109" src="https://github.com/user-attachments/assets/56b41908-669d-4881-9bb2-52730d6d33e6" />
<img width="1911" height="972" alt="Screenshot 2026-05-20 213054" src="https://github.com/user-attachments/assets/f6569430-4fb8-47f9-afcf-d2de3cb86e3d" />
<img width="1918" height="972" alt="Screenshot 2026-05-20 213046" src="https://github.com/user-attachments/assets/305434df-1de7-4ae5-9e5a-230bea303b7a" />
<img width="1915" height="972" alt="Screenshot 2026-05-20 213037" src="https://github.com/user-attachments/assets/7385aadf-2adf-48ca-a126-45f099ed61c3" />
<img width="1917" height="986" alt="Screenshot 2026-05-20 213022" src="https://github.com/user-attachments/assets/6d90be61-8a05-4588-9d8c-e422bc0a450c" />

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👥 Authors

**Vijay** - [GitHub Profile](https://github.com/vijay4632)

---

## 💬 Support & Community

- 💡 Have questions? Open a GitHub Discussion
- 🐛 Found a bug? Create an Issue
- 🎉 Want to contribute? Check out Contributing section
- ⭐ Like the project? Give it a star!

---

## 🙏 Acknowledgments

- React community for amazing libraries
- MongoDB for powerful database
- All contributors and users supporting this project

---

## 📞 Contact

- **GitHub**: [@vijay4632](https://github.com/vijay4632)
- **Issues**: [Report here](https://github.com/vijay4632/NutriScan-AI/issues)

---

**Happy Tracking! 🚀 Transform your nutrition journey with NutriScan-AI**

---

_Last Updated: May 2026_
