import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { api } from "trpc/react";

type Inputs = {
  content: string,
  description: string,
  groupId: string
};
export default function CreateChunk({ isOpen, onOpenChange, onCreate, groupId, chunk }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>({
    defaultValues: {
      groupId
    }
  });
  const { mutateAsync } = api.chunk.create.useMutation();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    await mutateAsync(data);
    onOpenChange(false);
    onCreate()
  };
  useEffect(() => {
    setValue("content", chunk?.content)
    setValue("description", chunk?.description)
  }, [isOpen])
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create Chunk</ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  autoFocus
                  label="Chunk Content"
                  placeholder="Enter your chunk content"
                  isRequired
                  variant="bordered"
                  {...register("content")}
                />
                <Input
                  label="Chunk Description"
                  placeholder="Enter your chunk description"
                  variant="bordered"
                  {...register("description")}
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
