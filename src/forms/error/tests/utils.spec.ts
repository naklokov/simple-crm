import { getErrorInfo } from "../utils"
import { useTranslation } from "react-i18next"

test('getErrorInfo - client error', () => {
    const tSpy = jest.fn((arg) => arg)
    expect(getErrorInfo(401, tSpy))
        .toEqual({
            title: 'title.client',
            status: 403
        })
    expect(tSpy).toHaveBeenCalledTimes(1)
})

test('getErrorInfo - 404 error', () => {
    const tSpy = jest.fn((arg) => arg)
    expect(getErrorInfo(404, tSpy))
        .toEqual({
            title: 'title.404',
            status: 404
        })
    expect(tSpy).toHaveBeenCalledTimes(1)
})

test('getErrorInfo - server error', () => {
    const tSpy = jest.fn((arg) => arg)
    expect(getErrorInfo(500, tSpy))
        .toEqual({
            title: 'title.server',
            status: 500
        })
    expect(tSpy).toHaveBeenCalledTimes(1)
})