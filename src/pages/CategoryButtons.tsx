import { CategoryType, QuestionType } from './questionBank';

export const CategoryButtons = ({
	questionBank,
	selectedCategories,
	handleCategoryCheckboxChange,
}: {
	questionBank: Record<string, CategoryType>;
	selectedCategories: string[];
	handleCategoryCheckboxChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		questionsCategory: QuestionType[],
		selectedTitle: string
	) => void;
}) => {
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
			{Object.values(questionBank).map(({ title, questions }: CategoryType) => {
				return (
					<div key={title}>
						<input
							type='checkbox'
							id={title}
							value={title}
							checked={selectedCategories.includes(title)}
							onClick={(e) => {
								handleCategoryCheckboxChange(e, questions, title);
							}}
						/>
						<label htmlFor={title}>{title}</label>
					</div>
				);
			})}
		</div>
	);
};

export default CategoryButtons;
