import ReactStarts from "react-rating-stars-component";

import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Review = (props) => {
  const options = {
    value: props.r.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <AccountCircleIcon fontSize="large" />
      <p>{props.r.name}</p>
      <ReactStarts  {...options}  /> 
      <span className="reviewCardComment">{props.r.comment}</span>
    </div>
  );
};

export default Review;