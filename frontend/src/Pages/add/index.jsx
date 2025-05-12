import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import upload from "../../utils/upload";


import "./add.css";
const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };







  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const queryClient = useQueryClient();


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //       const token = localStorage.getItem("currentUser");
  //       console.log(token)

  //       await axios.post("http://localhost:8800/api/gigs/newgig", state ,{
  //           headers: {
  //               Authorization: `Bearer ${token}`,
  //           },
  //           withCredentials: true,
  //           "Content-Type": "application/json",
  //       });

  // const mutation = useMutation({
  //   mutationFn: (gig) => {
  //     const token = localStorage.getItem("currentUser");
  //     console.log(token)
  //     return axios.post("http://localhost:8800/api/gigs/newgig", gig,{
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //     },
  //     withCredentials: true,
  //     "Content-Type": "application/json",

  //     });


  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["myGigs"]);
  //   },
  // });





  // } catch (error) {
  //     console.error("Error creating gig:", error);
  // }
  const mutation = useMutation({
    mutationFn: async (gig) => {
      // const token = localStorage.getItem("currentUser");

      // const parsedToken = JSON.parse(localStorage.getItem("currentUser"));
      // console.log(parsedToken);
      // if (!token) {
      //     throw new Error("No token found. Please log in.");
      // }

      // // const parsedToken = JSON.parse(token);
      // const accessToken = parsedToken?.accessToken || parsedToken?.token;

      // if (!accessToken) {
      //     throw new Error("Invalid token format. Please log in again.");
      // }

      return axios.post(
        "http://localhost:8800/api/gigs/newgig",
        // gig,
        {
          //"_id": "65a1b8c2f7e8ab1234567890",
          "userId": "user123",
          "title": "Professional Logo Design",
          "desc": "I will design a modern, professional logo for your brand.",
          "totalStars": 5,
          "starNumber": 10,
          "cat": "Design & Branding",
          "price": 50,
          "cover": "https://example.com/logo-cover.jpg",
          "images": [
            "https://example.com/logo1.jpg",
            "https://example.com/logo2.jpg"
          ],
          "shortTitle": "Modern Logo Design",
          "shortDesc": "High-quality, unique logo design for your business.",
          "deliveryTime": 2,
          "revisionNumber": 3,
          "features": ["Vector Files", "3 Revisions", "High Resolution"],
          "sales": 20,
          "createdAt": "2025-02-18T10:00:00Z",
          "updatedAt": "2025-02-18T10:00:00Z"
        },
        {
          headers: {
            "Content-Type": "application/json"
          },

          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["gigs"]);
      navigate("/mygigs");
    },
    onError: (error) => {
      console.error("Error creating gig:", error);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state, {
      onSuccess: () => {
        navigate("/mygigs");
      }
    });
  };












  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            {/* <label htmlFor="">Description</label> */}
            {/* <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea> */}
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" >
              <input type="text" placeholder="e.g. page design" />
              <input type="text" placeholder="e.g. page design" />
              <button type="submit" onClick={handleFeature}>add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item">
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }

                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;