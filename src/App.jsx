import { useState, useEffect } from 'react'
import axios from 'axios'
import he from 'he'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import yellowBlob from './assets/yellow-blob.svg'
import purpleBlob from './assets/purple-blob.svg'
// components
import Welcome from './Welcome'
import Questions from './Questions'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    color: #293264;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const Container = styled.div`
	position: relative;
	height: 100vh;
	display: flex;
	justify-content: center;
`

const YellowBlob = styled.div`
	position: fixed;
	top: -300px;
	right: -300px;
	width: 600px;
	z-index: -10;
`

const PurpleBlob = styled.div`
	position: fixed;
	bottom: -200px;
	left: -200px;
	width: 600px;
	z-index: -10;
`

function App() {
	const [page, setPage] = useState(0)
	const [score, setScore] = useState(0)
	const [questionData, setQuestionData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		if (questionData) {
			calculateScore()
		}
	}, [questionData])

	const fetchData = () => {
		axios.get(`https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple`).then((response) => {
			const formattedData = formatQuestionData(response.data.results)
			setQuestionData(formattedData)
			setPage(0)
			setLoading(false)
		})
	}

	const formatQuestionData = (data) => {
		return data.map((entry) => {
			const decodedQuestion = he.decode(entry.question)
			const decodedCorrectAnswer = he.decode(entry.correct_answer)
			const decodedIncorrectAnswers = entry.incorrect_answers.map((answer) => he.decode(answer))
			const allAnswers = shuffleArray([...decodedIncorrectAnswers, decodedCorrectAnswer])

			return {
				...entry,
				id: nanoid(),
				userCorrect: false,
				question: decodedQuestion,
				correct_answer: decodedCorrectAnswer,
				incorrect_answers: decodedIncorrectAnswers,
				all_answers: allAnswers,
			}
		})
	}

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const updateUserAnswers = (id, selected) => {
		setQuestionData((oldData) => {
			return oldData.map((entry) => {
				if (entry.id === id) {
					return { ...entry, userCorrect: entry.correct_answer === selected }
				} else {
					return entry
				}
			})
		})
	}

	const calculateScore = () => {
		let sum = 0
		questionData.forEach((question) => {
			if (question.userCorrect) sum++
		})
		setScore(sum)
	}

	return (
		<Container>
			<GlobalStyle />
			<YellowBlob>
				<img src={yellowBlob} />
			</YellowBlob>
			<PurpleBlob>
				<img src={purpleBlob} />
			</PurpleBlob>

			{page === 0 && (
				<Welcome
					nextPage={setPage}
					loading={loading}
				/>
			)}
			{page === 1 && (
				<Questions
					questionData={questionData}
					updateUserAnswers={updateUserAnswers}
					score={score}
					fetchData={fetchData}
				/>
			)}
		</Container>
	)
}

export default App
