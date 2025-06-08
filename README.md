# 🎫 Event Finder App (React + Node.js + Tailwind + Vite)

A modern event search web app.
**Frontend:** React + Vite + Tailwind CSS
**Backend:** Node.js (Express) proxying Ticketmaster API (keeps your API key secret)

---

## 🚀 Quick Start

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/event-finder-app.git
cd event-finder-app
```

---

## 🖥️ Frontend Setup (`/frontend`)

1. Open a terminal and go to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the dev server:

   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🖧 Backend Setup (`/backend`)

1. Open another terminal and go to the backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Add a `.env` file in `/backend`:

   ```
   TICKETMASTER_API_KEY=your_ticketmaster_api_key_here
   PORT=3001
   ```

   * **Never commit your real `.env`!**
4. Start the backend server:

   ```bash
   node server.js
   ```

   * The backend will run at [http://localhost:3001](http://localhost:3001)

---

## 🌐 How It Works

* The frontend React app sends event search requests to your backend
* The backend server fetches data from Ticketmaster using your secret API key and returns results to the frontend
* Your key is always kept secret, never exposed to users

---

## 📂 Project Structure (Recommended)

```
/event-finder-app
  /frontend       # React app
    /src
    ...
    .gitignore
  /backend        # Express backend
    server.js
    .env
    /routes
    .gitignore
```

---

## 🛠️ Tech Stack

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)

---

## ⚡ Notes

* If you see a blue gradient and styled results, Tailwind is working
* Backend errors print to your backend terminal (check logs if search fails)
* For production, use `npm run build` in frontend and a process manager (e.g. PM2) for backend

---

## 🙋 About Me

Made by [Mircea](https://github.com/mirceacontrol).

For older university projects, visit [@IgnatiucMircea](https://github.com/IgnatiucMircea).

*Features WIP*

---