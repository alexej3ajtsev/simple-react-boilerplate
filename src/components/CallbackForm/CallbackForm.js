import React, {Fragment, useState} from 'react'
import InputMask from 'react-input-mask'
import axios from 'axios'
import './CallbackForm.sass'

// Will work fine
const InputPhone = ({value, onChange}) => (
    <InputMask mask="+7 (999) 999 99 99" value={value} onChange={onChange}>
      {(inputProps) => <input
            type="tel"
            placeholder="+7 (___) ___ __ __"
            className="loan-form__phone"
            {...inputProps}    
        />}
    </InputMask>
  );
  
const CallbackForm = ({reqData}) => {
    const [phone, setPhone] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // axios.post('/api', JSON.stringify(reqData))
        //     .then(response => {
        //         console.log("RESPONSE FROM SERVER", response)
        //     })
        //     .catch(e => console.log('++++++++++++++ERR+++++++++++++++\r\n', e))
    }

    return(
        <Fragment>
            <form className="loan-form" onSubmit={handleSubmit}>
                <div className="loan-form__wrapper">
                    <InputPhone
                        value={phone}
                        onChange={e => setPhone(e.target.value)}    
                    />
                    <input type="submit" className="loan-form__phone" value="Заказать звонок"/>
                </div>
                <div className="loan-order__status"></div>
            </form>
            <p className="loan-privacy">
                <i>
                Нажимая кнопку “Заказать звонок” вы соглашаетесть с&nbsp; 
                <a href="/privacy-policy.html" target="_blank">условиями сайта</a>
                </i> 
            </p>
            
        </Fragment>
    )
}

export default CallbackForm
