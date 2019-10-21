<template>
  <div id="app">
    <Calendar :dateNote="dateNote"
      noteColor="blue"
      end="2020-6-20"
      :limit="1"
      @exceed="exceed"
      :todayHighLight='true'
      :readOnly="false"
      :disableDate="disableDate"
      @change="change"
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
    month: 5,
    day: 30
  }]

  dateNote: {} = {
    20190501: '自定义',
    20190619: '自定义'
  }

  disableDate: number[] | null = [
    20190702,
    20190703
  ]

  click (e: any) {
    console.log(e)
  }

  exceed () {
    console.log('====================================')
    console.log('exceed')
    alert('超过数量')
    console.log('====================================')
  }

  change (data:any) {
    console.log(data)
  }
}
</script>
