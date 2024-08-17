import React, { useState } from 'react';

const Embed = ({ type, id }) => {
  const [embedCode, setEmbedCode] = useState('');

  const generateEmbedCode = () => {
    const baseUrl = process.env.REACT_APP_EMBED_BASE;
    setEmbedCode(`<script src="${baseUrl}/embed/${type}/${id}.js"></script>`);
  };

  return (
    <div>
      <h2>Embed Code</h2>
      <button onClick={generateEmbedCode}>Generate Embed Code</button>
      {embedCode && <textarea readOnly value={embedCode} rows="5" cols="50" />}
    </div>
  );
};

export default Embed;
