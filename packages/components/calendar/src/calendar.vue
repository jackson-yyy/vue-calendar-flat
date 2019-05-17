<template>
  <div class="calendar"
    :style="fontStyle">
    <div class="top">
      <img :src="require('../../../icons/double-arrow-left.png')"
        alt=""
        class="top__icon--left"
        v-if="canYearOperationShow"
        @click.stop="decreaseYear">
      <img :src="require('../../../icons/arrow-left.png')"
        alt=""
        class="top__icon--left"
        v-if="canMonthOperationShow"
        @click.stop="decreaseMonth">
      <span class="top__text">{{year}} 年 {{month}} 月</span>
      <img :src="require('../../../icons/arrow-right.png')"
        alt=""
        class="top__icon--right"
        v-if="canMonthOperationShow"
        @click.stop="increaseMonth">
      <img :src="require('../../../icons/double-arrow-right.png')"
        alt=""
        class="top__icon--right"
        v-if="canYearOperationShow"
        @click.stop="increaseYear">
    </div>

    <div class="weekdays"
      :style="fontStyle">
      <div class="weekdays__item"
        v-for="item in weekdays"
        :key="item">{{item}}</div>
    </div>

    <div class="content">
      <div class="content__row"
        v-for="(week,index) in calendarFilterLastRow"
        :key="index">
        <div class="day"
          v-for="day in week"
          :key="day.day">
          <CalendarDayConcise :day="day"
            :active="isExist(day)>=0"
            v-bind="propPass"
            @click="choose(day)"></CalendarDayConcise>
        </div>
      </div>
      <div class="content__row"
        :style="lastRowStyle">
        <div class="day"
          v-for="day in calendarLastRow"
          :key="day.day">
          <CalendarDayConcise :day="day"
            :active="isExist(day)>=0"
            v-bind="propPass"
            @click="choose(day)"></CalendarDayConcise>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { getCalendar, getMonthsDays, compareDate } from '../../../utils/calendar'
import { Calendar2d, CalendarDay, NaturalDay, CalendarBuffer, CalendarFlat } from '../../../types/calendar'
import CalendarDayConcise from '../../calendar-day-concise/src/calendar-day-concise.vue'
const weekdays: string[] = ['日', '一', '二', '三', '四', '五', '六']
const dateCurrent: Date = new Date()
const yearCurrent: number = dateCurrent.getFullYear()
const monthCurrent: number = dateCurrent.getMonth() + 1
const dayCurrent: number = dateCurrent.getDate()

@Component({
  name: 'calendar',
  components: {
    CalendarDayConcise
  }
})
export default class Calendar extends Vue {
  @Prop({
    required: false,
    default: '#57D089'
  }) themeColor!: string

  @Prop({
    required: false,
    default: '#606266'
  }) fontColor!: string

  @Prop({
    required: false,
    default: '#606266'
  }) noteColor!: string

  @Prop({
    required: false,
    default: false
  }) disabledLine!: boolean

  @Prop({
    required: false,
    default: false
  }) readOnly!: boolean

  @Prop({
    required: false,
    default: 1
  }) limit!: number

  @Prop({
    required: false,
    default: () => {
      return {}
    }
  }) dateNote!: {
    [key: number]: string
  }

  @Prop({
    required: false,
    default: () => {
      return []
    }
  }) value!: NaturalDay[]

  @Prop({
    required: false,
    default: `${yearCurrent}-${monthCurrent}-${dayCurrent}`,
    validator: value => {
      let [year, month, day] = value.split('-')

      if (day === 0 || day > getMonthsDays(year)[month]) {
        console.warn('Calendar:day of prop start is invalid.')
        return false
      }

      if (!Number(year) || !Number(month) || !Number(day)) {
        console.warn('Calendar:prop start should be formatted like YYYY-MM-DD.')
        return false
      }
      if (month - 0 < 1 || month - 0 > 12) {
        console.warn('Calendar:month of prop start is invalid.')
        return false
      }
      return true
    }
  }) start!: string

  @Prop({
    required: false,
    default: '9999-12-31',
    validator: function (value) {
      let [year, month, day] = value.split('-')

      if (day === 0 || day > getMonthsDays(year)[month]) {
        console.warn('Calendar:day of prop start is invalid.')
        return false
      }

      if (!Number(year) || !Number(month) || !Number(day)) {
        console.warn('Calendar:prop start should be formatted like YYYY-MM.')
        return false
      }
      if (month - 0 < 1 || month - 0 > 12) {
        console.warn('Calendar:month of prop start is invalid.')
        return false
      }
      return true
    }
  }) end!: string

  private weekdays: string[] = weekdays
  private year: number = yearCurrent
  private month: number = monthCurrent
  private day: number = dayCurrent
  private calendar: Calendar2d = []
  private chose: NaturalDay[] = []
  private choseBuffer: CalendarBuffer = {}

  // 可选日期范围
  private startDate: NaturalDay = {
    year: yearCurrent,
    month: monthCurrent,
    day: dayCurrent
  }
  private endDate: NaturalDay = {
    year: yearCurrent,
    month: monthCurrent,
    day: dayCurrent
  }

  @Emit()
  private exceed () { }

  @Emit('input')
  private emitChose (date: NaturalDay[]) { }

  private get propPass (): object {
    return {
      ...this.$attrs,
      themeColor: this.themeColor,
      fontColor: this.fontColor,
      noteColor: this.noteColor,
      disabledLine: this.disabledLine
    }
  }

  private get fontStyle (): object {
    return {
      color: this.fontColor,
      fill: this.fontColor
    }
  }

  private get activeStyle (): object {
    return {
      backgroundColor: this.themeColor
    }
  }

  private get canYearOperationShow (): boolean {
    return this.startDate.year < this.endDate.year
  }

  private get canMonthOperationShow (): boolean {
    return this.canYearOperationShow || this.startDate.month < this.endDate.month
  }

  private get calendarHandled (): Calendar2d {
    const self = this
    return this.calendar.map((week: CalendarFlat) => week.map((day: CalendarDay) => {
      let currentDay: number = Number(`${day.year}${String(day.month).padStart(2, '0')}${String(day.day).padStart(2, '0')}`)
      return {
        ...day,
        disable: day.disable && self.isInRange({
          year: day.year,
          month: day.month,
          day: day.day
        }),
        note: this.dateNote[currentDay] || ''
      }
    }
    ))
  }

  private get canLastRowShow (): boolean {
    let show = this.calendar[this.calendar.length - 1].reduce((show, { disable }) => {
      return !!(show || disable)
    }, false)
    return show
  }
  private get lastRowStyle (): string {
    return `visibility:${this.canLastRowShow ? 'visible' : 'hidden'}`
  }

  private get calendarFilterLastRow (): Calendar2d {
    let calendar = [...this.calendarHandled]
    calendar.pop()
    return calendar
  }

  private get calendarLastRow (): CalendarFlat | [] {
    return [...this.calendarHandled].pop() || []
  }

  private get isLimitReached (): boolean {
    return this.chose.length >= this.limit
  }

  created () {
    this.init()
  }

  private init (): void {
    this.initDateRange()
    // this.year = this.startDate.year
    // this.month = this.startDate.month
    // this.day = this.startDate.day
    this.initChose()
    this.getCalendar()
  }

  private initChose (): void {
    this.chose = this.value.filter(item => this.isInRange(item))
    this.emitChose(this.chose)
  }

  private initDateRange (): void {
    let [startYear, startMonth, startDay] = this.start.split('-').map(item => Number(item))
    let [endYear, endMonth, endDay] = this.end.split('-').map(item => Number(item))
    if (!startYear || !startMonth || !startDay) {
      console.warn('Calendar:prop start should be formatted like YYYY-MM-DD.')
      startYear = yearCurrent
      startMonth = monthCurrent
      startDay = dayCurrent
    }

    if (!endYear || !endMonth || !endDay) {
      console.warn('Calendar:prop end should be formatted like YYYY-MM-DD.')
      endYear = yearCurrent
      endMonth = monthCurrent
      endDay = dayCurrent
    }

    if (compareDate({
      year: startYear,
      month: startMonth,
      day: startDay
    }, {
      year: endYear,
      month: endMonth,
      day: endDay
    }) >= 0) {
      console.error('Calendar:start should be less than end.')
      endYear = startYear
      endMonth = startMonth
    }

    if (startYear > yearCurrent || (startYear === yearCurrent && startMonth > monthCurrent)) {
      this.year = startYear
      this.month = startMonth
    }

    this.startDate = {
      year: startYear,
      month: startMonth,
      day: startDay
    }

    this.endDate = {
      year: endYear,
      month: endMonth,
      day: endDay
    }
  }

  private isExist (date: NaturalDay): number {
    return this.chose.findIndex(({
      year,
      month,
      day
    }: NaturalDay) => year === date.year && month === date.month && day === date.day)
  }

  private choose ({ year, month, day, disable }: CalendarDay): void {
    if (this.readOnly || !disable) {
      return
    }
    let index = this.isExist({
      year,
      month,
      day
    })
    if (index === -1) {
      if (this.isLimitReached) {
        return this.exceed()
      }
      this.chose.push({
        year,
        month,
        day
      })
    } else {
      this.chose.splice(index, 1)
    }

    this.emitChose(this.chose)
  }

  private getCalendar (): Calendar2d {
    let year = this.year
    let month = this.month
    let key: number = Number(`${year}${String(month).padStart(2, '0')}`)
    let calendar: Calendar2d = this.choseBuffer[key]
    if (calendar) {
      this.calendar = calendar
      return calendar
    }

    calendar = getCalendar(year, month)
    this.calendar = calendar
    this.updateBuffer(year, month, calendar)
    return calendar
  }

  private updateBuffer (year: number, month: number, calendar: Calendar2d): CalendarBuffer {
    let key: number = Number(`${year}${String(month).padStart(2, '0')}`)
    this.choseBuffer[key] = calendar
    return this.choseBuffer
  }

  private increaseMonth (): number {
    if (this.month === 12) {
      this.month = 1
      this.year++
    } else {
      this.month++
    }
    this.correctDate()
    this.getCalendar()
    return this.month
  }

  private decreaseMonth (): number {
    if (this.month === 1) {
      this.month = 12
      this.year--
    } else {
      this.month--
    }
    this.correctDate()
    this.getCalendar()
    return this.month
  }

  private increaseYear (): number {
    this.year++
    this.correctDate()
    this.getCalendar()
    return this.year
  }

  private decreaseYear (): number {
    this.year--
    this.correctDate()
    this.getCalendar()
    return this.year
  }

  // 超出日期范围时将其设为边界值
  private correctDate (): void {
    if (this.year >= this.endDate.year) {
      this.year = this.endDate.year
      if (this.month >= this.endDate.month) {
        this.month = this.endDate.month
      }
    }
    if (this.year <= this.startDate.year) {
      this.year = this.startDate.year
      if (this.month <= this.startDate.month) {
        this.month = this.startDate.month
      }
    }
  }

  // 判断某一天是否在规定范围内
  private isInRange (date: NaturalDay): boolean {
    return compareDate(date, this.startDate) >= 0 && compareDate(this.endDate, date) >= 0
  }
}
</script>
<style lang='scss' scoped>
@import "./calendar.scss";
</style>
