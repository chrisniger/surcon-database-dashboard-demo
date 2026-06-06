import { ReactNode } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
};

export function DataTable<T extends { id: string }>({ columns, data }: { columns: Column<T>[]; data: T[] }) {
  if (!data.length) return <EmptyState />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 border-t border-gray-100">
              {columns.map((col, i) => (
                <td key={i} className={`px-4 py-3 text-sm text-gray-700 ${col.className ?? ''}`}>
                  {typeof col.accessor === 'function' ? col.accessor(row) : String(row[col.accessor] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
