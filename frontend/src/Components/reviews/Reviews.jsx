import React  from "react";
import "./Reviews.css"
import Review from "../review/review.jsx"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Reviews = ({ gigId }) => {

    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
      queryKey: ["reviews"],
      queryFn: () =>
        axios.get(`http://localhost:8800/api/reviews/${gigId}`).then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
        
    });
  
    const mutation = useMutation({
      mutationFn: (review) => {
        return axios.post("http://localhost:8800/api/reviews", review, {
          withCredentials: true
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews"]);
      }
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const desc = e.target[0].value;
      const star = e.target[1].value;
      mutation.mutate({ gigId, desc, star });
    };

    return (
        <div className="reviews">
        {/* <h2>Reviews</h2> */}
        {isLoading
          ? "loading"
          : error
          ? "Something went wrong!"
          : data.map((review) => <Review key={review._id} review={review} userId={review.userId}/>)}
        <div className="add">
          <h3>Add a review</h3>
          <form action="" className="addForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="write your opinion" />
            <select name="" id="">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>Send</button>
          </form>
        </div>
      </div>
    );

}  

export default Reviews;
    