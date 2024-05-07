import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUpload() {
  // Verwende useState, um den aktuellen Zustand der Datei zu speichern
  const [file, setFile] = useState(null);
  // Zustand für die Liste der hochgeladenen Dateien
  const [files, setFiles] = useState([]);

  // onFileChange aktualisiert den Zustand mit der ausgewählten Datei
  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  // onFileUpload lädt die Datei hoch, wenn der Button geklickt wird
  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/upload", formData);
      fetchFiles(); // Ruft die Dateiliste nach dem Upload neu
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // useEffect wird verwendet, um die Dateiliste beim Initialisieren der Komponente zu laden
  useEffect(() => {
    fetchFiles();
  }, []);

  // Funktion, um die Liste der hochgeladenen Dateien vom Server abzurufen
  const fetchFiles = async () => {
    const response = await axios.get('http://localhost:5000/files');
    setFiles(response.data);
  };

  // UI der Komponente
  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload!</button>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
}

export default FileUpload;

