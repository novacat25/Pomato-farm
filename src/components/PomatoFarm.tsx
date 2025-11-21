import { DEFAULT_MINUTE, DEFAULT_POMO_TIMER, INTERVAL_MILISECOND, message, POMATO_EMOJI, SECOND_UNIT } from "@/constants"
import { Text, Flex, NumberInput, Box, Button, createToaster, Image } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { useEffect, useRef, useState } from "react"
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/utils/firebase"
import { colors } from "@/constants/palette"
import { toaster, Toaster } from "@/components/ui/toaster"

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

  const onClick = () => {
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
      toaster.create({
        description: message.valiError.SET_POMOTIME_FIRST,
        type: "error",
        closable: true,
      })
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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }  

  const handlePomatoCountUp = async () => {
    setPomatoCount((prev) => prev + 1)
    if (user) {
      try {
        const increasedPomato = pomatoCount + 1
        const docRef = doc(db, "pomato", user.uid, "records", formattedDate)
        const checkDocRef = (await getDoc(docRef)).data()

        checkDocRef ?
        await updateDoc(docRef, {
          pomodoroCount: increasedPomato,
          updatedAt: serverTimestamp(),
        })
        :
        await setDoc(docRef, {
          pomodoroCount: increasedPomato,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        
        toaster.create({
          description: message.success.POMO_FINISHED,
          type: "success",
        })
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
    <Box 
      gap={4} 
      padding={4}
      border={`0.75px solid ${colors.border.wood}`}
      backgroundColor={colors.background.main}
      borderRadius={8}
    >
      <Toaster />
      <Box
        id="pomo-timer"
        cursor="pointer"
        display="flex"
        justifySelf="center"
        justifyContent="center"
        borderRadius="50%"
        onClick={onClick}
        position="relative"
        marginBottom={8}
      >
        <Text
          fontSize={{ mdTo2xl: 48, base: 24 }}
          position="absolute"
          fontWeight={600}
          top={{ mdTo2xl: "50%", base: "55%" }} 
          zIndex={2}
          color={colors.text.lightWhite}
        >
          {formatTime(pomoTimer)}
        </Text>
        <Image borderRadius="50%" src="pomato.png" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {!isPomatoRunning && 
        <Flex 
          gap={4} 
        >
          <NumberInput.Root 
            value={goalTimer}
            onValueChange={(e) => {
              setGoalTimer(e.value)
              setPomoTimer(DEFAULT_POMO_TIMER)
            }}
            disabled={isPomatoRunning}
            backgroundColor={colors.background.white}
            min={15} 
            max={45}
            allowMouseWheel
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
          <Button backgroundColor={colors.button.primary} onClick={handleSetGoalTimer}>
            Set
          </Button>
          <Button backgroundColor={colors.button.secondary} onClick={handleReset}>
            Reset
          </Button>
        </Flex>
        }
        <Text 
          color={colors.primary.main} 
          fontSize="0.9em"
          textAlign="center"
        >
          주의! 일시정지 후 목표 시간을 바꾸시면<br className="only-pc" /> 타이머가 초기화됩니다.
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        textAlign="left"
      >
        <Text>
          오늘 파밍한 토마토 수
        </Text>
        <Text>
          {displayPomatoCount(pomatoCount)}
        </Text>
        <Text>
          ToDo List
        </Text>
      </Box>
    </Box>
  )
}
