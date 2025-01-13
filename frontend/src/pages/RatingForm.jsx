import React, { useState } from "react";

import { orders } from "../utils/constant";
import { set } from "../utils/icons";

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleRatingHoverOut = () => {
    setHoverRating(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      rating,
      comment,
      file: selectedFile,
    });
    setSubmitted(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Generate a temporary URL for preview
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center">
      <div className="w-[95%] flex flex-col gap-2 my-10">
        <div className="flex items-center justify-between p-5 bg-white shadow-lg shadow-black ">
          <span className="text-3xl font-poppinsSemibold ">
            Ratings & Reviews
          </span>
          <div className="flex items-center gap-5">
            <span className=" text-base font-poppinsMedium">
              {orders[0].name}
            </span>
            <img className="w-14 h-16 rounded-md" src={set} alt="set" />
          </div>
        </div>

        {/*------------------ rating form ------------------------------*/}
        <div className=" w-full flex items-center justify-between p-5 bg-white shadow-lg shadow-black ">
          <div className="p-5 w-4/5 font-poppinsMedium">
            <h2>Rate this Product</h2>
            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div style={{ display: "flex", marginBottom: "10px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleRatingHover(star)}
                    onMouseLeave={handleRatingHoverOut}
                    style={{
                      fontSize: "30px",
                      color:
                        star <= (hoverRating || rating) ? "#FFD700" : "#ddd",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Comment Box */}
              <div className="w-full">
                <h2>Review this Product</h2>
                <textarea
                  placeholder="Write a review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="5"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontFamily: "Arial, sans-serif",
                  }}
                ></textarea>
              </div>
              {/* File Input */}
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Upload a photo (optional):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginBottom: "10px" }}
                />
                {imagePreview && (
                  <div>
                    <p>Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: "150px", borderRadius: "5px" }}
                    />
                  </div>
                )}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  backgroundColor: "#2874F0",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </form>

            {/* Submitted Review */}
            {submitted && (
              <div style={{ marginTop: "20px" }}>
                <h3>Thank You for Your Feedback!</h3>
                <p>
                  <strong>Your Rating:</strong>{" "}
                  {[...Array(rating)].map((_, i) => (
                    <span
                      key={i}
                      style={{ color: "#FFD700", fontSize: "20px" }}
                    >
                      ★
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Your Review:</strong> {comment}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingForm;
