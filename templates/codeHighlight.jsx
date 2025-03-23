import React from 'react';
import { compile } from 'core/js/reactHelpers';

export default function CodeHighlight(props) {
  const { _codeHighlight } = props;

  if (!_codeHighlight || !_codeHighlight._isEnabled) return null;

  const { _code } = _codeHighlight;

  if (!_code) return null;

  if (_code.codehljs) {
    return (
      <pre>
        <code>{compile(_code.codehljs)}</code>
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
