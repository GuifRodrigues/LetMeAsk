import {Link} from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import {Button} from '../components/Button'

import '../styles/auth.scss'


export const NewRoom = () =>{
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
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                        type='text'
                        placeholder='Nome da sala'
                        />
                        <Button type='submit'>Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to='/'>clique aqui.</Link></p>
                </div>
            </main>
        </div>
    )
}