<template>
  <div class="pos right2left" >12333333333333333333333</div>
</template>

<script>
export default {

}
</script>

<style>
.pos{
  position: absolute;
  top: 10%;
  left: 0%;
  background: red;
  animation: right2left2 10s linear;
  z-index: 99;
}
@keyframes right2left {
    0% {transform: translate(100vw)}
    100% {transform: translate(-100%);}
}
@keyframes right2left2 {
    0% {left: 100%}
    100% {left: -100%; display: none;}
}
</style>