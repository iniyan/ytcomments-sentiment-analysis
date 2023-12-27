// components/YouTubeAnalyzer.js
import React, { useState } from 'react';
import axios from 'axios';

const YouTubeAnalyzer = ({ onAnalysisComplete }) => {
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
    setLoading(true);

    try {
      const response = await axios.post('/api/analyze', { urls });
      onAnalysisComplete(response.data);
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Paste YouTube video URLs (one per line)"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <button onClick={handleAnalysis} disabled={loading}>
        {loading ? 'Analyzing...' : 'Do Sentiment Analysis'}
      </button>
    </div>
  );
};

export default YouTubeAnalyzer;
