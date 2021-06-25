import '../styles/question.scss'
export const Question = ({content, author, children, isAnswered = false, isHighlighted = false }) => {
    return (
        <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted? 'highlighted' : ''}`}>
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