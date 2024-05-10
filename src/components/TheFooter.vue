<!--  APP.vue
      Author : 이승아  
      Updated : 2024-05-08  -->
<template>
    <div class="footer_wrap">
        <small>2024 이승아. All right reserved</small>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TheHeader',

  }
  </script>
  
  
  <style>
  .footer_wrap{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    background-color: #3f3f3f;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  small{
    color :#fff;
  }
  </style>
  