import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridMonth from "@fullcalendar/daygrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import ReactTooltip from "react-tooltip";
import { useNavigate } from "react-router-dom";
//src
import "./App.css";

export default function Calendar() {
  const navigate = useNavigate();
  const [eventData, seteventData] = useState([]);

  useEffect(() => {
    fetch(
      "https://schedulingapi-preprod.findanexpert.net/api/Schedule/GetAllScheduleById?Id=233",
      {
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let newData = [];
        data?.monthlyScheduleResponseModels.map((a) =>
          a.timeSlots.map((b) =>
            newData.push({
              title: b.startTime + " - " + b.endTime,
              start: a.dates,
              end: a.dates,
            })
          )
        );
        seteventData(newData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return () => {
      seteventData("");
    };
  }, []);

  return (
    <div className="calendar-main">
      <ReactTooltip id="foo">abcc</ReactTooltip>
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        // schedulerLicenseKey="0216257263-fcs-1626084820"
        initialView="dayGridMonth"
        // ref={calendarRef}
        plugins={[interactionPlugin, dayGridMonth, scrollGridPlugin]}
        events={eventData}
        // events="https://fullcalendar.io/api/demo-feeds/events.json"
        // events={[
        //   {
        //     title: "Meeting",
        //     start: "2022-10-11T12:00:00",
        //     description: "description for Birthday Party",
        //     end: "2022-10-11T18:30:00",
        //     color: "#5599FF",
        //     // backgroundColor: "lightblue",
        //   },
        //   {
        //     title: "Meeting",
        //     start: "2022-10-11T12:00:00",
        //     description: "description for Birthday Party",
        //     end: "2022-10-11T18:30:00",
        //     color: "#5599FF",
        //     // backgroundColor: "lightblue",
        //   },
        //   {
        //     title: "Meeting",
        //     start: "2022-10-05T12:00:00",
        //     description: "description for Birthday Party",
        //     end: "2022-10-05T18:30:00",
        //     color: "#5599FF",
        //     // backgroundColor: "lightblue",
        //   },
        // ]}
        eventMouseEnter={(info) => {}}
        select={(e) =>
          navigate("/time-slot", {
            state: {
              startTime: e.startStr,
              endTime: e.endStr,
            },
          })
        }
        dayMaxEvents={2}
        contentHeight={1000}
        headerToolbar={{
          left: "",
          center: "prev,title,next",
          //right:"resourceTimelineMonth,resourceTimelineWeek,resourceTimelineDay, resourceTimeGridDay, resourceTimeGridFourDay, dayGridMonth",
          right: "",
        }}
        views={{
          dayGridMonth: {
            // name of view
            titleFormat: { month: "long" },
            dayMaxEventRows: 2,
            // other view-specific options here
          },
        }}
        selectable={true}
        dayHeaderFormat={{ weekday: "narrow" }}
        editable={true}
        dayMinWidth={200}
        allDaySlot={false}
        eventMinHeight={50}
        eventContent={(info) => {
          console.log(info);
          return (
            <>
              <div>
                <p>{info.event.title}</p>
                {/* <p>event 2</p> */}
              </div>
            </>
          );
        }}
        // resourceLabelContent={(info) => <ProviderTab providerInfo={info} />}
      />
    </div>
  );
}
