import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex gap-6">
        {role === "admin" && (
          <>
            <Link to="/create-software" className="hover:underline">Create Software</Link>
            <Link to="/request-access" className="hover:underline">Request Access</Link>
            <Link to="/pending-requests" className="hover:underline">Pending Requests</Link>
          </>
        )}
        {role === "employee" && <Link to="/request-access" className="hover:underline">Request Access</Link>}
        {role === "manager" && <Link to="/pending-requests" className="hover:underline">Pending Requests</Link>}
        {!role && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>

      {role && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
