"use client"

import { auth } from "../utils/firebase"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "firebase/auth"
import { LoadingDisplay } from "@/components/Loading"
import { EditUserProfile } from "@/components/page-components/EditUserProfile"

export default function EditProfile () {
  const router = useRouter()
  const [loggedUser, setLoggedUser] = useState<User | null>()
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login")
      } else {
        setInitialLoading(false)
        setLoggedUser(user)
      }
    })

    return () => unsubscribe()
    }, [router])

  if (initialLoading) {
    return <LoadingDisplay />
  }

  return loggedUser && <EditUserProfile user={loggedUser} initialLoading={initialLoading} />
}
