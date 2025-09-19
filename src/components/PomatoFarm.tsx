import { DEFAULT_MINUTE, DEFAULT_POMO_TIMER, INTERVAL_MILISECOND, SECOND_UNIT } from "@/constants"
import { Text, Flex, SkeletonCircle, NumberInput, Box, Button } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { useEffect, useRef, useState } from "react"

type Props = {
    user: User | null | undefined
}

export const PomatoFarm = ({ user }: Props) => {
  const [goalTimer, setGoalTimer] = useState(DEFAULT_MINUTE)
  const [pomoTimer, setPomoTimer] = useState(DEFAULT_POMO_TIMER)
  const [isPomatoRunning, setIsPommatoRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const onClick = () => {
    console.log(user)
    toggleIsPomatoRunning()
  }

  const runTimer = () => {
    if (isPomatoRunning) {
      if(pomoTimer <= DEFAULT_POMO_TIMER) {
        let innerTimer = Number(goalTimer)
        setPomoTimer(innerTimer)
      }
    }
  }

  const onResetClick = () => {
    setIsPommatoRunning(false)
    setGoalTimer(DEFAULT_MINUTE)
    setPomoTimer(DEFAULT_POMO_TIMER)
  }

  useEffect(() => {
    if (isPomatoRunning) {
      runTimer()
    }
  }, [isPomatoRunning]) 

  useEffect(() => {
    if (isPomatoRunning) {
      intervalRef.current = window.setInterval(() => {
        setPomoTimer(prevTime => prevTime - 1)
      }, INTERVAL_MILISECOND)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPomatoRunning])

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
          onValueChange={(e) => {
            setGoalTimer(e.value)
            setPomoTimer(DEFAULT_POMO_TIMER)
          }}
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
      <Text>{pomoTimer}</Text>        
      <Text color="tomato" fontSize="0.9em">
        주의! 일시정지 후 목표 시간을 바꾸시면 타이머가 초기화됩니다.
      </Text>
      <Text>
        오늘 파밍한 토마토 수
      </Text>
      <Text>
        ToDo List
      </Text>
    </Flex>
  )
}
