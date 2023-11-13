import React from "react";

function useKeydown(key, func) {
  React.useEffect(() => {
    function handlerKeyPress(event) {
      if (event.key === key) {
        func();
      }
    }
    window.addEventListener("keydown", handlerKeyPress);

    return () => {
      window.removeEventListener("keydown", handlerKeyPress);
    };
  }, [key, func]);
  return;
}

export default useKeydown;
