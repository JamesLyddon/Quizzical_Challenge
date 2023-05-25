import styled from 'styled-components'
import LoadingIcons from 'react-loading-icons'

const Section = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const StartButton = styled.button`
	font-family: 'Inter', sans-serif;
	font-size: large;
	color: #f5f7fb;
	background-color: #4d5b9e;
	border: none;
	padding: 1.5rem 5rem;
	margin-top: 1rem;
	border-radius: 1rem;
	cursor: pointer;
`

const Title = styled.h1`
	font-family: 'Karla', sans-serif;
	font-size: 3rem;
	padding: 0;
	margin: 0;
`
const SubTitle = styled.h2`
	font-weight: 400;
`

const Welcome = ({ nextPage, loading }) => {
	return (
		<Section>
			<Title>Quizzical</Title>
			<SubTitle>Answer 5 general knowledge questions</SubTitle>

			{loading ? (
				<LoadingIcons.Puff stroke='#4d5b9e' />
			) : (
				<StartButton onClick={() => nextPage((prev) => prev + 1)}>Start quiz</StartButton>
			)}
		</Section>
	)
}

export default Welcome
