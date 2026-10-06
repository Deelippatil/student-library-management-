import React from 'react';

export const DataTable = ({
  columns = [], // [{ header: string, accessor: string | func, render?: (row) => node, width?: string }]
  data = [],
  keyField = 'id',
  emptyMessage = 'No records found.',
  className = '',
}) => {
  return (
    <div className={`table-wrapper ${className}`.trim()}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={col.key || col.header || index} style={{ width: col.width || 'auto' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={row[keyField] ?? rowIndex}>
                {columns.map((col, colIndex) => {
                  let cellContent;
                  if (col.render) {
                    cellContent = col.render(row, rowIndex);
                  } else if (typeof col.accessor === 'function') {
                    cellContent = col.accessor(row);
                  } else {
                    cellContent = row[col.accessor];
                  }

                  return (
                    <td key={col.key || col.header || colIndex}>
                      {cellContent !== undefined && cellContent !== null ? cellContent : '—'}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

