<!--  APP.vue
      Author : 이승아  
      Updated : 2024-05-08  --><template>
  <div class="header_wrap">
    <nav>
      <ul class="nav_bar">
        <li v-for="(a,i) in navNm" :key="i">{{a}}</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    navNm: Array,
  },
  data(){
    return{

    }
  },


}
</script>


<style>
.header_wrap{
  background-color: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
  position: fixed;
  left: 0;
  top:0;
  width: 100%;
  height: 80px;
}
.nav_bar{
  width : 100%;
  display: flex;
  justify-content: right;
  margin-top:20px;
  padding-right: 50px;
  
}
.nav_bar li{
  /* width : 20%; */
  margin : 10px;
}

</style>
