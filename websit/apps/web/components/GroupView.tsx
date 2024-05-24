'use client'
import { Tab, Tabs } from "@nextui-org/react";
import CardList from "components/CardList";
import { api } from "trpc/react";

const GroupView = ({ publicList, session }) => {
  const { data, refetch } = api.group.list.useQuery({ type: "private" })
  return (
    <Tabs color="primary" aria-label="Tabs colors" radius="full">
      <Tab key="Public" title="Public" >
        <CardList list={publicList || []}></CardList>
      </Tab>
      {session?.user && <Tab key="Private" title="Private" >
        <CardList plus list={data || []} onCreate={() => refetch()}></CardList>
      </Tab>}
    </Tabs>
  )
}

export default GroupView