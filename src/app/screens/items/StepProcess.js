import { Steps } from 'antd'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ListStepAction, LIST_STEP } from "../../redux/actions/FormAction";

const { Step } = Steps;
const StepProcess = ({ current, profile }) => {
    const dispatch = useDispatch()
    const listStep = useSelector(state => state?.main?.[LIST_STEP])
    const [step, setStep] = useState(0);

    const setListField = () => {
        console.log('StepProcess ', current, listStep)
        let list = []
        if (listStep?.result) {
            let steps = [...(listStep?.result)]
            steps = steps.filter(i => i.id !== '2')
            if (current.stepId !== '6') {
                steps = steps.filter(i => i.id !== '6')
            }
            if (current.stepId !== '7') {
                steps = steps.filter(i => i.id !== '7')
            }
            if (current.stepId !== '8') {
                steps = steps.filter(i => i.id !== '8')
            }
            if (!current.typeId === "2") {
                steps = steps.filter(i => i.id !== '9')
            } else {
                steps = steps.filter(i => i.id !== '3' && i.id !== '4' && i.id !== '5')
            }

            let a = steps.filter(i => i.id === '10')
            let b = steps.filter(i => i.id === '11')

            if (current.formStatus === '3') {
                steps = steps.filter(i => i.id !== '3' && i.id !== '4' && i.id !== '5')
            }
            steps.sort((a, b) => (a.step_no > b.step_no) ? 1 : -1)
            steps?.map(step => {
                let s = step.name?.split(' ')
                list.push(<Step title={s.length > 1 ? s[0] : 'Admin'} description={s.length > 1 ? step.name.replace(s[0], '') : step.name} />)
            })
        }
        return list
    }

    return (
        <Steps size="small" current={step} percent={60}>
            {setListField()}
        </Steps>
    )
}

export default StepProcess;

