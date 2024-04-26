var padLeft = function(num, val) {
	return (new Array(num).join('0') + val).slice(-num)
}
var con = function(){
	console.log(111)
}
export {
	padLeft,
	con
}