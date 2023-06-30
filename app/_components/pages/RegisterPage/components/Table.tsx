import style from './Table.module.css';

interface President {
  Name: string;
  Index: number;
}
interface Props {
  pres: President[];
}
const Table = ({ pres }: Props) => {
  return (
    <div className={style.table__container}>
      <div className={style.tbl}>
        {pres.length > 0 && (
          <table>
            <tr>
              <th>
                <input
                  className={style.check__input}
                  type="checkbox"
                />
              </th>
              {Object.keys(pres[0]).map((key: string) => (
                <th key={key}>{key}</th>
              ))}

              <th>編集</th>
            </tr>
            <tbody>
              {pres.map((row, index) => (
                <tr key={index}>
                  <td key={index}>
                    <input
                      className={style.check__input}
                      type="checkbox"
                    />
                  </td>
                  {Object.values(row).map(
                    (value, index) => (
                      <td key={index}>{value}</td>
                    )
                  )}
                  <td key={index}>編集</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
