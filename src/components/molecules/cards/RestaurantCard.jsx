import { useState } from "react";
import StarRating from "../../atoms/StarRating";
import WishButton from "../../atoms/WishButton";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const [isWished, setIsWished] = useState(restaurant.isWished);

  return (
    <div className="restaurant-card relative flex-shrink-0 overflow-hidden">
      <Link Link to={`/restaurant/${restaurant.id}`} className="">
        <div className="shadow-rounded-card m-2 flex px-4">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="my-4 h-32 w-24 rounded-md border-gray-300"
          />
          <div className="m-2 items-center">
            <h4 className="text-lg font-semibold text-[#FF4800]">
              {restaurant.name}
            </h4>
            <span className="text-xs text-gray-400">
              {restaurant.address.split(" ").slice(-3, -1).join(" ")}
            </span>
            <div className="clamp-3">{restaurant.summary}</div>
            <div className="flex items-center">
              <StarRating averageRating={restaurant.averageRating} />
              <span className="text-xs">{restaurant.averageRating}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="wish-button absolute right-4 top-4">
        <WishButton
          filter={"restaurant"}
          id={restaurant.id}
          initialIsWished={isWished}
          onWishChange={(newWishState) => setIsWished(newWishState)}
        />
      </div>
    </div>
  );
};

export default RestaurantCard;
