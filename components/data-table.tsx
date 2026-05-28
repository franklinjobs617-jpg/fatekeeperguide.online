import type { GuideTable } from "@/lib/guides";

export function DataTable({ table }: { table: GuideTable }) {
  return (
    <div className="mt-5 table-wrap">
      <table className="data-table">
        <caption className="sr-only">{table.caption}</caption>
        <thead>
          <tr>
            {table.headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
