// 指定范围的随机数
function rangeRandomNum(min, max) { //两个参数 起始值和结束值
    return (Math.floor(Math.random() * (max - (min - 1))) + min)
}
// 把字符串打乱顺序返回
function randomStr(arr) { // 接收一个字符串
    return arr.split('').sort(function () {
        return Math.random() - 0.5 // math.random 获取0-1的随机数
    }).join('');
}
function randomWord(randomFlag, min, max) { // 1、 指定区间位数，randomWord(true, min, max) 指定位数randomWord(false, num)
    var str = "",
        range = min,
        arr = strWord.split('')
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
//　阿拉伯数字转文字
function numTurnWord(section) {
  var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
  // var chnUnitSection = ["","万","亿","万亿","亿亿"];
  var chnUnitChar = ["","十","百","千"];
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
    while(section > 0){
      var v = section % 10;
      if(v === 0){
        if(!zero){
          zero = true;
          chnStr = chnNumChar[v] + chnStr;
        }
      }else{
        zero = false;
        strIns = chnNumChar[v];
        strIns += chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
  }
  return chnStr;
}
// 文字数字转为阿拉伯数字
function wordTurnNum(chnStr) {
  var chnNumChar = {零:0,一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};
  var chnNameValue = { 十:{value:10, secUnit:false},百:{value:100, secUnit:false},千:{value:1000, secUnit:false}, 万:{value:10000, secUnit:true}, 亿:{value:100000000, secUnit:true}}
  var rtn = 0;
  var section = 0;
  var number = 0;
  var secUnit = false;
  var str = chnStr.split('');
  for(var i = 0; i < str.length; i++){
    var num = chnNumChar[str[i]];
    if(typeof num !== 'undefined'){
      number = num;
      if(i === str.length - 1){
        section += number;
      }
    }else{
      var unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if(secUnit){
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      }else{
        section += (number * unit);
      }
      number = 0;
    }
  }
  return rtn + section;
}
