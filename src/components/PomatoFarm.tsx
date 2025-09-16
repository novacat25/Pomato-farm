import { DEFAULT_MINUTE, DEFAULT_POMO_TIMER, SECOND_UNIT } from "@/constants"
import { Text, Flex, SkeletonCircle, NumberInput, Box, Button } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { useState } from "react"

type Props = {
    user: User | null | undefined
}

export const PomatoFarm = ({ user }: Props) => {
  const [goalTimer, setGoalTimer] = useState(DEFAULT_MINUTE)
  const [pomoTimer, setPomoTimer] = useState(DEFAULT_POMO_TIMER)
  const [isPomatoRunning, setIsPommatoRunning] = useState(false)

  const onClick = () => {
    console.log(user)
    toggleIsPomatoRunning()
    runTimer()
  }

  const runTimer = () => {
    setPomoTimer(Number(goalTimer) * SECOND_UNIT)
    console.log(pomoTimer)
  }

  const onResetClick = () => {
    setIsPommatoRunning(false)
    setGoalTimer(DEFAULT_MINUTE)
    setPomoTimer(DEFAULT_POMO_TIMER)
  }

  const toggleIsPomatoRunning = () => setIsPommatoRunning(prev => !prev)
  

  return (
    <Flex direction="column" gap={4}>
      <Box
        cursor="pointer"
        borderRadius="50%"
        onClick={onClick}
      >
        <SkeletonCircle 
          justifySelf="center" 
          size={{ mdTo2xl: 96, base: 48 }} 
        />
      </Box>
      <Flex gap={4}>
        <NumberInput.Root 
          width="200px" 
          value={goalTimer}
          onValueChange={(e) => setGoalTimer(e.value)}
          disabled={isPomatoRunning}
          min={15} 
          max={45}
          allowMouseWheel
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
        <Button onClick={onResetClick}>
          Reset
        </Button>
      </Flex>  
      <Text>
        오늘 파밍한 토마토 수
      </Text>
      <Text>
        ToDo List
      </Text>
    </Flex>
  )
}
