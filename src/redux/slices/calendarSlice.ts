// redux/slices/calendarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type EventType = 'event' | 'reminder';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: EventType;
}

interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<CalendarEvent, 'id'>>) => {
      state.events.push({
        ...action.payload,
        id: uuidv4(),
      });
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
