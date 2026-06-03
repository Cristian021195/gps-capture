import { useState } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "konsta/react";
import { useIntl } from "react-intl";

type Usuario = {
  id: number;
  nombre: string;
  email: string;
  apodo:string;
};

const data: Usuario[] = [
  { id: 1, nombre: "Juan Chi cHI cSIHASIC ", apodo: "Juan Chi", email: "juan@test.com" },
  { id: 2, nombre: "Pedro Chi cHI cSIHASIC ", apodo: "Pedro Chi", email: "pedro@test.com" },
  { id: 3, nombre: "Ana Chi cHI cSIHASIC ", apodo: "Ana Chi", email: "ana@test.com" },
  { id: 4, nombre: "María Chi cHI cSIHASIC ", apodo: "María Chi", email: "maria@test.com" },
  { id: 5, nombre: "Luis Chi cHI cSIHASIC ", apodo: "Luis Chi", email: "luis@test.com" },
  { id: 6, nombre: "Carla Chi cHI cSIHASIC ", apodo: "Carla Chi", email: "carla@test.com" },
  { id: 7, nombre: "Diego Chi cHI cSIHASIC ", apodo: "Diego Chi", email: "diego@test.com" },
  { id: 8, nombre: "Sofía Chi cHI cSIHASIC ", apodo: "Sofía Chi", email: "sofia@test.com" },
  { id: 9, nombre: "Pablo Chi cHI cSIHASIC ", apodo: "Pablo Chi", email: "pablo@test.com" },
  { id: 10, nombre: "Laura Chi cHI cSIHASIC ", apodo: "Laura Chi", email: "laura@test.com" },
];

const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "apodo",
    header: "Apodo",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

export default function TablaUsuarios() {
  const {formatMessage:tr} = useIntl();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

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