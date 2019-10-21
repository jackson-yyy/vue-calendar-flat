import Calendar from './src/calendar.vue'

(Calendar as any).install = function (Vue:any) {
  Vue.component(Calendar.name, Calendar)
}

export default Calendar
