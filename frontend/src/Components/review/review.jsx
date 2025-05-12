import React from 'react';
import "./review.css"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const Review = ({review}) => {
    const { isLoading, error, data } = useQuery(
        {
          queryKey: [review.userId],
          queryFn: () =>
            axios.get(`http://localhost:8800/api/user/${review.userId}`).then((res) => {
              return res.data;
            }),
        },
      );
    
    return (
        <div className="review">
          <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/noavatar.png"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/public/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/public/like.png" alt="" />
        <span>Yes</span>
        <img src="/public/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
        </div>
    );
};

export default Review;

