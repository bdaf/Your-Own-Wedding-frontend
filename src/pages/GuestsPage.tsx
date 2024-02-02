import { FormEvent, useContext, useEffect, useState } from "react";
import GuestsTable from "../components/guests/GuestsTable";
import {
  createGuest,
  deleteGuest,
  getMyGuests,
  updateGuest,
} from "../services/guestService";
import {
  EMPTY_GUEST_MODEL,
  EMPTY_NAME_MODEL,
  GuestModel,
  NameModel,
} from "../components/Models";
import { useNavigate } from "react-router-dom";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../store/flash-messages-context";
import GuestForm from "../components/guests/GuestForm";
import AdditionAttribiuteForm from "../components/guests/NameForm";
import * as AdditionAttribiuteNameService from "../services/additionAttribiuteNameService";

function GuestsPage() {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [isGuestForm, setIsGuestForm] = useState<boolean>(true);
  const [action, setAction] = useState<string>("create");
  const [guests, setGuests] = useState<GuestModel[]>([]);
  const [names, setNames] = useState<NameModel[]>([]);
  const [name, setCurrentName] = useState<NameModel>(EMPTY_NAME_MODEL);
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
    AdditionAttribiuteNameService.getMyNames()
      .then((res) => {
        setNames(res.data);
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      });
  }, []);

  function setCurrentGuestHandler(guest: GuestModel) {
    setCurrentGuest(guest);
    setIsGuestForm(true);
  }

  function setCurrentNameHandler(name: NameModel) {
    setCurrentName(name);
    setIsGuestForm(false);
  }

  function executeAction(event: FormEvent<HTMLFormElement>) {
    if (isGuestForm) {
      if (action == "create") createGuestHandler(event);
      else if (action == "update") editGuestHandler(event);
      else if (action == "delete") deleteGuestHandler(event);
    } else {
      if (action == "create") createNameHandler(event);
      else if (action == "delete") deleteNameHandler(event);
    }
  }

  function createNameHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    AdditionAttribiuteNameService.createName(name)
      .then((res) => {
        const newlyCreatedName: NameModel = res.data;
        setNames([...names, newlyCreatedName]);
        flashMsgCtx.setFlashMessage(
          "Addition Attribiute name has been created",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      });
  }

  function deleteNameHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    AdditionAttribiuteNameService.deleteName(name)
      .then((res) => {
        flashMsgCtx.handleSuccess(res);
        setNames(names.filter((n) => n.id != name.id));
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      });
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
      {isGuestForm ? (
        <GuestForm
          guest={currentGuest}
          additionAttrNames={names}
          action={action}
          onGuestChange={setCurrentGuestHandler}
          submitAction={executeAction}
        />
      ) : (
        <AdditionAttribiuteForm
          action={action}
          name={name}
          setCurrentAttribiuteName={setCurrentNameHandler}
          submitAction={executeAction}
        />
      )}
      <GuestsTable
        guests={guests}
        names={names}
        setCurrentGuest={setCurrentGuestHandler}
        setAction={setAction}
        setIsGuestForm={setIsGuestForm}
        setCurrentName={setCurrentNameHandler}
      />
    </div>
  );
}

export default GuestsPage;
