import React from 'react';
import { CategoryType, QuestionType } from '../index';

const QuestionBank = ({
	questionBank,
	selectedQuestions,
	setSelectedQuestions,
}: {
	questionBank: Record<string, CategoryType>;
	selectedQuestions: string[];
	setSelectedQuestions: React.Dispatch<React.SetStateAction<string[]>>;
	selectedCategories: string[];
	setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
	handleCategoryCheckboxChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		questionsCategory: QuestionType[],
		selectedTitle: string
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
	} = questionBank;

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checkedId = e.target.value;
		if (e.target.checked) {
			setSelectedQuestions((prev) => [...prev, checkedId]);
		} else {
			setSelectedQuestions(selectedQuestions.filter((id) => id !== checkedId));
		}
	};

	const renderQuestions = (category: CategoryType) => {
		const { title, questions } = category;

		return (
			<div>
				<h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid red' }}>
					{title}
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
						<label htmlFor={name}>{name}</label>
					</div>
				))}
			</div>
		);
	};

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr',
				gap: '2rem',
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
