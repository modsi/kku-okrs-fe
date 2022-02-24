import { v4 as uuid } from 'uuid';

const RemoveDuplicateArray = (data = [], key = uuid()) => {
    let removeArrDup = []
    if (Array.isArray(data) && data.length > 0)
    removeArrDup = data.filter((obj, index, arr) => {
        return arr
        .map(mapObj => mapObj[key])
        .indexOf(obj[key]) == index;
    })
    
    return removeArrDup
}

export default RemoveDuplicateArray

