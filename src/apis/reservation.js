import instance from "./api";

export const getReservation = async () => {
    const restaurant = await instance.get("/userinfo/reservations/restaurant");
    const festival = await instance.get("/userinfo/reservations/festival");
    return {
        restaurant: restaurant.data.response,
        festival: festival.data.response,
    };
};

export const reserveFestival = async (id, date, headCount) => {
    const response = await instance.post("/festival/bookings", {
        reservation: {
            placeId: id,
            reservationDate: date,
            headCount: headCount
        }
    });
    return response.data.response;
};

export const reserveRestaurant = async (id, date, time, headCount, message) => {
    const response = await instance.post("/restaurant/bookings", {
        reservation: {
            placeId: id,
            reservationDate: date,
            reservationTime: time,
            headCount: headCount,
            message: message,
        }
    });
    return response.data.response;
};