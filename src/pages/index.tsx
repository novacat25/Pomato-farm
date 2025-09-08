import { Button, Text, Flex, Grid, GridItem, Box, SkeletonCircle, NumberInput } from "@chakra-ui/react"

export default function Home() {
  return (
    <Box padding={{ mdTo2xl: 8, base: 4 }}>
      <Flex id="user-information" justifyContent="flex-end" alignItems="center" gap={4}>
        <Text>Pomato-farmer-1</Text>
        <Button>LogOut</Button>
      </Flex>
      <Grid justifyItems="center" templateColumns={{ mdTo2xl: "65% 35%", base: "auto" }} gap="6">
        <GridItem>
          <Flex direction="column" gap={4}>
            <SkeletonCircle justifySelf="center" size={{ mdTo2xl: 96, base: 48 }} />
              <NumberInput.Root width="200px" defaultValue="15" min={15} max={45}>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
              <Text>
                오늘 파밍한 토마토 수
              </Text>
              <Text>
                ToDo List
              </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Box>
            관리 툴
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}
