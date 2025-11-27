import { useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UploadProof() {
  const { id } = useParams(); // bookingId
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected && selected.type.startsWith("image")) {
      setPreviewURL(URL.createObjectURL(selected));
    } else {
      setPreviewURL(null);
    }
  };
  console.log("UPLOAD ID =", id);
  const upload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file!");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`/proof/upload/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Proof uploaded!");
    navigate("/customer/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Upload Proof
        </h1>

        <form onSubmit={upload} className="space-y-6">

          {/* Upload box */}
          <label
            className="flex flex-col items-center justify-center 
                       border border-gray-300 rounded-xl p-8 
                       cursor-pointer bg-gray-50 hover:bg-gray-100 
                       transition"
          >
            <input
              type="file"
              className="hidden"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />

            {!previewURL ? (
              <>
                <span className="text-5xl mb-3">📤</span>
                <p className="text-gray-600 font-medium">
                  Click to upload image or PDF
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Supported: JPG, PNG, PDF
                </p>
              </>
            ) : (
              <>
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg shadow-lg"
                />
                <p className="text-gray-600 mt-3">Click to change file</p>
              </>
            )}
          </label>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-3 rounded-lg text-white font-semibold 
                      transition ${
                        uploading
                          ? "bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
          >
            {uploading ? "Uploading..." : "Upload Proof"}
          </button>

        </form>
      </div>
    </div>
  );
}
