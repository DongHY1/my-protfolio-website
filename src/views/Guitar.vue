<template>
  <div class="guitar">
    <div class="video">
      <video controls @timeupdate="handleUpdate">
        <source src="@/assets/Guitar/guitar.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="tab">
      <div class="guitar-neck">
        <div class="fret first"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>
        <div class="fret"></div>

        <ul class="dots">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul class="strings">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <ul class="open-notes">
          <li class="low-e">E</li>
          <li class="b">B</li>
          <li class="g">G</li>
          <li class="d">D</li>
          <li class="a">A</li>
          <li class="high-e">E</li>
        </ul>
        <div class="notes">
          <div class="mask low-e">
            <ul></ul>
          </div>
          <div class="mask a">
            <ul></ul>
          </div>
          <div class="mask d">
            <ul></ul>
          </div>
          <div class="mask g">
            <ul></ul>
          </div>
          <div class="mask b">
            <ul></ul>
          </div>
          <div class="mask high-e">
            <ul></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let time = ref(0)
function handleUpdate(event) {
  time.value = event.srcElement.currentTime
  console.log(time.value)
}
</script>

<style lang="scss" scoped>

.guitar {
  width: 100vw;
  height: 100vh;
  background-color: bisque;
  display: flex;
  .tab {
    width: 80vw;

.guitar-neck {
	position: relative;
	margin-top: 40px;
	left: 50%;
	margin-left: -450px;
	width: 960px;
	height: 250px;
	background:#755628;
	box-shadow: inset -1px 0px 11px 0px rgba(0,0,0,0.75);
	
	.open-notes {
		position: absolute;
		top: 3px;
		left: -35px;
		
		li {
			margin-bottom: 20px;
			font-size: 18px;
			color: #fff;
      list-style: none;
      height: 25px;

			&.active {
				color: #fa990f;
			}
		}
	}

	.fret {
		float: left;
		width: 3px;
		height: 250px;
		background: #d7d6d6;
		margin-left: 75px;
		border-right: 2px solid #686868;

		&.first {
			position: absolute;
			width: 50px;
			left: -52px;
			top: 0;
			margin-left: 0;
			background: #211f1d;
		}
	}
	
	.dots {
		position: absolute;
		width: 642px;
		height: 20px;
		top: 44%;
		left: 19.5%;
		li {
			float: left;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background: #383530;
			margin-right: 140px;
		}
	}
	
	.strings {
		position: absolute;
		left: 0;
		top: 10px;
		width: 960px;
		height: 250px;
		
		li {
			height: 1px;
		    display: inline-block;
			width: 100%;
			background: #c8bb93;	
			margin-bottom: 38px;
			border-bottom: 2px solid #958963;
			box-sizing: border-box;
		}
		li:nth-child(2) {height: 2px;}
		li:nth-child(3) {height: 3px;}
		li:nth-child(4) {height: 4px;}
		li:nth-child(5) {height: 5px;}
		li:nth-child(6) {height: 6px;}
	}

	.notes {
		position: absolute;
		left: 17px;
		top: -7px;
		width: 960px;
		height: 258px;
		overflow-x: hidden;
		.mask {
			position: absolute;
			right: -189px;
			bottom: 0;
			width: 1184px;	
			height: 30px;

			ul {
				position: relative;
				float: left;
				
				li {
					float: left;
					width: 30px;
					height: 30px;
					margin-right: 50px;
					background: #fa990f;
					color: #fff;
					border-radius: 50%;
					text-align: center;
					line-height: 30px;
					box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
				}
			}	

			&.a {bottom: 47px;}
			&.d {bottom: 93px;}
			&.g {bottom: 137px;}
			&.b {bottom: 181px;}
			&.high-e {bottom: 224px;}
		}
		
	}
}
  }
}
</style>
