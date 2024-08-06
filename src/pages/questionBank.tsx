import React, { useState } from 'react';
import questionBank from '../questionBank.json';

type QuestionType = {
	id: number;
	name: string;
};
type CaterotyType = {
	title: string;
	questions: QuestionType[];
};

export const QuestionBank = () => {
	const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const [interviewQuestion, setInterviewQuestion] = useState<string>('');

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
	} = questionBank;

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checkedId = e.target.value;
		if (e.target.checked) {
			setSelectedQuestions((prev) => [...prev, checkedId]);
		} else {
			setSelectedQuestions(selectedQuestions.filter((id) => id !== checkedId));
		}
	};

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
			setSelectedCategory((prev) => [...prev, selectedTitle]);
			setSelectedQuestions((prev) => [...prev, ...questionsNotAdded]);
		} else {
			setSelectedCategory(
				selectedCategory.filter((title) => !title.includes(selectedTitle))
			);
			setSelectedQuestions(
				selectedQuestions.filter(
					(questions) => !totalCategoryQuestions.includes(questions)
				)
			);
		}
	};

	// choose random question from selectedQuestions
	const selectRandomQuestion = () => {
		const randomNum = Math.floor(Math.random() * selectedQuestions.length);
		const randomQuestion = selectedQuestions[randomNum];
		setInterviewQuestion(randomQuestion);
	};

	const QuestionCounter = () => {
		return <h2>{selectedQuestions.length}</h2>;
	};

	const renderQuestions = (category: CaterotyType) => {
		const { title, questions } = category;

		return (
			<div>
				<h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid red' }}>
					<input
						type='checkbox'
						value={title}
						checked={selectedCategory.includes(title)}
						onChange={(e) => {
							handleCategoryCheckboxChange(e, questions, title);
						}}
					/>
					<label> {title}</label>
				</h2>
				{Object.values(questions).map(({ id, name }) => (
					<div key={id}>
						<input
							type='checkbox'
							id={name}
							name='interest'
							value={name}
							checked={selectedQuestions.includes(name)}
							onChange={(e) => handleCheckboxChange(e)}
						/>
						<label for={name}>{name}</label>
					</div>
				))}
			</div>
		);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<QuestionCounter />
			{interviewQuestion && <h2>{interviewQuestion}</h2>}
			<button onClick={selectRandomQuestion}>Select Random Question</button>
			<button
				onClick={() => {
					setInterviewQuestion('');
					setSelectedCategory([]);
					setSelectedQuestions([]);
				}}
			>
				Reset
			</button>
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
