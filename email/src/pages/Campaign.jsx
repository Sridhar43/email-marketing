import { useEffect, useState } from "react";
import {
  getCampaigns,
  createCampaign,
  sendCampaign,
  deleteCampaign,
  getAudiences
} from "../services/api";

function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [audiences, setAudiences] = useState([]);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    content: "",
    audience: "",
  });

  const fetchCampaigns = async () => {
    try {
      const res = await getCampaigns();
      setCampaigns(res.data.campaigns);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAudiences = async () => {
    try {
      const res = await getAudiences();
      setAudiences(res?.data?.audiences);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchAudiences();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCampaign(form);

      setForm({
        name: "",
        subject: "",
        content: "",
        audience: "",
      });

      fetchCampaigns();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async (id) => {
    try {
      await sendCampaign(id);
      fetchCampaigns();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id);
      fetchCampaigns();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Campaigns</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8"
      >
        <input
          type="text"
          name="name"
          placeholder="Campaign Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          name="content"
          placeholder="Email Content"
          value={form.content}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows={5}
          required
        />

        <select
          name="audience"
          value={form.audience}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Audience</option>

          {audiences.map((audience) => (
            <option
              key={audience._id}
              value={audience._id}
            >
              {audience.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Create Campaign
        </button>
      </form>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold">
                {campaign.name}
              </h2>

              <p>
                <strong>Subject:</strong> {campaign.subject}
              </p>

              <p>
                <strong>Audience:</strong> 
                {campaign.audience?.name}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {campaign.status}
              </p>
            </div>

            <div className="flex gap-3">
              {campaign.status === "Sent" ? (
                <button
                  disabled
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Sent
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleSend(campaign._id)
                  }
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                  Send
                </button>
              )}

              <button
                onClick={() =>
                  handleDelete(campaign._id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
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

export default Campaign;