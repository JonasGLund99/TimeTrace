import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";
import { DateFormat } from "../models/helpers/dateFormats";
import { LogFormatter } from "../models/LogFormatter";
import Tooltip from "./tooltip/ToolTip";

interface DateFormatChooserProps {
    tooltip?: string;
}

function DateFormatChooser({tooltip}: DateFormatChooserProps) {
    const { dateFormat, setDateFormat } = useContext(AppdataContext);

    return (
        // https://react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable
        <Tooltip tooltip={tooltip}>
            <form className="w-[50%]">
                <label htmlFor="date-formats" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose a date format</label>
                <select value={dateFormat} id="date-formats" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        setDateFormat(e.target.value);
                        LogFormatter.dateFormat = e.target.value as DateFormat;
                    }}>
                    <option value={DateFormat.ISO_8601}>{DateFormat.ISO_8601}</option>
                    <option value={DateFormat.YYMMDD_HH_MM_SS}>{DateFormat.YYMMDD_HH_MM_SS}</option>
                    <option value={DateFormat.DD_MM_YYYY_HH_MM_SS}>{DateFormat.DD_MM_YYYY_HH_MM_SS}</option>
                    <option value={DateFormat.YYYY_MM_DD_HH_MM_SS_MMM}>{DateFormat.YYYY_MM_DD_HH_MM_SS_MMM}</option>
                </select>
            </form>
        </Tooltip>
    );
}

export default DateFormatChooser;
