import React from 'react'
import { Box, Tabs } from "@chakra-ui/react"
import { LuCalendarDays, LuUser } from "react-icons/lu"

export const PomatoManage = () => {
  return (
    <Box>
      <Tabs.Root defaultValue="daily">
        <Tabs.List>
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
