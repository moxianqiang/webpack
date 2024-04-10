// 两种配置都可以：
// 配置1
// declare module '*.vue' {
//     import { ComponentOptions } from 'vue'
//     const componentOptions: ComponentOptions
//     export default componentOptions
// }

// 配置2
declare module "*.vue" {
    import { defineComponent } from "vue";
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}
