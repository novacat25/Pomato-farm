"use client"

import React, { useEffect, useState } from "react"
import { auth } from "../utils/firebase"
import { useRouter } from "next/navigation"
import { LoadingDisplay } from "./Loading"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login")
            } else {
                setIsLoading(false)
            }
        })

        return () => unsubscribe()
    }, [router])

    if (isLoading) {
        return <LoadingDisplay />
    }

  return children
}
