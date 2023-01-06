import { useState } from 'react'
import { RiGiftFill, RiHandCoinFill } from 'react-icons/ri'
import { HiArrowSmRight } from 'react-icons/hi'
import { IoIosSend } from 'react-icons/io'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import { FaAngleLeft } from 'react-icons/fa'
import Dropdown from 'rc-dropdown'
import Dialog from 'rc-dialog'
import 'rc-dropdown/assets/index.css';
import 'rc-dialog/assets/index.css'

const tableData = [
  {
    name: 'Dwight Wisoky',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Andrew C. Henderson',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Elizabeth',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Grunewald',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Navarrette',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Patricia',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Jessica',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Landes',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Whitaker',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Agustin',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
  {
    name: 'Edward',
    recent_ref: '28 Nov 2022',
    revenue: 356.05,
    paid: 0,
    unpaid: 35.61,
    ready: 35.61,
    breakdown: 'http://link.com',
    type: 'unknown',
    action: ''
  },
];

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('pending')
  console.log("Tab",tab)

  const SortByMenu = (
    <div onClick={(e) => e.stopPropagation()} className="bg-white border shadow-sm rounded ">
      <div className="group relative pt-2">
        <button className='flex px-4 py-1 items-center gap-1 group-hover:text-white group-hover:bg-primary '>Revenue Generated <AiFillCaretRight className='text-gray-300 group-hover:text-white text-sm'/> </button>
        <div className="absolute w-full left-full top-0 group-hover:block hidden">
          <div className="w-full py-2 bg-white border shadow-sm rounded">
            <button className='w-full text-left hover:bg-gray-100 px-4 py-1'>Highest first</button>
            <button onClick={() => console.log("Clicked")} className='w-full text-left py-1 px-4 hover:bg-gray-100'>Lowest first</button>
          </div>
        </div>
      </div>
      <div className="group relative pb-2">
        <button className='flex px-4 py-1 items-center gap-1 group-hover:text-white group-hover:bg-primary '>Most recent referral <AiFillCaretRight className='text-gray-300 group-hover:text-white text-sm'/> </button>
        <div className="absolute w-full left-full top-0 group-hover:block hidden">
          <div className="w-full py-2 bg-white border shadow-sm rounded">
            <button className='w-full text-left hover:bg-gray-100 px-4 py-1'>Newest first</button>
            <button className='w-full text-left py-1 px-4 hover:bg-gray-100'>Oldest first</button>
          </div>
        </div>
      </div>
    </div>
  )
  const FilterByMenu = (
    <ul className="bg-white border shadow-sm rounded py-1.5 divide-y">
      <li className='px-4 py-1.5 cursor-pointer hover:bg-gray-100'>All pending payouts  </li>
      <li className='px-4 py-1.5 cursor-pointer hover:bg-gray-100'>Ready Payouts  </li>
      <li className='px-4 py-1.5 cursor-pointer hover:bg-gray-100'>No Leaks  </li>
    </ul>
  )
  const ActionsMenu = (
    <ul className="bg-white border shadow-sm rounded py-1.5 divide-y">
      <li className='px-4 py-1.5 cursor-pointer hover:bg-gray-100'>Mark as paid  </li>
      <li className='px-4 py-1.5 cursor-pointer hover:bg-gray-100'>Reject  </li>
      <li className='px-4 py-1.5 cursor-pointer hover:bg-gray-100'>Send payouts  </li>
    </ul>
  )

  return (
    <div className='container mx-auto px-5 md:px-0'>
      <div className="py-10 ">
        <h1 className='text-3xl font-medium text-secondary'>Payouts Overview</h1>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <div className="bg-white px-8 py-4 border shadow-lg rounded-lg min-h-[120px]">
            <p className='flex text-secondary'>
              <RiHandCoinFill className='text-2xl mr-1.5' /> <span className='font-medium text-sm'>Total Paid Payouts</span>
            </p>
            <h2 className='mt-3 text-2xl text-secondary font-semibold'>$0.00</h2>
          </div>
          <div className="bg-white px-8 py-4 border shadow-lg rounded-lg min-h-[120px]">
            <p className='flex text-secondary'>
              <RiHandCoinFill className='text-2xl mr-1.5' /> <span className='font-medium text-sm'>Total Unpaid Payouts</span>
            </p>
            <h2 className='mt-3 text-2xl text-secondary font-semibold'>$185.88</h2>
          </div>
          <div className="bg-white px-8 py-4 border shadow-lg rounded-lg min-h-[120px]">
            <p className='flex text-secondary'>
              <RiHandCoinFill className='text-2xl mr-1.5' /> <span className='font-medium text-sm'>Total Ready Payouts</span>
            </p>
            <div className="flex justify-between items-center mt-3">
              <h2 className='text-2xl text-success font-semibold '>$185.88</h2>
              <div className="">
                <button onClick={() => setIsOpen(true)} className='text-white text-xs bg-primary px-6 py-1 rounded font-medium'>Pay All </button>
              </div>
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="mt-2 flex flex-wrap gap-2">
              <Dropdown
                trigger={['click']}
                overlay={SortByMenu}
                animation="slide-up"
              >
                <button className='text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2'>Sort by <AiFillCaretDown/></button>
              </Dropdown>
              <Dropdown
                trigger={['click']}
                overlay={FilterByMenu}
                animation="slide-up"
              >
                <button className='text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2'>Filter by <AiFillCaretDown/></button>
              </Dropdown>
              <Dropdown
                trigger={['click']}
                overlay={ActionsMenu}
                animation="slide-up"
              >
                <button className='text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2'>Actions<AiFillCaretDown/></button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="mt-10">
          {/* Tab */}
          <div className="flex">
            <button onClick={() => setTab('pending')}  className={`text-xs px-4 py-2 border border-transparent ${tab === 'pending'? 'bg-white text-secondary border-inherit border-b-transparent': 'text-primary border-b-inherit'}`}>Pending Payouts</button>
            <button onClick={() => setTab('paid')}  className={`text-xs px-4 py-2 border border-transparent ${tab === 'paid'? 'bg-white text-secondary border-inherit border-b-transparent': 'text-primary border-b-inherit'}`}>Paid Payouts</button>
            <div className="flex-1 border-b"></div>
          </div>
          <div className={tab === 'pending'? 'block': 'hidden'}>
            <div className="my-5 md:flex items-center justify-between ">
              {/* Filtering buttons */}
              <div className="mt-2 flex flex-wrap gap-2">
                <Dropdown
                  trigger={['click']}
                  overlay={SortByMenu}
                  animation="slide-up"
                >
                  <button className='text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2'>Sort by <AiFillCaretDown/></button>
                </Dropdown>
                <Dropdown
                  trigger={['click']}
                  overlay={FilterByMenu}
                  animation="slide-up"
                >
                  <button className='text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2'>Filter by <AiFillCaretDown/></button>
                </Dropdown>
                <Dropdown
                  trigger={['click']}
                  overlay={ActionsMenu}
                  animation="slide-up"
                >
                  <button disabled={true} className='disabled:bg-gray-500 text-white text-xs bg-primary px-3 py-1 rounded font-medium flex items-center gap-2'>Actions<AiFillCaretDown/></button>
                </Dropdown>
                <p className='text-xs text-gray-500 my-auto leading-normal items-center'>18 pending payouts</p>
              </div>
              <div className='flex items-center gap-2 mt-5'>
                <input className='w-[200px] border rounded-lg font-medium text-tiny placeholder:text-black/80 px-2 py-1.5' placeholder={`Affiliate's name or email`} type="text" name="" id="" />
                <button className='text-white text-xs bg-primary px-3 py-1 font-medium'>Search</button>
                <button className='text-white text-xs bg-primary px-3 py-1 font-medium'>Export</button>
              </div>
            </div>
            {/* Table start */}
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
                          tableData.map((user, idx) => (
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
          </div>
          {/* Modal Start */}
          <Dialog
            animation="zoom"
            maskAnimation="fade"
            closable={false}
            onClose={() => setIsOpen(false)}
            destroyOnClose={true}
            center
            wrapClassName='flex items-center justify-center'
            bodyStyle={{
              padding: "0",
              borderRadius: "8px",
              overflow: "hidden",
                
            }}
            visible={isOpen}
            
          >
              <div className="flex px-8 pt-5">
                <button onClick={() => setIsOpen(false)} className='flex items-center gap-1.5 text-sm font-medium text-primary'> <FaAngleLeft className='text-lg'/> Back</button>
                <p className='w-full flex justify-center font-medium text-gray-500 mr-[55px]'>Confirm Payouts</p>
              </div>
              <div className="overflow-hidden px-2 sm:px-8">
                <div className="">
                  <div className="border-2 rounded-lg border-primary my-8 px-4 py-5">
                    <div className="overflow-x-auto ">
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
                              <tr className="whitespace-nowrap bg-white border-b hover:bg-gray-100 divide-y">
                                  <th scope="row" className="px-6 py-4 flex gap-2 font-normal items-center justify-center text-black ">
                                      <div className="flex items-center">
                                          <input id="checkbox-table-1" type="checkbox" defaultChecked className="w-3 h-3 md:w-4 md:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                          <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                      </div>
                                      Dwight Wisoky
                                  </th>
                                  <td className="px-6 py-4 text-black text-center font-bold">
                                      $16.20
                                  </td>
                                  <td className="px-6 py-4 text-center text-black">
                                      Store Credit
                                  </td>
                              </tr>
                              <tr className="whitespace-nowrap bg-white border-b hover:bg-gray-100 divide-y">
                                  <th scope="row" className="px-6 py-4 flex gap-2 font-normal items-center justify-center text-black ">
                                      <div className="flex items-center">
                                          <input id="checkbox-table-1" type="checkbox" defaultChecked className="w-3 h-3 md:w-4 md:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                          <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                      </div>
                                      Dwight Wisoky
                                  </th>
                                  <td className="px-6 py-4 text-black text-center font-bold">
                                      $16.20
                                  </td>
                                  <td className="px-6 py-4 text-center text-black">
                                      Store Credit
                                  </td>
                              </tr>
                              <tr className="whitespace-nowrap bg-white border-b hover:bg-gray-100 divide-y">
                                  <th scope="row" className="px-6 py-4 flex gap-2 font-normal items-center justify-center text-black ">
                                      <div className="flex items-center">
                                          <input id="checkbox-table-1" type="checkbox" defaultChecked className="w-3 h-3 md:w-4 md:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                          <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                      </div>
                                      Dwight Wisoky
                                  </th>
                                  <td className="px-6 py-4 text-black text-center font-bold">
                                      $16.20
                                  </td>
                                  <td className="px-6 py-4 text-center text-black">
                                      Store Credit
                                  </td>
                              </tr>
                          </tbody>
                          <tfoot className='font-medium text-black divide-y'>
                            <tr>
                              <th scope="col" className="px-6 py-3 text-center">
                                    Store Credit:
                                </th>
                                <th></th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    $ 185.88
                                </th>
                            </tr>
                            <tr>
                              <th scope="col" className="px-6 py-3 text-center">
                                    Tremendous:
                                </th>
                                <th></th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    $0.00
                                </th>
                            </tr>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Total:
                                </th>
                                <th></th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    $ 185.88
                                </th>
                            </tr>
                          </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className='w-full justify-center text-white bg-primary px-6 py-4 font-semibold flex items-center gap-2'>Send payment <IoIosSend/> </button>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default App
