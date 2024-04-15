

function ShowLineToggle() {

    return (
        <form className="mb-2">
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-8">
                <option selected value="all">Show All Lines</option>
                <option value="mapped">Show Mapped Lines</option>
                <option value="unmapped">Show Unmapped Lines</option>
            </select>
        </form>
        // <div id="show-line-toggle" className="">
        //     <ul className="items-center  text-sm font-medium text-gray-900 bg-white sm:flex">
        //         <li className=" ">
        //             <div className="flex items-center ps-3">
        //                 <input id="show-all" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
        //                 <label htmlFor="show-all" className=" py-3 ms-2 text-sm font-medium text-gray-900">Show All</label>
        //             </div>
        //         </li>
        //         <li className=" ">
        //             <div className="flex items-center ps-3">
        //                 <input id="unmapped" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
        //                 <label htmlFor="unmapped" className=" py-3 ms-2 text-sm font-medium text-gray-900">Show Unmapped</label>
        //             </div>
        //         </li>
        //         <li className=" ">
        //             <div className="flex items-center ps-3">
        //                 <input id="mapped" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
        //                 <label htmlFor="mapped" className=" py-3 ms-2 text-sm font-medium text-gray-900">Show Mapped</label>
        //             </div>
        //         </li>
        //     </ul>
        // </div>
    );
}

export default ShowLineToggle;