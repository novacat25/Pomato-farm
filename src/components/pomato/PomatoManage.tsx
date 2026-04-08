import React from 'react'
import { Box, Tabs } from "@chakra-ui/react"
import { LuCalendarDays, LuUser } from "react-icons/lu"
import { colors } from '@/constants/palette'

export const PomatoManage = () => {
  return (
    <Box 
      height="100%"
      borderRadius={8}      
    >
      <Tabs.Root
        defaultValue="daily"
        backgroundColor={colors.background.main}
        height="100%"
        borderRadius={8}
      >
        <Tabs.List 
          bg={colors.background.wood}         
          borderRadius={8}
        >
          <Tabs.Trigger value="daily">
            <LuUser />
            Daily
          </Tabs.Trigger>
          <Tabs.Trigger value="monthly">
            <LuCalendarDays />
            Monthly
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content padding={2} value="daily">
          일일 수확 관리 (개발 예정)
        </Tabs.Content>
        <Tabs.Content padding={2} value="monthly">
          달별 관리 (개발 예정)
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
