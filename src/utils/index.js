

// 首字母大写, - 转化处理
function capitalize(string) {
  let words = [];
  if (string.indexOf('-') > -1){
  	const wordsArr = string.split('-');
    words = wordsArr.map(item => {
      return capitalize(item);
    })
    return words.join('');
  };
  
  words = string.split(' ');
  let i;
  for (i = 0; i < words.length; i += 1) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}

// 首字母小写, - 转化处理
function smallLetters(string) {
  const _string = capitalize(string);
  
  const words = _string.split(' ');
  let i;
  for (i = 0; i < words.length; i += 1) {
    words[i] = words[i].charAt(0).toLowerCase() + words[i].slice(1);
  }
  return words.join(' ');
}

// 获取当前时间
function getNowFormatDate() {
  const date = new Date();
  const seperator1 = "-";
  const seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`;
  }
  const currentdate = `${date.getFullYear() + seperator1 + month + seperator1 + strDate
    } ${date.getHours()}${seperator2}${date.getMinutes()
    }${seperator2}${date.getSeconds()}`;
  return currentdate;
}

module.exports = {
  capitalize,
  smallLetters,
  getNowFormatDate,
}
