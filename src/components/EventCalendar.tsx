"use client"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addEvent, CalendarEvent, EventType } from '@/redux/slices/calendarSlice';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export function EventCalendar() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state: { calendar: { events: any; }; }) => state.calendar.events);
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isOptionsPopoverOpen, setIsOptionsPopoverOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'event' as EventType,
  });

  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      type: 'event' as EventType,
    });
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
    if (!date) return;
    
    dispatch(
      addEvent({
        ...formData,
        date: date.toISOString(),
      })
    );
    
    resetFormData();
    setIsAddDialogOpen(false);
    toast.success(
      `${formData.type === 'event' ? 'Event' : 'Reminder'} added successfully`
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    setIsOptionsPopoverOpen(true);
  };

  const handleAddOptionClick = (type: EventType) => {
    setFormData((prev) => ({ ...prev, type }));
    setIsOptionsPopoverOpen(false);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold">Calendar</div>
      
      <div className="border rounded-md p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="mx-auto pointer-events-auto"
          modifiers={{
            event: events
              .filter((event: { type: string; }) => event.type === 'event')
              .map((event: { date: string | number | Date; }) => new Date(event.date)),
            reminder: events
              .filter((event: { type: string; }) => event.type === 'reminder')
              .map((event: { date: string | number | Date; }) => new Date(event.date)),
          }}
          modifiersClassNames={{
            event: "bg-blue-100 text-blue-700 font-bold rounded-md",
            reminder: "bg-green-100 text-green-700 font-bold rounded-md",
          }}
        />

        {events.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="font-medium">Upcoming Events & Reminders</div>
            <div className="divide-y">
              {events.slice(0, 5).map((event: { id: Key | null | undefined; type: string; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | number | Date; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <div key={event.id} className="py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        event.type === 'event' ? 'bg-blue-600' : 'bg-green-600'
                      )}
                    />
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(event.date), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
                      {event.type === 'event' ? 'Event' : 'Reminder'}
                    </div>
                  </div>
                  {event.description && (
                    <div className="ml-5 text-sm text-gray-600 mt-1">
                      {event.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Event/Reminder Options Popover */}
      <Popover open={isOptionsPopoverOpen} onOpenChange={setIsOptionsPopoverOpen}>
        <PopoverTrigger asChild>
          <div />
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="space-y-2">
            <div className="font-medium">
              {date && format(date, 'MMMM d, yyyy')}
            </div>
            <div className="text-sm text-gray-500">Choose an option:</div>
            <div className="grid gap-2">
              <Button 
                size="sm" 
                className="justify-start"
                onClick={() => handleAddOptionClick('event')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Add Event
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="justify-start"
                onClick={() => handleAddOptionClick('reminder')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Add Event/Reminder Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {formData.type === 'event' ? 'Add Event' : 'Add Reminder'}
            </DialogTitle>
            <DialogDescription>
              {date && `For ${format(date, 'MMMM d, yyyy')}`}
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
