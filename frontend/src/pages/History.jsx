import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import './History.css';

function History() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await apiRequest('/reviews');
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const preview = (code) => {
    const firstLine = code.split('\n').find((line) => line.trim().length > 0) || '';
    return firstLine.length > 60 ? firstLine.slice(0, 60) + '...' : firstLine;
  };

  if (loading) {
    return <div className="history-page"><p className="history-status">loading reviews...</p></div>;
  }

  if (error) {
    return <div className="history-page"><p className="history-status history-error">{error}</p></div>;
  }

  return (
    <div className="history-page">
      <h2>review history</h2>
      {reviews.length === 0 ? (
        <p className="history-empty">no reviews yet — submit some code to get started</p>
      ) : (
        <ul className="history-list">
          {reviews.map((review) => (
            <li key={review._id}>
              <Link to={`/history/${review._id}`} className="history-item">
                <span className="history-item-lang">{review.language}</span>
                <span className="history-item-preview">{preview(review.code)}</span>
                <span className="history-item-date">{formatDate(review.createdAt)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;