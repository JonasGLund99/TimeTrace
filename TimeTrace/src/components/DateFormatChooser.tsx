import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";
import { DateFormat } from "../models/helpers/dateFormats";
import { LogFormatter } from "../models/LogFormatter";

function DateFormatChooser() {
    const { dateFormat, setDateFormat } = useContext(AppdataContext);

    return (
        // https://react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable
        <form className="max-w-sm">
            <label htmlFor="date-formats" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose a date format</label>
            <select value={dateFormat} id="date-formats" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                        setDateFormat(e.target.value);
                        LogFormatter.dateFormat = e.target.value as DateFormat;
                    } 
                }
            >
                <option value={DateFormat.ISO_8601}>{DateFormat.ISO_8601}</option>
                <option value={DateFormat.YYMMDD_HH_MM_SS}>{DateFormat.YYMMDD_HH_MM_SS} - FMD</option>
                <option value={DateFormat.DD_MM_YYYY_HH_MM_SS}>{DateFormat.DD_MM_YYYY_HH_MM_SS} - SMS</option>
                <option value={DateFormat.YYYY_MM_DD_HH_MM_SS_MMM}>{DateFormat.YYYY_MM_DD_HH_MM_SS_MMM} - SMS_ms</option>
            </select>
        </form>
    );
}

export default DateFormatChooser;
