import React, { useState, useEffect, useRef } from 'react';

import Adapt from 'core/js/adapt';

export default function CodeHighlight(props) {
  const { _codeHighlight } = props;
  const [fileContent, setFileContent] = useState(null);
  const contentRendered = useRef(false);

  if (!_codeHighlight || !_codeHighlight._isEnabled) return null;

  useEffect(() => {
    if (_codeHighlight._codeFile) {
      fetch(_codeHighlight._codeFile)
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.text();
        })
        .then((text) => {
          setFileContent(text);
          contentRendered.current = false;
        })
        .catch((error) => {
          console.error('Error loading code file:', error);
          setFileContent(`Error loading file: ${error.message}`);
        });
    }
  }, [_codeHighlight._codeFile]);

  useEffect(() => {
    if (fileContent && _codeHighlight._codeFile && !contentRendered.current) {
      setTimeout(() => {
        Adapt.trigger('codeHighlight:fileLoaded');
        contentRendered.current = true;
      }, 0);
    }
  }, [fileContent, _codeHighlight._codeFile]);

  if (_codeHighlight._codeFile && fileContent) {
    return (
      <pre>
        <code>{fileContent}</code>
      </pre>
    );
  }

  const { _code } = _codeHighlight;
  if (!_code) return null;

  if (_code.codehljs) {
    return (
      <pre>
        <code>{_code.codehljs}</code>
      </pre>
    );
  }

  const formattedJson = typeof _code === 'string' ? _code : JSON.stringify(_code, null, 2);
  return (
    <pre>
      <code>{formattedJson}</code>
    </pre>
  );
}
