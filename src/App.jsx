import React, { useState } from "react";
import { RiGiftFill, RiHandCoinFill } from "react-icons/ri";
import { HiArrowSmRight } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import Dropdown from "rc-dropdown";
import {
  //   Column,
  //   ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  //   Table,
  useReactTable,
} from "@tanstack/react-table";
import BasicTable from "./components/BasicTable";
import FullFeaturedTable from "./components/FullFeaturedTable";
import Modal from "./components/Modal";
import { users } from "./data";

const SortByMenu = (
  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white border shadow-sm rounded "
  >
    <div className="group relative pt-2">
      <button className="flex px-4 py-1 items-center gap-1 group-hover:text-white group-hover:bg-primary ">
        Revenue Generated{" "}
        <AiFillCaretRight className="text-gray-300 group-hover:text-white text-sm" />{" "}
      </button>
      <div className="absolute w-full left-full top-0 group-hover:block hidden">
        <div className="w-full py-2 bg-white border shadow-sm rounded">
          <button className="w-full text-left hover:bg-gray-100 px-4 py-1">
            Highest first
          </button>
          <button
            onClick={() => console.log("Clicked")}
            className="w-full text-left py-1 px-4 hover:bg-gray-100"
          >
            Lowest first
          </button>
        </div>
      </div>
    </div>
    <div className="group relative pb-2">
      <button className="flex px-4 py-1 items-center gap-1 group-hover:text-white group-hover:bg-primary ">
        Most recent referral{" "}
        <AiFillCaretRight className="text-gray-300 group-hover:text-white text-sm" />{" "}
      </button>
      <div className="absolute w-full left-full top-0 group-hover:block hidden">
        <div className="w-full py-2 bg-white border shadow-sm rounded">
          <button className="w-full text-left hover:bg-gray-100 px-4 py-1">
            Newest first
          </button>
          <button className="w-full text-left py-1 px-4 hover:bg-gray-100">
            Oldest first
          </button>
        </div>
      </div>
    </div>
  </div>
);

const FilterByMenu = (
  <ul className="bg-white border shadow-sm rounded py-1.5 divide-y">
    <li className="px-4 py-1.5 cursor-pointer hover:bg-gray-100">
      All pending payouts{" "}
    </li>
    <li className="px-4 py-1.5 cursor-pointer hover:bg-gray-100">
      Ready Payouts{" "}
    </li>
    <li className="px-4 py-1.5 cursor-pointer hover:bg-gray-100">No Leaks </li>
  </ul>
);

const ActionsMenu = ({ onClick }) => (
  <ul className="bg-white border shadow-sm rounded py-1.5 divide-y">
    <li className="px-4 py-1.5 cursor-pointer hover:bg-gray-100">
      Mark as paid{" "}
    </li>
    <li className="px-4 py-1.5 cursor-pointer hover:bg-gray-100">Reject </li>
    <li
      onClick={onClick}
      className="px-4 py-1.5 cursor-pointer hover:bg-gray-100"
    >
      Send payouts{" "}
    </li>
  </ul>
);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("pending");
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState(() => users);
  const [modalData, setModalData] = React.useState([]);
  const refreshData = () => {
    setData(() => []);
    setData(() => users);
  };

  const columns = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center">
            <input
              id="checkbox-all"
              type="checkbox"
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-all" className="sr-only">
              checkbox
            </label>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-all" className="sr-only">
              checkbox
            </label>
          </div>
        ),
      },
      {
        header: "Affiliate Name",
        accessorKey: "name",
        cell: (info) => <span className="text-primary">{info.getValue()}</span>,
        footer: (props) => props.column.id,
      },
      {
        header: "Most recent referral",
        accessorKey: "recent_ref",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Revenue",
        accessorKey: "revenue",
        cell: (info) => <span className="text-success">{info.getValue()}</span>,
        footer: (props) => props.column.id,
      },
      {
        header: "Paid Payouts",
        accessorKey: "paid",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Unpaid Payouts",
        accessorKey: "unpaid",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Ready",
        accessorKey: "ready",
        cell: (info) => <span className="text-red-500">{info.getValue()}</span>,
        footer: (props) => props.column.id,
      },
      {
        header: "Breakdown",
        accessorKey: "breakdown",
        cell: (info) => (
          <a
            href={info.getValue()}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center gap-1"
          >
            View <HiArrowSmRight />
          </a>
        ),
        footer: (props) => props.column.id,
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: (info) => <RiGiftFill className="text-xl text-secondary" />,
        footer: (props) => props.column.id,
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div className="w-[130px]">
            <button
              onClick={() => modalOpener({ rows: [row] })}
              className="text-white bg-primary px-6 py-1.5 rounded font-medium flex items-center gap-2"
            >
              Send payment <IoIosSend />{" "}
            </button>
          </div>
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  const disableAction =
    !rowSelection ||
    (typeof rowSelection === "object" && !Object.entries(rowSelection).length);

  const modalOpener = (data) => {
    setIsOpen(true);
    setModalData(data);
  };

  const onSubmitHandler = () => {
    table.resetRowSelection();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-5 xl:px-0">
      <div className="py-10 ">
        <h1 className="text-3xl font-medium text-secondary">
          Payouts Overview
        </h1>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <div className="bg-white px-8 py-4 border shadow-lg rounded-lg min-h-[120px]">
            <p className="flex text-secondary">
              <RiHandCoinFill className="text-2xl mr-1.5" />{" "}
              <span className="font-medium text-sm">Total Paid Payouts</span>
            </p>
            <h2 className="mt-3 text-2xl text-secondary font-semibold">
              $0.00
            </h2>
          </div>
          <div className="bg-white px-8 py-4 border shadow-lg rounded-lg min-h-[120px]">
            <p className="flex text-secondary">
              <RiHandCoinFill className="text-2xl mr-1.5" />{" "}
              <span className="font-medium text-sm">Total Unpaid Payouts</span>
            </p>
            <h2 className="mt-3 text-2xl text-secondary font-semibold">
              $185.88
            </h2>
          </div>
          <div className="bg-white px-8 py-4 border shadow-lg rounded-lg min-h-[120px]">
            <p className="flex text-secondary">
              <RiHandCoinFill className="text-2xl mr-1.5" />{" "}
              <span className="font-medium text-sm">Total Ready Payouts</span>
            </p>
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-2xl text-success font-semibold ">$185.88</h2>
              <div className="">
                <button
                  onClick={() => modalOpener(table.getRowModel())}
                  className="text-white text-xs bg-primary px-6 py-1 rounded font-medium"
                >
                  Pay All{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="mt-2 flex flex-wrap gap-2">
              <Dropdown
                trigger={["click"]}
                overlay={SortByMenu}
                animation="slide-up"
              >
                <button className="text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2">
                  Sort by <AiFillCaretDown />
                </button>
              </Dropdown>
              <Dropdown
                trigger={["click"]}
                overlay={FilterByMenu}
                animation="slide-up"
              >
                <button className="text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2">
                  Filter by <AiFillCaretDown />
                </button>
              </Dropdown>
              <Dropdown
                trigger={["click"]}
                overlay={
                  <ActionsMenu
                    onClick={() => modalOpener(table.getSelectedRowModel())}
                  />
                }
                animation="slide-up"
              >
                <button
                  disabled={disableAction}
                  className="disabled:bg-gray-500 text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2"
                >
                  Actions
                  <AiFillCaretDown />
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="mt-10">
          {/* Tab */}
          <div className="flex">
            <button
              onClick={() => setTab("pending")}
              className={`text-xs px-4 py-2 border border-transparent ${
                tab === "pending"
                  ? "bg-white text-secondary border-inherit border-b-transparent"
                  : "text-primary border-b-inherit"
              }`}
            >
              Pending Payouts
            </button>
            <button
              onClick={() => setTab("paid")}
              className={`text-xs px-4 py-2 border border-transparent ${
                tab === "paid"
                  ? "bg-white text-secondary border-inherit border-b-transparent"
                  : "text-primary border-b-inherit"
              }`}
            >
              Paid Payouts
            </button>
            <div className="flex-1 border-b"></div>
          </div>
          <div className={tab === "pending" ? "block" : "hidden"}>
            <div className="my-5 md:flex items-center justify-between ">
              {/* Filtering buttons */}
              <div className="mt-2 flex flex-wrap gap-2">
                <Dropdown
                  trigger={["click"]}
                  overlay={SortByMenu}
                  animation="slide-up"
                >
                  <button className="text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2">
                    Sort by <AiFillCaretDown />
                  </button>
                </Dropdown>
                <Dropdown
                  trigger={["click"]}
                  overlay={FilterByMenu}
                  animation="slide-up"
                >
                  <button className="text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2">
                    Filter by <AiFillCaretDown />
                  </button>
                </Dropdown>
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <ActionsMenu
                      onClick={() => modalOpener(table.getSelectedRowModel())}
                    />
                  }
                  animation="slide-up"
                >
                  <button
                    disabled={disableAction}
                    className="disabled:bg-gray-500 text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2"
                  >
                    Actions
                    <AiFillCaretDown />
                  </button>
                </Dropdown>
                <p className="text-xs text-gray-500 my-auto leading-normal items-center">
                  18 pending payouts
                </p>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <input
                  className="w-[200px] border rounded-lg font-medium text-tiny placeholder:text-black/80 px-2 py-1.5"
                  placeholder={`Affiliate's name or email`}
                  type="text"
                  name=""
                  id=""
                />
                <button className="text-white text-xs bg-primary px-3 py-1 font-medium">
                  Search
                </button>
                <button className="text-white text-xs bg-primary px-3 py-1 font-medium">
                  Export
                </button>
              </div>
            </div>
            {/* Table start */}
            <div className="mt-2 overflow-hidden">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-tiny bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="whitespace-nowrap">
                        {headerGroup.headers.map((header) => {
                          return (
                            <th
                              key={header.id}
                              colSpan={header.colSpan}
                              scope="col"
                              className="px-6 py-3"
                            >
                              {header.isPlaceholder ? null : (
                                <>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {/* {header.column.getCanFilter() ? (
                                    <div>
                                        <Filter column={header.column} table={table} />
                                    </div>
                                    ) : null} */}
                                </>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="text-tiny whitespace-nowrap">
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <tr
                          key={row.id}
                          className="bg-white border-b hover:bg-gray-100"
                        >
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <td
                                key={cell.id}
                                className="px-6 py-4 text-black font-medium"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* <tfoot>
                    <tr>
                        <td className="p-1">
                        <IndeterminateCheckbox
                            {...{
                            checked: table.getIsAllPageRowsSelected(),
                            indeterminate: table.getIsSomePageRowsSelected(),
                            onChange: table.getToggleAllPageRowsSelectedHandler(),
                            }}
                        />
                        </td>
                        <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
                    </tr>
                    </tfoot> */}
                </table>
              </div>
            </div>
            <Modal
              data={modalData}
              onSubmit={() => onSubmitHandler()}
              visible={isOpen}
              onClose={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
