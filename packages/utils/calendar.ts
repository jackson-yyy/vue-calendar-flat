
import { Calendar2d, CalendarFlat, CalendarDay, NaturalDay } from '../types/calendar'
// 类型接口
interface Months {
  readonly [key: number]: number;
}

/**
 *判断两个日期大小
 *
 * @export
 * @param {NaturalDay} {
 *   year: y1,
 *   month: m1,
 *   day: d1
 * }
 * @param {NaturalDay} {
 *   year: y2,
 *   month: m2,
 *   day: d2
 * }
 * @returns {number}
 */
export function compareDate ({
  year: y1,
  month: m1,
  day: d1
}: NaturalDay, {
  year: y2,
  month: m2,
  day: d2
}: NaturalDay): number {
  const date1 = (new Date(Date.parse(`${y1}/${m1}/${d1}`))).getTime()
  const date2 = (new Date(Date.parse(`${y2}/${m2}/${d2}`))).getTime()
  switch (true) {
    case date1 - date2 > 0:
      return 1
    case date1 - date2 === 0:
      return 0
    case date1 - date2 < 0:
      return -1
    default: return 1
  }
}

/**
 *判断是否为闰年
 *
 * @export
 * @param {number} year
 * @returns {boolean}
 */
export function isLeapYear (year: number): boolean {
  const condition1 = year % 4 === 0 // 4的倍数
  const condition2 = year % 100 !== 0 // 不能为100的倍数
  const condition3 = year % 400 === 0 // 可以是400的倍数
  const condition = (condition1 && condition2) || condition3
  if (condition) {
    return true
  }
  return false
}

/**
 *获取某一年所有月份的天数
 *
 * @export
 * @param {number} year
 * @returns {Months}
 */
export function getMonthsDays (year: number): Months {
  let feb = 28
  if (isLeapYear(year)) {
    feb = 29
  }
  return {
    1: 31,
    2: feb,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }
}

/**
 *计算某年某月某日是周几
 *
 * @export
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {number}
 */
export function getDayOfWeek (year: number, month: number, day: number): number {
  // 月份修正
  let jan: number = isLeapYear(year) ? 5 : 6
  let feb: number = isLeapYear(year) ? 1 : 2
  const correction: {
    [key: number]: number
  } = {
    1: jan,
    2: feb,
    3: 2,
    4: 5,
    5: 0,
    6: 3,
    7: 5,
    8: 1,
    9: 4,
    10: 6,
    11: 2,
    12: 4
  }
  // 世纪（两位数）
  let century: number = Math.floor(year / 100)
  // 年份（两位数）
  let centuryYear: number = year % (century * 100)

  // 冯思琮公式，计算某一天是周几
  let res = (Math.floor(centuryYear / 4) + centuryYear % 7 - 2 * (century % 4) + correction[month] + day) % 7

  return res === 0 ? 7 : res
}

/**
 *计算出某年某月的日历数组
 *
 * @export
 * @param {number} year
 * @param {number} month
 * @returns {Calendar2d}
 */
export function getCalendar (year: number, month: number): Calendar2d {
  // 获取今天的日期,用于判断是否isToday
  const dateCurrent: Date = new Date()
  const yearCurrent: number = dateCurrent.getFullYear()
  const monthCurrent: number = dateCurrent.getMonth() + 1
  const dayCurrent: number = dateCurrent.getDate()

  // 所选的
  const monthChosePre: number = month - 1 || 12
  const monthChoseNext: number = (month + 1) % 12 || 12

  // 获取所有月份的天数
  const monthsDays = getMonthsDays(year)
  // 计算1号是周几
  const firstDayOfWeek = getDayOfWeek(year, month, 1)

  // 初始化日历
  let calendar: CalendarFlat = []
  let pre: CalendarFlat = []
  let current: CalendarFlat = []
  let next: CalendarFlat = []

  let preNumber = firstDayOfWeek !== 7 ? firstDayOfWeek : 0
  let currentNumber = monthsDays[month]
  let nextNumber = 42 - preNumber - currentNumber

  // 往前面添加上个月的末尾
  if (preNumber > 0) {
    let monthsDaysPre = monthsDays[monthChosePre]
    for (let i = monthsDaysPre - preNumber + 1; i <= monthsDaysPre; i++) {
      pre.push({
        year,
        month: monthChosePre,
        day: i,
        disable: false,
        isToday: yearCurrent === year && monthCurrent === monthChosePre && dayCurrent === i
      })
    }
  }

  // 当前月
  current = [...Array(currentNumber).keys()].map(item => ({
    year,
    month,
    day: item + 1,
    disable: true,
    isToday: yearCurrent === year && monthCurrent === month && dayCurrent === item + 1
  }))

  // 下月
  next = [...Array(nextNumber).keys()].map(item => ({
    year,
    month: monthChoseNext,
    day: item + 1,
    disable: false,
    isToday: yearCurrent === year && monthCurrent === monthChoseNext && dayCurrent === item + 1
  }))

  calendar = [...pre, ...current, ...next]

  let res: Calendar2d = []
  calendar.forEach((item: CalendarDay, index) => {
    if (index % 7 === 0) {
      res.push([])
    }
    res[res.length - 1].push(item)
  })
  return res
}
