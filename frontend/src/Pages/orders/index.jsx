import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Orders = () => {
  const currentUser = localStorage.getItem("currentUser");
  // const token=currentUser?.token;
  // console.log(`Bearer ${currentUser}`);
  

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      axios.get(`http://localhost:8800/api/orders`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },

      }).then((res) => {
        return res.data;
      }),

  });

  //   const handleContact = async (order) => {
  //     const sellerId = order.sellerId;
  //     const buyerId = order.buyerId;
  //     const id = sellerId + buyerId;

  //     try {
  //       const res = await axios.get(`/conversations/single/${id}`);
  //       navigate(`/message/${res.data.id}`);
  //     } catch (err) {
  //       if (err.response.status === 404) {

  //         const res = await axios.post(`/conversations/`, {
  //           to: currentUser.seller ? buyerId : sellerId,
  //         });
  //         navigate(`/message/${res.data.id}`);

  //       }
  //     }
  //   };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt="contact"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;