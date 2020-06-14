import React from 'react'
import { Result } from 'antd'
import { useTranslation } from 'react-i18next'

import { getErrorInfo } from './utils'

interface ErrorProps {
    code?: number,
    message?: string
}

export const Error = ({ code = 500, message }: ErrorProps) => {
    const [t] = useTranslation('error');
    const { status, title } = getErrorInfo(code, t)
    return (
        <Result
            status={status}
            title={title}
            subTitle={message || t('subtitle.default')}
        />
    )
}

export default Error