import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyReviewById } from "../../../../apis/review";
import EditReviewTemplate from "./EditReviewTemplate";

const EditReviewPage = () => {
  const { id, type } = useParams();

  const { data, error } = useQuery(`review${id}`, () =>
    getMyReviewById(id),
  );

  return (
    <div className={"edit-review-page min-h-screen w-full flex flex-col justify-center"}>
      {data && <EditReviewTemplate prevReview={data} type={type} />}
      {error && <div>Cannot Find Review</div>}
    </div>
  );
};

export default EditReviewPage;
