import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Contact() {
    return (
        <div className="body">
            <div>
                <h1 className="items-center">Contact Us</h1>
            </div>
            <div className="contact large-font">
                <p><SmartphoneIcon/> +91 9876543210</p>
                <p><AlternateEmailIcon/> helpdesk@logg.ac.in</p>
            </div>
        </div>
    );
}
