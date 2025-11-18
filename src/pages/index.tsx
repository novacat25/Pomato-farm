"use client"

import { auth } from "../utils/firebase"
import { PomatoFarm } from "@/components/PomatoFarm"
import { PomatoManage } from "@/components/PomatoManage"
import { Grid, GridItem, Box } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "firebase/auth"
import { UserInfo } from "@/components/UserInfo"
import { LoadingDisplay } from "@/components/Loading"


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

  return (
    <Box 
      marginX={{ mdTo2xl: 16, base: 4 }}
      marginY={{ mdTo2xl: 8, base: 4 }}
    >
      <UserInfo user={loggedUser} />
      <Grid 
        paddingX={4}
        paddingY={8}
        border="1px solid black"
        templateColumns={{ mdTo2xl: "repeat(3, 1fr)", base: "auto" }} 
        gap="4"
      >
        <GridItem colSpan={{ mdTo2xl: 2 }}>
          <PomatoFarm user={loggedUser} />
        </GridItem>
        <GridItem colSpan={{ mdTo2xl: 1 }}>
          <PomatoManage />
        </GridItem>
      </Grid>
    </Box>
  )
}
