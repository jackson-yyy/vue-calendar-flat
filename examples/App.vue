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
<<<<<<< HEAD
      @change="change"
=======
>>>>>>> 6a37d1a7fcea66d3c3af18771ff900aca2ab8042
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

<<<<<<< HEAD
  disableDate: number[] | null = [
    20190702,
    20190703
=======
  disableDate:number[] = [
    20190529,
    20190530,
    20190531
>>>>>>> 6a37d1a7fcea66d3c3af18771ff900aca2ab8042
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
