import CalendarDayConcise from './src/calendar-day-concise.vue'

(CalendarDayConcise as any).install = function (Vue:any) {
  Vue.component(CalendarDayConcise.name, CalendarDayConcise)
}

export default CalendarDayConcise
