import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback="">
        <Routes>
            <Route exact path="/" element={}>
        </Routes>
      </Suspense>
    </>
  );
};
