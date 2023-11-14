import PageTitle from "../atoms/PageTitle";
import InfoElement from "../features/detailPage/atoms/InfoElement";
import { RESERVE_STATUS } from "../features/reservationListPage/utils";
import ReservationInfo from "../features/formPages/writeReviewPage/ReservationInfo";

const ReservationDetailTemplate = ({ reservation }) => {
  return (
    <div className={"reservation-detail bg-white rounded-xl"}>
      <PageTitle title={"Reservation Detail"} />
        <ReservationInfo reservation={reservation} />
      <div className={"information-card grid gap-2 px-4 py-2 md:grid-cols-2"}>
        <InfoElement title={"Date"} value={reservation.date} />
        {reservation.time && (
          <InfoElement title={"Time"} value={reservation.time} />
        )}
        <InfoElement title={"Address"} value={reservation.address} />
        <InfoElement
          title={"Status"}
          value={RESERVE_STATUS[reservation.status]}
        />
        <InfoElement title={"Head Count"} value={reservation.headCount} />
      </div>
      <div className={"info-message-wrapper px-4 py-2"}>
        {reservation.message && (
          <InfoElement title={"Message"} value={reservation.message} />
        )}
      </div>
    </div>
  );
};
export default ReservationDetailTemplate;
