import { useEffect, useState } from "react";
import {toast} from "react-hot-toast"
import {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
importContacts
} from "../services/api";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const fetchContacts = async () => {
    try {
      const res = await getContacts();
      setContacts(res.data.contacts);
    } catch (err) {
      console.log(err);
    }
  };
  const [file,setFile]=useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleImport = async () => {
  if (!file) {
    toast.error("Please select a CSV file");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    await importContacts(formData);

    alert("Contacts imported successfully");

    fetchContacts();
  } catch (error) {
    console.log(error);
toast.error("Import failed");
  }
};
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editId) {
      await updateContact(editId, form);
      setEditId(null);
    } else {
      await createContact(form);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
    });

    fetchContacts();
  } catch (err) {
    console.log(err);
  }
};
 const handleRoute = ()=>{
  navigate("/dashboard")
 }





  const handleEdit = (contact) => {
  setEditId(contact._id);

  setForm({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    company: contact.company,
  });
};
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };
  const [editId,setEditId]=useState(null);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          className="bg-blue-600 text-white py-2 rounded col-span-2"
        >
          {editId ? "Update Contact" : "ADD Contact"}
        </button>
        <div className="my-6">
  <input
    type="file"
    accept=".csv"
    onChange={(e) => setFile(e.target.files[0])}
    className="border p-2 rounded"
  />
<div className="">
  <button
  type="button"
    onClick={handleImport}
    className="bg-green-600 text-white px-4 py-2 rounded ml-3"
  >
    Import CSV
  </button>
    <button
  type="button"
    onClick={handleRoute}
    className="bg-green-600 text-white px-4 py-2 rounded ml-3"
  >
    Go to dashboard
  </button>
</div>


</div>
      </form>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{contact.name}</h2>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.company}</p>
            </div>



         <div className="">
            <button onClick={()=> handleEdit(contact)} className="bg-yellow-500 text-gray-200 px-4 py-2 rounded ">
                 Edit
            </button>
              <button
              onClick={() => handleDelete(contact._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
         </div>

       
          
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;