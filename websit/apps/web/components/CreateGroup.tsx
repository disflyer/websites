import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { api } from "trpc/react";

type Inputs = {
  name: string,
  img: string,
};
export default function CreateGroup({ isOpen, onOpenChange }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { mutate } = api.group.create.useMutation();
  const onSubmit: SubmitHandler<Inputs> = data => mutate(data);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create Group</ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  autoFocus
                  label="Group Name"
                  placeholder="Enter your group name"
                  isRequired
                  variant="bordered"
                  {...register("name")}
                />
                <Input
                  label="Image URL"
                  placeholder="Enter your image url"
                  variant="bordered"
                  {...register("img")}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Create
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
