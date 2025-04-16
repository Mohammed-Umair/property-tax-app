import { AssessmentTable } from '@/components/AssessmentTable'
import { EventCalendar } from '@/components/EventCalendar'
import React from 'react'

type Props = {}

export default function DahboardPage() {
    return(
        <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="w-full">
        <div>
          <AssessmentTable />
        </div>
      </div>
    </div>
    )
}