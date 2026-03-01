function SampleDataViewer({ tables }) {
  return (
    <div className="sample-data">
      {tables.map((table) => (
        <div key={table.tableName}>
          <h4>{table.tableName}</h4>
          <table>
            <thead>
              <tr>
                {table.columns.map((col) => (
                  <th key={col.columnName}>{col.columnName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default SampleDataViewer;