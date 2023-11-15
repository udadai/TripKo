import { useQuery } from "react-query";
import { applyStopPropagation } from "../../utils/applyStopPropagation";
import Photo from "./Photo";
import { user } from "../../apis/user";

const UserAvatar = ({ image, onClick, className }) => {
  const { data } = useQuery("user", user);

  return (
    <>
      <button
        className={`user-avatar overflow-hidden rounded-full ${className}`}
        onClick={(e) => (onClick ? applyStopPropagation(e, onClick) : null)}
        aria-label="user-avatar"
      >
        <Photo
          src={data?.image || "/images/default-avatar.jpg"}
          alt="avatar"
          className={"h-full w-full rounded-full object-scale-down"}
        />
      </button>
    </>
  );
};

export default UserAvatar;
