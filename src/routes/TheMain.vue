<!--  APP.vue
      Author : 이승아  
      Updated : 2024-05-09  -->
<template>
    <div class="main_wrap">
        <div class="input_box">
            <div class="top">
                <p>{{ selectDay }}</p>
                <select id="selectCh" @change="timeChange" class="selected">
                    <option v-for="(a,i) in timeArr" :key="i" :value="a">{{a.substring(0,2)+':'+a.substring(2,4)}}</option>
                </select>
                <p>선택한 시간 : {{ selectTime.substring(0,2)+':'+selectTime.substring(2,4)}}</p>
            </div>
            <p>현재 위치를 기반으로 조회합니다.</p>
            <div class="top">   
                <label for="usrLen">위도 : </label>
                <input type="number" id="usrLen" name="usrLen" v-model.trim="x"  />
                <label for="usrLon">경도 : </label>
                <input type="number" id="usrLon" name="usrLon" v-model.trim="y" />
                <button @click="getData" class="confirm_btn">확인하기</button>
            </div> 
        </div>
        <div class="cont" v-if="isShowData">
            <ul class="cat_all" >
                <li v-for="(a,i) in arrF" :key="i">
                    <div class="cat_li">
                        <p>{{ a.category }} :  {{ a.fcstValue }} </p>
                    </div>
                </li>
            </ul>
            <div class="img_box">
                <img :src= "require(`../../public/img/${temp}_01.jpg`)" alt="옷 이미지" />
                <img :src= "require(`../../public/img/${temp}_02.jpg`)" alt="옷 이미지" />
                <img v-if="isRain" class="plus" src= '../../public/img/plus.png'  alt="더하기" /> 
                <img v-if="isRain" class="raining" src= '../../public/img/um.jpg'  alt="우산" />   
            </div>
        </div>


    </div>
    
      <!-- <div>{{ isPositionReady ? 'yes' : 'no' }}</div> -->

</template>
<script>


import axios from 'axios';
export default {
    name : 'TheMain',
    data(){
        return{
            temp : '04',
            arr : [],
            arrF : [],
            selectDay : '',
            todayDate : '',
            timeArrOri : ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'],
            timeArr : [],
            selectTime : '0200',
            text : '',
            y : '',
            x : '',
            positionObj: {},
            isPositionReady: false,
            isShowData : false,
            isRain : false,
        }
    },
    props : {
        list : Object,
    },
    methods : {
        // 단기예보 api
        getData(){
            this.arr = [];
            axios.get(`${this.list.API_URL+this.list.API_KEY}&nx=${this.x}&ny=${this.y}&base_date=${this.todayDate}&base_time=${this.selectTime}&dataType=${this.list.dataType}`)
                .then(result=>{
                this.arr.push(result.data.response.body.items.item);
                this.climateNaming();
                this.arrFilter();
                this.isShowData = true;
            })
        },
        //단기예보 데이터 이름 변경
        climateNaming(){
            let cliValue = '';
            for(const a in this.arr[0]){
                cliValue = this.arr[0][a].fcstValue;

                switch(this.arr[0][a].category){
                    case 'POP' :
                    this.arr[0][a].category = '강수확률'
                    break;
                    case 'PTY' :
                    this.arr[0][a].category = '강수형태'
                    break;
                    case 'PCP' :
                    this.arr[0][a].category = '1시간 강수량'
                    break;
                    case 'REH' :
                    this.arr[0][a].category = '습도'
                    break;
                    case 'SNO' :
                    this.arr[0][a].category = '1시간 신적설'
                    break;
                    case 'SKY' :
                    this.arr[0][a].category = '하늘상태'
                    break;
                    case 'TMP' :
                    this.arr[0][a].category = '1시간 기온'
                    break;
                    case 'TMN' :
                    this.arr[0][a].category = '일 최저기온'
                    break;
                    case 'TMX' :
                    this.arr[0][a].category = '일 초고기온'
                    break;
                    case 'UUU' :
                    this.arr[0][a].category = '풍속(동서성분)'
                    break;
                    case 'VVV' :
                    this.arr[0][a].category = '풍속(남북성분)'
                    break;
                    case 'WAV' :
                    this.arr[0][a].category = '파고'
                    break;
                    case 'VEC' :
                    this.arr[0][a].category = '풍향'
                    break;
                    case 'WSD' :
                    this.arr[0][a].category = '풍속'
                    break;
                    // case 'RN1' :
                    // this.arr[0][a].category = '1시간 강수량'
                    // break;
                    // case 'T1H' :
                    // this.arr[0][a].category = '기온'
                    // break;
                    default : '기후없음'
                }
                if( this.arr[0][a].category == '강수형태'){
                    if(cliValue == '0'){
                        cliValue = '없음'
                        this.isRain = false;
                    }else if(cliValue == '1'){
                        cliValue = '비'
                        this.isRain = true;
                    }else if(cliValue == '2'){
                        cliValue = '비/눈'
                        this.isRain = true;
                    }else if(cliValue == '3'){
                        cliValue = '눈'
                        this.isRain = true;
                    }else if(cliValue == '4'){
                        cliValue = '소나기'
                        this.isRain = true;
                    }else {
                        cliValue = '초단기예보임'
                    }
                } else if( this.arr[0][a].category == '1시간 강수량'){
                    if( cliValue == '0'){
                        cliValue = '강수없음';
                    } else if (cliValue < 1.0){
                        cliValue ='0.1 ~ 1.0 mm 미만'

                    } else if (cliValue >= 1.0 && cliValue < 30.0){
                        cliValue ='1.0mm 이상 30.0 mm 미만'
                    } else if (cliValue >= 30.0 && cliValue < 50.0){
                        cliValue ='30.0mm 이상 50.0 mm 미만'
                    } else if (cliValue >= 50.0){
                        cliValue ='50.0mm 이상'
                    }
                } else if (this.arr[0][a].category == '하늘상태'){
                    if(cliValue == '1'){
                        cliValue = '맑음'
                    }else if(cliValue == '3'){
                        cliValue = '구름많음'
                    }else if(cliValue == '4'){
                        cliValue = '흐림'
                    }
                } else if( this.arr[0][a].category == '1시간 기온'){
                    cliValue = Number(cliValue);
                    if(cliValue <= 4){
                        this.temp = '04'
                    }if(cliValue > 4 && cliValue <=8){
                        this.temp = '08'
                    }
                    if(cliValue > 8 && cliValue <=11){
                        this.temp = '11'
                    }
                    if(cliValue > 11 && cliValue <=16){
                        this.temp = '16'
                    }
                    if(cliValue > 16 && cliValue <=19){
                        this.temp = '19'
                    }
                    if(cliValue > 19 && cliValue <=22){
                        this.temp = '22'
                    }
                    if(cliValue > 22 && cliValue <=27){
                        this.temp = '27'
                    }
                    if(cliValue > 27){
                        this.temp = '28'
                    }
                    cliValue += '°C';
                }
                this.arr[0][a].fcstValue = cliValue;
            }
        },
        arrFilter(){
            this.arrF = (this.arr[0]).filter(this.isArr);

            console.log('arrf',this.arrF);

        },
        isArr(el){
            console.log('el',el);
            console.log(el.category)
            if(el.category == '하늘상태'){
                return true;
            }else if(el.category =='1시간 기온'){
                return true;
            }else if(el.category =='강수형태' &&this.isRain ){
                return true;
            }else if(el.category =='강수확률'){
                return true;
            }else if(el.category =='1시간 강수량' &&this.isRain){
                return true;
            }
        },
        //select option 변경시
        timeChange(e){
            this.selectTime = e.target.value;
            if(this.isShowData){
                this.getData();
            }
        },
        // geolocation api
        getCurrentPosition(){
            if(!navigator.geolocation){
                this.setAlert('위치정보를 찾을수 없습니다.')
            } else{
                navigator.geolocation.getCurrentPosition(this.getPositionValue, this.geolocationError)
            }
        },
        // geolocation api 성공 시
        getPositionValue(val){
            this.positionObj.latitude = val.coords.latitude; //위도
            this.positionObj.longitude = val.coords.longitude; //경도
            this.x = Math.round(this.positionObj.latitude);
            this.y = Math.round(this.positionObj.longitude);
            this.isPositionReady = true;
            // this.setAlert('주소 확인 완료');
        }, 
        // geolocation api 실패 시
        geolocationError(){
            this.setAlert('위치정보를 찾을 수 없습니다 ERRCODE2');
        },
        //알림설정
        setAlert(text){
            alert(text);
        }

    },
    mounted() {
        // 오늘 날짜 바인딩
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0'+(today.getMonth() + 1)).slice(-2);
        let date = ('0'+today.getDate()).slice(-2);
        this.todayDate = year+month+date;
        this.selectDay = `${this.todayDate.substring(0,4)}년 ${this.todayDate.substring(4,6)}월 ${this.todayDate.substring(6,8)}일`;
        let Hour = today.getHours();
        for(let i=0; i<this.timeArrOri.length; i++){
            if(this.timeArrOri[i].substring(0,2) <= Hour){
                this.timeArr.push(this.timeArrOri[i]);
            } 
        }
        //geolocation api 연결 함수 호출
        this.getCurrentPosition();
        

        // this.methods.getData();
        // this.$emit('selectday',todayDate);
    },
}
</script>
<style>
.main_wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100px;
}
.input_box{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
}
.top{
    display: flex;
    align-items: center;
    justify-content: center;
    margin : 20px;
}
.input_box p{
    margin-right: 10px;
    font-size: 18px;
}
.cont{
    background-color: #fff;
    width : 1000px;
    padding: 40px;
    border-radius: 8px;
    margin-bottom:80px;
}
.cat_all{
    display: flex;
    align-items: center;
    border-bottom: 2px dashed #a1a1a1;
    padding-bottom:30px;
    margin-bottom: 40px;
}
.cat_all li{
    margin: 15px;
    text-align: left;
}
.confirm_btn{
    background-color: #fff;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px;
    border: 1px solid #919191;
    cursor: pointer;
}
select,input[type="number"]{
    margin: 10px;
    width: 50px;
    height: 35px;
    text-indent: 5px;
    cursor: pointer;
}
.selected{
    width : 100px;
}
.img_box{
    display: flex;
    align-items: center;
    justify-content: center;
}
.img_box img{
   width: 250px;
   height: 300px;
}
.img_box img.raining{
    width : 200px;
    height: 200px;
}
.img_box img.plus{
    width : 80px;
    height: 80px;
}

</style>