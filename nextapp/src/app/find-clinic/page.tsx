"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Clinic = { id: string; name: string; address: string | null }

export default function FindClinic() {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clinics')
      .then(res => res.json())
      .then(data => {
        setClinics(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full animate-fade-in-up">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Find a Clinic</h1>
        {loading ? (
          <div className="text-center text-teal-700 py-12">Loading clinics...</div>
        ) : clinics.length === 0 ? (
          <p className="text-slate-500 text-center py-12">No clinics available yet.</p>
        ) : (
          <div className="grid gap-4">
            {clinics.map(c => (
              <Card key={c.id} className="hover:border-teal-500 hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{c.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 mb-4">{c.address || "Address not provided"}</p>
                  <Link href={`/clinic/${c.id}`} className="inline-flex items-center justify-center bg-teal-50 text-teal-700 px-4 py-2 rounded-lg font-medium hover:bg-teal-100 transition-colors">
                    View Live Queue &rarr;
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link href="/" className="text-slate-500 hover:text-slate-800 font-medium transition-colors">Return Home</Link>
        </div>
      </div>
    </div>
  )
}
