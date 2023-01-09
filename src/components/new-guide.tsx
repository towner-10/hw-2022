import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../utils/api";
import { PrimaryButton } from "./buttons";
import toast from "react-hot-toast";

const empty = () =>
  toast.error("Title cannot be empty!", { position: "bottom-right" });

const NewGuide = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const createGuide = api.guides.createGuide.useMutation({
    async onSuccess() {
      console.log("Created new guide!");
    },
  });

  const handleCreateGuide = async () => {
    if (title === "") {
      console.log("Title cannot be empty!");
      setIsEmpty(true);
      empty();
      return;
    }

    setIsCreating(true);
    toast.promise(
      createGuide.mutateAsync({ title: title }),
      {
        loading: "Creating new guide...",
        success: (result) => {
          console.log(result);
          router.push(`/guide/${result.id}`);
          return "Created new guide!";
        },
        error: () => "Failed to create new guide!",
      },
      {
        position: "bottom-right",
      }
    );
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <div className="flex flex-row items-center justify-around text-xl sm:text-2xl">
        <span className="pr-2 text-black">How to</span>
        <input
          type="text"
          value={title}
          onChange={(event) => {
            if (isEmpty) setIsEmpty(false);
            setTitle(event.target.value);
          }}
          className="border-b-2 border-black bg-transparent outline-none"
        ></input>
        <span className="pl-2 text-black">?</span>
      </div>
      {/* Create an error message when the text field is empty */}
      <Transition
        show={isEmpty}
        as="div"
        className="flex flex-row items-center justify-center"
        enter="transition-scale duration-75"
        enterFrom="scale-0"
        enterTo="scale-100"
        leave="transition-scale duration-150"
        leaveFrom="scale-100"
        leaveTo="scale-0"
      >
        <span className="text-xl text-error-400">
          The {'"'}How To{'"'} question cannot be empty!
        </span>
      </Transition>

      {/* Create a loading animation when the guide is being created */}
      <Transition
        show={isCreating}
        as="div"
        className="flex flex-row items-center justify-center"
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-port_gore-500"></div>
      </Transition>

      <Transition show={!isCreating}>
        <PrimaryButton
          child={<span>Go!</span>}
          onClick={async () => await handleCreateGuide()}
        />
      </Transition>
    </div>
  );
};

export default NewGuide;
