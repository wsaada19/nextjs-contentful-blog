import React, { useEffect, useState } from 'react';
import { CodeBlock, atomOneDark } from 'react-code-blocks';

type GistCodeProps = {
  gistId: string;
  fileName: string;
};

export const GistCode = ({ gistId, fileName }: GistCodeProps) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchGist = async () => {
      const response = await fetch(gistId);
      const data = await response.json();
      const file = data.files[fileName];
      setCode(file.content);
    };
    fetchGist();
  }, [gistId, fileName]);

  return (
    <div className="my-4">
      <CodeBlock text={code} language={'typescript'} showLineNumbers={false} theme={atomOneDark} />
    </div>
  );
};
