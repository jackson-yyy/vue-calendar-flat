# vue-calendar-flat
A flat style calendar component for vue,base on typescript.

![demo](https://github.com/polkYu/vue-calendar-flat/blob/master/examples/assets/demo.gif?raw=true)

### Getting Started

`npm install vue-calendar-flat`

or

`yarn add vue-calendar-flat`

**Reference in main.js/ts**
```
import Calendar from 'vue-calendar-flat'

Vue.use(Calendar)
```

**Load on demand**
```
<template>
  <div id="app">
    <Calendar :dateNote="dateNote"
      end="2020-2"
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
      <div v-for="(item,index) in chose" :key="index">{{item.year}}-{{item.month}}-{{item.day}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Calendar, CalendarDayConcise } from 'vue-calendar-flat'
@Component({
  components: {
    Calendar,
    CalendarDayConcise
  }
})
export default class App extends Vue {
  chose: {
    year:number;
    month:number;
    day:number;
  }[] = [{
    year: 2019,
    month: 4,
    day: 3
  }]

  dateNote:{}={
    20190401: '自定义',
    20190419: '自定义'
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
```

### Props

#### Calendar
attr | type | options | default | required | note
--- | --- | --- | --- | --- | --- 
themeColor | string | --- | #57D089 | false | 主题色
fontColor | string | --- | #606266 | false | 字体颜色
disabledLine | boolean | --- | false | false | 不可点击时横线划掉
readOnly | string | --- | false | false | 只读
limit | number | --- | 1 | false | 选择数量限制
dateNote | {<br> [key: number]: string <br>} | --- | --- | false | 某个日期的备注
disableDate |  number:[]  | --- | --- | false | 可选日期，如果不给或者为[]，则默认都可以选
noteColor | string | --- | #606266 | false | 备注颜色
value |{<br>year: number;<br>month: number;<br>day: number;<br>}[] |--- | --- | true | 已选日期
start | string | --- | `${yearCurrent}-${monthCurrent}-${dayCurrent}` | false | 开始日期
end | string | --- | 9999-12-31 | false | 结束日期

#### CalendarDayConcise
attr | type | options | default | required | note
--- | --- | --- | --- | --- | --- 
themeColor | string | --- | #57D089 | false | 主题色
fontColor | string | --- | #606266 | false | 字体颜色
noteColor | string | --- | #606266 | false | 备注颜色
disabledLine | boolean | --- | false | false | 不可点击时横线划掉
active | boolean | --- | false | false | 是否激活
todayHighLight | boolean | --- | true | false | 是否高亮 今天
day | {<br> year:number;<br> month:number;<br> day: number; <br>disable: boolean;<br> note?: string;<br> isToday?: boolean;<br>} | --- | --- | true | 日期信息