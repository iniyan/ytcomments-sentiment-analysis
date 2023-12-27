// pages/index.js
import React, { useState } from 'react';
import YouTubeAnalyzer from '../components/YouTubeAnalyzer';

const Home = () => {
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
  };

  return (
    <div>
      <h1>YouTube Sentiment Analysis</h1>
      <YouTubeAnalyzer onAnalysisComplete={handleAnalysisComplete} />
      {analysisResults && (
        <div>
          <h2>Analysis Results</h2>
          <table>
            <thead>
              <tr>
                <th>Video</th>
                <th>Total Comments</th>
                <th>Positive Comments</th>
                <th>Neutral Comments</th>
                <th>Negative Comments</th>
              </tr>
            </thead>
            <tbody>
              {analysisResults.map((result) => (
                <tr key={result.url}>
                  <td>
                    <a href={`https://www.youtube.com/watch?v=${result.url}`} target="_blank" rel="noopener noreferrer">
                      {result.videoTitle}
                    </a>
                  </td>
                  <td>{result.totalComments}</td>
                  <td>{result.positiveComments}</td>
                  <td>{result.neutralComments}</td>
                  <td>{result.negativeComments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
