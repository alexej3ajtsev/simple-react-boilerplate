import React, {useState} from 'react'
import Slider from 'react-rangeslider'
import { onlyNumbers, compareValue } from '../../utils'
import C from '../../config'
import 'react-rangeslider/lib/index.css'
import './RangeSlider.sass'

const RangeSlider = ({id, postfix="", format=f=>f, defValue=0, maxValue=100, minValue=0, title="{TITLE}", onChange = f=>f}) => {
    const [val, setVal] = useState(defValue)
    const labels = {[minValue]: format(minValue), [maxValue] : format(maxValue)}
    
    const handleChange = (val) => {
        const _val = val || 0
        if (compareValue(0, maxValue, _val)) {
            setVal(_val)
            onChange(_val)
        }
    }

    const inputHandleChange = (e) => {
        const val = parseInt( onlyNumbers(e.target.value) )

        handleChange(val)
    }

    return(
        <div className="range-slider">
            <div className="range-slider__header-row">
                <h3 className="range-slider__header">
                    {title}
                </h3>
                <div className="range-slider__input">
                    <input
                        id={id}
                        type="text"
                        value={format(val)}
                        onChange={inputHandleChange}
                    />
                    <label htmlFor={id}>
                        <small>{` ${postfix}`}</small>
                    </label>
                </div>
            </div>
            <div className="range-slider__wrapper">
                <Slider
                    tooltip={true}
                    labels={labels}
                    format={format}
                    value={val}
                    min={minValue}
                    max={maxValue}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
export default RangeSlider