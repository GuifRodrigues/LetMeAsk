import {useHistory} from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImage from '../assets/images/google-icon.svg'
import {Button} from '../components/Button'
import {useAuth} from '../hooks/useAuth' 

import '../styles/auth.scss'

export const Home = () => {
    const history = useHistory()
    const {user, signInWithGoogle} = useAuth()
    
    const handleCreateRoom = async () => {
       if (!user) {
           await signInWithGoogle()
       }
        history.push('/roons/new')
        
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
                    <form>
                        <input
                        type='text'
                        placeholder='Digite o código da sala'
                        />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}