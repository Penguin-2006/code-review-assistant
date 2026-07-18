function CodeBlock({ code }) {
  const lines = code.split('\n');
  return (
    <pre className="code-block">
      <code>
        {lines.map((line, i) => (
          <div className="code-line" key={i}>
            <span className="code-line-number">{i + 1}</span>
            <span className="code-line-content">{line || ' '}</span>
          </div>
        ))}
      </code>
    </pre>
  );
}

export default CodeBlock;