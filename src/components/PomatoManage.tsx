import React from 'react'
import { Box, Tabs } from "@chakra-ui/react"
import { LuCalendarDays, LuUser } from "react-icons/lu"
import { colors } from '@/constants/palette'

export const PomatoManage = () => {
  return (
    <Box 
      height="100%"
      padding={4}
      border={`0.75px solid ${colors.background.wood}`}
      borderRadius={8}      
    >
      <Tabs.Root
        defaultValue="daily"
      >
        <Tabs.List bg="bg.muted" rounded="l3" p="1">
          <Tabs.Trigger value="daily">
            <LuUser />
            Daily
          </Tabs.Trigger>
          <Tabs.Trigger value="monthly">
            <LuCalendarDays />
            Monthly
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="daily">
          일일 수확 관리 (개발 예정)
        </Tabs.Content>
        <Tabs.Content value="monthly">
          달별 관리 (개발 예정)
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
