import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import CodeBlock from '../components/CodeBlock';
import FeedbackGutter from '../components/FeedbackGutter';
import './ReviewDetail.css';

function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReview() {
      try {
        const data = await apiRequest(`/reviews/${id}`);
        setReview(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReview();
  }, [id]);

  if (loading) {
    return <div className="review-detail-page"><p className="history-status">loading review...</p></div>;
  }

  if (error) {
    return <div className="review-detail-page"><p className="history-status history-error">{error}</p></div>;
  }

  return (
    <div className="review-detail-page">
      <Link to="/history" className="review-detail-back">&larr; back to history</Link>
      <h2>{review.language} review</h2>
      <div className="review-detail-grid">
        <CodeBlock code={review.code} />
        <FeedbackGutter feedback={review.feedback} />
      </div>
    </div>
  );
}

export default ReviewDetail;