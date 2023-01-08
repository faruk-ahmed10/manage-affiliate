import React from 'react';
import { IoIosSend } from 'react-icons/io';
import { HiArrowSmRight } from 'react-icons/hi';
import { RiGiftFill } from 'react-icons/ri';

import {
//   Column,
//   ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
//   Table,
  useReactTable,
} from '@tanstack/react-table'
import { users } from '../data';
import Modal from './Modal';

function FullFeaturedTable({  }) {
  
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [open, setIsOpen] = React.useState(false);
  
  const columns = React.useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center">
                <input id="checkbox-all" type="checkbox" 
                    {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                    }} 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
            </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center">
            <input type="checkbox" 
                 {...{
                    checked: row.getIsSelected(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }} 
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
        </div>
        ),
      },
      {
        header: 'Affiliate Name',
        accessorKey: 'name',
        cell: info => <span className="text-primary">{info.getValue()}</span>,
        footer: props => props.column.id,
      },
      {
        header: 'Most recent referral',
        accessorKey: 'recent_ref',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        header: 'Revenue',
        accessorKey: 'revenue',
        cell: info => <span className="text-success">{info.getValue()}</span>,
        footer: props => props.column.id,
      },
      {
        header: 'Paid Payouts',
        accessorKey: 'paid',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        header: 'Unpaid Payouts',
        accessorKey: 'unpaid',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        header: 'Ready',
        accessorKey: 'ready',
        cell: info => <span className="text-red-500">{info.getValue()}</span>,
        footer: props => props.column.id,
      },
      {
        header: 'Breakdown',
        accessorKey: 'breakdown',
        cell: info => <a href={info.getValue()} className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center gap-1">View <HiArrowSmRight/></a>,
        footer: props => props.column.id,
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cell: info => <RiGiftFill className='text-xl text-secondary' />,
        footer: props => props.column.id,
      },
      {
        header: 'Action',
        cell: ({ row }) => (
          <div className="w-[130px]">
            <button onClick={() => {
                setIsOpen(true)}} className='text-white bg-primary px-6 py-1.5 rounded font-medium flex items-center gap-2'>Send payment <IoIosSend/> </button>
          </div>
        ),
        footer: props => props.column.id,
      },
    ],
    []
  )

  const [data, setData] = React.useState(() => users);
  const refreshData = () => setData(() => users);

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


  return (
    <div className="mt-2 overflow-hidden">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-tiny bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className='whitespace-nowrap'>
                {headerGroup.headers.map(header => {
                    return (
                    <th key={header.id} colSpan={header.colSpan} scope="col" className="px-6 py-3">
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
                    )
                })}
                </tr>
            ))}
            </thead>
            <tbody className='text-tiny whitespace-nowrap'>
            {table.getRowModel().rows.map(row => {
                return (
                <tr key={row.id} className="bg-white border-b hover:bg-gray-100">
                    {row.getVisibleCells().map(cell => {
                    return (
                        <td key={cell.id} className="px-6 py-4 text-black font-medium">
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </td>
                    )
                    })}
                </tr>
                )
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
      <Modal data={table.getSelectedRowModel().rows} visible={open} onClose={() => setIsOpen(prev => !prev)} />
    </div>
  )
}

function Filter({
  column,
  table,
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={((column.getFilterValue())?.[0] ?? '')}
        onChange={e =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={((column.getFilterValue())?.[1] ?? '')}
        onChange={e =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(column.getFilterValue() ?? '')}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  )
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
};


export default FullFeaturedTable;
