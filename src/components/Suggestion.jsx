import React from "react";
import { Link } from "react-router-dom";

export default function Suggestion({ suggestion }) {

  return (
    <>
      {suggestion.firstName && (
        <div className="suggestion-div py-2">
          <Link to={`/${suggestion.userName}`} className="links">
            <div>
              <img
                className="rounded-circle profileImageTweet"
                src={`${process.env.REACT_APP_URL_S3}${suggestion.image}`}
                alt=""
              />
            </div>
            <h5 className="card-title">
              {" "}
              {suggestion.firstName} {suggestion.lastName}
            </h5>
          </Link>
          <h5 className="card-subtitle mb-2 text-muted cutUser">
            @{suggestion.userName}
          </h5>
        </div>
      )}
    </>
  );
}
