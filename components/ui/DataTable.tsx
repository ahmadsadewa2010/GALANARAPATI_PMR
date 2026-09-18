import { ReactNode } from "react";

interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (item: T) => ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
}

export default function DataTable<T extends { id: number }>({
  data,
  columns,
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-5 py-4 text-left text-sm font-semibold text-slate-300"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="
                            border-b
                            border-slate-800
                            transition-all
                            duration-300
                            hover:bg-blue-500/5
                                                "
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-5 py-4 align-middle"
                >
                  {col.render
                    ? col.render(item)
                    : String(item[col.key as keyof T])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}