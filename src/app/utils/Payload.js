
const payloadProps = {
    params: {},
    type: ''
}
export const Payload = ({ params, type } = payloadProps) => {
    return ({
        type: type,
        payload: params
    });
}
