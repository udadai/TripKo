import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { modifyReview } from "../../../../apis/review";
import Button from "../../../atoms/Button";
import ReviewForm from "./organisms/ReviewForm";

const EditReviewTemplate = ({
  prevReview: {
    reviewId,
    placeId,
    placeName,
    address,
    rating: initRating,
    description: initDescription,
    image: initImage,
    visitDay,
  },
  type,
}) => {
  const [rating, setRating] = useState(initRating);
  const [image, setImage] = useState([]); // 이미지 파일
  const [description, setDescription] = useState(initDescription); // 리뷰 텍스트
  const [errorMsg, setErrorMsg] = useState(null); // 에러 메시지
  const [deleteImage, setDeleteImage] = useState([]); // 삭제할 파일];
  const [isUploading, setIsUploading] = useState(false); // 업로드 중인지 여부
  const onChangeReviewText = (e) => {
    setDescription(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg("Please select score");
      return;
    }
    if (description === "") {
      setErrorMsg("Please write review");
      return;
    }
    if (deleteImage.length === 0) {
      setDeleteImage(["noDeletion"]);
    }
    try {
      setIsUploading(true);
      await modifyReview(type, reviewId,{
        placeId,
        rating,
        description,
        image,
        deleteImage
      });
      alert("Successfully modified review");
      setIsUploading(false);
      navigate(-1);
    } catch (e) {
      alert("Failed to modify review due to server error");
      setIsUploading(false);
      return;
    } finally {
    }
  };
  return (
    <div
      className={
        "edit-review-template flex w-full flex-col items-center pb-[4rem]"
      }
    >
      <div
        className={"place-name text-2xl font-semibold text-tripKoOrange-500"}
      >
        {placeName}
      </div>
      <div className={"place-address text-lg"}>{address}</div>
      <ReviewForm
        file={image}
        setFile={setImage}
        reviewText={description}
        onChangeReviewText={onChangeReviewText}
        score={rating}
        setScore={setRating}
        errorMsg={errorMsg}
        initImage={initImage}
        setDeletedImage={setDeleteImage}
      />
      <Button
        as={"button"}
        className={
          "review-form-submit-button rounded-full bg-tripKoOrange p-2 px-4 text-lg font-semibold text-white"
        }
        onClick={handleSubmit}
        aria-label={"submit-review"}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Submit"}
      </Button>
    </div>
  );
};

export default EditReviewTemplate;
