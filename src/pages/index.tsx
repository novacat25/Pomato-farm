import { PomatoFarm } from "@/components/PomatoFarm"
import { PomatoManage } from "@/components/PomatoManage"
import { Button, Text, Flex, Grid, GridItem, Box } from "@chakra-ui/react"

export default function Home() {
  return (
    <Box padding={{ mdTo2xl: 8, base: 4 }}>
      <Flex id="user-information" justifyContent="flex-end" alignItems="center" gap={4}>
        <Text>Pomato-farmer-1</Text>
        <Button>LogOut</Button>
      </Flex>
      <Grid justifyItems="center" templateColumns={{ mdTo2xl: "65% 35%", base: "auto" }} gap="6">
        <GridItem>
          <PomatoFarm />
        </GridItem>
        <GridItem>
          <PomatoManage />
        </GridItem>
      </Grid>
    </Box>
  )
}
