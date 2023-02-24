import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import scheduleArray from "./schedule_array.json";
import ClearIcon from "@mui/icons-material/Clear";
// import TimeSelect from "./Components/TimeSelect";
// scss
import "./TimeSlot.scss";
// import { FAECheckBoxGroup } from "./Components/FAECheckBoxGroup/FAECheckBoxGroup";
const defaultArray = {
  id: 0,
  week: [
    { WeekId: 0, repeat: 1, day: "Monday" },
    { WeekId: 1, repeat: 1, day: "Tuesday" },
    { WeekId: 2, repeat: 1, day: "Wednesday" },
    { WeekId: 3, repeat: 1, day: "Thursday" },
    { WeekId: 4, repeat: 1, day: "Friday" },
    { WeekId: 5, repeat: 1, day: "Saturday" },
    { WeekId: 6, repeat: 1, day: "Sunday" },
  ],
};
export default function TimeSlot() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTime, endTime } = location.state;
  const [renderOption, setRenderOption] = useState(0);
  const [renderWeek, setRenderweek] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [weekArray, setWeekArray] = useState([defaultArray]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [age, setAge] = useState(0);
  const [radioSelect, setRadioSelect] = useState("");
  const [slotOne, setSlotOne] = useState([0]);
  const [slotTwo, setSlotTwo] = useState([0]);
  const [slotThree, setSlotThree] = useState([0]);
  const [deleteId, setDeleteId] = useState("");
  const [timeRanges, setTimeRanges] = useState([
    { startTime: "09:00", endTime: "17:00" },
  ]);
  const handleAddTimeRange = () => {
    setTimeRanges([...timeRanges, { startTime: "09:00", endTime: "17:00" }]);
  };

  const handleTimeRangeChange = (index, newTimeRange) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges[index] = newTimeRange;
    setTimeRanges(newTimeRanges);
  };

  const handleRemoveTimeRange = (index) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges.splice(index, 1);
    setTimeRanges(newTimeRanges);
  };

  const TimeSelect = ({ label, value, onChange, disabledOptions }) => {
    const filteredOptions = scheduleArray.filter(
      (option) => !disabledOptions.includes(option.value)
    );
    return (
      <div className="time-slot-no-repeat">
        {/* <label>{label}</label> */}
        <select value={value} onChange={onChange}>
          {filteredOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const TimeRange = ({ timeRange, onChange, onRemove }) => {
    const handleStartTimeChange = (event) => {
      const newStartTime = event.target.value;
      onChange({ ...timeRange, startTime: newStartTime });
    };

    const handleEndTimeChange = (event) => {
      const newEndTime = event.target.value;
      onChange({ ...timeRange, endTime: newEndTime });
    };
    return (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <TimeSelect
          label="Start Time"
          value={timeRange.startTime}
          onChange={handleStartTimeChange}
          disabledOptions={[]}
        />
        <TimeSelect
          label="End Time"
          value={timeRange.endTime}
          onChange={handleEndTimeChange}
          disabledOptions={scheduleArray
            .filter((option) => option.value <= timeRange.startTime)
            .map((option) => option.value)}
        />

        <ClearIcon sx={{ fontSize: "30px" }} onClick={onRemove} />
      </div>
    );
  };
  const handleChange = (event) => {
    if (event.target.value === 0 && weekArray.length === 2) {
      weekArray.pop();
    } else if (event.target.value === 10) {
      setWeekArray([
        ...weekArray,
        {
          id: 1,
          week: [
            { WeekId: 0, repeat: 1, day: "Monday" },
            { WeekId: 1, repeat: 1, day: "Tuesday" },
            { WeekId: 2, repeat: 1, day: "Wednesday" },
            { WeekId: 3, repeat: 1, day: "Thursday" },
            { WeekId: 4, repeat: 1, day: "Friday" },
            { WeekId: 5, repeat: 1, day: "Saturday" },
            { WeekId: 6, repeat: 1, day: "Sunday" },
          ],
        },
      ]);
    }
    setAge(event.target.value);
  };
  const handleClickMoreVert = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMoreVert = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async () => {
    let timeSlots = [];
    timeRanges.map((a) => timeSlots.push({ ...a, date: startTime }));
    let data = {
      providerId: 233,
      type: 0,
      dates: startTime,
      timeSlots,
      endDate: startTime,
    };

    const rawResponse = await fetch(
      "https://schedulingapi-preprod.findanexpert.net/api/Schedule/AddMonthlySchedule",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const content = await rawResponse.json();
    console.log(content);
    // fetch(
    //   "https://schedulingapi-preprod.findanexpert.net/api/Schedule/AddMonthlySchedule",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //       mode: "no-cors",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
  };
  return (
    <div className="time-slot-main">
      <div className="time-slot-card">
        <div className="time-slot-arrowback">
          <ArrowBackIcon
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
            color="primary"
          />
          <h2>Time Slots</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "20px",
          }}
        >
          <div></div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <p style={{ color: "#1976d2" }}>Clear</p>
            <RestartAltIcon
              sx={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => {
                setRenderOption(0);
                setSlotOne([0]);
                setSlotTwo([0]);
                setSlotThree([0]);
                setWeekArray([defaultArray]);
                setRadioSelect("");
              }}
            />{" "}
          </div>
        </div>
        <hr />
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radioSelect}
          >
            <FormControlLabel
              className="color-lightgray"
              value="days"
              control={
                <Radio
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                />
              }
              onClick={() => {
                setRenderOption(1);
                setRadioSelect("days");
              }}
              label="Repeat Days"
            />
            <FormControlLabel
              className="color-lightgray"
              value="dates"
              control={
                <Radio
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                />
              }
              onClick={() => {
                setRenderOption(2);
                setRadioSelect("dates");
              }}
              label="Repeat Dates"
            />
          </RadioGroup>
        </FormControl>
        {renderOption === 0 ? (
          <div className="slot-time-select-container">
            <p className="color-lightgray">
              {moment(startTime).format("dddd, D MMM, YYYY")}
            </p>{" "}
            <div className="time-slot">
              <motion.div
                transition={{
                  delay: 0.5,
                  x: { duration: 1 },
                  default: { ease: "linear" },
                }}
                layoutId="underline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {timeRanges.map((timeRange, index) => (
                  <TimeRange
                    key={index}
                    timeRange={timeRange}
                    onChange={(newTimeRange) =>
                      handleTimeRangeChange(index, newTimeRange)
                    }
                    onRemove={() => handleRemoveTimeRange(index)}
                  />
                ))}
                {/* <button onClick={handleAddTimeRange}>Add Time Range</button> */}
              </motion.div>
              <AddBoxIcon
                fontSize="500"
                sx={{ fontSize: 45, color: "#5d9fe1" }}
                onClick={handleAddTimeRange}
                // onClick={() => {
                //   // setStartTimes((pre) => [
                //   //   ...pre,
                //   //   {
                //   //     id: startTimes[startTimes.length - 1].id + 1,
                //   //     value: "00:00",
                //   //   },
                //   // ]);
                //   // setEndTimes((pre) => [
                //   //   ...pre,
                //   //   {
                //   //     id: endTimes[endTimes.length - 1].id + 1,
                //   //     value: "00:00",
                //   //   },
                //   // ]);
                // }}
              />
            </div>
          </div>
        ) : renderOption === 1 ? (
          <div className="repeat-days-main">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={age}
                onChange={handleChange}
                sx={{ width: "250px", height: "30px" }}
              >
                <MenuItem value={0}>Week</MenuItem>
                <MenuItem value={10}>Every Two Week</MenuItem>
                <MenuItem value={20}>Every Three Week</MenuItem>
                {/* <MenuItem value={30}>   </MenuItem> */}
              </Select>
            </FormControl>
            {renderWeek ? (
              <motion.div layoutId="underline" className="repeat-days-week">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Monday"
                  />
                </FormGroup>
                <div className="time-slot">
                  <div>
                    {slotTwo.map((a) => (
                      <div className="time-slot-inner">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={age}
                            onChange={handleChange}
                          >
                            <MenuItem value={0}>
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <Select value={age} onChange={handleChange}>
                            <MenuItem value={0}>
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleCloseMoreVert}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "center",
                            horizontal: "center",
                          }}
                        >
                          <p
                            style={{
                              lineHeight: "0",
                              padding: "0 5px",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              slotTwo.length > 1
                                ? slotTwo.pop()
                                : console.log("");
                              setAnchorEl(null);
                            }}
                          >
                            Delete
                          </p>
                        </Popover>
                        <MoreVertIcon
                          aria-describedby={id}
                          onClick={handleClickMoreVert}
                          sx={{
                            fontSize: 30,
                            color: "#8C8C8C",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <AddBoxIcon
                    fontSize="500"
                    sx={{ fontSize: 45, color: "#5d9fe1" }}
                    onClick={() => setSlotTwo((pre) => [...pre, 0])}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div layoutId="underline" className="repeat-days-week2">
                {
                  weekArray.map((weekday) =>
                    weekday.week.map((weekInside) => (
                      <div className="row" key={weekInside.WeekId}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={weekInside.day}
                          />
                        </FormGroup>
                        <div className="time-slot">
                          <div>
                            {"1"
                              .repeat(weekInside.repeat)
                              .split("")
                              .map((a) => (
                                <div className="time-slot-inner">
                                  <FormControl
                                    sx={{ m: 1, minWidth: 120 }}
                                    size="small"
                                  >
                                    <Select
                                      labelId="demo-select-small"
                                      id="demo-select-small"
                                      value={age}
                                      onChange={handleChange}
                                    >
                                      <MenuItem value={0}>
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>

                                  <FormControl
                                    sx={{ m: 1, minWidth: 120 }}
                                    size="small"
                                  >
                                    <Select value={age} onChange={handleChange}>
                                      <MenuItem value={0}>
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                  <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleCloseMoreVert}
                                    anchorOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "center",
                                      horizontal: "center",
                                    }}
                                  >
                                    <p
                                      style={{
                                        lineHeight: "0",
                                        padding: "0 5px",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) => {
                                        // setWeekArray()
                                        let newArr = [...weekArray];
                                        newArr[deleteId.split("")[0]].week[
                                          deleteId.split("")[1]
                                        ].repeat > 1
                                          ? newArr[deleteId.split("")[0]].week[
                                              deleteId.split("")[1]
                                            ].repeat--
                                          : console.log("");
                                        setWeekArray(newArr);
                                        setAnchorEl(null);
                                      }}
                                    >
                                      Delete
                                    </p>
                                  </Popover>
                                  <MoreVertIcon
                                    aria-describedby={id}
                                    onClick={(event) => {
                                      console.log(weekday, weekInside);
                                      setDeleteId(
                                        weekday.id.toString() +
                                          weekInside.WeekId.toString()
                                      );
                                      setAnchorEl(event.currentTarget);
                                    }}
                                    sx={{
                                      fontSize: 30,
                                      color: "#8C8C8C",
                                      cursor: "pointer",
                                      marginLeft: "10px",
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                          <AddBoxIcon
                            fontSize="500"
                            sx={{ fontSize: 45, color: "#5d9fe1" }}
                            onClick={() => {
                              let newArr = [...weekArray];
                              newArr[weekday.id].week[weekInside.WeekId]
                                .repeat++;
                              setWeekArray(newArr);
                            }}
                          />
                        </div>
                      </div>
                    ))
                  )

                  // })
                }
              </motion.div>
            )}

            <div className="repeat-days-show-more">
              <div
                className="icon"
                onClick={() => {
                  setRenderweek(!renderWeek);
                }}
              >
                {renderWeek ? (
                  <ExpandMoreIcon color="primary" fontSize="large" />
                ) : (
                  <ExpandLessIcon color="primary" fontSize="large" />
                )}
              </div>
              <p>View full week</p>
            </div>
          </div>
        ) : (
          <div className="repeat-dates-main">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={age}
                onChange={handleChange}
                sx={{ width: "250px", height: "30px" }}
              >
                <MenuItem value={0}>Month</MenuItem>
                <MenuItem value={10}>Every Two Nonth</MenuItem>
                <MenuItem value={20}>Every Three Month</MenuItem>
                {/* <MenuItem value={30}>   </MenuItem> */}
              </Select>
            </FormControl>

            <div className="repeat-dates-slot">
              <p className="color-lightgray">02 Feb, 2022</p>
              <div className="time-slot">
                <div>
                  {slotThree.map((a) => (
                    <div className="time-slot-inner">
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={age}
                          onChange={handleChange}
                        >
                          <MenuItem value={0}>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select value={age} onChange={handleChange}>
                          <MenuItem value={0}>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleCloseMoreVert}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "center",
                          horizontal: "center",
                        }}
                      >
                        <p
                          style={{
                            lineHeight: "0",
                            padding: "0 5px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            slotThree.length > 1
                              ? slotThree.pop()
                              : console.log("");
                            setAnchorEl(null);
                          }}
                        >
                          Delete
                        </p>
                      </Popover>
                      <MoreVertIcon
                        aria-describedby={id}
                        onClick={handleClickMoreVert}
                        sx={{
                          fontSize: 30,
                          color: "#8C8C8C",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <AddBoxIcon
                  fontSize="500"
                  sx={{ fontSize: 45, color: "#5d9fe1" }}
                  onClick={() => setSlotThree((pre) => [...pre, 0])}
                />
              </div>
            </div>
          </div>
        )}
        <hr />
        <div className="submit-btn">
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}
