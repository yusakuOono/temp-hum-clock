<template>
  <div class="wrap">
    <div class="day">
      {{day}}
    </div>
    <div class="date">
      {{time}}<span>{{sec}}</span>
    </div>
    <div class="content">
      <div class="tem">
        {{temp}}
      </div>
      <div>
        /
      </div>
      <div class="hum">
        {{hum}}
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'

export default {
  name: 'HelloWorld',
  data() {
    return {
      date: "",
      day: "",
      time: "",
      sec:  "",
      temp: "",
      hum: ""
    }
  },
  mounted () {
    db.collection('Database').limit(1).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const value = change.doc;
        this.temp = value.data().temp
        this.hum = value.data().hum
      })
    })
  },
  methods: {
    refresh () {
      this.date = new Date()
      this.day = this.date.getFullYear() + '/' + this.zero(this.date.getMonth()+1,2) + '/' + this.zero(this.date.getDate(),2)
      this.time = this.zero(this.date.getHours(),2) + ':' + this.zero(this.date.getMinutes(),2)
      this.sec = ':' + this.zero(this.date.getSeconds(),2)
      const self = this
      setTimeout(() => { self.refresh() }, 1000)
    },
    zero(num, len) {
    let zero = '';
    for(var i = 0; i < len; i++) {
      zero += '0';
    }
      return (zero + num).slice(-len);
    },     
  }, 
  created() {
    this.refresh()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap{
  padding: 200px 0;
  width: fit-content;
  margin: auto;
  font-family: 'DotGothic16', sans-serif;
}
.day{
  text-align: right;
  font-size: 32px;
  margin-bottom: 0px;
}
.date{
  font-size: 104px;
  font-weight: bold;
  margin-bottom: 0px;
  letter-spacing: .18em;
  span{
    font-size: 32px;
    letter-spacing: .18em;
  }
}
.content{
  display: flex;
  justify-content: center;
  font-size: 64px;
}
</style>
