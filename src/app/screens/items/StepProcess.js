import { Steps } from 'antd'
import React from 'react';
import { useSelector } from 'react-redux'
import { LIST_STEP } from "../../redux/actions/FormAction";

const { Step } = Steps;
const StepProcess = ({ current, index }) => {
    const listStep = useSelector(state => state?.main?.[LIST_STEP])

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
            if (current.typeId === '2' || current.typeId === 2) {
                steps = steps.filter(i => i.id !== '3' && i.id !== '4' && i.id !== '5')
            } else {
                steps = steps.filter(i => i.id !== '9')
            }
            let a = {...(steps.find(i => i.id === '10'))}
            let b = {...(steps.find(i => i.id === '11'))}
            // console.log('a b ', a, b)
            steps = steps.filter(i => i.id !== '10' && i.id !== '11')
            if ((current.stepId === '10' && current.formStatus === '3') || (current.stepId === '11' && current.formStatus !== '3')) {
                steps.splice(1, 0, a);
                steps.splice(2, 0, b);
                // console.log('steps a', steps)
            } else if ((current.stepId === '11' && current.formStatus === '3') || (current.stepId === '10' && current.formStatus !== '3')) {
                steps.splice(1, 0, b);
                steps.splice(2, 0, a);
                // console.log('steps b', steps)
            } else {
                steps.splice(1, 0, a);
                steps.splice(2, 0, b);
            }
            steps.sort((a, b) => (a.step_no > b.step_no) ? 1 : -1)
            steps?.map(step => {
                let s = step.name?.split(' ')
                list.push(<Step title={s?.length > 1 ? s[0] : 'Admin'} description={s?.length > 1 ? step.name.replace(s[0], '') : step.name} />)
            })
        }
        return list
    }

    return (
        <Steps size="small" current={index} percent={60}>
            {setListField()}
        </Steps>
    )
}

export default StepProcess;

