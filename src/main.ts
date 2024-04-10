import count from './js/count.js';
import sum from './js/sum.js';

import './css/style.css';
import './css/index.less';

import { createApp } from "vue";
import App from './views/App.vue';
createApp(App).mount("#app");

// 贪吃蛇
import GameControl from "./js/modules/GameControl";
new GameControl();

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4, 5));

let n: number = 10;
console.log('n: ', n);

function fn<T, K>(a: T, b: K):[T, K] {
    return [a, b]
}
console.log(fn<number, number>(1, 2));
console.log(fn<string, string>('hello', 'world'));

// 泛型
interface IObj {
    length: number;
}
function func<T extends IObj>(params: T):number {
    return params.length
}
console.log(func('hello world'));

// (document.getElementById('button') as HTMLElement).onclick = function (){
//     import('./js/math').then(({ my_sum }) => {
//         let result = my_sum(9, 9);
//         console.log('result: ', result);
//     })
// }




let unknown_value: unknown;
unknown_value = 'hello';

let any_value:any;
any_value = true;

let str:string;

// any_value的类型是any，它可以赋值给任意变量，不报错
str = any_value;
// unknown_value的类型是unknown，它赋值给其他类型的变量，会报错
// unknown 实际上是一个类型安全的any
// unknown类型的变量，不能直接赋值给其他变量
// str = unknown_value;

// 1
if (typeof unknown_value === 'string') {
    str = unknown_value;
}
// 2 类型断言写法一：变量 as 类型
str = unknown_value as string;
// 3 类型断言写法二：<类型>变量
str = <string>unknown_value
