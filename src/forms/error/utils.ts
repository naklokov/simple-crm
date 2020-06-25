import { HTTP_CODES } from "../../constants/http";
import { ExceptionStatusType } from 'antd/lib/result'

export const getErrorInfo = (code: number, t: Function): { title: string, status: ExceptionStatusType } => {
    switch (code) {
        case HTTP_CODES.UNAUTHORIZED:
        case HTTP_CODES.FORBIDDEN:
        case HTTP_CODES.BAD_REQUEST:
            return {
                title: t('title.client'),
                status: 403
            }
        case HTTP_CODES.NOT_FOUND:
            return {
                title: t('title.404'),
                status: 404
            }
        default:
            return {
                title: t('title.server'),
                status: 500
            }
    }
}