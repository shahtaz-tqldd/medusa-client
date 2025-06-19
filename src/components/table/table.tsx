import React from "react";

export default function DataTable({ columns = [], data = [] }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/5">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-700 dark:text-white">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-zinc-600 dark:text-white/75"
              >
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-zinc-200 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-700 dark:text-white/60"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.field]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
