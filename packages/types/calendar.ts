/**
 *日历的每一天
 *
 * @export
 * @interface CalendarDay
 */
export interface CalendarDay {
  year:number;
  month:number;
  day: number;
  disable: boolean;
  note?: string;
  isToday?: boolean;
}

/**
 *扁平化的日历数组
 *
 * @export
 * @interface CalendarFlat
 * @extends {Array<CalendarDay>}
 */
export interface CalendarFlat extends Array<CalendarDay> {
  [index: number]: CalendarDay
}

/**
 *日历数组，为 7xn 的二维数组
 *
 * @export
 * @interface Calendar2d
 * @extends {Array<CalendarFlat>}
 */
export interface Calendar2d extends Array<CalendarFlat> {
  [index: number]: CalendarFlat
}

/**
 *已选的日期
 *
 * @export
 * @interface CalendarChose
 */
export interface CalendarChose {
  year: number
  month: number
  day: number
}

/**
 *缓冲选过的日历
 *
 * @export
 * @interface CalendarBuffer
 */
export interface CalendarBuffer {
  [key: number]: Calendar2d
}
