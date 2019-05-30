import React, {Component} from 'react';
//import { TransitionGroup } from 'react-transition-group'
import { formatMoney, onlyNumbers } from '../../utils'
import RangeSlider from '../RangeSlider/RangeSlider'
import './App.sass'
import C from '../../config'

const Summary = ({loan, payment, percents}) => {
    return(
        <div>Summary</div>
    )
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loanCalc: 'loanCalc',
            showInfo: false,
            message: null,
            carPrice: C.DEFAULT_PRICE,
            terms: C.DEFAULT_TERMS,
            loan: formatMoney( C.DEFAULT_PRICE * C.LOAN_PART),
            payment: null,
            percents: this.getPercents(C.DEFAULT_PRICE)
        }
        this.carPriceHandle = this.carPriceHandle.bind(this)
        this.termsHandle = this.termsHandle.bind(this)
        this.getPercents = this.getPercents.bind(this) 
        this.getPayment = this.getPayment.bind(this) 
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
        const loan = formatMoney( carPrice * C.LOAN_PART)
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
            <p style={{color: '#fff'}}> 
                Сумма залога: {loan}
            </p>
            <p>
                Платеж {`${payment}`}
            </p>
            <p style={{color: '#fff'}}> 
                Цена: {carPrice} ({percents}%)
            </p>
            <p style={{color: '#fff'}}> 
                Срок: {terms}
            </p>
            <RangeSlider
                id="priceInput"
                postfix="₽"
                defValue={carPrice}
                title={'Стоимость авто'}
                maxValue={C.MAX_PRICE}
                minValue={C.MIN_PRICE}
                format={formatMoney}
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
            <Summary/>
        </div>
    }
}


export default App