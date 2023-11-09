import instance, { instanceFormData } from "./api";

export const getRestaurantReviewById = async (id) => {
  const result = await instance.get(`/restaurant/reviews/${id}`);
  return result.data.response;
};

export const getFestivalReviewById = async (id) => {
  const result = await instance.get(`/festival/reviews/${id}`);
  return result.data.response;
};

export const getTouristSpotReviewById = async (id) => {
  const result = await instance.get(`/touristSpot/reviews/${id}`);
  return result.data.response;
};

export const getReviewByIdAndType = async (id, type) => {
  if (type === "restaurant") {
    return await getRestaurantReviewById(id);
  } else if (type === "festival") {
    return await getFestivalReviewById(id);
  } else if (type === "touristSpot") {
    return await getTouristSpotReviewById(id);
  } else {
    return null;
  }
};

export const organizeReview = (placeId, rating, description, file) => {
  const formData = new FormData();
  formData.append("placeId", placeId);
  formData.append("rating", rating);
  formData.append("description", description);
  formData.append("file", file);
  return formData;
};

export const postRestaurantReview = async (
  placeId,
  rating,
  description,
  file,
) => {
  const result = await instanceFormData.post(
    "/restaurant/reviews",
    organizeReview(placeId, rating, description, file),
  );
  return result.data.response;
};

export const postFestivalReview = async (
  placeId,
  rating,
  description,
  file,
) => {
  const result = await instanceFormData.post(
    "/festival/reviews",
    organizeReview(placeId, rating, description, file),
  );
  return result.data.response;
};

export const postTouristSpotReview = async (
  placeId,
  ratings,
  description,
  file,
) => {
  const result = await instanceFormData.post(
    "/touristSpot/reviews",
    organizeReview(placeId, ratings, description, file),
  );
  return result.data.response;
};

export const postReview = {
  restaurant: postRestaurantReview,
  festival: postFestivalReview,
  touristSpot: postTouristSpotReview,
};

export const getIsReviewed = async (placeId, type) => {
  const result = await instance.get(`/userinfo/reviews/${type}/${placeId}`);
  return result.data.response;
};

export const getMyReview = async () => {
  const result = await instance.get("/userinfo/reviews");
  return result.data.response;
};
