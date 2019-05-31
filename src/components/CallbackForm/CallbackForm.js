import React, {Fragment, useState, useEffect} from 'react'
import InputMask from 'react-input-mask'
import { CSSTransition } from 'react-transition-group'
import okImg from '../../img/verified.svg'
import failImg from '../../img/not-verified.svg'
import './CallbackForm.sass'

const InputPhone = ({value, onChange,phoneValid}) => (
    <InputMask mask="+7 (999) 999 99 99" value={value} onChange={onChange}>
      {(inputProps) => <input
            type="tel"
            style={{border: `${!phoneValid ? '1px solid red' : '1px solid transparent' }`}}
            placeholder="+7 (___) ___ __ __"
            className="loan-form__phone"
            {...inputProps}    
        />}
    </InputMask>
  );
  
const CallbackForm = ({reqData}) => {
    const [phone, setPhone] = useState("")
    const [displayStatus, setDisplayStatus] = useState(false)
    const [result, setResutl] = useState(true)
    const [phoneValid, setPhoneValid] = useState(true)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const re = /^\+7\s\(([0-9]{3})\)\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})$/

        if (!re.test(phone)) {
            setPhoneValid(false)
            return;
        }

        if (!phoneValid) 
            setPhoneValid(true)

        fetch('/api/', {
            method: 'POST', body: JSON.stringify(reqData),
            headers:{'content-type': 'application/json'}
        })
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            } else {
                console.error("Unknown error");
                setResutl(false)
                setDisplayStatus(true)
                setTimeout(function() {
                    setDisplayStatus(false)
                }, 2000)
            }
        })
        .then(data => {
            const {result:res} = data
            setResutl(res)
            setDisplayStatus(true)
            setTimeout(function() {
                setDisplayStatus(false)
            }, 2000)
        }) 
        .catch(e => {
            console.error('++++++++++++++ ERR >> +++++++++++++++\r\n', e)
            setResutl(false)
            setDisplayStatus(true)
            setTimeout(function() {
                setDisplayStatus(false)
            }, 2000)
            console.error('++++++++++++++ << ERR +++++++++++++++\r\n')
        })
    }
    
    return(
        <Fragment>
            <form className="loan-form" onSubmit={handleSubmit}>
                <div className="loan-form__wrapper">
                    <InputPhone
                        phoneValid={phoneValid}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}    
                    />
                    <input type="submit" className="loan-form__phone" value="Заказать звонок"/>
                </div>
                <CSSTransition
                    in={displayStatus}
                    timeout={300}
                    classNames="fade-status"
                    unmountOnExit
                >
                    <div className="loan-order__status">
                        {
                            result ? 
                                <img src={okImg} className="loan-order__img" alt="Спасибо! Ваша заявка принята"/> :
                                <img src={failImg} className="loan-order__img" alt="Извините, возникла ошибка"/>
                        }
                        <h4>
                        { result ?
                            `Спасибо! Ваша заявка принята, наш специалист скоро свяжется с вами` :
                            `Извините, возникла ошибка, попробуйте позднее или позвоните нам` }
                        </h4>
                    </div>
                </CSSTransition>
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
