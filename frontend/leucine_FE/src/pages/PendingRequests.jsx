import { useEffect, useState } from "react";
import axios from "axios";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/requests/getRequests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data.data);
      } catch (err) {
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    try {
      setActionLoading(id);
      setMessage("");
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:3000/api/requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      setMessage(`Request ${status.toLowerCase()} successfully.`);
    } catch (err) {
      setMessage("Action failed.");
      console.error("Action failed", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Pending Access Requests</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No access requests found.</p>
      ) : (
        requests.length > 0 && requests.map((req) => (
          <div key={req.id} className="border p-4 rounded mb-4 bg-gray-50">
            <p><strong>User:</strong> {req.user.username}</p>
            <p><strong>Software:</strong> {req.software.name}</p>
            <p><strong>Access Type:</strong> {req.accessType}</p>
            <p><strong>Reason:</strong> {req.reason}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 font-semibold ${
                req.status === "Approved"
                  ? "text-green-600"
                  : req.status === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}>
                {req.status}
              </span>
            </p>

            {req.status === "Pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  onClick={() => handleAction(req.id, "Approved")}
                  disabled={actionLoading === req.id}
                >
                  {actionLoading === req.id ? "Approving..." : "Approve"}
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                  onClick={() => handleAction(req.id, "Rejected")}
                  disabled={actionLoading === req.id}
                >
                  {actionLoading === req.id ? "Rejecting..." : "Reject"}
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
