import PageTitleBar from "../../molecules/PageTitleBar";
import { useQuery } from "react-query";
import { getReservation } from "../../../apis/reservation";
import ReservationListTemplate from "./ReservationListTemplate";
import LoadingPage from "../loadingPage/LoadingPage";

const ReservationListPage = () => {
  const { data, error, isLoading } = useQuery("reservationList", () =>
    getReservation(),
  );
  return (
    <div className={"main-layout-page"}>
      <PageTitleBar name={"My Booking List"} />
      {data && <ReservationListTemplate reservations={data} />}
      {isLoading && <LoadingPage/>}
      {error && <div
          className={"text-center text-2xl font-bold w-full h-full flex items-center justify-center"}
      >
        There are no reservations.
      </div>}
    </div>
  );
};

export default ReservationListPage;
