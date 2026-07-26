import { useState ,useEffect} from "react";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaEnvelope, FaBullhorn } from "react-icons/fa";
 import axios from "axios";
 import API from "../services/api"
 import { useNavigate, Link } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();

    const [stats,setStats] = useState({
        totalContacts:0,
        totalAudience:0,
        totalCampaign:0
    } )
        
    
    useEffect(() => {
  const fetchStats = async () => {
    try {
      

      const response = await API.get('/dashboard')
      console.log("response",response)

     setStats(response?.data?.stats)
    } catch (error) {
      console.log(error);
    }
  };

  fetchStats();
}, []);
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="   bg-amber-300 rounded-xl shadow p-6">
            <FaUsers className="text-4xl text-blue-600 mb-3" />
            <h2 className="font-semibold text-black">Contacts</h2>
            <h3 className="text-2xl font-bold">{stats.totalContacts}</h3>
          </div>

          <div className="bg-amber-300 rounded-xl shadow p-6">
            <FaEnvelope className="text-4xl text-green-600 mb-3" />
            <h2 className="font-semibold">Emails Sent</h2>
            <h3 className="text-2xl font-bold">{stats.totalAudiences}</h3>
          </div>

          <div className="bg-amber-300 rounded-xl shadow p-6">
            <FaBullhorn className="text-4xl text-purple-600 mb-3" />
            <h2 className="font-semibold ">Campaigns</h2>
            <h3 className="text-2xl  font-bold">{stats.totalCampaigns}</h3>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;