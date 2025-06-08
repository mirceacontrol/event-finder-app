import { useState } from "react";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEvents([]);
    try {
      const params = new URLSearchParams({ keyword, city, date });
      const res = await fetch(`http://localhost:3001/api/search-events?${params.toString()}`);
      if (!res.ok) throw new Error("Backend error: " + res.status);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Backend did not return an array");
      setEvents(data);
    } catch (err) {
      alert("Error fetching events: " + err.message);
      setEvents([]); // To ensure .map won't fail
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-100 to-blue-300 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-5">Event Finder</h1>
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow-md flex flex-wrap gap-3 items-center p-6 mb-8"
      >
        <input
          type="text"
          placeholder="Search for events..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <div className="w-full max-w-2xl space-y-5">
        {events.length === 0 && !loading && (
          <div className="text-gray-500 text-center">No events found. Try a search!</div>
        )}
        {events.map((ev, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-5 flex flex-col gap-2"
          >
            <div className="text-lg font-bold text-blue-700">{ev.name}</div>
            <div className="text-gray-700">
              {ev.date} – {ev.venue}, {ev.city}
            </div>
            <a
              href={ev.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on Ticketmaster
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
