import { useState } from "react";
import RecruitmentForm from "./components/RecruitmentForm";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h2 className="text-center">Fill in Your Personal Information below</h2>
        <h4 className="text-center text-muted mb-5">
          All fields are required (Compulsory)
        </h4>
        <RecruitmentForm />
      </div>
    </>
  );
}

export default App;
