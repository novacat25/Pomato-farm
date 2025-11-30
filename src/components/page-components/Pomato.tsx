"use client"

import { PomatoFarm } from "@/components/pomato/PomatoFarm"
import { PomatoManage } from "@/components/pomato/PomatoManage"
import { Grid, GridItem, Box, Heading } from "@chakra-ui/react"
import React from "react"
import { User } from "firebase/auth"
import { UserInfo } from "@/components/page-components/UserInfo"
import { colors } from "@/constants/palette"

type Props = {
  user: User | null | undefined
}
export const Pomato = ({ user }: Props) => {
  return (
    <Box
      marginX={{ mdTo2xl: 8, base: 0 }}
      paddingX={{ mdTo2xl: 16, base: 4 }}
      paddingY={{ mdTo2xl: 8, base: 4 }}
    >
      <UserInfo user={user} />
      <Box
        paddingX={{ mdTo2xl: 2, base: 0 }}
        paddingY={8}
        border={`1px solid ${colors.background.lightWood}`}
        backgroundColor={colors.background.lightWood}
        borderRadius={16}
      >
        <Heading textAlign="center" fontSize={42} color={colors.primary.main}>
          🌱 Pomato Farm
        </Heading>
        <Grid
          paddingX={4}
          paddingY={8}
          templateColumns={{ mdTo2xl: "repeat(3, 1fr)", base: "auto" }}
          gap="4"
        >
          <GridItem colSpan={{ mdTo2xl: 2 }}>
            <PomatoFarm user={user} />
          </GridItem>
          <GridItem colSpan={{ mdTo2xl: 1 }}>
            <PomatoManage />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}
