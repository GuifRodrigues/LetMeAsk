import '../styles/button.scss'

export const Button = ({isOutlined = false, ...props }) => {
    return (
        <button 
        className={`button ${isOutlined ? 'outlined' : ''}`}
        {...props}
        
        />
    )
}