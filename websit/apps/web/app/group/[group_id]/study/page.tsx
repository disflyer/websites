"use client"
import { Button, Card, CardBody } from "@nextui-org/react"
import Nav from "components/Nav"
import { useMemo, useState } from "react"
import { api } from "trpc/react"
import { useSpring, animated } from '@react-spring/web'

const Study = ({ params }) => {
  const { data: chunks, refetch } = api.chunk.list.useQuery({ groupId: params.group_id })
  const [renderCount, setRenderCount] = useState(0)
  const [disable, setDisable] = useState(false)
  // sort chunks by random and store in sessionStorage
  const studyQueue = useMemo(() => {
    if (!chunks?.length) return []
    if (sessionStorage.getItem('studyQueue_' + params.group_id)) {
      return JSON.parse(sessionStorage.getItem('studyQueue_' + params.group_id))
    }
    const queue = chunks.sort(() => Math.random() - 0.5)
    sessionStorage.setItem('studyQueue_' + params.group_id, JSON.stringify(queue))
    return queue
  }, [chunks])

  const queueIndex = useMemo(() => {
    if (sessionStorage.getItem('queueIndex_' + params.group_id) && chunks) {
      return +sessionStorage.getItem('queueIndex_' + params.group_id) >= chunks?.length ? 0 : +sessionStorage.getItem('queueIndex_' + params.group_id)
    }
    return 0
  }, [renderCount])

  const remainder = Number.isNaN(chunks?.length - queueIndex) ? 0 : chunks?.length - queueIndex

  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const setQueueIndex = (index) => {
    let __index = index
    if (__index >= chunks.length) {
      __index = 0
      sessionStorage.removeItem('studyQueue_' + params.group_id)
    }
    sessionStorage.setItem('queueIndex_' + params.group_id, String(__index))
    setRenderCount((prev) => prev + 1)
  }
  return (
    <div className="pt-[50px]">
      <Nav paths={[{ path: "/", name: "Home" }, { name: "Group", path: "." }, { name: "study" }]} />

      <section className="flex justify-center flex-col items-center sm:w-[720px] m-auto">
        <animated.div className="w-full relative" style={{
          transform,
        }}
          onClick={() => setFlipped(prev => !prev)}>
          <Card className="h-[320px] mt-[80px] w-full" >
            <CardBody className="flex justify-center items-center text-xl font-bold sm:px-10">
              <animated.p style={{
                rotateY: flipped ? "180deg" : "0deg",
              }}>{flipped ? <animated.span style={{
                rotateY: "180deg"
              }}>{studyQueue?.[queueIndex]?.description}</animated.span> :
                studyQueue?.[queueIndex]?.content}</animated.p>
            </CardBody>
          </Card>
        </animated.div>
        <p className="flex justify-between w-full pb-10 pt-1 text-gray-400 text-sm"><span>click card to see the description.</span> <span>remainder:{remainder}</span></p>
        <div className="flex justify-between w-full px-5">
          <Button color="secondary" className="w-[40%]"
            isDisabled={disable}
            onPress={() => {
              setFlipped(false)
              setQueueIndex(queueIndex + 1)
            }}>Remembered</Button>
          <Button color="warning" className="w-[40%]"
            isDisabled={disable}
            onPress={() => {
              setFlipped(true)
              setDisable(true)
              setTimeout(() => {
                setQueueIndex(queueIndex + 1)
                setFlipped(false)
                setDisable(false)
              }, 1500);
            }}>Forgot</Button>
        </div>
      </section>
    </div>
  )
}

export default Study
