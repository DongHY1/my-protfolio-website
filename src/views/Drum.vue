<template>
    <div class="sequencer">
        <div class="header" :class="{ drum: tab === 0, lead: tab === 1 }">
            <button>
                <i class="fas" :class="{ 'fa-drum': tab === 0, 'fa-music': tab === 1 }"></i>
            </button>
            <button>
                <i class="fas fa-random"></i>
            </button>
            <div class="play">
                <button @click="playHandler">
                    <i class="fas" :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"></i>
                </button>
            </div>
            <div class="bpm">
                <button @click="BPM -= 5">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="text" :value="BPM" readonly />
                <span>bpm</span>
                <button @click="BPM += 5">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button>
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        <div class="pad">
            <div class="timeline"></div>
            <div class="drum set" v-show="tab === 0">
                <div class="kick">
                    <div
                        v-for="i in 16"
                        :key="`kick_${i - 1}`"
                        class="item"
                        :class="{ 'active': !!sequence.drum.kick[i - 1] }"
                        @mousedown="clickHandle(sequence.drum.kick, i - 1)"
                        @touchstart="clickHandle(sequence.drum.kick, i - 1)"
                    ></div>
                </div>
                <div class="hihat">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`hihat_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.hihat[i - 1] }"
                        @mousedown="clickHandle(sequence.drum.hihat, i - 1)"
                        @touchstart="clickHandle(sequence.drum.hihat, i - 1)"
                    ></div>
                </div>
                <div class="snare">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`snare_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.snare[i - 1] }"
                        @mousedown="clickHandle(sequence.drum.snare, i - 1)"
                        @touchstart="clickHandle(sequence.drum.snare, i - 1)"
                    ></div>
                </div>
                <div class="tomL">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`tomL_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.tomL[i - 1] }"
                        @mousedown="clickHandle(sequence.drum.tomL, i - 1)"
                        @touchstart="clickHandle(sequence.drum.tomL, i - 1)"
                    ></div>
                </div>
                <div class="tomM">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`tomL_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.tomM[i - 1] }"
                        @mousedown="clickHandle(sequence.drum.tomM, i - 1)"
                        @touchstart="clickHandle(sequence.drum.tomM, i - 1)"
                    ></div>
                </div>
                <div class="tomH">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`tomL_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.tomH[i - 1] }"
                        @mousedown="clickHandle(sequence.drum.tomH, i - 1)"
                        @touchstart="clickHandle(sequence.drum.tomH, i - 1)"
                    ></div>
                </div>
            </div>
            <div class="lead set" v-show="tab === 1"></div>
        </div>
    </div>
</template>

<script setup>
import * as Tone from "tone";
import { ref, reactive } from "vue";
import Snare from '@/lib/snare.js'
let tab = ref(0);
let isPlaying = ref(false)
let BPM = ref(120)
let sequence = reactive({
    drum: {
        kick: getEmptyArray(),
        hihat: getEmptyArray(),
        snare: getEmptyArray(),
        tomL: getEmptyArray(),
        tomM: getEmptyArray(),
        tomH: getEmptyArray(),
    }
})
// 处理点击事件
// kick 数组的第n个元素被点击
function clickHandle(arr, i) {
    arr[i] = !arr[i]
}
// 默认创建长度为16的空数组
function getEmptyArray(length = 16) {
    return Array.from({ length }, () => 0)
}
// 建立乐器
const kick = new Tone.MembraneSynth({
    octaves: 3,
    envelope: {
        sustain: 0.2,
    },
}).toDestination();
const tomL = new Tone.MembraneSynth({
    octaves: 1
}).toDestination();
const tomM = new Tone.MembraneSynth({
    octaves: 1
}).toDestination();
const tomH = new Tone.MembraneSynth({
    octaves: 1
}).toDestination();
const hihat = new Tone.NoiseSynth({
    playbackRate: 5,
    envelope: {
        sustain: 0.0001,
    },
}).toDestination();
const snare = new Snare({ volume: -6 }).toDestination()
// const poly = new Tone.PolySynth(8, Tone.Synth, {
//     oscillator: {
//         type: 'triangle'
//     },
//     envelope: {
//         attack: 0.001,
//         decay: 0.1,
//         sustain: 0.3,
//         release: 0.02
//     }
// }).toDestination()
// 乐器音量
kick.volume.value = 6
hihat.volume.value = -2
tomL.volume.value = 0
tomM.volume.value = 0
tomH.volume.value = 0
// poly.set('volume', 2)
//建立播放系统
Tone.Transport.bpm.value = BPM.value
Tone.Transport.scheduleRepeat((time)=>{
console.log(time)
if(sequence.drum.kick[i])kick.triggerAttackRelease('C2', '4n', time)
},'16n')


// 点击开始 可以播放
function playHandler() {
    if (isPlaying.value) {
        stop()
    } else {
        play()
    }
}
function play() {
    isPlaying.value = true
    Tone.Transport.start()
}
function stop() {
    isPlaying.value = false
    Tone.Transport.stop()
}
</script>

<style lang="scss" scoped>
.sequencer {
    background-color: black;
    width: 100vw;
    height: 80vh;
    overflow: hidden;
    .header {
        margin: 0 auto;
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        // background-color: #bfa;
        .bpm {
        }
    }
    .pad {
        .set {
            margin: 5px 0;
            .kick,
            .hihat,
            .snare,
            .tomL,
            .tomM,
            .tomH {
                display: flex;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: center;
                .item {
                    height: 10.5vh;
                    width: 10vw;
                    margin: 2px;
                    border: 1px solid black;
                    border-radius: 10px;
                    flex: 1;
                    background-color: white;
                }
                .active {
                    background-color: red;
                }
            }
        }
    }
    button {
        padding: 0;
        text-align: center;
        color: #222222;
        line-height: 100%;
        font-size: 3vw;
        width: 6vw;
        height: 6vw;
        border: 0;
        border-radius: 10%;
        margin: 1px;
        cursor: pointer;
    }
    input {
        width: 6vw;
        cursor: unset;
        user-select: none;
        background-color: unset;
        color: black;
        border: 0;
        padding: 0;
        text-align: center;
        font-size: 50px;
    }
    span {
        color: black;
        font-size: 50px;
        margin-right: 5px;
    }
}
</style>
