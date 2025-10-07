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
  const [isPomatoRunning, setIsPommatoRunning] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const onClick = () => {
    console.log(user)
    isPomatoRunning ? handlePause() : handleStart()
  }

  const runTimer = () => {
    if (isPomatoRunning) {
      if(pomoTimer <= DEFAULT_POMO_TIMER) {
        let innerTimer = Number(goalTimer)
        setPomoTimer(innerTimer)
      }
    }
  }

  const handleSetGoalTimer = () => {
    setPomoTimer(Number(goalTimer))
    setIsPommatoRunning(false)
    setIsPaused(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
  
  const handleStart = () => {
    if (pomoTimer > 0) {
      setIsPommatoRunning(true)
      setIsPaused(false)
    }
  }

  const handlePause = () => {
    if (isPomatoRunning) {
      setIsPaused(true)
      setIsPommatoRunning(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const handleReset = () => {
    setIsPommatoRunning(false)
    setIsPaused(false)
    setPomoTimer(typeof goalTimer === "number" ? goalTimer : 0)
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const onResetClick = () => {
    setIsPommatoRunning(false)
    setIsPaused(false)
    setGoalTimer(DEFAULT_MINUTE)
    setPomoTimer(DEFAULT_POMO_TIMER)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  useEffect(() => {
    if (isPomatoRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setPomoTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!)
            setIsPommatoRunning(false)
            return 0
          }

          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPomatoRunning, isPaused])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
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
        <Button onClick={handleSetGoalTimer}>
          Set
        </Button>
        <Button onClick={onResetClick}>
          Reset
        </Button>
      </Flex>
      <Text>{formatTime(pomoTimer)}</Text>        
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
