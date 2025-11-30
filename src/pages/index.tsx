"use client"

import { auth } from "../utils/firebase"
import { PomatoFarm } from "@/components/pomato/PomatoFarm"
import { PomatoManage } from "@/components/pomato/PomatoManage"
import { Grid, GridItem, Box, Heading } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "firebase/auth"
import { UserInfo } from "@/components/page-components/UserInfo"
import { LoadingDisplay } from "@/components/Loading"
import { colors } from "@/constants/palette"


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
      marginX={{ mdTo2xl: 8, base: 0 }}
      paddingX={{ mdTo2xl: 16, base: 4 }}
      paddingY={{ mdTo2xl: 8, base: 4 }}
    >
      <UserInfo user={loggedUser} />
      <Box
        paddingX={{ mdTo2xl: 2, base: 0 }}
        paddingY={8}
        border={`1px solid ${colors.background.lightWood}`}
        backgroundColor={colors.background.lightWood}
        borderRadius={16}
      >
        <Heading
          textAlign="center"
          fontSize={42}
          color={colors.primary.main}
        >
          🌱 Pomato Farm
        </Heading>
      <Grid 
        paddingX={4}
        paddingY={8}
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
    </Box>
  )
}
