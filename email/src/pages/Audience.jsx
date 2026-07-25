import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAudiences,
  createAudience,
  deleteAudience,
  getContacts,
  updateAudience
} from "../services/api";

function Audience() {

  const navigate = useNavigate()
  const [audiences, setAudiences] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    contacts: [],
  });

  const [contacts,setContacts]=useState([])
  const fetchContacts = async () => {
  try {
    const res = await getContacts();
    setContacts(res.data.contacts);
  } catch (err) {
    console.log(err);
  }
};

const handleClick =(e)=>{
  navigate("/dashboard")

}


  const fetchAudiences = async () => {
    try {
      const res = await getAudiences();
      setAudiences(res.data.audiences);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAudiences();
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAudience(form);

      setForm({
        name: "",
        description: "",
        contacts: [],
      });

      fetchAudiences();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteAudience(id);
    fetchAudiences();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Audience
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8"
      >
        <input
          type="text"
          placeholder="Audience Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="border p-2 rounded w-full"
        />

        <select
  multiple
  className="border p-2 rounded w-full h-40"
  onChange={(e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setForm({
      ...form,
      contacts: selected,
    });
  }}
>
  {contacts.map((contact) => (
    <option key={contact._id} value={contact._id}>
      {contact.name} ({contact.email})
    </option>
  ))}
</select>
  
      <div className="flex flex-row gap-4">
   <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Create Audience
        </button>
      
     <button onClick={handleClick}  className="bg-blue-600 gap-1.5 hover:po text-white px-5 py-2 rounded">
        Go to Dashboard
        </button>
      </div>
     
      </form>
       

      {audiences.map((audience) => (
        <div
          key={audience._id}
          className="border rounded p-4 mb-3 flex justify-between"
        >
          <div>
            <h2 className="font-bold">{audience.name}</h2>
            <p>{audience.description}</p>
          </div>

          <button
            onClick={() => handleDelete(audience._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Audience;