"use client"
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

type BatchType = 'PHASE 1' | 'PHASE 2' | 'PHASE 3' | 'Orange';

interface Batch {
  id: string;
  title: string;
  date: string;
  type: BatchType;
  code: string;
}

export default function Summary() {
  // Dummy batch data
  const [batches] = useState<Batch[]>([
    { id: '1', title: 'PHASE 1', date: '2025-04-15', type: 'PHASE 1', code: 'PH1(1)' },
    { id: '2', title: 'PHASE 2', date: '2025-04-15', type: 'PHASE 2', code: 'PH2(1)' },
    { id: '3', title: 'Orange', date: '2025-04-15', type: 'Orange', code: 'OR(1)' },
    { id: '4', title: 'PHASE 3', date: '2025-04-16', type: 'PHASE 3', code: 'PH3(1)' },
    { id: '5', title: 'Orange', date: '2025-04-17', type: 'Orange', code: 'OR(2)' },
    { id: '6', title: 'PHASE 2', date: '2025-04-17', type: 'PHASE 2', code: 'PH2(2)' },
  ]);
  
  const events = useAppSelector((state) => state.calendar.events);
  
  const batchesByType = batches.reduce((acc, batch) => {
    if (!acc[batch.type]) {
      acc[batch.type] = [];
    }
    acc[batch.type].push(batch);
    return acc;
  }, {} as Record<BatchType, Batch[]>);
  
  const totalBatches = batches.length;
  const totalEvents = events.length;
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Summary</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-blue-500 text-white rounded-lg">
          <h2 className="text-2xl font-bold">PHASE 1</h2>
          <p className="text-4xl font-bold mt-2">{batchesByType['PHASE 1']?.length || 0}</p>
          <p className="text-sm mt-4">Scheduled Batches</p>
        </div>
        
        <div className="p-6 bg-gray-200 text-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold">PHASE 2</h2>
          <p className="text-4xl font-bold mt-2">{batchesByType['PHASE 2']?.length || 0}</p>
          <p className="text-sm mt-4">Scheduled Batches</p>
        </div>
        
        <div className="p-6 bg-green-500 text-white rounded-lg">
          <h2 className="text-2xl font-bold">PHASE 3</h2>
          <p className="text-4xl font-bold mt-2">{batchesByType['PHASE 3']?.length || 0}</p>
          <p className="text-sm mt-4">Scheduled Batches</p>
        </div>
        
        <div className="p-6 bg-orange-400 text-white rounded-lg">
          <h2 className="text-2xl font-bold">Orange</h2>
          <p className="text-4xl font-bold mt-2">{batchesByType['Orange']?.length || 0}</p>
          <p className="text-sm mt-4">Scheduled Batches</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Batches</h2>
          <div className="space-y-2">
            {batches.slice(0, 5).map(batch => (
              <div key={batch.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <div className="font-medium">{batch.title} ({batch.code})</div>
                  <div className="text-sm text-gray-500">{format(new Date(batch.date), 'MMM d, yyyy')}</div>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Calendar Events</h2>
          <div className="space-y-2">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(event.date), 'MMM d, yyyy')} · {event.type}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  event.type === 'event' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {event.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
