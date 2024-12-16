import { StaffList } from "./StaffList";
import { TimeSlot } from "./TimeSlot";
import { DAYS_OF_WEEK, STAFF_LIST } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { addWeeks, subWeeks } from "date-fns";
import { TaskModal } from "./TaskModal";
import { NotifyStaffModal } from "./NotifyStaffModal";
import { StaffAddModal } from "./StaffAddModal";
import { AddScheduleModal } from "./AddScheduleModal";

type TimeRange = string | string[];
type DaySchedule = Record<string, TimeRange>;
type StaffSchedule = Record<string, DaySchedule>;

const SCHEDULE_DATA: StaffSchedule = {
  "Pharmacist1": {
    "Monday": ["9:00-10:00", "11:00-5:00"],
    "Wednesday": ["9:00-10:00", "11:00-5:00"],
    "Thursday": ["9:00-10:00", "11:00-5:00"],
    "Friday": ["9:00-10:00", "11:00-5:00"],
    "Saturday": ["9:00-5:00"]
  },
  "Pharmacist2": {
    "Sunday": "9:00-5:00",
    "Monday": "2:00-5:00",
    "Wednesday": "9:00-5:00",
    "Friday": "9:00-5:00"
  },
  "Technician": {
    "Monday": "9:00-5:00",
    "Tuesday": "9:00-5:00",
    "Wednesday": "1:00-5:00",
    "Thursday": "9:00-5:00",
    "Friday": "9:00-5:00"
  },
  "Assistant1": {
    "Sunday": "9:00-5:00"
  },
  "Assistant2": {
    "Monday": "9:00-5:00",
    "Tuesday": "9:00-5:00",
    "Thursday": "1:00-5:00",
    "Saturday": "9:00-5:00"
  }
};

export function Calendar() {
  const [view, setView] = useState<"overview" | "week" | "month" | "staff">("overview");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 4)); // December 4, 2024
  const [taskModal, setTaskModal] = useState<{
    open: boolean;
    data: {
      staffMember: string;
      task: string;
      time: string;
      details?: string;
    };
  }>({
    open: false,
    data: {
      staffMember: "",
      task: "",
      time: "",
    },
  });

  const [addStaffModal, setAddStaffModal] = useState(false);
  const [notifyStaffModal, setNotifyStaffModal] = useState(false);
  const [addScheduleModal, setAddScheduleModal] = useState<{
    open: boolean;
    data: {
      staffMember: string;
      date: string;
      time: string;
    };
  }>({
    open: false,
    data: {
      staffMember: "",
      date: "",
      time: "",
    },
  });

  const handlePreviousWeek = () => {
    setCurrentDate(prev => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1));
  };

  const isStaffAvailable = (staff: typeof STAFF_LIST[0], day: string, hour: number) => {
    // Early morning restrictions (1am-8am inclusive) for specific staff
    if (hour >= 1 && hour <= 8) {
      if (["Pharmacist2", "Technician", "Assistant2"].includes(staff.role)) {
        return false;
      }
    }

    const schedule = SCHEDULE_DATA[staff.role]?.[day];
    
    if (!schedule) return false;
    
    const parseTimeRange = (range: string) => {
      const [start, end] = range.split("-");
      const startHour = parseInt(start.split(":")[0]);
      const endHour = end === "5:00" ? 17 : parseInt(end.split(":")[0]);
      return { startHour, endHour };
    };

    if (Array.isArray(schedule)) {
      return schedule.some(timeRange => {
        const { startHour, endHour } = parseTimeRange(timeRange);
        return hour >= startHour && hour < endHour;
      });
    } else {
      const { startHour, endHour } = parseTimeRange(schedule as string);
      return hour >= startHour && hour < endHour;
    }
  };

  const handleP1Click = (day: string, hour: number) => {
    // Check for MedsCheck time slot first (4pm-5pm)
    if (hour === 16) {
      setTaskModal({
        open: true,
        data: {
          staffMember: "Pharmacist 1",
          task: "MedsCheck",
          time: "4:00pm-5:00pm",
          details: "",
        },
      });
      return;
    }
    
    // Check for Saturday all-day Dispensing
    if (day === "Saturday") {
      setTaskModal({
        open: true,
        data: {
          staffMember: STAFF_LIST[1].role === "Pharmacist2" ? "Pharmacist 2" : "Pharmacist 1",
          task: "Dispensing",
          time: "9:00am-5:00pm",
          details: "",
        },
      });
      return;
    }
    
    // Handle other time slots
    if (hour === 9) {
      setTaskModal({
        open: true,
        data: {
          staffMember: "Pharmacist 1",
          task: "Dispensing",
          time: "9:00am-11:00am",
          details: "",
        },
      });
    } else if (hour >= 11 && hour < 13) {
      setTaskModal({
        open: true,
        data: {
          staffMember: "Pharmacist 1",
          task: "Flu Shot",
          time: "11:00am to 1:00pm",
          details: "",
        },
      });
    } else if (hour >= 14 && hour < 16) {
      setTaskModal({
        open: true,
        data: {
          staffMember: "Pharmacist 1",
          task: "Dispensing",
          time: "2:00pm to 4:00pm",
          details: "",
        },
      });
    }
  };

  return (
    <div className="flex h-screen max-w-[1200px] mx-auto bg-gray-50">
      <StaffList 
        view={view} 
        onViewChange={(value) => setView(value as "overview" | "week" | "month")} 
      />
      
      <div className="flex-1 overflow-x-auto">
        <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">
              {new Intl.DateTimeFormat('en-US', { 
                month: 'long',
                year: 'numeric'
              }).format(currentDate)}
            </h2>
            <div className="flex gap-2">
              <button 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                onClick={handlePreviousWeek}
              >
                Previous {view === 'month' ? 'Month' : 'Week'}
              </button>
              <button 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                onClick={handleNextWeek}
              >
                Next {view === 'month' ? 'Month' : 'Week'}
              </button>
            </div>
          </div>
        </div>
        
        {view === 'overview' ? (
          <div className="grid grid-cols-8 border-b bg-white">
            <div className="p-4 text-center font-medium border-r"></div>
            {DAYS_OF_WEEK.map((day, index) => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() + index);
              return (
                <div key={day} className="p-4 text-center font-medium border-r last:border-r-0">
                  <div className="text-sm">
                    <span className="font-semibold">{date.getDate()}{" "}</span>
                    <span>{day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-7 border-b bg-white">
            {DAYS_OF_WEEK.map((day, index) => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() + index);
              return (
                <div key={day} className="p-4 text-center font-medium border-r last:border-r-0">
                  <div className="text-sm">
                    {view === 'week' && (
                      <span className="font-semibold">{date.getDate()}{" "}</span>
                    )}
                    <span>{day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === 'overview' ? (
          <div className="grid grid-cols-8 auto-rows-fr">
            <div className="border-r">
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i;
                return (
                  <div key={hour} className="h-24 flex items-center justify-end pr-4 text-sm text-gray-600">
                    {hour === 0 ? "12:00am" : 
                     hour === 12 ? "12:00pm" : 
                     hour > 12 ? `${hour-12}:00pm` : 
                     `${hour}:00am`}
                  </div>
                );
              })}
            </div>
            
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="border-r">
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i;
                  const timeSlot = `${hour}:00`;
                  return (
                    <div key={`${day}-${timeSlot}`} className="h-24 border-b p-2">
                      <div className="flex flex-wrap gap-1">
                        {STAFF_LIST.map((staff) => (
                          isStaffAvailable(staff, day, hour) && (
                            <div
                              key={staff.id}
                              className={cn(
                                "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium border shadow-sm cursor-pointer",
                                staff.color
                              )}
                              onClick={() => {
                                if (staff.role === "Pharmacist1") {
                                  handleP1Click(day, hour);
                                } else if (staff.role === "Pharmacist2") {
                                  setTaskModal({
                                    open: true,
                                    data: {
                                      staffMember: "Pharmacist 2",
                                      task: "",
                                      time: "",
                                      details: "",
                                    },
                                  });
                                } else if (staff.role === "Technician") {
                                  setTaskModal({
                                    open: true,
                                    data: {
                                      staffMember: "Technician 1",
                                      task: "",
                                      time: "",
                                      details: "",
                                    },
                                  });
                                } else if (staff.role === "Assistant1") {
                                  setTaskModal({
                                    open: true,
                                    data: {
                                      staffMember: "Assistant 1",
                                      task: "",
                                      time: "",
                                      details: "",
                                    },
                                  });
                                } else if (staff.role === "Assistant2") {
                                  setTaskModal({
                                    open: true,
                                    data: {
                                      staffMember: "Assistant 2",
                                      task: "",
                                      time: "",
                                      details: "",
                                    },
                                  });
                                }
                              }}
                            >
                              {staff.role === "Pharmacist1" ? "P1" :
                               staff.role === "Pharmacist2" ? "P2" :
                               staff.role === "Technician" ? "T1" :
                               staff.role === "Assistant1" ? "A1" : "A2"}
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : view === 'week' ? (
          <div className="grid grid-rows-5">
            {STAFF_LIST.map((staff) => (
              <div key={staff.id} className="grid grid-cols-7 border-b last:border-b-0">
                {DAYS_OF_WEEK.map((day) => (
                  <div 
                    key={day} 
                    className="p-2 border-r last:border-r-0 min-h-[80px] cursor-pointer"
                    onClick={() => {
                      if (!SCHEDULE_DATA[staff.role]?.[day]) {
                        const date = new Date(currentDate);
                        date.setDate(date.getDate() + DAYS_OF_WEEK.indexOf(day));
                        setAddScheduleModal({
                          open: true,
                          data: {
                            staffMember: staff.role === "Pharmacist1" ? "Pharmacist 1" : staff.role === "Pharmacist2" ? "Pharmacist 2" : staff.role === "Assistant1" ? "Assistant 1" : staff.role,
                            date: `${day}, Dec ${date.getDate()}th`,
                            time: "2pm-4pm",
                          },
                        });
                      }
                    }}
                  >
                    {SCHEDULE_DATA[staff.role as keyof typeof SCHEDULE_DATA]?.[day as keyof typeof SCHEDULE_DATA[keyof typeof SCHEDULE_DATA]] && (
                      <TimeSlot
                        time="9:00-5:00"
                        color={staff.color}
                        staff={staff.name}
                        onClick={() => {
                          if (staff.name === "Pharmacist 1") {
                            setTaskModal({
                              open: true,
                              data: {
                                staffMember: staff.name,
                                task: "Dispensing",
                                time: "9:00am-5:00pm",
                                details: "",
                              },
                            });
                          }
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : view === 'staff' ? (
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-white">
            <div className="border-r">
              {Array.from({ length: 96 }, (_, i) => {
                const hour = Math.floor(i/4);
                const minutes = (i % 4) * 15;
                return (
                  <div key={`${hour}-${minutes}`} className="h-6 flex items-center justify-end pr-4 text-xs text-gray-600 border-b">
                    {minutes === 0 ? 
                      `${hour === 0 ? '12:00am' : hour === 12 ? '12:00pm' : hour > 12 ? `${hour-12}:00pm` : `${hour}:00am`}` :
                      `${hour === 0 ? '12' : hour === 12 ? '12' : hour > 12 ? hour-12 : hour}:${minutes}${hour >= 12 ? 'pm' : 'am'}`
                    }
                  </div>
                );
              })}
            </div>
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="border-r last:border-r-0">
                {Array.from({ length: 96 }, (_, i) => {
                  const hour = Math.floor(i/4);
                  const minutes = (i % 4) * 15;
                  return (
                    <div key={`${day}-${hour}-${minutes}`} className="h-6 border-b p-1">
                      {day !== 'Sunday' && day !== 'Tuesday' && (
                        <>
                          {((hour === 9 && minutes >= 0) || (hour === 10 && minutes <= 45)) && (
                            <div className="bg-[#F0F9FF] rounded-md text-xs h-full flex items-center justify-center">Dispensing</div>
                          )}
                          {day !== 'Saturday' && ((hour === 11 && minutes >= 0) || (hour === 12 && minutes <= 45)) && (
                            <div className="bg-[#F0F9FF] rounded-md text-xs h-full flex items-center justify-center">Flu Shot</div>
                          )}
                          {day !== 'Saturday' && ((hour === 13 && minutes === 0) || (hour === 13 && minutes === 15) || (hour === 13 && minutes === 30)) && (
                            <div className="bg-[#F0F9FF] rounded-md text-xs h-full flex items-center justify-center">Lunch</div>
                          )}
                          {day === 'Saturday' && ((hour >= 11 && hour < 16) || (hour === 16 && minutes <= 45)) && (
                            <div className="bg-[#F0F9FF] rounded-md text-xs h-full flex items-center justify-center">Dispensing</div>
                          )}
                          {(day !== 'Saturday' && ((hour === 13 && minutes === 45) || (hour === 14) || (hour === 15 && minutes <= 45))) && (
                            <div className="bg-[#F0F9FF] rounded-md text-xs h-full flex items-center justify-center">Dispensing</div>
                          )}
                          {day !== 'Saturday' && hour === 16 && minutes >= 0 && minutes <= 45 && (
                            <div className="bg-[#F0F9FF] rounded-md text-xs h-full flex items-center justify-center">MedsCheck</div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7 auto-rows-fr">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i + 4; // Start from 4
              return (
                <div key={i} className="border-r border-b p-2 min-h-[100px] relative">
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-base font-semibold text-gray-900",
                      day > 31 && "invisible"
                    )}>
                      {day}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {day <= 31 && STAFF_LIST.map((staff) => (
                        SCHEDULE_DATA[staff.role as keyof typeof SCHEDULE_DATA]?.[DAYS_OF_WEEK[i % 7] as keyof typeof SCHEDULE_DATA[keyof typeof SCHEDULE_DATA]] && (
                          <div
                            key={staff.id}
                            className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium border shadow-sm",
                              staff.color
                            )}
                          >
                            {staff.role === "Pharmacist1" ? "P1" :
                             staff.role === "Pharmacist2" ? "P2" :
                             staff.role === "Technician" ? "T1" :
                             staff.role === "Assistant1" ? "A1" : "A2"}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <button 
          className="bg-[#000080] hover:bg-[#000066] text-white px-4 py-2 rounded-md shadow-sm transition-colors"
          onClick={() => setAddStaffModal(true)}
        >
          Add Staff Member
        </button>
        {view === 'week' && (
          <button
            className="flex items-center justify-center gap-2 bg-[#000080] hover:bg-[#000066] text-white px-4 py-2 rounded-md shadow-sm transition-colors"
            onClick={() => setNotifyStaffModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Notify Staff
          </button>
        )}
      </div>
      <TaskModal
        open={taskModal.open}
        onOpenChange={(open) => setTaskModal(prev => ({ ...prev, open }))}
        data={taskModal.data}
      />
      <StaffAddModal 
        open={addStaffModal}
        onOpenChange={setAddStaffModal}
      />
      <AddScheduleModal
        open={addScheduleModal.open}
        onOpenChange={(open) => setAddScheduleModal(prev => ({ ...prev, open }))}
        data={addScheduleModal.data}
      />
      <NotifyStaffModal 
        open={notifyStaffModal}
        onOpenChange={setNotifyStaffModal}
      />
    </div>
  );
}