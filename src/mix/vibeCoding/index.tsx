import React, { useState } from 'react';
import STYLE from "./style";

const files: string[] = [
  'model.json',
  'style.less',
  'runtime.tsx',
];

export default function VibeCoding() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  return (
    <div style={STYLE.VIBE_CODING}>
      <div style={STYLE.FILE_LIST_CONTAINER}>
        <div style={STYLE.FILE_LIST}>
          {files.map((file, index) => (
            <div
              key={index}
              style={{ ...STYLE.FILE, ...(selectedFile === file ? STYLE.FILE_ACTIVE : {}) }}
              onClick={() => setSelectedFile(file)}
            >
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}