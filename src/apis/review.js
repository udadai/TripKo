import instance, { instanceFormData } from "./api";

export const getMyReviewById = async (id) => {
  const result = await instance.get(`/userinfo/reviews/${id}`);
  return result.data.response;
};
export const getRestaurantReviewById = async (id) => {
  const result = await instance.get(`/reviews/restaurant/${id}`);
  return result.data.response;
};

export const getFestivalReviewById = async (id) => {
  const result = await instance.get(`/reviews/festival/${id}`);
  return result.data.response;
};

export const getTouristSpotReviewById = async (id) => {
  const result = await instance.get(`/reviews/touristSpot/${id}`);
  return result.data.response;
};

export const getReviewByIdAndType = async (id, type) => {
  if (type === "RESTAURANT") {
    return await getRestaurantReviewById(id);
  } else if (type === "FESTIVAL") {
    return await getFestivalReviewById(id);
  } else if (type === "TOURIST_SPOT") {
    return await getTouristSpotReviewById(id);
  }
};

export const organizeReview = (placeId, rating, description, file) => {
  const formData = new FormData();
  formData.append("placeId", placeId);
  formData.append("rating", Math.ceil(rating));
  formData.append("description", description);
  file.forEach((f) => {
    formData.append("image", f);
  });
  return formData;
};

export const organizeModifyReview = (
  placeId,
  rating,
  description,
  image,
  deleteImage,
) => {
  const formData = new FormData();
  formData.append("placeId", placeId);
  formData.append("rating", Math.ceil(rating));
  formData.append("description", description);
  image.forEach((f) => {
    formData.append("image", f);
  });
  formData.append("deleteImage", deleteImage);
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

export const modifyReview = async (type, reviewId, review) => {
  console.log("review", review);
  console.log("reviewId", reviewId);
  console.log("type", type)
  const {placeId, rating, description, image, deleteImage } = review;
  const organizedData = organizeModifyReview(
      placeId,
      rating,
      description,
      image,
      deleteImage,
  );
  console.log("organizedData", organizedData)
  const result = await instanceFormData.patch(
      `/${type}/reviews/${reviewId}`,
      organizedData,
  );
  return result.data.response;
}

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
  RESTAURANT: postRestaurantReview,
  FESTIVAL: postFestivalReview,
  TOURIST_SPOT: postTouristSpotReview,
};

export const getIsReviewed = async (placeId, type) => {
  const result = await instance.get(`/userinfo/reviews/${type}/${placeId}`);
  return result.data.response;
};

export const getMyReview = async () => {
  const result = await instance.get("/userinfo/reviews");
  result.data.response.festival.map((f) => {
    f.type = "FESTIVAL";
    return f;
  });
  result.data.response.restaurant.map((r) => {
    r.type = "RESTAURANT";
    return r;
  });
  result.data.response.touristSpot.map((t) => {
    t.type = "TOURIST_SPOT";
    return t;
  });
  return result.data.response;
};

export const deleteReview = async (reviewId, type) => {
  const result = await instance.delete(`/${type}/reviews/${reviewId}`);
  return result.data.response;
};
