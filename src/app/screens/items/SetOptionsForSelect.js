/* eslint-disable no-unused-vars */
import { v4 as uuid } from 'uuid';
import { SELECT_ALL } from '../../utils/OptionSelectConstant'
import RemoveDuplicateArray from './RemoveDuplicateArray'
const SetOptionsForSelect = ({ value = '', label = '', data = [], showTextAll = false }) => {
    let options = []
    const list = data ?? []

    if (Array.isArray(data) && data.length > 0) {
        if(showTextAll){
            options.push({
                label: 'All', value: SELECT_ALL
            })
        }

        list.forEach((val, i) => {

            if (val[value]) {
                options.push({
                    key: uuid(), label: val[label], value: val[value]
                })
            }

            if (value === '') {
                options.push({
                    key: uuid(), label: val, value: val
                })
            }

        });

    }


    return RemoveDuplicateArray(options, 'value')

}

export const SetOptionsSplit = ({ value = '', label = '',key = uuid(), data = []}) => {
    let options = []
    const list = data ?? []

    function nullValue(value ,item) {
        return value == null ? item : value;
    }
    function conLabel(val) {
       var str = "";
       var cast =  label.split("#");
       
       cast.forEach(item => {
            str = str+ nullValue(val[item] , item)
        });

       return str
    }


    if (Array.isArray(data) && data.length > 0) {

        list.forEach((val, i) => {

            if (val[value]) {
                options.push({
                    key: uuid(), label: conLabel(val), value: val[value]+val[key]  ,record: val
                })
            }

            if (value === '') {
                options.push({
                    key: uuid(), label: val, value: val 
                })
            }

        });
    }
    return options
}

export const SetOptionsForSelectSetLable = ({ value = '', label = '', data = []}) => {
    let options = []
    const list = data ?? []

    function nullValue(value ,item) {
        return value == null ? item : value;
    }
    function conLabel(val) {
       var str = "";
       var cast =  label.split("#");
       
       cast.forEach(item => {
            str = str+ nullValue(val[item] , item)
        });

       return str
    }


    if (Array.isArray(data) && data.length > 0) {

        list.forEach((val, i) => {

            if (val[value]) {
                options.push({
                    key: uuid(), label: conLabel(val), value: val[value]  ,record: val
                })
            }

            if (value === '') {
                options.push({
                    key: uuid(), label: val, value: val 
                })
            }

        });
    }
    return RemoveDuplicateArray(options, 'value')
}

export const SetLableOptionsByIndex = ({ value = '', label = '', data = [] }) => {
    let options = []
    const list = data[value] ?? []

    function nullValue(value ,item) {
        return value == null ? item : value;
    }
    function conLabel(val,index) {
       var str = "";
       var cast =  label.split("#");
       
       cast.forEach(item => {
           const sentData = val[item] !== undefined ? val[item][index] : item
            str = str+ nullValue(sentData, item)
        });
       return str
    }

        list.forEach((val, i) => {
            options.push({
                key: uuid(), label: conLabel(data,i), value: val
            })

        });

    // return RemoveDuplicateArray(options, 'value')
    return options

}

export const SetOptionsGetRecord = ({ value = '', label = '', data = [] }) => {
    let options = []
    const list = data ?? []

    if (Array.isArray(data) && data.length > 0) {

        list.forEach((val, i) => {

            if (val[value]) {
                options.push({
                    key: uuid(), label: val[label], value: val[value] , record: val
                })
            }

            if (value === '') {
                options.push({
                    key: uuid(), label: val, value: val
                })
            }

        });

    }


    return RemoveDuplicateArray(options, 'value')

}

export const SetOptionsByIndex = ({ data = [] }) => {
    let options = []
    const list = data ?? []
    console.log('val = ', data);
    if (Array.isArray(data) && data.length > 0) {
        list.forEach((val, i) => {
            console.log('val = ', val);
            // if (val[value]) {
            //     options.push({
            //         key: uuid(), label: val[label], value: val[value]
            //     })
            // }

            // if (value === '') {
            options.push({
                key: uuid(), label: val, value: val
            })
            // }

        });

    }



    return RemoveDuplicateArray(options, 'value')

}

export const ForChild = ({ name = '', child = '', data = [] }) => {

    let options = []
    const list = data ?? []
    list.forEach((val, _) => {
        options.push(...SetOptionsForSelect({ label: name, value: name, data: val[child] }))
    });
    const arr = RemoveDuplicateArray(options, 'value')
    return arr.map((item, index) => ({ ...item, key: index }))
}

export const ForDeepChild = ({ name = '', child = '', deepChild = '', data = [] }) => {

    let options = []
    const list = data ?? []
    list.forEach((val, _) => {
        val[child].forEach((val, _) => {
            options.push(...SetOptionsForSelect({ label: name, value: name, data: val[deepChild] }))
        });

    });
    const arr = RemoveDuplicateArray(options, 'value')
    return arr.map((item, index) => ({ ...item, key: index }))
}

export default SetOptionsForSelect
