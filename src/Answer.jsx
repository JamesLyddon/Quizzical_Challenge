import styled from 'styled-components'

const EmptyButton = styled.button`
	font-family: 'Inter', sans-serif;
	color: #293264;
	font-size: 1rem;
	font-weight: 500;
	background-color: transparent;
	border: 1px solid #4d5b9e;
	border-radius: 1rem;
	padding: 0.25rem 1rem;
	cursor: pointer;
`

const Answer = ({ handleClick, answer, correctAnswer, selected, reveal }) => {
	const btnColor = {}

	if (reveal && answer === correctAnswer) {
		btnColor.backgroundColor = '#94D7A2'
		btnColor.border = 'none'
	} else if (reveal && selected === answer && answer !== correctAnswer) {
		btnColor.backgroundColor = '#F8BCBC'
		btnColor.border = 'none'
	} else if (!reveal && selected === answer) {
		btnColor.backgroundColor = '#D6DBF5'
		btnColor.border = 'none'
	}

	return (
		<EmptyButton
			onClick={handleClick}
			style={btnColor}
		>
			{answer}
		</EmptyButton>
	)
}

export default Answer
