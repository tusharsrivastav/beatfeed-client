import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import { actions } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useFollowArtist = (artistId) => {
  const { user, dispatch } = useAuthContext();
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFollowed(user.followedArtists.includes(artistId));
  }, [user, artistId]);

  const toggleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowed) {
        // unfollow artist
        await axios.post(
          `${API_URL}/api/v1/users/unfollow-artist`,
          { artistId },
          { withCredentials: true }
        );

        // remove artist from user context
        const updatedFollowedArtists = user.followedArtists.filter(
          (id) => id !== artistId
        );

        dispatch({
          type: actions.UPDATE_FOLLOWED_ARTISTS,
          payload: updatedFollowedArtists,
        });
      } else {
        // follow artist
        await axios.post(
          `${API_URL}/api/v1/users/follow-artist`,
          { artistId },
          { withCredentials: true }
        );

        // add artist to user context
        const updatedFollowedArtists = [...user.followedArtists, artistId];

        dispatch({
          type: actions.UPDATE_FOLLOWED_ARTISTS,
          payload: updatedFollowedArtists,
        });
      }
      setIsFollowed((prevIsFollowed) => !prevIsFollowed); // update local state
    } catch (error) {
      console.log("Error following or unfollowing artist: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { isFollowed, loading, toggleFollow };
};
