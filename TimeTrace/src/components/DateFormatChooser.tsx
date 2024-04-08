import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";
import { dateFormats } from "../models/helpers/dateFormats";

function DateFormatChooser() {
    const { setTimeStampRegex } = useContext(AppdataContext);
    const { dateFormatIndex, setDateFormatIndex } = useContext(AppdataContext);
    
    return (
        // https://react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable
        <form className="max-w-sm">
            <label htmlFor="date-formats" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose a date format</label>
            <select value={dateFormatIndex} id="date-formats" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                    setDateFormatIndex(e.target.value);
                    let regex = RegExp("");
                    switch (e.target.value) {
                        case "0": {
                            regex = dateFormats["ISO 8601"];
                            break;
                        }
                        case "1": {
                            regex = dateFormats["YYMMDD HH.MM.SS"];
                            break;
                        }
                        case "2": {
                            regex = dateFormats["DD/MM/YYYY HH:MM:SS"];
                            break;
                        }
                        default: return;
                    } 
                    setTimeStampRegex(regex)
                }}
            >
                <option value="0">ISO 8601</option>
                <option value="1">YYMMDD HH.MM.SS - FMD</option>
                <option value="2">DD/MM/YYYY HH:MM:SS - SMS</option>
            </select>
        </form>
    );
}

export default DateFormatChooser;
