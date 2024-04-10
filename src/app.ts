console.log('测试多入口打包');

import sum from './js/sum.js';
console.log(sum(1, 2, 3, 4, 5));

import mitt from 'mitt';
const emitter = mitt();
emitter.on('event-name', (data) => {
    console.log(data);
})

// 顶部文字
const top_keyframes = [
    { opacity: 0, transform: 'translateY(-20px)' },
    { opacity: 1, transform: 'translateY(0px)' }
]
const top_timing = {
    duration: 1000,
    easing: 'ease-in-out'
}
const top_ele = document.querySelector('.title > .top')!;
const top_result = top_ele.animate(top_keyframes, top_timing);

// 底部文字
const bottom_keyframes = [
    { opacity: 0, letterSpacing: '-10px' },
    { opacity: 1, letterSpacing: 'initial' }
]
const bottom_timing = {
    duration: (top_result.effect?.getComputedTiming().duration as number) * 1.5,
    easing: 'ease-in-out'
}
const bottom_ele = document.querySelector('.title > .bottom')!;
const bottom_result = bottom_ele.animate(bottom_keyframes, bottom_timing);
bottom_result.pause(); // 先暂停

document.addEventListener('click', () => {
    if (bottom_result.playState !== 'finished') {
        bottom_result.play();
    }
})
