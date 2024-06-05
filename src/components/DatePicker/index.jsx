import { useState } from "react";
import Calendar from "../Calendar";
import Popover from "../Popover";
import { toIsoString } from "../utils";
import "./styles.css";

const DatePicker = ({ selectedDate = new Date(), onChangeSelectedDate, containerClasses }) => {
    const [shouldShowPopover, setShouldShowPopover] = useState(false);

    return (
        <div className={containerClasses}>
            <Popover
                label={
                    <input value={toIsoString(selectedDate).split('T')[0]} readOnly />
                }
                onShowPopover={setShouldShowPopover}
                shouldShowPopover={shouldShowPopover}
            >
                <Calendar
                    onSelect={setShouldShowPopover}
                    selectedDate={selectedDate}
                    onChangeSelectedDate={onChangeSelectedDate}
                />
            </Popover>
        </div>
    );
};

export default DatePicker;