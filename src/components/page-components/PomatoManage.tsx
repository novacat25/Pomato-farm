import React from 'react'
import { Text, Box, Tabs } from "@chakra-ui/react"
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
          <Text fontWeight={600}>
            🚜 오늘 수확한 토마토 수
          </Text>
        </Tabs.Content>
        <Tabs.Content padding={2} value="monthly">
          <Text fontWeight={600}>
            🚜 이번 달 수확한 토마토 수
          </Text>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
