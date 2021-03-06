import React, { useEffect } from "react";
import NavComponent from "./NavComponent";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "./Tweet";
import actions from "../redux/Actions/tweetActions";
import CreateTweet from "./CreateTweet";
import Suggestions from "./Suggestions";
import NavLateral from "./NavLateral"

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.token;
  const tweets = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(actions.saveTweets([]));
    axios
      .get(`${process.env.REACT_APP_URL}/tweets`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(actions.saveTweets(res.data.tweets)))
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div className="homeBody">
      <NavComponent />
      {!tweets.firstName && (
        <div className="row no-gutters flex-wrap-reverse" >
          <div className="col-lg-3">
            <NavLateral user={user} />
          </div>
          <div className="col-lg-5">
            <div className="feedContainer">
              <CreateTweet />
              <div className="d-flex flex-wrap-reverse">
                <div className="">
                  {tweets.map((tweet) => {
                    return (
                      <Tweet
                        key={tweet._id}
                        tweet={tweet}
                        author={tweet.author}
                      />
                    );
                  })}
                </div>
                <div className="d-lg-none">
                  <div className="suggestions-container">
                    <div className="suggestions-content">
                      <h5>Who to follow</h5>
                      <Suggestions />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="d-none d-lg-block suggestions-container">
              <div className="suggestions-content">
                <h5>Who to follow</h5>
                <Suggestions />
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}
export default Home;
