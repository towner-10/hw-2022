import { Disclosure } from "@headlessui/react";
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
              <>
                <Disclosure.Button
                  className={
                    open
                      ? "flex w-full flex-row items-center justify-between py-2"
                      : "flex w-full flex-row items-center justify-between border-b-2 py-2"
                  }
                >
                  <p>{substep.text}</p>
                  <ChevronRightIcon
                    height={16}
                    width={16}
                    className={
                      open
                        ? "rotate-90 transform text-port_gore-500"
                        : "text-port_gore-500"
                    }
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="rounded-lg bg-port_gore-100 p-4 text-port_gore-400">
                  {substep.paragraph}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};

export default StepCard;
