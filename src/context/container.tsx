import { GlobalContext } from "./index";
import React, { useRef, useState } from "react";
import { AppContextType } from "../interface";
import { globalStateSetter } from "./actions";
import { globalContextInitialValue } from "./value";
import { __AppContextActionType } from "../interface/context";

const ContainerComp: React.FC<{ children: React.ReactNode }> = (props: {
  children: React.ReactNode;
}) => {
  // define the context value ( the global state )
  // overriding the useless update function that defined in initial value and making it functional.
  const [globalState, setGlobalState] = useState<AppContextType>({
    ...globalContextInitialValue,
    update: updateGlobalContext,
  });
  const ref = useRef<AppContextType>(globalState);

  // updating global state by helper function.
  function updateGlobalContext(...e: __AppContextActionType[]) {
    ref.current = { ...globalStateSetter(e, ref.current) };
    setGlobalState(ref.current);
  }

  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContainerComp;
