'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Button } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { RouterOutput } from "app/type";
import { api } from "trpc/react";



export default function ChunkList({ isLoading, group, chunks, onOpen, refetch, onEdit }: { isLoading: boolean, group: RouterOutput['group']['get'], onOpen: () => void, chunks: RouterOutput['chunk']['list'], refetch: () => void, onEdit: (val) => void }) {
  const { mutateAsync } = api.chunk.delete.useMutation();
  const isPublic = group.type === 'public'
  const columns = isPublic ? [
    { name: "CHUNK", uid: "content" },
    { name: "DESCRIPTION", uid: "description" },
  ] : [
    { name: "CHUNK", uid: "content" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const renderCell = React.useCallback((chunk, columnKey: React.Key) => {
    const cellValue = chunk[columnKey.toString()];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{chunk.name}</p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{chunk.description}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-6 flex-row-reverse">
            <Tooltip color="danger" content="Delete chunk">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={async () => {
                await mutateAsync({ id: chunk.id })
                refetch()
              }}>
                <DeleteIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit chunk">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => onEdit(chunk)}>
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="flex flex-row-reverse items-center">
        {!isPublic && <Button color="secondary" className="ml-5" onPress={onOpen}>Create</Button>}
        <span className="text-gray-400">count: {chunks?.length}</span>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} className={column.uid === "actions" ? "text-right" : ""}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={chunks || []} isLoading={isLoading}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table >
    </>
  );
}
