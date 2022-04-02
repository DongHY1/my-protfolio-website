<template>
    <div class="sequencer">
        <div class="header" :class="{ drum: tab === 0, lead: tab === 1 }">
            <button>
                <span>{{ tab === 0 ? '🥁' : '🎹' }}</span>
            </button>
            <button @click="handleRandomPlay">
                <span>🔀</span>
            </button>
            <div class="play">
                <button @click="handlePlay">
                    <span>{{ isPlaying ? '◼' : '▶' }}</span>
                </button>
            </div>
            <div class="bpm">
                <button @click="handleBPMDecrease">
                    <span>➖</span>
                </button>
                <input type="number" :value="BPM" readonly style="color: white;" />
                <span>bpm</span>
                <button @click="handleBPMIncrease">
                    <span>➕</span>
                </button>
            </div>
            <button @click="handleClearPlay">
                <span>🚮</span>
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
                        @mousedown="handleBlockClick(sequence.drum.kick, i - 1)"
                        @touchstart="handleBlockClick(sequence.drum.kick, i - 1)"
                    ></div>
                </div>
                <div class="hihat">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`hihat_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.hihat[i - 1] }"
                        @mousedown="handleBlockClick(sequence.drum.hihat, i - 1)"
                        @touchstart="handleBlockClick(sequence.drum.hihat, i - 1)"
                    ></div>
                </div>
                <div class="snare">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`snare_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.snare[i - 1] }"
                        @mousedown="handleBlockClick(sequence.drum.snare, i - 1)"
                        @touchstart="handleBlockClick(sequence.drum.snare, i - 1)"
                    ></div>
                </div>
                <div class="tomL">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`tomL_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.tomL[i - 1] }"
                        @mousedown="handleBlockClick(sequence.drum.tomL, i - 1)"
                        @touchstart="handleBlockClick(sequence.drum.tomL, i - 1)"
                    ></div>
                </div>
                <div class="tomM">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`tomL_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.tomM[i - 1] }"
                        @mousedown="handleBlockClick(sequence.drum.tomM, i - 1)"
                        @touchstart="handleBlockClick(sequence.drum.tomM, i - 1)"
                    ></div>
                </div>
                <div class="tomH">
                    <div
                        v-for="i in 16"
                        class="item"
                        :key="`tomL_${i - 1}`"
                        :class="{ 'active': !!sequence.drum.tomH[i - 1] }"
                        @mousedown="handleBlockClick(sequence.drum.tomH, i - 1)"
                        @touchstart="handleBlockClick(sequence.drum.tomH, i - 1)"
                    ></div>
                </div>
            </div>
            <div class="lead set" v-show="tab === 1"></div>
        </div>
    </div>
</template>

<script setup>
import * as Tone from "tone";
import { ref, reactive, watchEffect } from "vue";
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
let index = ref(-1)
// 处理点击事件
// kick 数组的第n个元素被点击
function handleBlockClick(arr, i) {
    arr[i] = !arr[i]
}
function handleBPMIncrease() {
    if (BPM.value < 180) {
        BPM.value += 5
    }
}
function handleBPMDecrease() {
    if (BPM.value > 60) {
        BPM.value -= 5
    }
}
function handleRandomPlay() {
    sequence.drum.kick = getRandomArray()
    sequence.drum.hihat = getRandomArray()
    sequence.drum.snare = getRandomArray()
    sequence.drum.tomL = getRandomArray()
    sequence.drum.tomM = getRandomArray()
    sequence.drum.tomH = getRandomArray()
}
function handleClearPlay() {
    sequence.drum.kick = getEmptyArray()
    sequence.drum.hihat = getEmptyArray()
    sequence.drum.snare = getEmptyArray()
    sequence.drum.tomL = getEmptyArray()
    sequence.drum.tomM = getEmptyArray()
    sequence.drum.tomH = getEmptyArray()
}
// 默认创建长度为16的空数组
function getEmptyArray(length = 16) {
    return new Array(length).fill(0)
}
 // 随机把数组里的值赋值为true
function getRandomArray(length = 16) {
    const arr = new Array(length).fill(0)
    let bool
    for (let i = 0; i < length; i++) {
        if (Math.random() <= 0.3) {
            bool = true
        } else {
            bool = false
        }
        arr[i] = bool
    }
    return arr
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
// ----snare start---------
const lowPass = new Tone.Filter({
    frequency: 11000,
}).toDestination();
const noise = new Tone.NoiseSynth({
    volume: -12,
    noise: {
        type: 'pink',
        playbackRate: 3,
    },
    envelope: {
        attack: 0.001,
        decay: 0.13,
        sustain: 0,
        release: 0.03,
    },
}).connect(lowPass);
const osc = new Tone.Oscillator().toDestination();
osc.partials = [0, 2, 3, 4]
const env = new Tone.Envelope({
    attack: 0.001,
    decay: 0.17,
    sustain: 0.0001,
    release: 0.08,
    releaseCurve: 'exponential'
}).toDestination();
const poly = new Tone.PolySynth({ osc, env }).toDestination();
function snareTrigger(time) {
    noise.triggerAttack(time)
    poly.triggerAttackRelease(['C2', 'D#2', 'G2'], '16n', time)
}
// ----snare end---------
// 乐器音量
kick.volume.value = 6
hihat.volume.value = -2
tomL.volume.value = 0
tomM.volume.value = 0
tomH.volume.value = 0
poly.volume.value = -10
//建立播放系统
watchEffect(() => {
    Tone.Transport.bpm.value = BPM.value
})
Tone.Transport.scheduleRepeat((time) => {
    index.value = ++index.value % 16
    const i = index.value
    if (sequence.drum.kick[i]) kick.triggerAttackRelease('C2', '4n', time)
    if (sequence.drum.hihat[i]) hihat.triggerAttackRelease('8n', time)
    if (sequence.drum.snare[i]) snareTrigger(time)
    if (sequence.drum.tomL[i]) tomL.triggerAttackRelease('E2', '4n', time)
    if (sequence.drum.tomM[i]) tomM.triggerAttackRelease('G2', '4n', time)
    if (sequence.drum.tomH[i]) tomH.triggerAttackRelease('A#2', '4n', time)
}, '16n')


// 点击播放
function handlePlay() {
    if (isPlaying.value) {
        stop()
    } else {
        play()
    }
}
function play() {
    isPlaying.value = !isPlaying.value
    Tone.Transport.start()
}
function stop() {
    isPlaying.value = !isPlaying.value
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
            span {
                color: white;
            }
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
