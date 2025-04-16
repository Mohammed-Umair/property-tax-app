"use client";

import { useState, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  getDay,
  isSameDay,
} from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Printer,
  Download,
  Plus,
  Trash2,
  CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  addEvent,
  CalendarEvent,
  EventType,
} from "@/redux/slices/calendarSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const COLORS = {
  orange: "bg-orange-400 text-white",
  blue: "bg-blue-500 text-white",
  green: "bg-green-500 text-white",
  gray: "bg-gray-200 text-gray-800",
};

type BatchType = "PHASE 1" | "PHASE 2" | "PHASE 3" | "Orange";

interface Batch {
  id: string;
  title: string;
  date: string;
  type: BatchType;
  code: string;
}

export function BatchCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isOptionsPopoverOpen, setIsOptionsPopoverOpen] = useState(false);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "event" as EventType,
  });

  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.calendar.events);

  // Dummy batch data
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "1",
      title: "PHASE 1",
      date: "2025-04-15",
      type: "PHASE 1",
      code: "PH1(1)",
    },
    {
      id: "2",
      title: "PHASE 2",
      date: "2025-04-15",
      type: "PHASE 2",
      code: "PH2(1)",
    },
    {
      id: "3",
      title: "Orange",
      date: "2025-04-15",
      type: "Orange",
      code: "OR(1)",
    },
    {
      id: "4",
      title: "PHASE 3",
      date: "2025-04-16",
      type: "PHASE 3",
      code: "PH3(1)",
    },
    {
      id: "5",
      title: "Orange",
      date: "2025-04-17",
      type: "Orange",
      code: "OR(2)",
    },
    {
      id: "6",
      title: "PHASE 2",
      date: "2025-04-17",
      type: "PHASE 2",
      code: "PH2(2)",
    },
  ]);

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get days of current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Start with the day indices (0-6, where 0 is Sunday)
  let startingDayIndex = getDay(monthStart);

  // Create a 2D array of weeks and days
  const calendarDays = [];
  let week = Array(startingDayIndex).fill(null); // Fill with nulls for days before month start

  for (const day of monthDays) {
    week.push(day);

    if (week.length === 7) {
      calendarDays.push(week);
      week = [];
    }
  }

  // Fill the last week with nulls if needed
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    calendarDays.push(week);
  }

  const getBatchColor = (type: BatchType) => {
    switch (type) {
      case "PHASE 1":
        return COLORS.blue;
      case "PHASE 2":
        return COLORS.gray;
      case "PHASE 3":
        return COLORS.green;
      case "Orange":
        return COLORS.orange;
      default:
        return COLORS.gray;
    }
  };

  const getBatchesForDay = (date: Date) => {
    return batches.filter((batch) => isSameDay(new Date(batch.date), date));
  };

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: EventType) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleAddEvent = () => {
    if (!selectedDate) return;

    dispatch(
      addEvent({
        ...formData,
        date: selectedDate.toISOString(),
      })
    );

    setFormData({
      title: "",
      description: "",
      type: "event" as EventType,
    });
    setIsAddDialogOpen(false);
    toast.success(
      `${formData.type === "event" ? "Event" : "Reminder"} added successfully`
    );
  };

  const handleDateClick = (date: Date, cellId: string) => {
    setSelectedDate(date);
    setActiveCell(cellId);
    setIsOptionsPopoverOpen(true);
  };

  const handleAddOptionClick = (type: EventType) => {
    setFormData((prev) => ({ ...prev, type }));
    setIsOptionsPopoverOpen(false);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-4 pb-10">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Add new schedule(s):</h2>
            <Select defaultValue="April">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button className="bg-teal-500 hover:bg-teal-600">SCHEDULE</Button>
            <Button variant="outline">RESET</Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-2">
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
            <Plus className="h-4 w-4 mr-1" /> REPLENISH
          </Button>
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
            <Trash2 className="h-4 w-4 mr-1" /> DELETE SCHEDULE
          </Button>
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
            <Download className="h-4 w-4 mr-1" /> EXPORT & DOWNLOAD
          </Button>
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
            <Printer className="h-4 w-4 mr-1" /> PRINT
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            today
          </Button>
        </div>
        <h2 className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-1 bg-gray-200 rounded-md">
          <Button
            size="sm"
            variant={view === "month" ? "default" : "ghost"}
            className={cn(
              view === "month" ? "bg-gray-400" : "bg-transparent text-gray-700"
            )}
            onClick={() => setView("month")}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant={view === "week" ? "default" : "ghost"}
            className={cn(
              view === "week" ? "bg-gray-400" : "bg-transparent text-gray-700"
            )}
            onClick={() => setView("week")}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={view === "day" ? "default" : "ghost"}
            className={cn(
              view === "day" ? "bg-gray-400" : "bg-transparent text-gray-700"
            )}
            onClick={() => setView("day")}
          >
            Day
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-7 border-b">
          <div className="p-2 text-center font-medium border-r">Sun</div>
          <div className="p-2 text-center font-medium border-r">Mon</div>
          <div className="p-2 text-center font-medium border-r">Tue</div>
          <div className="p-2 text-center font-medium border-r">Wed</div>
          <div className="p-2 text-center font-medium border-r">Thu</div>
          <div className="p-2 text-center font-medium border-r">Fri</div>
          <div className="p-2 text-center font-medium">Sat</div>
        </div>

        <div>
          {calendarDays.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 border-b last:border-b-0"
            >
              {week.map((day, dayIndex) => {
                const cellId = `cell-${weekIndex}-${dayIndex}`;
                return (
                  <Popover 
                    key={cellId}
                    open={isOptionsPopoverOpen && activeCell === cellId}
                    onOpenChange={(open) => {
                      if (!open) setIsOptionsPopoverOpen(false);
                    }}
                  >
                    <PopoverTrigger asChild>
                      <div
                        className={cn(
                          "min-h-24 p-1 border-r last:border-r-0 relative",
                          !day && "bg-gray-50",
                          day && isToday(day) && "bg-blue-50"
                        )}
                        onClick={() => day && handleDateClick(day, cellId)}
                        style={{ cursor: day ? "pointer" : "default" }}
                      >
                        {day && (
                          <>
                            <div className="absolute top-1 right-1 text-xs text-gray-500">
                              {format(day, "d")}
                            </div>
                            <div className="pt-4 space-y-1">
                              {getBatchesForDay(day).map((batch) => (
                                <div
                                  key={batch.id}
                                  className={cn(
                                    "text-xs p-1 rounded-sm mb-1",
                                    getBatchColor(batch.type)
                                  )}
                                >
                                  {batch.title} ({batch.code})
                                </div>
                              ))}

                              {getEventsForDay(day).map((event) => (
                                <div
                                  key={event.id}
                                  className={cn(
                                    "text-xs p-1 rounded-sm mb-1",
                                    event.type === "event"
                                      ? "bg-blue-200 text-blue-800"
                                      : "bg-green-200 text-green-800"
                                  )}
                                >
                                  {event.title} ({event.type})
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-56" align="start" sideOffset={5}>
                      <div className="space-y-2">
                        <div className="font-medium">
                          {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                        </div>
                        <div className="text-sm text-gray-500">Choose an option:</div>
                        <div className="grid gap-2">
                          <Button
                            size="sm"
                            className="justify-start"
                            onClick={() => handleAddOptionClick("event")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Add Event
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="justify-start"
                            onClick={() => handleAddOptionClick("reminder")}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Reminder
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Add Event/Reminder Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {formData.type === "event" ? "Add Event" : "Add Reminder"}
            </DialogTitle>
            <DialogDescription>
              {selectedDate && `For ${format(selectedDate, "MMMM d, yyyy")}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <RadioGroup
                value={formData.type}
                onValueChange={handleTypeChange as (value: string) => void}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="event" id="event" />
                  <Label htmlFor="event">Event</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reminder" id="reminder" />
                  <Label htmlFor="reminder">Reminder</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

