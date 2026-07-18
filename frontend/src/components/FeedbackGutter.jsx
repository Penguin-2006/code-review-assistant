const CATEGORIES = [
  { key: 'bugs', label: 'bugs', color: 'var(--color-bugs)' },
  { key: 'styleIssues', label: 'style', color: 'var(--color-style)' },
  { key: 'securityConcerns', label: 'security', color: 'var(--color-security)' },
  { key: 'complexityNotes', label: 'complexity', color: 'var(--color-complexity)' },
];

function FeedbackGutter({ feedback }) {
  return (
    <div className="feedback-gutter">
      {CATEGORIES.map(({ key, label, color }) => {
        const items = feedback[key] || [];
        return (
          <div className="feedback-category" key={key} style={{ borderColor: color }}>
            <p className="feedback-label" style={{ color }}>{label}</p>
            {items.length === 0 ? (
              <p className="feedback-empty">nothing to report</p>
            ) : (
              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FeedbackGutter;