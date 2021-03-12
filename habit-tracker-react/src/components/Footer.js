import { FaGithubAlt } from 'react-icons/fa'

const Footer = () => {
    return (
        <div id='footer'>
            <div id='footer-links'>
                <span>How to Use</span>
                <div className='footer-link-separator'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <span>About</span>
                <div className='footer-link-separator'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <a href="https://github.com/mwroberts3/habit-tracker" target="blank">
            <FaGithubAlt size={20} style={{marginRight: '5px'}}/>
            </a>
                <div className='footer-link-separator'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <span>v1.0.0 2021</span> 
            </div>
        </div>
    )
}

export default Footer
