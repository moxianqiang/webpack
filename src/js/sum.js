export default function sun(...args) {
	return args.reduce((pre, cur) => pre + cur,  0)
}