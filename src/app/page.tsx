"use client";
import grokkinQuestionBank from "../grokkinQuestionBank.json";
import CategoryButtons from "./components/CategoryButtons";
import QuestionBank from "./components/QuestionBank";
import { useState } from "react";
import styles from "~/styles/Home.module.css";
import { questionsNotAdded } from "~/utils/selectedQuestionsHelpers";
// import { api, HydrateClient } from "~/trpc/server";

export type QuestionType = {
  id: number;
  name: string;
};
export type CategoryType = {
  title: string;
  questions: QuestionType[];
};

export default function Page() {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [interviewQuestion, setInterviewQuestion] = useState<string>("");

  // from t3 template
  // const hello = await api.post.hello({ text: "from tRPC" });
  // void api.post.getLatest.prefetch();
  //

  const handleQuestionCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      setSelectedQuestions((prev) => [...prev, e.target.value]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((prev) => !prev.includes(e.target.value)),
      );
    }
  };

  const handleSelectAllQuestionsInCategory = (
    questionsCategory: QuestionType[],
  ) => {
    const questionsNotChecked: string[] = questionsNotAdded(
      questionsCategory,
      selectedQuestions,
    );

    if (questionsNotChecked.length > 0) {
      setSelectedQuestions((prev) => [...prev, ...questionsNotChecked]);
    } else {
      setSelectedQuestions((prev) =>
        prev.filter((questions) => !questionsNotChecked.includes(questions)),
      );
    }
  };

  const handleCategoryCheckboxChange = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    questionsCategory: QuestionType[],
    selectedTitle: string,
  ) => {
    //getting an array of ALL questions in the category
    const totalCategoryQuestions = questionsCategory.map(
      (question) => question.name,
    );
    // getting an array of all questions NOT YET added
    const questionsNotAdded = totalCategoryQuestions.filter(
      (question) => !selectedQuestions.includes(question),
    );
    if (!selectedCategories.includes(selectedTitle)) {
      setSelectedCategories((prev) => [...prev, selectedTitle]);
      setSelectedQuestions((prev) => [...prev, ...questionsNotAdded]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((title) => !title.includes(selectedTitle)),
      );
      setSelectedQuestions(
        selectedQuestions.filter(
          (questions) => !totalCategoryQuestions.includes(questions),
        ),
      );
    }
  };

  const selectRandomQuestion = () => {
    const randomNum = Math.floor(Math.random() * selectedQuestions.length);
    const randomQuestion = selectedQuestions[randomNum];
    setInterviewQuestion(randomQuestion ?? "");
  };
  const QuestionCounter = () => {
    return <h2>{selectedQuestions.length} Questions Selected</h2>;
  };

  return (
    <main
      className={`${styles.main}`}
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QuestionCounter />
        {interviewQuestion && <h2>{interviewQuestion}</h2>}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <button onClick={selectRandomQuestion}>Select Random Question</button>
          <button
            onClick={() => {
              setInterviewQuestion("");
              setSelectedCategories([]);
              setSelectedQuestions([]);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <CategoryButtons
          questionBank={grokkinQuestionBank}
          handleCategoryCheckboxChange={handleCategoryCheckboxChange}
        />
        <QuestionBank
          selectedQuestions={selectedQuestions}
          selectedCategories={selectedCategories}
          handleSelectAllQuestionsInCategory={
            handleSelectAllQuestionsInCategory
          }
          handleQuestionCheckboxChange={handleQuestionCheckboxChange}
        />
      </div>
    </main>
  );
}
