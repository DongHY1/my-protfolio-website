<template>
    <div class="sequencer">
        <div class="header" :class="{ drum: tab === 0, lead: tab === 1 }">
            <span @click="handleToggleInstrument">{{ tab === 0 ? '🥁' : '🎹' }}</span>
            <span @click="handleRandomPlay">🔀</span>

            <div class="play">
                <span @click="handlePlay">{{ isPlaying ? '⏸' : '👏' }}</span>
            </div>
            <div class="bpm">
                <span @click="handleBPMDecrease">➖</span>
                <span style="color: white;">{{ BPM }}</span>
                <span>bpm</span>
                <span @click="handleBPMIncrease">➕</span>
            </div>
            <span @click="handleClearPlay">🚮</span>
        </div>
        <div class="pad">
            <div class="timeline">
                <div
                    v-for="i in 16"
                    :key="`time_${i}`"
                    :class="{ 'time': true, 'active': index === i - 1 }"
                />
            </div>
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
            <div class="lead set" v-show="tab === 1">
                <div class="kick" v-for="(row, i) in sequence.lead" :key="`lead_${i}`">
                    <div
                        v-for="j in 16"
                        :key="`lead_${i}_${j - 1}`"
                        class="item"
                        :class="{ 'active': !!sequence.lead[i][j - 1] }"
                        @mousedown="handleBlockClick(sequence.lead[i], j - 1)"
                        @touchstart="handleBlockClick(sequence.lead[i], j - 1)"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as Tone from "tone";
import { ref, reactive, watchEffect } from "vue";
let tab = ref(0);
let isPlaying = ref(false)
let BPM = ref(120)
const drumArrayConfig = {
    isTwoDimensional: false,
    row: 16,
    list: 0,
    num: 0
}
const leadArrayConfig = {
    isTwoDimensional: true,
    row: 16,
    list: 6,
    num: 0
}
let sequence = reactive({
    drum: {
        kick: getEmptyArray(drumArrayConfig),
        hihat: getEmptyArray(drumArrayConfig),
        snare: getEmptyArray(drumArrayConfig),
        tomL: getEmptyArray(drumArrayConfig),
        tomM: getEmptyArray(drumArrayConfig),
        tomH: getEmptyArray(drumArrayConfig),
    },
    lead: getEmptyArray(leadArrayConfig)
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
    sequence.drum.kick = getRandomArray(false)
    sequence.drum.hihat = getRandomArray(false)
    sequence.drum.snare = getRandomArray(false)
    sequence.drum.tomL = getRandomArray(false)
    sequence.drum.tomM = getRandomArray(false)
    sequence.drum.tomH = getRandomArray(false)
    sequence.lead = getRandomArray(true)
}
function handleClearPlay() {
    sequence.drum.kick = getEmptyArray(drumArrayConfig)
    sequence.drum.hihat = getEmptyArray(drumArrayConfig)
    sequence.drum.snare = getEmptyArray(drumArrayConfig)
    sequence.drum.tomL = getEmptyArray(drumArrayConfig)
    sequence.drum.tomM = getEmptyArray(drumArrayConfig)
    sequence.drum.tomH = getEmptyArray(drumArrayConfig)
    sequence.lead = getEmptyArray(leadArrayConfig)
}
function handleToggleInstrument() {
    tab.value === 0 ? tab.value = 1 : tab.value = 0
}
/**
 * 
 * @param {*} config
 * isTwoDimensional:true:二维数组;false:一维数组
 * row:一维数组/二维数组的行数
 * list:二维数组的列数
 * num:填充数 
 */
function getEmptyArray({ isTwoDimensional, row, list, num }) {
    if (isTwoDimensional) {
        let arr = new Array(list)
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(row).fill(num)
        }
        return arr
    } else {
        return new Array(row).fill(num)
    }
}
// 随机把数组里的值赋值为true
/**
 * 
 * @param {} config
 *  
 */
function getRandomArray(isTwoDimensional) {
    if (isTwoDimensional) {
        // 二维数组操作
        const arr = getEmptyArray(leadArrayConfig)
        let bool
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (Math.random() <= 0.3) {
                    bool = true
                } else {
                    bool = false
                }
                arr[i][j] = bool
            }
        }
        return arr
    } else {
        // 一维数组操作
        const arr = getEmptyArray(drumArrayConfig)
        let bool
        for (let i = 0; i < arr.length; i++) {
            if (Math.random() <= 0.3) {
                bool = true
            } else {
                bool = false
            }
            arr[i] = bool
        }
        return arr
    }
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
const keyboardOsc = new Tone.Oscillator().toDestination()
keyboardOsc.type = 'triangle'
const keyboardEnv = new Tone.Envelope({
    attack: 0.001,
    decay: 0.1,
    sustain: 0.3,
    release: 0.02,
}).toDestination();
const keyboardPoly = new Tone.PolySynth({ keyboardOsc, keyboardEnv }).toDestination()

// ----snare end---------
// 乐器音量
kick.volume.value = 6
hihat.volume.value = -2
tomL.volume.value = 0
tomM.volume.value = 0
tomH.volume.value = 0
poly.volume.value = -10
keyboardPoly.volume.value = 2
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
    if (sequence.lead[0][i]) keyboardPoly.triggerAttackRelease('C4', '16n', time)
    if (sequence.lead[1][i]) keyboardPoly.triggerAttackRelease('D4', '16n', time)
    if (sequence.lead[2][i]) keyboardPoly.triggerAttackRelease('E4', '16n', time)
    if (sequence.lead[3][i]) keyboardPoly.triggerAttackRelease('F4', '16n', time)
    if (sequence.lead[4][i]) keyboardPoly.triggerAttackRelease('G4', '16n', time)
    if (sequence.lead[5][i]) keyboardPoly.triggerAttackRelease('A4', '16n', time)
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
    margin-top: 50px;
    // overflow: hidden;
    .header {
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 20px;

        .bpm {
            span {
                color: white;
            }
        }
    }
    .pad {
        .timeline {
            margin-top: 10px;
            height: 10px;
            .time {
                display: inline-block;
                width: 6%;
                height: 2px;
                background-color: #ff5733;
                opacity: 0.2;
                margin: 2px 2px;
                border-radius: 5px;
                transition: all 0.1s;
            }
            & .active {
                height: 10px;
                opacity: 1;
            }
        }
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
                height: 110px;

                padding-top: 5px;
                .item {
                    height: 10.5vh;
                    width: 10vw;
                    margin: 2px;
                    border: 1px solid black;
                    border-radius: 10px;
                    flex: 1;
                    background-color: whitesmoke;
                }
                .active {
                    background: linear-gradient(to right, #96e6a1, #d4fc79);
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
        width: 3vw;
        height: 3vw;
        border: 0;
        border-radius: 10%;
        margin: 1px;
        cursor: pointer;
        // background-color: #222222;
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
