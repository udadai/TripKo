import { useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { addWish, deleteWish, wish } from "../../apis/wish";

const WishButton = ({ filter, id, initialIsWished, onWishChange }) => {
  const [isWished, setIsWished] = useState(initialIsWished);
  const queryClient = useQueryClient();

  const addMutation = useMutation(() => addWish(id), {
    onSuccess: () => {
      setIsWished(true);
      if (onWishChange) onWishChange(true);
      queryClient.refetchQueries("wishlist");
    },
  });

  const deleteMutation = useMutation(() => deleteWish(id), {
    onSuccess: () => {
      setIsWished(false);
      if (onWishChange) onWishChange(false);
      queryClient.refetchQueries("wishlist");
    },
  });

  useEffect(() => {
    // console.log(isWished);
  }, [isWished]);

  const handleWishButtonClick = (event) => {
    event.stopPropagation();
    // 로그인 안되어있으면 로그인 페이지로 이동
    if (!localStorage.getItem("token")) {
      alert("Login is required");
      window.location.href = "/login";
      return;
    }
    if (isWished) {
      deleteMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <button onClick={handleWishButtonClick} aria-label="wish-button">
      <AiFillHeart
        size={30}
        color={isWished ? "#f93E00" : "#e4e5e9"}
        style={{ display: "inline-block", fontSize: "16px" }}
      />
    </button>
  );
};

export default WishButton;
