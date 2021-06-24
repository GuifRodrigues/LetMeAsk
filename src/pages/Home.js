import {useState} from 'react'
import {useHistory} from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImage from '../assets/images/google-icon.svg'
import {Button} from '../components/Button'
import {database} from '../services/firebase'
import {useAuth} from '../hooks/useAuth' 

import '../styles/auth.scss'

export const Home = () => {
    const history = useHistory()
    const {user, signInWithGoogle} = useAuth()
    const [roomCode, setRoomCode] = useState('')
    
    const handleCreateRoom = async () => {
       if (!user) {
           await signInWithGoogle()
       }
        history.push('/rooms/new')
        
    }
    
    const handlejoinRoom = async (e) => {
        e.preventDefault()
        
        if(roomCode.trim() === ''){
            return
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get()
        
        if(!roomRef.exists()){
            alert('Room does not exist.')
            return 
        }
        
        if(roomRef.val().ended_at ){
            alert('sala já encerrada!')
            return
        }
        
        history.push(`/rooms/${roomCode}`)
        
        console.log(roomCode);
    }
    
    return (
        <div id='page_auth'>
            <aside>
                <img src={ilustrationImg} alt='Ilustração simbolizando perguntas e respostas'/>
                <strong>Crie salas Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main_content'>
                    <img src={logoImg} alt='LetMeAsk'/>
                    <button onClick={handleCreateRoom} className='create_room'>
                        <img src={googleIconImage} alt='Logo do google'/>
                        Crie sua sala com o google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handlejoinRoom}>
                        <input
                        type='text'
                        placeholder='Digite o código da sala'
                        onChange={e => setRoomCode(e.target.value) } 
                        value={roomCode}
                        />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}