import axios from 'axios'
import dayjs from 'dayjs'

import { URLS } from '../constants'

enum LogLevelsEnum {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

interface LogProps {
    message: string,
    value?: string | number,
    username?: string,
    level: LogLevelsEnum
}

export const log = ({ 
    message, 
    value, 
    username = '', 
    level = LogLevelsEnum.ERROR
}: LogProps) => {
    const timestamp = dayjs().format('DD:MM:YYYY HH:mm:ss')
    const prefix = `[${timestamp}] ${level} | ${message} ${value} (${username})` 
    switch (level) {
        case LogLevelsEnum.DEBUG:
            console.log(message, value)
            break;
        case LogLevelsEnum.INFO:
            console.info(message, value)
            break;
        case LogLevelsEnum.WARNING:
            console.warn(message, value)
            break;
        case LogLevelsEnum.ERROR:
            console.error(message, value)
            break;
    }

    axios.post(URLS.log.base, { message: prefix, level })
}