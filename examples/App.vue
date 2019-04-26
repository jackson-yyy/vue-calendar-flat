<template>
  <div id="app">
    <vCalendar :dateNote="dateNote"
      end="2020-2"
      :limit="3"
      @exceed="exceed"
      :todayHighLight='true'
      :readOnly="false"
      v-model="chose"></vCalendar>
     <vCalendarDayConcise :day="{
        year: 2019,
        month: 4,
        day: 3,
        disable:true
      }"></vCalendarDayConcise>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { vCalendar } from 'vue-calendar-flat/components'
import { vCalendar, vCalendarDayConcise } from '../components'
@Component({
  components: {
    vCalendar,
    vCalendarDayConcise
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
