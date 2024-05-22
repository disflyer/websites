'use client'
import { Tab, Tabs } from "@nextui-org/react";
import CardList from "components/CardList";
import { useSession } from "next-auth/react"

const GroupView = () => {
  const session = useSession()
  return (
    <Tabs color="primary" aria-label="Tabs colors" radius="full">
      <Tab key="Public" title="Public" >
        <CardList list={[
          {
            id: 1,
            title: "Orange",
            img: "https://nextui.org/images/fruit-1.jpeg",
            count: 50,
          },
          {
            id: 2,
            title: "Tangerine",
            img: "https://nextui.org/images/fruit-2.jpeg",
            count: 50,
          },
          {
            id: 3,
            title: "Raspberry",
            img: "https://nextui.org/images/fruit-3.jpeg",
            count: 50,
          },
          {
            id: 4,
            title: "Lemon",
            img: "https://nextui.org/images/fruit-4.jpeg",
            count: 50,
          },
          {
            id: 5,
            title: "Avocado",
            img: "https://nextui.org/images/fruit-5.jpeg",
            count: 50,
          },
          {
            id: 6,
            title: "Lemon 2",
            img: "https://nextui.org/images/fruit-6.jpeg",
            count: 50,
          },
          {
            id: 7,
            title: "Banana",
            img: "https://nextui.org/images/fruit-7.jpeg",
            count: 50,
          },
          {
            id: 8,
            title: "Watermelon",
            img: "https://nextui.org/images/fruit-8.jpeg",
            count: 50,
          },
        ]}></CardList>
      </Tab>
      {session.data?.user && <Tab key="Private" title="Private" >
        <CardList plus list={[]}></CardList>
      </Tab>}
    </Tabs>
  )
}

export default GroupView