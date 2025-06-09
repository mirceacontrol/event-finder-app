import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      alert("Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      alert("Logout failed");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEvents([]);
    try {
      const params = new URLSearchParams({ keyword, city, date });
      const res = await fetch(
        `http://localhost:3001/api/search-events?${params.toString()}`
      );
      if (!res.ok) throw new Error("Backend error: " + res.status);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Backend did not return an array");
      setEvents(data);
    } catch (err) {
      alert("Error fetching events: " + err.message);
      setEvents([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col">
      {/* Auth header */}
      <div className="flex justify-end p-4">
        {!user ? (
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-700 text-white font-bold px-5 py-2 rounded hover:bg-blue-900 transition"
          >
            Sign In with Google
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-blue-900 font-semibold">
              👤 {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
      {/* Main Container */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-2xl mt-12">
          {/* Icon */}
          <div className="flex justify-center mb-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                fill="#3066be"
                d="M21 5v2.764a1.236 1.236 0 010 2.472V13.5a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 13.5V10.236a1.236 1.236 0 010-2.472V5a2 2 0 012-2h14a2 2 0 012 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center text-black mb-2">
            Event Finder Demo
          </h1>
          <div className="text-center text-blue-500 mb-5 text-lg">
            Find cool events & add your favorites to wishlist!
          </div>
          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex flex-wrap gap-3 justify-center mb-6"
            autoComplete="off"
          >
            <input
              type="text"
              placeholder="Search for events..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border border-blue-200 bg-blue-50 rounded-md px-4 py-2 min-w-[170px] outline-blue-400"
            />
            <input
              type="text"
              placeholder="City (optional)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-blue-200 bg-blue-50 rounded-md px-4 py-2 min-w-[140px] outline-blue-400"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-blue-200 bg-blue-50 rounded-md px-4 py-2 outline-blue-400"
            />
            <button
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white rounded-md font-semibold shadow hover:bg-blue-700 transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
          {/* Results */}
          <div className="space-y-6 mt-5">
            {events.length === 0 && !loading && (
              <div className="text-gray-400 text-center text-lg">
                No events found. Try a search!
              </div>
            )}
            {events.map((ev, idx) => (
              <div
                key={idx}
                className="bg-blue-50 rounded-xl shadow flex flex-col p-6 gap-1"
              >
                <div className="flex items-center gap-2 mb-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      fill="#194769"
                      d="M21 5v2.764a1.236 1.236 0 010 2.472V13.5a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 13.5V10.236a1.236 1.236 0 010-2.472V5a2 2 0 012-2h14a2 2 0 012 2z"
                    />
                  </svg>
                  <span className="text-xl font-bold text-blue-800">
                    {ev.name}
                  </span>
                </div>
                <div className="text-blue-900 font-medium mb-1">
                  {ev.date} – {ev.venue}, {ev.city}
                </div>
                <div className="flex flex-row gap-4 mt-1">
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View Event
                  </a>
                  <button
                    className="bg-blue-700 text-white rounded px-3 py-1 flex items-center gap-1 font-bold hover:bg-blue-800 transition"
                    disabled={!user}
                    title={!user ? "Log in to use wishlist" : "Add to Wishlist"}
                  >
                    <span role="img" aria-label="star">
                      ⭐
                    </span>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
