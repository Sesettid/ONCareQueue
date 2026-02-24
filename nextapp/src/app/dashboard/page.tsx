"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type QueueEntry = {
  id: string
  patientName: string
  patientPhone: string | null
  status: string
  checkInTime: string
  estimatedWaitMinutes: number
  actualWaitMinutes: number
}

type Clinic = {
  id: string
  name: string
  address: string | null
}

export default function Dashboard() {
  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [queue, setQueue] = useState<QueueEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [checkingIn, setCheckingIn] = useState(false)
  const [patientName, setPatientName] = useState("")
  const [patientPhone, setPatientPhone] = useState("")

  const fetchQueue = useCallback(async () => {
    if (!clinic) return
    try {
      const res = await fetch(`/api/clinics/${clinic.id}/queue`)
      if (res.ok) {
        const data = await res.json()
        setQueue(data)
      }
    } catch (error) {
      console.error("Failed to fetch queue:", error)
    }
  }, [clinic])

  const fetchClinic = async () => {
    try {
      const res = await fetch("/api/clinics")
      if (res.ok) {
        const data = await res.json()
        if (data.length > 0) {
          setClinic(data[0])
        }
      }
    } catch (error) {
      console.error("Failed to fetch clinic:", error)
    }
  }

  useEffect(() => {
    fetchClinic()
  }, [])

  useEffect(() => {
    if (clinic) {
      fetchQueue()
      const interval = setInterval(fetchQueue, 5000)
      return () => clearInterval(interval)
    }
  }, [clinic, fetchQueue])

  useEffect(() => {
    if (clinic && queue.length === 0) {
      setLoading(false)
    } else if (queue.length > 0) {
      setLoading(false)
    }
  }, [clinic, queue])

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clinic || !patientName.trim()) return

    setCheckingIn(true)
    try {
      const res = await fetch("/api/queue-entry/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicId: clinic.id,
          patientName: patientName.trim(),
          patientPhone: patientPhone.trim() || null
        })
      })

      if (res.ok) {
        setPatientName("")
        setPatientPhone("")
        fetchQueue()
      }
    } catch (error) {
      console.error("Failed to check in:", error)
    }
    setCheckingIn(false)
  }

  const updateStatus = async (entryId: string, status: string) => {
    try {
      const res = await fetch(`/api/queue-entry/${entryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })
      if (res.ok) fetchQueue()
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const removeEntry = async (entryId: string) => {
    try {
      const res = await fetch(`/api/queue-entry/${entryId}`, { method: "DELETE" })
      if (res.ok) fetchQueue()
    } catch (error) {
      console.error("Failed to remove entry:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-teal-700 text-xl">Loading queue...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {clinic?.name || "Healthcare Queue"}
          </h1>
          {clinic?.address && (
            <p className="text-slate-500">{clinic.address}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Check In Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="416-555-0123"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={checkingIn}
                  className="w-full bg-teal-700 hover:bg-teal-800"
                >
                  {checkingIn ? "Checking in..." : "Check In"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Queue Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-700">
                    {queue.filter(e => e.status === "waiting").length}
                  </div>
                  <div className="text-sm text-emerald-600">Waiting</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-amber-700">
                    {queue.filter(e => e.status === "ready").length}
                  </div>
                  <div className="text-sm text-amber-600">Ready</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-700">
                    {queue.length}
                  </div>
                  <div className="text-sm text-blue-600">Total in Queue</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-700">
                    ~{queue.length * 6}
                  </div>
                  <div className="text-sm text-purple-600">Est. Wait (min)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current Queue</CardTitle>
          </CardHeader>
          <CardContent>
            {queue.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                No patients in queue. Check in a patient to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {queue.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      entry.status === "ready"
                        ? "bg-emerald-50 border border-emerald-200"
                        : entry.status === "in-progress"
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-slate-50"
                    }`}
                  >
                    <div className="text-2xl font-bold text-teal-700 w-8">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">
                        {entry.patientName}
                      </div>
                      <div className="text-sm text-slate-500">
                        {entry.status === "ready"
                          ? "Ready for appointment"
                          : entry.status === "in-progress"
                          ? "Currently being seen"
                          : `Wait: ~${entry.actualWaitMinutes} min`}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        entry.status === "ready"
                          ? "bg-emerald-100 text-emerald-700"
                          : entry.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {entry.status === "ready"
                        ? "Ready ✓"
                        : entry.status === "in-progress"
                        ? "In Progress"
                        : "Waiting"}
                    </span>
                    <div className="flex gap-2">
                      {entry.status === "waiting" && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(entry.id, "ready")}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          Call
                        </Button>
                      )}
                      {entry.status === "ready" && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(entry.id, "in-progress")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Start
                        </Button>
                      )}
                      {entry.status === "in-progress" && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(entry.id, "completed")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Done
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeEntry(entry.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
