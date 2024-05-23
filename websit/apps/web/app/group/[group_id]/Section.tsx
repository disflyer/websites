'use client'
import { api } from "trpc/react";
import ChunkList from "./ChunkList";
import CreateChunk from "./CreateChunk";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Section = ({ group_id, group }) => {
  const [chunk, setChunk] = useState()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: chunks, refetch } = api.chunk.list.useQuery({ groupId: group_id })

  useEffect(() => {
    if (!isOpen) {
      setChunk(null)
    }
  }, [isOpen])

  return <section className="flex flex-col gap-4 mt-12">
    <ChunkList onOpen={onOpen} chunks={chunks} group={group} refetch={refetch} onEdit={(val) => {
      onOpen()
      setChunk(val)
    }} />
    <CreateChunk groupId={group_id} chunk={chunk} onOpenChange={onOpenChange} isOpen={isOpen} onCreate={() => refetch()}></CreateChunk>
  </section>
}

export default Section