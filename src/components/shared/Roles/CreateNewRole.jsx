import React, { useState } from "react";
import RoleCard from "./RoleCard";
import { ArrowLeft, Mark } from "../../../global/Icons";

const progress = [
  { id: 1, stage: "Basic Info" },
  { id: 2, stage: "Set Permission" },
  { id: 3, stage: "Review Details" },
];
const CreateNewRole = () => {
  const [current, setCurrent] = useState(1);

  const moveToNextPage = () => {
    setCurrent((prev) => {
      if (prev < progress.length - 1) {
        return prev + 1;
      }
    });
  };
  return (
    <section className="flex  flex-col">
      <header className="flex gap-2 items-center self-start text-base tracking-tight leading-none whitespace-nowrap text-slate-500">
        <ArrowLeft className="h-4 w-4 " />
        <span className="self-stretch my-auto">Roles</span>
      </header>
      <div className="flex flex-wrap gap-5 justify-between mt-6 w-full max-md:max-w-full">
        <div className="flex flex-col justify-center max-md:max-w-full">
          <h1 className="text-2xl font-semibold leading-none text-gray-900 max-md:max-w-full">
            Create New Role
          </h1>
          <nav className="flex gap-10 items-start self-start mt-7 max-md:max-w-full">
            {progress.map((item) => (
              <div
                key={item.id}
                className={` ${
                  current === item.id ? "text-primary" : "text-gray-500"
                } space-x-2 flex`}
              >
                <span
                  className={` ${
                    current === item.id ? "bg-primary" : "bg-white"
                  } p-1 px-2 text-xs flex items-center  w-fit text-gray-400 border border-border rounded-full `}
                >
                  {current === item.id ? (
                    <Mark className=" text-white" />
                  ) : (
                    `${item.id}`
                  )}
                </span>
                <span
                  className={`${
                    current === item.id ? "text-primary" : "text-gray-500"
                  } `}
                >
                  {item.stage}
                </span>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex gap-2 items-start self-end mt-9 text-sm leading-none whitespace-nowrap">
          <button className="gap-2 self-stretch px-4 py-3 bg-white rounded-md border border-solid border-[color:var(--Gray-100,#E6E7EC)] min-h-11 text-blue-950 w-[92px]">
            Cancel
          </button>
          <button
            onClick={moveToNextPage}
            className="gap-2 self-stretch px-4 py-3 text-white bg-primary rounded-lg min-h-11"
          >
            Continue
          </button>
        </div>
      </div>
      <RoleCard />
    </section>
  );
};

export default CreateNewRole;
