import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import questionBank from '../questionBank.json';
import CategoryButtons from './components/CategoryButtons';
import QuestionBank from './components/questionBank';
import { useState } from 'react';

export type QuestionType = {
	id: number;
	name: string;
};
export type CategoryType = {
	title: string;
	questions: QuestionType[];
};

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
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
						<button onClick={selectRandomQuestion}>
							Select Random Question
						</button>
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
						questionBank={questionBank}
						selectedCategories={selectedCategories}
						handleCategoryCheckboxChange={handleCategoryCheckboxChange}
					/>
					<QuestionBank
						questionBank={questionBank}
						selectedQuestions={selectedQuestions}
						setSelectedQuestions={setSelectedQuestions}
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
						handleCategoryCheckboxChange={handleCategoryCheckboxChange}
					/>
				</div>
			</main>
		</>
	);
}
