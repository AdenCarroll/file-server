import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload() {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // MUST match backend

    try {
      const response = await fetch("http://localhost:8080/api/files", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload File</h2>

      <input type="file" onChange={handleFileChange} />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      <pre>{message}</pre>
    </div>
  );
}
