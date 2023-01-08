import React from 'react';
import { users } from '../data';
import { RiGiftFill, RiHandCoinFill } from 'react-icons/ri'
import { HiArrowSmRight } from 'react-icons/hi'
import { IoIosSend } from 'react-icons/io'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import { FaAngleLeft } from 'react-icons/fa'

const BasicTable = () => {

    return (
        <div className="mt-2 overflow-hidden">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-tiny bg-gray-50">
                        <tr className='whitespace-nowrap'>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Affiliate Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Most recent referral
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Revenue
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid Payouts
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Unpaid Payouts
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ready Payouts
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Breakdown
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-tiny whitespace-nowrap'>
                    {
                        users.map((user, idx) => (
                        <tr key={idx} className="bg-white border-b hover:bg-gray-100">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-primary ">
                                {user.name}
                            </th>
                            <td className="px-6 py-4 text-black font-medium">
                                {user.recent_ref}
                            </td>
                            <td className="px-6 py-4 font-medium text-success">
                                +${user.revenue}
                            </td>
                            <td className="px-6 py-4 text-black font-medium">
                                ${user.paid}
                            </td>
                            <td className="px-6 py-4 font-medium text-black">
                                ${user.unpaid}
                            </td>
                            <td className="px-6 py-4 text-red-500 font-medium">
                                ${user.ready}
                            </td>
                            <td className="px-6 py-4 font-medium">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center gap-1">View <HiArrowSmRight/></a>
                            </td>
                            <td className='px-6 py-4'>
                            <RiGiftFill className='text-xl text-secondary' />
                            </td>
                            <td className='w-[130px] px-6 py-4'>
                            <button onClick={() => setIsOpen(true)} className='text-white bg-primary px-6 py-1.5 rounded font-medium flex items-center gap-2'>Send payment <IoIosSend/> </button>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BasicTable;