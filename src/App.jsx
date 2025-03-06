import { useState } from "react";
import RecruitmentForm from "./components/RecruitmentForm";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="text-center mb-4">User Registration</h1>
        <RecruitmentForm />
      </div>
    </>
  );
}

export default App;
