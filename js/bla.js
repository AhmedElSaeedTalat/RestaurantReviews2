// import {alt} from './alt.js';
// console.log(alt.Restaurants)
let x = [
	{
		id : '0',
		name:'man'
	},
	{
		id : '2',
		name:'pussy'
	},
	{
		id : '1',
		name:'woman'
	}
];
let y = [
	{
		id : '0',
		gene: 'cc',
	},
	{
		id : '1',
		gene: 'mm',
	},
	{
		id : '2',
		gene: 'rr',
	}
];
// x.gender = "male";
let g = 0;
let z = 0;
x.forEach(bla => {
	let val = y.filter(res => {
		return res.id == bla.id;
	});
	bla.alt = val;
});
// console.log(x);

// console.log(y[0].indexOf(ff.name) > -1);
let arr = ["ahmed","sara"];
function sara() {
	return arr;
}
let gimi = sara;
console.log(gimi);