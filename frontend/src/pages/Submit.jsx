import { useState } from 'react';
import { apiRequest } from '../utils/api';
import CodeBlock from '../components/CodeBlock';
import FeedbackGutter from '../components/FeedbackGutter';
import './Submit.css';

const LANGUAGES = ['javascript', 'python', 'java', 'c++', 'typescript', 'go'];

function Submit() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!code.trim()) {
      setError('paste some code first');
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest('/reviews', {
        method: 'POST',
        body: JSON.stringify({ code, language }),
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-page">
      <h2>submit code for review</h2>

      <form onSubmit={handleSubmit} className="submit-form">
        <div className="submit-form-row">
          <label htmlFor="language">language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <label htmlFor="code">code</label>
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="paste your code here"
          rows={14}
        />

        {error && <p className="submit-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'reviewing...' : 'review code'}
        </button>
      </form>

      {result && (
        <div className="submit-result">
          <h3>review</h3>
          <div className="submit-result-grid">
            <CodeBlock code={result.code} />
            <FeedbackGutter feedback={result.feedback} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Submit;