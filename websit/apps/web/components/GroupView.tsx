'use client'
import { Tab, Tabs } from "@nextui-org/react";
import CardList from "components/CardList";
import { useSession } from "next-auth/react"
import { api } from "trpc/react";

const GroupView = () => {
  const session = useSession()
  const { data, refetch } = api.group.list.useQuery({ type: "private" })
  const { data: publicList } = api.group.list.useQuery({ type: "public" })
  return (
    <Tabs color="primary" aria-label="Tabs colors" radius="full">
      <Tab key="Public" title="Public" >
        <CardList list={publicList || []}></CardList>
      </Tab>
      {session.data?.user && <Tab key="Private" title="Private" >
        <CardList plus list={data || []} onCreate={() => refetch()}></CardList>
      </Tab>}
    </Tabs>
  )
}

export default GroupView