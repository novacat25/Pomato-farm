"use client"

import { auth } from "../utils/firebase"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "firebase/auth"
import { LoadingDisplay } from "@/components/Loading"
import { Pomato } from "@/components/page-components/Pomato"


export default function Home() {
  const router = useRouter()
  const [loggedUser, setLoggedUser] = useState<User | null>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login")
      } else {
        setIsLoading(false)
        setLoggedUser(user)
      }
    })

    return () => unsubscribe()
    }, [router])

  if (isLoading) {
    return <LoadingDisplay />
  }

  return <Pomato user={loggedUser} />
}
