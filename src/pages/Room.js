import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {Button} from '../components/Button'
import {RoomCode} from '../components/RoomCode'
import {useAuth} from '../hooks/useAuth'
import {database} from '../services/firebase'
import {useRoom} from '../hooks/useRoom'

import logoImg from '../assets/images/logo.svg'
import '../styles/room.scss'

export const Room = () => {
    const {user} = useAuth()
    
    const params = useParams()
    const [newQuestion, setNewQuestion] = useState('')
    const roomId = params.id
    const {questions, title} = useRoom(roomId)
    
    const handleSendQuestion = async (e) => {
        e.preventDefault()
        if (newQuestion.trim() === '') {
            return 
        }
        
        if(!user){
            throw new Error('you must be logged in')
        }
        
        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }
        
        await database.ref(`rooms/${roomId}/questions`).push(question)
        
        setNewQuestion('')
    }
    
    return (
        <div id='page_room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt='Letmeask' />
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main className='content'>
                <div className='room_title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                
                <form onSubmit={handleSendQuestion} >
                    <textarea 
                    placeholder='O que você quer perguntar?'
                    value={newQuestion}
                    onChange={e => setNewQuestion(e.target.value)}
                    />
                    <div className='form_footer'>
                        {user ? (
                            <div className='user_info'>
                                <img src={user.avatar} alt={user.name}/>
                                <span>{user.name}</span>
                            </div>
                            ) : (
                            <span>para enviar uma pergunta, <button>Faça seu login</button>.</span>
                        )}
                    <Button type='submit' disabled={!user}>
                        Enviar pergunta
                    </Button>
                    </div>
                </form>
            
            </main>
            
        </div>
    )
}