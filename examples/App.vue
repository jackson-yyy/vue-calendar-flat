<template>
  <div id="app">
    <Calendar :dateNote="dateNote"
      noteColor="blue"
      start="2019-6-1"
      end="2020-6-20"
      :limit="3"
      @exceed="exceed"
      :todayHighLight='true'
      :readOnly="false"
      v-model="chose"></Calendar>
    <!-- <CalendarDayConcise :day="{
        year: 2019,
        month: 4,
        day: 3,
        disable:true
      }"></CalendarDayConcise> -->
    <div>已选：</div>
    <div v-for="(item,index) in chose"
      :key="index">{{item.year}}-{{item.month}}-{{item.day}}</div>
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
  chose: {
    year: number;
    month: number;
    day: number;
  }[] = [{
    year: 2019,
    month: 4,
    day: 3
  }]

  dateNote: {} = {
    20190501: '自定义',
    20190619: '自定义'
  }

  click (e: any) {
    console.log(e)
  }

  exceed () {
    console.log('====================================')
    console.log('exceed')
    alert('超过数量')
    console.log('====================================')
  }

  change (date: any) {
    console.log('====================================')
    console.log(date)
    console.log('====================================')
  }
}
</script>
