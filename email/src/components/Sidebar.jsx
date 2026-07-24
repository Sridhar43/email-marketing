import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaHome,
  FaUsers,
  FaUserFriends,
  FaBullhorn,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  const navigate =useNavigate()

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Contacts", path: "/contacts", icon: <FaUsers /> },
    { name: "Audience", path: "/audience", icon: <FaUserFriends /> },
    { name: "Campaigns", path: "/campaign", icon: <FaBullhorn /> },
  ];
  const handleLogout=()=>{
    let token= localStorage.removeItem("token")
    navigate("/login")
    if(!token) {
        toast.success("Logged out")


    }


  }

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Email Marketing</h1>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 p-3 rounded-lg mb-3 ${
            location.pathname === item.path
              ? "bg-blue-600"
              : "hover:bg-slate-700"
          }`}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}

      <button onClick={handleLogout} className="flex items-center gap-3 p-3 mt-10 hover:bg-red-600 rounded-lg w-full">
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;