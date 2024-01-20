import styles from "./Table.module.css";
import { GuestModel } from "../Models";

const MyCustomTable = () => {
  const students: GuestModel[] = [];

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={`${styles.cell}`}> Id</th>
            <th className={`${styles.cell}`}> Imię</th>
            <th className={`${styles.cell}`}> Wiek</th>
          </tr>
          {students.map(({ id, name, surname }) => (
            <tr key={id}>
              <td className={`${styles.cell}`}> {id}</td>
              <td className={`${styles.cell}`}> {name}</td>
              <td className={`${styles.cell}`}> {surname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCustomTable;
