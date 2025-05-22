import { useState } from "react";
import axios from "axios";

export default function CreateSoftware() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevels, setAccessLevels] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/software",
        { name, description, accessLevels },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Software created successfully!");
      setName("");
      setDescription("");
      setAccessLevels([]);
    } catch (err) {
      setError(err.response?.data?.message || "Creation failed");
    }
  };

  const toggleAccess = (level) => {
    setAccessLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
          Create Software
        </h2>

        {message && (
          <div className="mb-4 text-green-600 font-medium text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Software Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter software name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter software description"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Access Levels
            </label>
            <div className="flex gap-4">
              {["Read", "Write", "Admin"].map((level) => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={accessLevels.includes(level)}
                    onChange={() => toggleAccess(level)}
                    className="accent-blue-500"
                  />
                  <span className="text-sm">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Create Software
          </button>
        </form>
      </div>
    </div>
  );
}
