"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from 'next/navigation'

type QueueEntry = {
  id: string
  patientName: string
  status: string
  actualWaitMinutes: number
}

export default function PublicQueueViewer() {
  const params = useParams()
  const clinicId = params.id as string
  const [queue, setQueue] = useState<QueueEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!clinicId) return;
    
    // Initial fetch
    fetch(`/api/clinics/${clinicId}/queue`)
      .then(res => res.json())
      .then(data => {
        setQueue(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // Set up polling for live updates
    const interval = setInterval(() => {
      fetch(`/api/clinics/${clinicId}/queue`)
        .then(res => res.json())
        .then(data => setQueue(data))
    }, 5000);
      
    return () => clearInterval(interval)
  }, [clinicId])

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900">Live Public Queue Board</h1>
          <Link href="/find-clinic" className="text-teal-700 hover:underline font-medium">&larr; Back to Clinics</Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-teal-700 font-medium">Connecting to live queue...</div>
        ) : queue.length === 0 ? (
          <Card className="border-dashed border-2 border-slate-200 shadow-none">
            <CardContent className="py-16 text-center text-slate-500">
              There are no patients currently waiting.
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md border-0 overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-slate-700 text-sm uppercase tracking-wider font-bold">Currently Waiting</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {queue.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-4 p-5 transition-colors ${entry.status === 'ready' ? 'bg-emerald-50/50' : entry.status === 'in-progress' ? 'bg-blue-50/50' : 'bg-white hover:bg-slate-50/50'}`}>
                    <div className="text-2xl font-black text-slate-200 w-12 text-right">#{index + 1}</div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-lg tracking-tight">{entry.patientName}</div>
                      <div className="text-sm font-medium mt-1">
                        {entry.status === 'ready' ? (
                          <span className="text-emerald-600">Please proceed to front desk</span>
                        ) : entry.status === 'in-progress' ? (
                          <span className="text-blue-600">Currently being seen by provider</span>
                        ) : (
                          <span className="text-slate-500">
                            Est. Wait: ~{queue.filter(e => e.status === 'waiting' || e.status === 'in-progress').findIndex(e => e.id === entry.id) * 6} min
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${entry.status === 'ready' ? 'bg-emerald-100 text-emerald-800' : entry.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                      {entry.status === 'ready' ? 'Ready ✓' : entry.status === 'in-progress' ? 'In Progress' : 'Waiting'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
