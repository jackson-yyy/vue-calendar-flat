<template>
  <div id="app">
    <Calendar :dateNote="dateNote"
      end="2020-2"
      :limit="3"
      @exceed="exceed"
      :todayHighLight='true'
      :readOnly="false"
      v-model="chose"></Calendar>
     <CalendarDayConcise :day="{
        year: 2019,
        month: 4,
        day: 3,
        disable:true
      }"></CalendarDayConcise>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { Calendar, CalendarDayConcise } from 'vue-calendar-flat'
import { Calendar, CalendarDayConcise } from '../packages'
@Component({
  components: {
    Calendar,
    CalendarDayConcise
  }
})
export default class App extends Vue {
  chose: {}[] = [{
    year: 2019,
    month: 4,
    day: 3
  }]

  dateNote:{}={
    20190401: '情人节',
    20190419: '情人节'
  }

  click (e: any) {
    console.log(e)
  }

  exceed () {
    console.log('====================================')
    console.log('exceed')
    console.log('====================================')
  }

  change (date: any) {
    console.log('====================================')
    console.log(date)
    console.log('====================================')
  }
}
</script>
