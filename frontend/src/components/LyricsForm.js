import React, { useState } from 'react';

const LyricsForm = () => {
  const [lyrics, setLyrics] = useState([{ time: '', text: '' }]);

  const handleAddLine = () => {
    const newLyrics = [...lyrics, { time: '', text: '' }];
    setLyrics(newLyrics);
  };

  const handleDeleteLine = (index) => {
    const newLyrics = [...lyrics];
    newLyrics.splice(index, 1);
    setLyrics(newLyrics);
  };

  const handleLyricsChange = (index, field, value) => {
    const newLyrics = [...lyrics];
    newLyrics[index][field] = value;
    setLyrics(newLyrics);
  };

  const handleSubmit = () => {
    // Send the lyrics data to your backend for storage
  };

  return (
    <div>
      {lyrics.map((line, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Lyrics text"
            value={line.text}
            onChange={(e) => handleLyricsChange(index, 'text', e.target.value)}
          />
          <input
            type="text"
            placeholder="Timestamp (seconds)"
            value={line.time}
            onChange={(e) => handleLyricsChange(index, 'time', e.target.value)}
          />
          <button onClick={() => handleDeleteLine(index)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddLine}>Add Line</button>
      <button onClick={handleSubmit}>Submit Lyrics</button>
    </div>
  );
};

export default LyricsForm;
