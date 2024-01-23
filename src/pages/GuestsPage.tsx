import { FormEvent, useContext, useEffect, useState } from "react";
import GuestsTable from "../components/guests/GuestsTable";
import { createGuest, getMyGuests } from "../services/guestService";
import { EMPTY_GUEST_MODEL, GuestModel } from "../components/Models";
import { useNavigate } from "react-router-dom";
import FlashMessagesContext from "../store/flash-messages-context";
import GuestForm from "../components/guests/GuestForm";

function GuestsPage() {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [guests, setGuests] = useState<GuestModel[]>([]);
  const [curretGuest, setCurrentGuest] =
    useState<GuestModel>(EMPTY_GUEST_MODEL);

  useEffect(() => {
    getMyGuests()
      .then((res) => {
        setGuests(res.data);
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      });
  }, []);

  function setCurrentGuestHandler(guest: GuestModel) {
    setCurrentGuest(guest);
  }

  function createGuestHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createGuest(curretGuest)
      .then((res) => {
        const newlyCreatedGuest: GuestModel = res.data;
        setGuests([...guests, newlyCreatedGuest]);
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      });
  }

  return (
    <div className="width-100-center ">
      <span className="title">Wedding Guests</span>
      <GuestForm
        guest={curretGuest}
        action={"create"}
        onGuestChange={setCurrentGuestHandler}
        submitActionHandler={createGuestHandler}
      />
      <GuestsTable guests={guests} />
    </div>
  );
}

export default GuestsPage;
