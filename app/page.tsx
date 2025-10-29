"use client";

import { useState } from "react";
import Walletconnectbtn from "@/ui/Walletconnectbtn";
import LiquidEther from '@/components/LiquidEther';

export default function Home() {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);

      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      if (!uploadRequest.ok) {
        throw new Error("Upload failed");
      }

      const response = await uploadRequest.json();
      setUrl(response.url || response.fileUrl || response); // handle both cases
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <Walletconnectbtn />
      </div>
      
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, zIndex: 10, textAlign: 'center' }}>
        <input type="file" onChange={handleChange} />
        <button
          type="button"
          disabled={uploading}
          onClick={uploadFile}
          style={{ 
            marginTop: '1rem', 
            padding: '0.5rem 1rem', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.25rem',
            cursor: uploading ? 'not-allowed' : 'pointer'
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {url && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#10b981' }}>
            Uploaded to:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#10b981' }}>
              {url}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}