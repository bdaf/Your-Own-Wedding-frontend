import styles from "./Table.module.css";
import { AdditionAttribiuteModel, GuestModel, NameModel } from "../Models";

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

  function getAdditionAttribiuteValue(guest: GuestModel, name: NameModel) {
    const addition_attribiute: AdditionAttribiuteModel =
      guest.addition_attribiutes.find((attr) => {
        return attr.addition_attribiute_name_id == name.id;
      })!;
    return addition_attribiute ? (
      <th key={addition_attribiute.id}>{addition_attribiute.value}</th>
    ) : (
      <th key={name.id}>{name.default_value}</th>
    );
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
                  className={`${styles.addition_attribiute_name} pointer`}
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
              className={`${styles.create} pointer`}
              onClick={() => {
                setAction("create");
                setIsGuestForm(true);
              }}
            >
              Create guest
            </th>
            <th
              className={`${styles.create} pointer`}
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
              {names.map((addition_attr_name) =>
                getAdditionAttribiuteValue(guest, addition_attr_name)
              )}
              <td
                className={`${styles.edit} pointer`}
                onClick={() => onEditGuestHandler(guest)}
              >
                edit
              </td>
              <td
                className={`${styles.delete} pointer`}
                onClick={() => onDeleteGuestHandler(guest)}
              >
                delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestsTable;
