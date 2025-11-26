import { useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UploadProof() {
  const { id } = useParams(); // bookingId
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const upload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`/proof/upload/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Proof uploaded!");
    navigate("/customer/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload Proof</h1>

      <form onSubmit={upload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} /><br />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
