import style from './Table.module.css';

interface Props {
  pres: any[];
}
const Table = ({ pres }: Props) => {
  return (
    <div className={style.table__container}>
      <div className={style.tbl}>
        {pres.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    className={style.check__input}
                    type="checkbox"
                  />
                </th>
                {Object.keys(pres[0]).map(
                  (key: string, index: number) => (
                    <th key={`header-${index}`}>{key}</th>
                  )
                )}

                <th>編集</th>
              </tr>
            </thead>
            <tbody>
              {pres.map((row, index) => (
                <tr key={`row-${index}`}>
                  <td key={`checkbox-${index}`}>
                    <input
                      className={style.check__input}
                      type="checkbox"
                    />
                  </td>
                  {Object.values(row).map(
                    (value: any, columnIndex: number) => (
                      <td
                        key={`cell-${index}-${columnIndex}`}
                      >
                        {value}
                      </td>
                    )
                  )}
                  <td key={`edit-${index}`}>編集</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p>
          {pres.length == 0
            ? '該当するデータがありません'
            : ''}
        </p>
      </div>
    </div>
  );
};

export default Table;
