import '../styles/question.scss'
export const Question = ({content, author, children}) => {
    return (
        <div className='question'>
            <p>{content}</p>
            <footer>
                <div className='user_info'>
                    <img src={author.avatar} alt={author.name}/>
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}