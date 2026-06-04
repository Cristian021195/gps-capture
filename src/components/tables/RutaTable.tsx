import { useMemo, useState } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "konsta/react";
import { useIntl } from "react-intl";
import { TrashIcon } from "../svg/FormIcons";
import { PencilIcon } from "../svg/UtilsIcon";
import type { IRuta, IRutaRelevamiento } from "../../interfaces/IEntidades";

interface IRutaTableProps {
  data: IRutaRelevamiento[],
  onEdit?: (item: IRuta) => void,
  onDelete?: (item: IRuta) => void
}

export default function RutaTable({data, onDelete, onEdit}:IRutaTableProps) {
  const {formatMessage:tr} = useIntl();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const columns = useMemo<ColumnDef<IRutaRelevamiento>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: tr({ id: "name"}),
      },
      {
        accessorKey: "relevamiento_nombre",
        header: tr({ id: "home"}),
      },
      {
        id: "actions",
        header: tr({ id: "actions"}),
        cell: ({ row }) => (
          <div className="flex gap-2 justify-evenly">
            <button
              type="button"
              className="btn-sm p-1 bg-red-300"
              onClick={() => onDelete?.(row.original)}
            >
              <TrashIcon/>
            </button>

            <button
              type="button"
              className="btn-sm p-1 bg-yellow-200"
              onClick={() => onEdit?.(row.original)}
            >
              <PencilIcon/>
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tr]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="overflow-scroll rounded-xl border border-gray-300">
        <table className="w-full border-separate border-spacing-0">
          <thead className="table-head">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="table-body">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>      
      </div>
      <div className="flex gap-2 items-center justify-between mt-4">
        <div className="flex gap-2 items-center">
            <Button tonal small className="w-fit" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                {"<<"}
            </Button>

            <span>
                {table.getState().pagination.pageIndex + 1} / {" "}
                {table.getPageCount()}
            </span>

            <Button tonal small className="w-fit" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                {">>"}
            </Button>
        </div>
        <select value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
          {[3, 5, 10].map((size) => (
            <option key={size} value={size}>
              {tr({id:'show'})} {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}