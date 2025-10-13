"use client"

import { auth } from "../utils/firebase"
import { PomatoFarm } from "@/components/PomatoFarm"
import { PomatoManage } from "@/components/PomatoManage"
import { Grid, GridItem, Box } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LOGOUT_CONFIRM_MESSAGE } from "@/constants"
import { User } from "firebase/auth"
import { UserInfo } from "@/components/UserInfo"


export default function Home() {
  const router = useRouter()
  const [loggedUser, setLoggedUser] = useState<User | null>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login")
      } else {
        console.log(user)
        setIsLoading(false)
        setLoggedUser(user)
      }
    })

    return () => unsubscribe()
    }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const onClickLogout = async () => {
    const ok = confirm(LOGOUT_CONFIRM_MESSAGE)
    
    if(ok) {
      try {
        await auth.signOut()
        router.push("/login")
      } catch (err) {
        console.error(err)
      }
    }
  }



  return (
    <Box padding={{ mdTo2xl: 8, base: 4 }}>
      <UserInfo user={loggedUser} onClickLogout={onClickLogout} />
      <Grid justifyItems="center" templateColumns={{ mdTo2xl: "65% 35%", base: "auto" }} gap="6">
        <GridItem>
          <PomatoFarm user={loggedUser} />
        </GridItem>
        <GridItem>
          <PomatoManage />
        </GridItem>
      </Grid>
    </Box>
  )
}
