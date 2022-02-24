import { Button } from 'antd'
import React from 'react'


export default function ButtonItem({
    label = '',
    icon = <></>,
    onClick = () => { },
    size = "middle",
    type = "primary",
    htmlType = "button",
    disabled = false,
    hidden = false,
    block = false,
    loading = false

}) {
    return (
        <Button
            danger
            icon={icon}
            size={size}
            onClick={onClick}
            type={type}
            htmlType={htmlType}
            disabled={disabled}
            hidden={hidden}
            block={block}
            loading={loading}
        >
            {label}
        </Button>
    )
}


