import React from 'react'
import { Typography } from 'antd'
import { logo } from '../../../../assets/img'

import style from './header.module.scss'
import { useTranslation } from 'react-i18next'

export const Header = () => {
    const [t] = useTranslation('login')
    return (
        <React.Fragment>
            <div className={style.imgContainer}>
                <img
                    className={style.img}
                    alt="logo"
                    src={logo}
                />
            </div>
            <Typography.Title 
                className={style.title} 
                level={2}
            >
                {t('title')}
            </Typography.Title>
        </React.Fragment>
    )
}