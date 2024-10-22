import type { CategoryType, QuestionType } from "../page";

export const CategoryButtons = ({
  questionBank,
  handleCategoryCheckboxChange,
}: {
  questionBank: Record<string, CategoryType>;
  handleCategoryCheckboxChange: (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    questionsCategory: QuestionType[],
    selectedTitle: string,
  ) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {Object.values(questionBank).map(({ title, questions }: CategoryType) => {
        return (
          <div key={`${title}-category`}>
            <input
              style={{
                background: "red",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "0.5rem",
                fontSize: "1.125rem",
              }}
              type="button"
              id={`${title}-category`}
              value={`${title}-category`}
              onClick={(e) => {
                handleCategoryCheckboxChange(e, questions, title);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryButtons;
