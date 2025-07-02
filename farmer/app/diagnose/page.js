'use client';

import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function DiagnosePage() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [organicText, setOrganicText] = useState('');
  const [chemicalText, setChemicalText] = useState('');
  const [loading, setLoading] = useState(false);



  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setPrediction('');
    setOrganicText('');
    setChemicalText('');
  };

  const handleDiagnose = async () => {
    if (!image) return alert("Please select an image.");
    setLoading(true);

    try {
      // 1. Send image to backend
      const formData = new FormData();
      formData.append('file', image);

      const aiRes = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const disease = aiRes.data.prediction;
      setPrediction(disease);

      // 2. Get remedies from Gemini
      const prompt = `My crop is affected by ${disease}. Suggest 5 most common organic remedies and 5 most common chemical remedies. Reply in two short paragraphs. First for organic, second for chemical. No bullets, no formatting. Only clear to-the-point plain text.`;

      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const text = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No remedies found.';
      const [organic, chemical] = text.split(/\n\s*\n/);
      setOrganicText(organic || 'No organic remedies found.');
      setChemicalText(chemical || 'No chemical remedies found.');
    } catch (error) {
      console.error("❌ Axios error:", error.message, error.response || error);
      alert("Something went wrong. Check your Flask server and Gemini API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white">
      <Header />

      <div className="flex items-center justify-center p-6 pt-40">
        <div className="bg-green-50 rounded-2xl shadow-xl p-8 w-full max-w-xl text-center border border-green-200">
          <h1 className="text-3xl font-bold text-green-900 mb-6">🌿 Plant Diagnosis</h1>

          <div className="flex justify-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-green-700 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-200 file:text-green-900 hover:file:bg-green-300 cursor-pointer"
            />
          </div>

          {image && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="rounded shadow-md max-h-60 mx-auto"
              />
            </div>
          )}

          <button
            onClick={handleDiagnose}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Diagnosing...' : 'Upload & Diagnose'}
          </button>

          {prediction && (
            <div className="mt-6 text-green-900 text-left">
              <h3 className="text-lg font-bold mb-2">🦠 Disease Detected:</h3>
              <p className="mb-4">{prediction}</p>

              {organicText && (
                <>
                  <h3 className="text-lg font-bold mb-1">Organic Remedies:</h3>
                  <p className="mb-4">{organicText}</p>
                </>
              )}

              {chemicalText && (
                <>
                  <h3 className="text-lg font-bold mb-1">Chemical Remedies:</h3>
                  <p>{chemicalText}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
