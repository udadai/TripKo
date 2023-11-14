import { Link } from "react-router-dom";
import CardTitle from "../../atoms/CardTitle";
import Photo from "../../atoms/Photo";
import StarRating from "../../atoms/StarRating";
import WishButton from "../../atoms/WishButton";
import { useState } from "react";

const PlacePoster = ({
                       image,
                       name,
                       address,
                       to,
                       alt,
                       averageRating,
                       id,
                       isWished,
                     }) => {
  const [wished, setWished] = useState(isWished);
  return (
      <div className="place-card shadow-rounded-card relative flex-shrink-0 p-2 md:w-[15rem]">
        <div className="absolute right-4 top-4">
          <WishButton
              filter={"touristSpot"}
              id={id}
              initialIsWished={wished}
              onWishChange={(newWishState) => setWished(newWishState)}
          />
        </div>
        <Link
            to={to ? to : "/"}
            className={"flex flex-col justify-between gap-1 h-full w-full"}
        >
          <div className={"place-card-header"}>
            <div
                className={
                  "image-wrapper min-h-[11rem] w-full overflow-hidden rounded-lg md:h-[15rem]"
                }
            >
              <Photo
                  src={image}
                  alt={alt}
                  className={"h-full w-full object-cover"}
              />
            </div>
            <CardTitle title={name} lineClamp={2} />
          </div>
          <div className={"place-card-body flex flex-col items-center text-sm"}>
            <div className="place-card-address line-clamp-2 w-full">
              {address}
            </div>
            <div
                className={
                  "place-card-body flex w-full items-center justify-start text-sm"
                }
            >
              <StarRating averageRating={averageRating} />
              {averageRating.toFixed(1)}
            </div>
          </div>
        </Link>
      </div>
  );
};

export default PlacePoster;
