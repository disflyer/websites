import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { api } from "trpc/react";

type Inputs = {
  name: string,
  img: string,
};
export default function CreateGroup({ isOpen, onOpenChange, onCreate }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { mutateAsync } = api.group.create.useMutation();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    await mutateAsync(data);
    onOpenChange(false);
    onCreate()
  };
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
