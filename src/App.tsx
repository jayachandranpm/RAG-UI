import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  return (
    <div className="h-screen overflow-hidden">
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center bg-[#343541] text-white">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </div>
  );
}

export default App;
