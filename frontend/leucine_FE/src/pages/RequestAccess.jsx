import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestAccess() {
  const [softwareList, setSoftwareList] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState("");
  const [accessType, setAccessType] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/software/getSoftwares", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSoftwareList(res.data.data);
        console.log("hi",res.data.data);
        
      } catch (err) {
        setError("Failed to load software list");
      }
    };

    fetchSoftwares();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/requests",
        {
          softwareId: selectedSoftware,
          accessType,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Request submitted successfully.");
      setSelectedSoftware("");
      setAccessType("");
      setReason("");
    } catch (err) {
      setError(err.response?.data?.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Request Software Access</h2>

      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Software</label>
          <select
            value={selectedSoftware}
            onChange={(e) => setSelectedSoftware(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">-- Choose Software --</option>
            {softwareList.length > 0 && softwareList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Access Type</label>
          <select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">-- Choose Access Type --</option>
            <option value="Read">Read</option>
            <option value="Write">Write</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why do you need this access?"
            className="w-full border px-4 py-2 rounded resize-none"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
