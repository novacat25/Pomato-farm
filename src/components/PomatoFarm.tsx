import { DB_COLLECTION, DEFAULT_MINUTE, DEFAULT_POMO_TIMER, INTERVAL_MILISECOND, POMATO_EMOJI, SECOND_UNIT } from "@/constants"
import { Text, Flex, SkeletonCircle, NumberInput, Box, Button } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { useEffect, useRef, useState } from "react"
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/utils/firebase"

type Props = {
    user: User | null | undefined
}

export const PomatoFarm = ({ user }: Props) => {
  const [goalTimer, setGoalTimer] = useState(DEFAULT_MINUTE)
  const [pomoTimer, setPomoTimer] = useState(DEFAULT_POMO_TIMER)
  const [pomatoCount, setPomatoCount] = useState<number>(0)
  const [isPomatoRunning, setIsPommatoRunning] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [isPomatoFinished, setIsPomatoFinished] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]
  // const MONTH_INDEX = today.getMonth() + 1

  const DB_DIRECTORY = `${DB_COLLECTION}/${user?.uid}/${formattedDate}`

  const onClick = () => {
    console.log(user)
    console.log(DB_DIRECTORY)
    isPomatoRunning ? handlePause() : handleStart()
  }

  //TODO: set the timer as minute, not as second(by multipying SECOND_UNIT)
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
    } else {
      console.log("Set the Pomo Timer First!")
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
    setGoalTimer(DEFAULT_MINUTE)
    setPomoTimer(DEFAULT_POMO_TIMER)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
  
  const handleFetchTodaysPomato = async () => {
    if(user) {
      const docRef = doc(db, "pomato", user.uid, "records", formattedDate)
      const todayUserPomato = (await getDoc(docRef)).data()
      
      if (todayUserPomato && todayUserPomato.pomodoroCount) {
        setPomatoCount(todayUserPomato.pomodoroCount)
      } else {
        setPomatoCount(0)
      }
    }
  }

  useEffect(() => {
    handleFetchTodaysPomato()
  }, [])

  useEffect(() => {
    if (isPomatoRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setPomoTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!)
            setIsPommatoRunning(false)
            setIsPomatoFinished(true)
            return 0
          }

          return prevTime - 1
        })
      }, INTERVAL_MILISECOND)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPomatoRunning, isPaused])

  useEffect(() => {
    if(isPomatoFinished) {
      handlePomatoCountUp()
      setIsPomatoFinished(false)
    }
  }, [isPomatoFinished])

  useEffect(() => {
    console.log(pomatoCount)
  }, [pomatoCount])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }  

  const handlePomatoCountUp = async () => {
    console.log("pomatoCount has been increased!")
    setPomatoCount((prev) => prev + 1)
    if (user) {
      try {
        const increasedPomato = pomatoCount + 1
        const docRef = doc(db, "pomato", user.uid, "records", formattedDate)

        if(docRef) {
          await updateDoc(docRef, {
            pomodoroCount: increasedPomato,
            updatedAt: serverTimestamp(),
          })
        } else {
          await setDoc(docRef, {
            pomodoroCount: increasedPomato,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const displayPomatoCount = (pomato: number): string => {
    let pomatoes = ""
    for(let i = 0; i < pomato; i++) {
      pomatoes += POMATO_EMOJI
    }

    return pomatoes
  }

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
      {!isPomatoRunning && 
      <Flex justifyContent="center" gap={4}>
        <NumberInput.Root 
          width="50%" 
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
        <Button onClick={handleReset}>
          Reset
        </Button>
      </Flex>
      }
      <Text>{formatTime(pomoTimer)}</Text>        
      <Text color="tomato" fontSize="0.9em">
        주의! 일시정지 후 목표 시간을 바꾸시면 타이머가 초기화됩니다.
      </Text>
      <Text>
        오늘 파밍한 토마토 수
      </Text>
      <Text>
        {displayPomatoCount(pomatoCount)}
      </Text>
      <Text>
        ToDo List
      </Text>
    </Flex>
  )
}
