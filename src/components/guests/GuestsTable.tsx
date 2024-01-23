import styles from "./Table.module.css";
import { GuestModel } from "../Models";

interface Props {
  guests: GuestModel[];
}

function GuestsTable({ guests }: Props) {
  return (
    <div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Surname</th>
          </tr>
          {guests.map(({ id, name, surname }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{surname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestsTable;
