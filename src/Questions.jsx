import { useState } from 'react'
import styled from 'styled-components'

import Question from './Question'

const Section = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	max-width: 1000px;
`

const Button = styled.button`
	font-family: 'Inter', sans-serif;
	font-size: large;
	color: #f5f7fb;
	background-color: #4d5b9e;
	border: none;
	padding: 1rem 3rem;
	border-radius: 1rem;
	align-self: center;
	cursor: pointer;
`

const Assessment = styled.div`
	display: flex;
	gap: 1rem;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
`

const Questions = ({ questionData, updateUserAnswers, score, fetchData }) => {
	const [revealAnswers, setRevealAnswers] = useState(false)

	function playAgain() {
		fetchData()
		setRevealAnswers(false)
	}

	return (
		<Section>
			{questionData.map((question) => (
				<>
					<Question
						key={question.id}
						question={question}
						updateUserAnswers={updateUserAnswers}
						reveal={revealAnswers}
					/>
					<hr
						color='#DBDEF0'
						width='100%'
					/>
				</>
			))}
			<Assessment>
				{revealAnswers ? (
					<>
						<h3>
							You scored {score}/{questionData.length} correct answers
						</h3>
						<Button onClick={playAgain}>Play again?</Button>
					</>
				) : (
					<Button onClick={() => setRevealAnswers(true)}>Check Answers</Button>
				)}
			</Assessment>
		</Section>
	)
}

export default Questions
