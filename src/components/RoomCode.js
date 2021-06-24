import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

export const RoomCode = (props) => {
  
    const copyRoomCodeToClipboard = () => {
        navigator.clipboard.writeText(props.code)
    }
    return (
        <button className='room_code' onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt='copiar código da sala'/>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}