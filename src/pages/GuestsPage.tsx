import { FormEvent, useContext, useEffect, useState } from "react";
import GuestsTable from "../components/guests/GuestsTable";
import {
  createGuest,
  deleteGuest,
  getMyGuests,
  updateGuest,
} from "../services/guestService";
import { EMPTY_GUEST_MODEL, GuestModel } from "../components/Models";
import { useNavigate } from "react-router-dom";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../store/flash-messages-context";
import GuestForm from "../components/guests/GuestForm";

function GuestsPage() {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [action, setAction] = useState<string>("create");
  const [guests, setGuests] = useState<GuestModel[]>([]);
  const [currentGuest, setCurrentGuest] =
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

  function executeAction(event: FormEvent<HTMLFormElement>) {
    if (action == "create") createGuestHandler(event);
    else if (action == "update") editGuestHandler(event);
    else if (action == "delete") deleteGuestHandler(event);
  }

  function createGuestHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createGuest(currentGuest)
      .then((res) => {
        const newlyCreatedGuest: GuestModel = res.data;
        setGuests([...guests, newlyCreatedGuest]);
        flashMsgCtx.setFlashMessage(
          "Guest has been created",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      });
  }

  function editGuestHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("jestem");
    updateGuest(currentGuest)
      .then((res) => {
        const newlyUpdatedGuest: GuestModel = res.data;
        setGuests(
          guests.map((guest) =>
            guest.id == newlyUpdatedGuest.id ? newlyUpdatedGuest : guest
          )
        );
        flashMsgCtx.setFlashMessage(
          "Guest has been updated",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      });
  }

  function deleteGuestHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    deleteGuest(currentGuest)
      .then((res) => {
        flashMsgCtx.handleSuccess(res);
        setGuests(guests.filter((guest) => guest.id != currentGuest.id));
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      });
  }

  return (
    <div className="width-100-center ">
      <span className="title">Wedding Guests</span>
      <GuestForm
        guest={currentGuest}
        action={action}
        onGuestChange={setCurrentGuestHandler}
        submitAction={executeAction}
      />
      <GuestsTable
        guests={guests}
        setCurrentGuestHandler={setCurrentGuestHandler}
        setAction={setAction}
      />
    </div>
  );
}

export default GuestsPage;
