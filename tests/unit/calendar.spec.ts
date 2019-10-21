/* eslint-disable*/

import { expect } from 'chai'
import {
  isLeapYear
} from '@/utils/calendar.ts'

describe('测试utils/calendar.ts', () => {

  describe('测试闰年判断函数isLeapYear', () => {
    const yearLeap = [2016, 2020, 2024]
    const yearCommon = [2017, 2018, 2019, 2021]
    yearLeap.forEach(item => {
      it(`${item}`, () => {
        expect(isLeapYear(item)).to.be.true
      })
    })
    yearCommon.forEach(item => {
      it(`${item}`, () => {
        expect(isLeapYear(item)).to.be.false
      })
    })
  })
})
