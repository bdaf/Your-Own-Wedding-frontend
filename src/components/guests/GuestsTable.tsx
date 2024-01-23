import styles from "./Table.module.css";
import { GuestModel, NameModel } from "../Models";

interface Props {
  guests: GuestModel[];
  names: NameModel[];
  setCurrentGuest: Function;
  setCurrentName: Function;
  setAction: Function;
  setIsGuestForm: Function;
}

function GuestsTable({
  guests,
  names,
  setCurrentGuest,
  setCurrentName,
  setAction,
  setIsGuestForm,
}: Props) {
  function onEditGuestHandler(guest: GuestModel): void {
    setCurrentGuest(guest);
    setAction("update");
  }

  function onDeleteGuestHandler(guest: GuestModel): void {
    setCurrentGuest(guest);
    setAction("delete");
  }

  function onShowAdditionAttrNameHandler(addition_attr_name: NameModel): void {
    setCurrentName(addition_attr_name);
    setAction("delete");
  }

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            {names.map((addition_attr_name) => {
              return (
                <th
                  key={addition_attr_name.id}
                  onClick={() =>
                    onShowAdditionAttrNameHandler(addition_attr_name)
                  }
                >
                  {addition_attr_name.name}
                </th>
              );
            })}
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
              {names.map((addition_attr_name) => {
                return (
                  <th key={addition_attr_name.id}>{addition_attr_name.name}</th>
                );
              })}
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
