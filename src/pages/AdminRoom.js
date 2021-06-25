import {useParams, useHistory} from 'react-router-dom'

import {Button} from '../components/Button'
import {RoomCode} from '../components/RoomCode'
import {Question} from '../components/Question'
//import {useAuth} from '../hooks/useAuth'
import {database} from '../services/firebase'
import {useRoom} from '../hooks/useRoom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'


import '../styles/room.scss'

export const AdminRoom = () => {
    //const {user} = useAuth()
    
    const history = useHistory()
    const params = useParams()
    const roomId = params.id
    const {questions, title} = useRoom(roomId)
    
    const handleEndRoom = async () => {
        if(window.confirm('Tem certeza que deseja encerrar essa sala?')){
            await database.ref(`rooms/${roomId}/`).update({
                ended_at: new Date()
            })
            history.push('/')
        }
    }
     
    const handleDeleteQuestion = async (questionId) => {
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
        
    }
    
    const handleCheckQuestionAsAnswered = async (questionId) => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
        
    }
    
    const handleHighlightQuestion = async (questionId) => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }
    
    return (
        <div id='page_room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt='Letmeask' />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom} >Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main className='content'>
                <div className='room_title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                
                <div className='question_list'>
                    {questions.map(question => (
                        <Question 
                        key={question.id}
                        content={question.content}
                        author={question.author}
                        isAnswered={question.isAnswered}
                        isHighlighted={question.isHighlighted}
                        >
                        {!question.isAnswered && (
                            <>
                                <button type='button' onClick={() => handleCheckQuestionAsAnswered(question.id)} >
                                    <img src={checkImg} alt='marcar pergunta como respondida'/>
                                </button>
                                <button type='button' onClick={() => handleHighlightQuestion(question.id)}>
                                    <img src={answerImg} alt='dar destaque a pergunta'/>
                                </button>
                            </>
                        )}
                        
                        <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                            <img src={deleteImg} alt='deletar pergunta'/>
                        </button>
                        </Question>
                    ))}
                </div>
            
            </main>
            
        </div>
    )
}