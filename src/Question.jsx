import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Answer from './Answer'

const ButtonContainer = styled.div`
	display: flex;
	gap: 1rem;
	margin-block: 1rem;
`
const Title = styled.h2`
	font-family: 'Karla', sans-serif;
`

const Question = ({ question, updateUserAnswers, reveal }) => {
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		updateUserAnswers(question.id, selected)
	}, [selected])

	const correctAnswer = question.correct_answer

	function handleClick(event) {
		setSelected(event.target.innerText)
	}

	return (
		<div key={question.id}>
			<Title>{question.question}</Title>
			<ButtonContainer>
				{question.all_answers.map((answer) => (
					<Answer
						key={answer}
						handleClick={handleClick}
						answer={answer}
						correctAnswer={correctAnswer}
						selected={selected}
						reveal={reveal}
					/>
				))}
			</ButtonContainer>
		</div>
	)
}

export default Question
