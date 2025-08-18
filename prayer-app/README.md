# 🕌 Prayer Times App

A simple React app that displays Islamic prayer times for different cities using the **[Aladhan API](https://aladhan.com/prayer-times-api)**.  
Built with **React (Vite)** and **Material UI (MUI)**.

---

## 🚀 Features
- Fetches real-time prayer times from Aladhan API  
- City selection (e.g., Sarajevo, Zenica, Tuzla, etc.)  
- Nicely styled with Material UI  
- Responsive and centered layout  
- Clean project structure with separate components & API file  

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/prayer-times-app.git
cd prayer-times-app
Install dependencies
npm install

3. Start development server
npm run dev


The app will run at http://localhost:5173

📂 Project Structure
src/
 ├── api/
 │   └── api.js         # API call to fetch prayer times
 ├── components/
 │   ├── CitySelector.jsx
 │   ├── PrayerTimesList.jsx
 │   └── DateInfo.jsx
 ├── App.jsx            # Main component
 ├── main.jsx           # Entry point
 └── index.css          # Global styles

🔧 Tech Stack

React (with Vite)

Material UI (UI components)

Aladhan API (prayer times data)