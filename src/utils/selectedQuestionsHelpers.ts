import type { QuestionType } from "~/app/page";

export const totalCategoryQuestions = (questionsCategory: QuestionType[]) =>
  questionsCategory.map((question) => question.name);

export const questionsNotAdded = (
  questionsCategory: QuestionType[],
  selectedQuestions: string[],
): string[] => {
  const totalCategoryQuestions = questionsCategory.map(
    (question) => question.name,
  );

  // getting an array of all questions NOT YET added
  return totalCategoryQuestions.filter(
    (prev) => !selectedQuestions.includes(prev),
  );
};
