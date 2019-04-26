import Calendar from './components/calendar'
import CalendarDayConcise from './components/calendar-day-concise'

const components: {
  [key: string]: any
} = {
  Calendar,
  CalendarDayConcise
}

const install: any = function (Vue: any) {
  if (install.installed) return
  install.installed = true
  Object.entries(components).map(([name, component]) => Vue.component(name, component))
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

export {
  Calendar,
  CalendarDayConcise
}

export default {
  install
}
