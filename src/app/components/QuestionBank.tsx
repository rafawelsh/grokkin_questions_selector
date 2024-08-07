import React from "react";
import type { CategoryType, QuestionType } from "../page";
import { questionsNotAdded } from "~/utils/selectedQuestionsHelpers";
import grokkinQuestionBank from "~/grokkinQuestionBank.json";

const QuestionBank = ({
  selectedQuestions,
  selectedCategories,
  handleQuestionCheckboxChange,
  handleSelectAllQuestionsInCategory,
}: {
  selectedQuestions: string[];
  selectedCategories: string[];
  handleQuestionCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleSelectAllQuestionsInCategory: (
    questionsCategory: QuestionType[],
    selectedTitle: string,
  ) => void;
}) => {
  const {
    twoPointers,
    fastSlowPointers,
    slidingWindow,
    mergeIntervals,
    cyclicSort,
    inPlaceReversal,
    stack,
    monotonicStack,
    hashMaps,
    treeBreadthFirstSearch,
    treeDepthFirstSearch,
    graph,
    island,
    twoHeaps,
    subsets,
    modifiedBinarySearch,
  } = grokkinQuestionBank;

  const renderQuestions = (category: CategoryType) => {
    const { title, questions } = category;
    const checkedQuestions = questionsNotAdded(questions, selectedQuestions);

    return (
      <div
        style={{
          display: `${selectedCategories.includes(title) ? "block" : "none"}`,
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            borderBottom: "1px solid red",
          }}
        >
          <input
            type="checkbox"
            id={title}
            name="interest"
            value={title}
            checked={checkedQuestions.length === 0}
            onChange={() =>
              handleSelectAllQuestionsInCategory(questions, title)
            }
          />
          <label htmlFor={title}>{title}</label>
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {Object.values(questions).map(({ id, name }: QuestionType) => (
            <div key={id}>
              <input
                type="checkbox"
                id={name}
                name="interest"
                value={name}
                checked={selectedQuestions.includes(name)}
                onChange={(e) => handleQuestionCheckboxChange(e)}
              />
              <label htmlFor={name}>{name}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "2rem",
      }}
    >
      {renderQuestions(twoPointers)}
      {renderQuestions(fastSlowPointers)}
      {renderQuestions(slidingWindow)}
      {renderQuestions(mergeIntervals)}
      {renderQuestions(cyclicSort)}
      {renderQuestions(inPlaceReversal)}
      {renderQuestions(stack)}
      {renderQuestions(monotonicStack)}
      {renderQuestions(hashMaps)}
      {renderQuestions(treeBreadthFirstSearch)}
      {renderQuestions(treeDepthFirstSearch)}
      {renderQuestions(graph)}
      {renderQuestions(island)}
      {renderQuestions(twoHeaps)}
      {renderQuestions(subsets)}
      {renderQuestions(modifiedBinarySearch)}
    </div>
  );
};

export default QuestionBank;
