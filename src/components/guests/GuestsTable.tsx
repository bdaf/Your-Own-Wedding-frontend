import styles from "./Table.module.css";
import { GuestModel } from "../Models";

interface Props {
  guests: GuestModel[];
  setCurrentGuestHandler: Function;
  setAction: Function;
  setIsGuestForm: Function;
}

function GuestsTable({
  guests,
  setCurrentGuestHandler,
  setAction,
  setIsGuestForm,
}: Props) {
  function onEditGuestHandler(guest: GuestModel): void {
    setCurrentGuestHandler(guest);
    setAction("update");
  }

  function onDeleteGuestHandler(guest: GuestModel): void {
    setCurrentGuestHandler(guest);
    setAction("delete");
  }

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th
              onClick={() => {
                setAction("create");
                setIsGuestForm(true);
              }}
            >
              Create guest
            </th>
            <th
              onClick={() => {
                setAction("create");
                setIsGuestForm(false);
              }}
            >
              Create attribiute
            </th>
          </tr>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.name}</td>
              <td>{guest.surname}</td>
              <td onClick={() => onEditGuestHandler(guest)}>edit</td>
              <td onClick={() => onDeleteGuestHandler(guest)}>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestsTable;
