import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { type SubStep, type Step } from "@prisma/client";

interface StepCardProps {
  step: Step;
  substeps: SubStep[];
}

const StepCard = (props: StepCardProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{props.step.text}</h2>
      {props.substeps.map((substep) => {
        if (substep.paragraph === "" || substep.paragraph === null) {
          return (
            <div key={substep.id} className="w-full py-2">
              <p>{substep.text}</p>
            </div>
          );
        }
        return (
          <Disclosure key={substep.id}>
            {({ open }) => (
              <div className="py-2">
                <Disclosure.Button
                  className={
                    open
                      ? "flex w-full flex-row items-center justify-between p-2 border-2 border-gin_fizz-500 rounded-lg transition-colors duration-150 hover:border-port_gore-100"
                      : "flex w-full flex-row items-center justify-between border-x-2 border-x-gin_fizz-500 border-t-2 border-b-2 border-t-gin_fizz-500 border-port_gore-100 p-2 transition-colors duration-150 rounded-lg hover:border-port_gore-100 hover:border-2"
                  }
                >
                  <p>{substep.text}</p>
                  <ChevronRightIcon
                    height={16}
                    width={16}
                    className={
                      open
                        ? "rotate-90 transform duration-200 text-port_gore-500"
                        : "rotate-0 transform duration-200 text-port_gore-500"
                    }
                  />
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel static className="rounded-lg bg-port_gore-100 p-4 text-port_gore-400">
                    {substep.paragraph}
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};

export default StepCard;
