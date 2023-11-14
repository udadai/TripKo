import { Link } from "react-router-dom";
import Photo from "../../atoms/Photo";
import WishButton from "../../atoms/WishButton";
import { useState } from "react";

const FestivalPoster = ({ image, to, alt, isWished, id }) => {
  const [wished, setWished] = useState(isWished);

  return (
    <div className="festival-card relative h-[26rem] w-[22rem] flex-shrink-0 overflow-hidden">
      <Link
        to={to}
        className={"h-full w-full transition-all duration-300  hover:scale-105"}
      >
        <Photo
          className={"h-full w-full object-cover "}
          src={image}
          alt={alt}
        />
      </Link>
      <div className="absolute right-4 top-4">
        <WishButton
          filter={"touristSpot"}
          id={id}
          initialIsWished={wished}
          onWishChange={(newWishState) => setWished(newWishState)}
        />
      </div>
    </div>
  );
};

export default FestivalPoster;
