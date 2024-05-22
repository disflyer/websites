'use client'
import { Tab, Tabs } from "@nextui-org/react";
import CardList from "components/CardList";
import { useSession } from "next-auth/react"
import { api } from "trpc/react";

const GroupView = () => {
  const session = useSession()
  const { data, refetch } = api.group.list.useQuery()
  return (
    <Tabs color="primary" aria-label="Tabs colors" radius="full">
      <Tab key="Public" title="Public" >
        <CardList list={[
          {
            id: 1,
            name: "Orange",
            img: "https://nextui.org/images/fruit-1.jpeg",
            count: 50,
          },
          {
            id: 2,
            name: "Tangerine",
            img: "https://nextui.org/images/fruit-2.jpeg",
            count: 50,
          },
          {
            id: 3,
            name: "Raspberry",
            img: "https://nextui.org/images/fruit-3.jpeg",
            count: 50,
          },
          {
            id: 4,
            name: "Lemon",
            img: "https://nextui.org/images/fruit-4.jpeg",
            count: 50,
          },
          {
            id: 5,
            name: "Avocado",
            img: "https://nextui.org/images/fruit-5.jpeg",
            count: 50,
          },
          {
            id: 6,
            name: "Lemon 2",
            img: "https://nextui.org/images/fruit-6.jpeg",
            count: 50,
          },
          {
            id: 7,
            name: "Banana",
            img: "https://nextui.org/images/fruit-7.jpeg",
            count: 50,
          },
          {
            id: 8,
            name: "Watermelon",
            img: "https://nextui.org/images/fruit-8.jpeg",
            count: 50,
          },
        ]}></CardList>
      </Tab>
      {session.data?.user && <Tab key="Private" title="Private" >
        <CardList plus list={data || []} onCreate={() => refetch()}></CardList>
      </Tab>}
    </Tabs>
  )
}

export default GroupView