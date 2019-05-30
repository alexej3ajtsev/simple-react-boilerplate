import React, {Component} from 'react'
import img from '../../img/CALC.svg'
import { formatMoney, onlyNumbers } from '../../utils'

import CallbackForm from '../CallbackForm/CallbackForm'
import Summary from '../Summary/Summary'
import RangeSlider from '../RangeSlider/RangeSlider'
import './App.sass'
import C from '../../config'

class App extends Component {
    constructor(props) {
        super(props)

        this.carPriceHandle = this.carPriceHandle.bind(this)
        this.termsHandle = this.termsHandle.bind(this)
        this.getPercents = this.getPercents.bind(this) 
        this.getPayment = this.getPayment.bind(this) 

        const loan = formatMoney( C.DEFAULT_PRICE * C.LOAN_PART)
        const percents = this.getPercents(C.DEFAULT_PRICE)

        this.state = { 
            loanCalc: 'loanCalc',
            showInfo: false,
            message: null,
            carPrice: C.DEFAULT_PRICE,
            terms: C.DEFAULT_TERMS,
            loan,
            payment: this.getPayment(loan, C.DEFAULT_TERMS, percents),
            percents
        }
    }

    getPercents(carPrice) {
        let percents = C.PERCENT_STEP_1;

        if ((carPrice <= 500000) && (carPrice > 250000)) {
            percents = C.PERCENT_STEP_2
        }
        if ((carPrice <= 589000) && (carPrice > 500000)) {
            percents = C.PERCENT_STEP_3
        }
        if ((carPrice <= 1900000) && (carPrice > 589000)) {
            percents = C.PERCENT_STEP_4
        }
        if (carPrice > 1900000) {
            percents = C.PERCENT_STEP_5
        }
        return percents
    }
    getPayment(loan, terms, percents) {
        const _loan =  parseInt(onlyNumbers(loan))
        const onePercent = _loan/ 100
        const monthPercentPay = onePercent * percents
        const payment = (_loan / terms) + monthPercentPay
        
        return formatMoney(parseInt(payment))
    }
    carPriceHandle(carPrice) {
        const loan = formatMoney( parseInt(carPrice * C.LOAN_PART))
        const percents = this.getPercents(carPrice)
         
        this.setState(state => ({
            ...state,
            carPrice,
            loan,
            percents,
            payment: this.getPayment(loan, state.terms, percents)
        }))
    }

    termsHandle(terms) {
        const _terms = parseInt(onlyNumbers(terms))

        this.setState(state => ({
            ...state,
            terms:_terms,
            payment: this.getPayment(state.loan, _terms, state.percents)
        }))
    }

    render() {
        const {carPrice, terms, loan, percents, payment} = this.state

        return <div className="loan-calc">
            <h3 className="loan-calc__title">
                <img src={img} alt=""/>
                &nbsp;Раcчет займа
            </h3>
            <RangeSlider
                id="priceInput"
                postfix="₽"
                defValue={carPrice}
                title={'Стоимость имущества'}
                maxValue={C.MAX_PRICE}
                minValue={C.MIN_PRICE}
                format={formatMoney}
                step={10000 }
                onChange={this.carPriceHandle}
            />
            <RangeSlider
                id="termsInput"
                postfix="мес."
                defValue={terms}
                title={'Срок займа'}
                maxValue={C.MAX_TERMS}
                minValue={C.MIN_TERMS}
                onChange={this.termsHandle}
            />
            <Summary
                loan={loan}
                payment={payment}
                percents={percents}
            />
            <CallbackForm reqData={this.state}/>
        </div>
    }
}


export default App