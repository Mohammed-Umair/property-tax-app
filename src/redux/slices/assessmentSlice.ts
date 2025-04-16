// redux/slices/assessmentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Assessment {
  id: string;
  taxYear: string;
  company: string;
  state: string;
  assessor: string;
  accountNumber: string;
  appealedDate: string;
  selected: boolean;
}

interface AssessmentState {
  items: Assessment[];
}

const initialState: AssessmentState = {
  items: [],
};

export const assessmentSlice = createSlice({
  name: 'assessments',
  initialState,
  reducers: {
    addAssessment: (state, action: PayloadAction<Omit<Assessment, 'id' | 'selected'>>) => {
      state.items.push({
        ...action.payload,
        id: uuidv4(),
        selected: false,
      });
    },
    updateAssessment: (state, action: PayloadAction<Assessment>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteAssessment: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleAssessmentSelection: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.selected = !item.selected;
      }
    },
    selectAllAssessments: (state, action: PayloadAction<boolean>) => {
      state.items.forEach(item => {
        item.selected = action.payload;
      });
    },
  },
});

export const {
  addAssessment,
  updateAssessment,
  deleteAssessment,
  toggleAssessmentSelection,
  selectAllAssessments,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
