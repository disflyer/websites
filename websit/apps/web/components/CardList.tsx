import React from "react";
import { Card, CardBody, CardFooter, Image, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import CreateGroup from "./CreateGroup";

export default function CardList({ list, plus = false }: { list: any[], plus?: Boolean }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Link href={`/group/${item.id}`} key={index}>
          <Card shadow="sm" className="w-full" isPressable>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">count:{item.count}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
      {plus &&
        <Card shadow="sm" className="w-full" isPressable onPress={onOpen}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt="Plus"
              className="w-full object-cover h-[184px]"
              src="/plus.svg"
            />
          </CardBody>
          <CreateGroup onOpenChange={onOpenChange} isOpen={isOpen}></CreateGroup>
        </Card>
      }
    </div >
  );
}
