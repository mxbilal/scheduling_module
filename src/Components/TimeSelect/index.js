import { useState } from "react";
import scheduleArray from "../../schedule_array.json";
export default function TimeSelect({ id, label, onChange, value, endTimes }) {
  const [options, setOptions] = useState(scheduleArray);

  function handleStartTimeChange(e) {
    const selectedEndTime = endTimes.find(
      (endTime) => endTime.id === id - 1
    ).value;
    const filteredOptions = scheduleArray.filter(
      (option) => option.value > selectedEndTime
    );
    setOptions(filteredOptions);
    onChange(e);
  }

  return (
    <div>
      <label htmlFor={`start-time-${id}`}>{label}:</label>
      <select
        id={`start-time-${id}`}
        onChange={handleStartTimeChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
