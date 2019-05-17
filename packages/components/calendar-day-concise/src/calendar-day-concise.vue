<template>
  <div class="day"
    :class="dayClass"
    :style="fontStyle"
    @click.stop="click">
    <div class="day__day"
      :style="activeStyle">
      <span>{{day.day}}</span>
      <span class="dot"
        v-if="showToday"
        :style="activeDotStyle"></span>
    </div>
    <div class="day__text" :style="`color:${noteColor};`">{{day.note}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { CalendarDay } from '../../../types/calendar'

@Component({
  name: 'CalendarDayConcise'
})
export default class CalendarDayConcise extends Vue {
  @Prop({
    type: String,
    required: false,
    default: '#57D089'
  }) themeColor!: string

  @Prop({
    type: String,
    required: false,
    default: '#606266'
  }) fontColor!: string

  @Prop({
    required: false,
    default: '#606266'
  }) noteColor!: string

  @Prop({
    type: Boolean,
    required: false,
    default: true
  }) disabledLine!: boolean

  @Prop({
    type: Object,
    required: true,
    default: {}
  }) day!: CalendarDay

  @Prop({
    type: Boolean,
    required: false,
    default: false
  }) active!: boolean

  @Prop({
    type: Boolean,
    required: false,
    default: true
  }) todayHighLight!: boolean

  @Emit()
  private click (): void { }

  private get showToday (): boolean {
    return this.todayHighLight && !!this.day.isToday
  }

  private get dayClass (): object {
    return {
      'disabled': !this.day.disable,
      'delete-line': this.disabledLine && !this.day.disable && !this.active,
      'active': this.active
    }
  }

  private get fontStyle (): object {
    return {
      color: this.day.disable ? this.fontColor : ''
    }
  }

  private get activeStyle (): object {
    return {
      backgroundColor: this.active ? this.themeColor : '#ffffff',
      color: this.todayHighLight && this.day.isToday ? this.themeColor : 'inherit'
    }
  }

  private get activeDotStyle (): object {
    return {
      backgroundColor: this.active ? '#ffffff' : this.themeColor
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./calendar-day-concise.scss";
</style>
