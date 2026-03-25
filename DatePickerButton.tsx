// DatePickerButton.tsx
// UI component — a button that opens a calendar popover to pick a date

import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface DatePickerButtonProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({ selectedDate, setSelectedDate }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
        <CalendarIcon className="h-4 w-4 mr-2" />
        {format(selectedDate, 'PPP')}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && setSelectedDate(date)}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

export default DatePickerButton;
