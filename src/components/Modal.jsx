import React, { useState } from 'react';
import Dialog from 'rc-dialog';
import { HiArrowSmRight } from 'react-icons/hi';
import { IoIosSend } from 'react-icons/io';
import { FaAngleLeft } from 'react-icons/fa';

const Modal = ({ data, visible, onClose, onSubmit }) => {
    
    const [tremendous, setTremendous] = useState(0);
    const [selected, setSelected] = useState([]);

    return (
        <Dialog
        animation="zoom"
        maskAnimation="fade"
        closable={false}
        onClose={onClose}
        destroyOnClose={true}
        center
        wrapClassName='flex items-center justify-center'
        bodyStyle={{
          padding: "0",
          borderRadius: "8px",
          overflow: "hidden",
          maxHeight: "90vh"
        }}
        visible={visible}
        
      >
          <div className="flex px-8 pt-5">
            <button onClick={onClose} className='flex items-center gap-1.5 text-sm font-medium text-primary'> <FaAngleLeft className='text-lg'/> Back</button>
            <p className='w-full flex justify-center font-medium text-gray-500 mr-[55px]'>Confirm Payouts</p>
          </div>
          <div className="overflow-hidden px-2 sm:px-8">
            <div className="">
              <div className="border-2 rounded-lg border-primary my-8 px-4 py-5">
                <div className="h-[56vh] overflow-x-auto overflow-y-auto">
                  <p className='font-normal  text-center text-xs md:text-sm py-3 border-b text-secondary'>
                    The following affiliates will be sent payouts:
                  </p>
                  <table className="w-full text-tiny text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-gray-700 font-bold border-b-2">
                          <tr>
                              <th scope="col" className="px-6 py-3 text-center">
                                  Affiliate
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                  Commission
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                  Type
                              </th>
                          </tr>
                      </thead>
                      <tbody >
                          {
                            data?.rows?.map((itm, idx) => (
                                <tr key={`modal_item_${idx}`} className="whitespace-nowrap bg-white border-b hover:bg-gray-100 divide-y">
                                    <th scope="row" className="px-6 py-4 flex gap-2 font-normal items-center justify-center text-black ">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-1" type="checkbox" defaultChecked className="w-3 h-3 md:w-4 md:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                        </div>
                                        {itm?.original.name}
                                    </th>
                                    <td className="px-6 py-4 text-black text-center font-bold">
                                        ${itm?.original.unpaid}
                                    </td>
                                    <td className="px-6 py-4 text-center text-black">
                                        Store Credit
                                    </td>
                                </tr>
                            ))
                          }
                      </tbody>
                      <tfoot className='font-medium text-black divide-y'>
                        <tr>
                          <th scope="col" className="px-6 py-3 text-center">
                                Store Credit:
                            </th>
                            <th></th>
                            <th scope="col" className="px-6 py-3 text-center">
                                ${data?.rows?.reduce((acc, itm) => acc + itm.original.unpaid, 0).toFixed(2)}
                            </th>
                        </tr>
                        <tr>
                          <th scope="col" className="px-6 py-3 text-center">
                                Tremendous:
                            </th>
                            <th></th>
                            <th scope="col" className="px-6 py-3 text-center">
                                ${tremendous.toFixed(2)}
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Total:
                            </th>
                            <th></th>
                            <th scope="col" className="px-6 py-3 text-center">
                                ${(data?.rows?.reduce((acc, itm) => acc + itm.original.unpaid, 0) + tremendous).toFixed(2)}
                            </th>
                        </tr>
                      </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <button onClick={onSubmit} className='w-full justify-center text-white bg-primary px-6 py-4 font-semibold flex items-center gap-2'>Send payment <IoIosSend/> </button>
      </Dialog>
    )
}

export default Modal;