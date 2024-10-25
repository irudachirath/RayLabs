import React, { useState } from "react";
import "./Feedback.css";
import { Rate } from "antd";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="feedback-container">
      <h2>Share Your Thoughts</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Star Rating:</label>
          <Rate
            className="white-border-rate"
            allowHalf
            value={rating}
            onChange={setRating}
            style={{ fontSize: "23px" }}
          />
          <div className="form-group mt-3">
            <label>Comments:</label>
            <textarea
              name="comments"
              value={comments}
              onChange={handleCommentsChange}
              required
              rows="8"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
