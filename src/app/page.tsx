'use client';
import grokkinQuestionBank from '../grokkinQuestionBank.json';
import CategoryButtons from './components/CategoryButtons';
import QuestionBank from './components/QuestionBank';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';

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
	const [interviewQuestion, setInterviewQuestion] = useState<string>('');

	const handleCategoryCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		questionsCategory: QuestionType[],
		selectedTitle: string
	) => {
		//getting an array of ALL questions in the category
		const totalCategoryQuestions = questionsCategory.map(
			(question) => question.name
		);
		// getting an array of all questions NOT YET added
		const questionsNotAdded = totalCategoryQuestions.filter(
			(question) => !selectedQuestions.includes(question)
		);

		if (e.target.checked) {
			setSelectedCategories((prev) => [...prev, selectedTitle]);
			setSelectedQuestions((prev) => [...prev, ...questionsNotAdded]);
		} else {
			setSelectedCategories(
				selectedCategories.filter((title) => !title.includes(selectedTitle))
			);
			setSelectedQuestions(
				selectedQuestions.filter(
					(questions) => !totalCategoryQuestions.includes(questions)
				)
			);
		}
	};

	const selectRandomQuestion = () => {
		const randomNum = Math.floor(Math.random() * selectedQuestions.length);
		const randomQuestion = selectedQuestions[randomNum];
		setInterviewQuestion(randomQuestion);
	};
	const QuestionCounter = () => {
		return <h2>{selectedQuestions.length} Questions Selected</h2>;
	};

	return (
		<main className={`${styles.main}`}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<QuestionCounter />
				{interviewQuestion && <h2>{interviewQuestion}</h2>}
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '1rem',
						padding: '1rem',
					}}
				>
					<button onClick={selectRandomQuestion}>Select Random Question</button>
					<button
						onClick={() => {
							setInterviewQuestion('');
							setSelectedCategories([]);
							setSelectedQuestions([]);
						}}
					>
						Reset
					</button>
				</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<CategoryButtons
					questionBank={grokkinQuestionBank}
					selectedCategories={selectedCategories}
					handleCategoryCheckboxChange={handleCategoryCheckboxChange}
				/>
				<QuestionBank
					questionBank={grokkinQuestionBank}
					selectedQuestions={selectedQuestions}
					setSelectedQuestions={setSelectedQuestions}
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories}
					handleCategoryCheckboxChange={handleCategoryCheckboxChange}
				/>
			</div>
		</main>
	);
}
