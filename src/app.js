import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import AppRouter from "./routing/AppRouter";
const App = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
