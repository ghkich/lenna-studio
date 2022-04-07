import React, {useEffect} from 'react'
import Prism from 'prismjs'
import 'prismjs/plugins/line-highlight/prism-line-highlight.min'
import 'prismjs/plugins/line-highlight/prism-line-highlight.min.css'
import './style.css'

export default function CodeHighlight({code, lineSelectionRange, language}) {
  useEffect(() => {
    Prism.highlightAll()
  }, [code])
  return (
    <div className="code-highlight">
      <pre data-line={lineSelectionRange}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
