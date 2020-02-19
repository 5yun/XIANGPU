function handleConvertClick(params) {
  let str = document.getElementById('origin').value;
  let UTF8Input = strToUTF8Arr(str);
  let Base64 = base64EncArr(UTF8Input);
  let encrypted = Base64;
  for (let i = 0; i < BASE64.length; i++) {
    let old = BASE64[i];
    if (i >= 62) {
      old = '\\' + old;
    }
    encrypted = encrypted.replace(new RegExp(old, 'g'), HAN[i]);
  }

  document.getElementById('encoded').value = encrypted;
}

function handleBackClick(params) {
  let str = document.getElementById('encoded').value;
  let decrypted = str;
  for (let i = 0; i < BASE64.length; i++) {
    decrypted = decrypted.replace(new RegExp(HAN[i], 'g'), BASE64[i]);
  }
  let UTF8Output = base64DecToArr(decrypted);
  let Output = UTF8ArrToStr(UTF8Output);
  document.getElementById('origin').value = Output;
}

function handleClearClick(params) {
  document.getElementById('origin').value = '';
  document.getElementById('encoded').value = '';
}

function handleCopyClick(id) {
  document.getElementById(id).select();
  document.execCommand('Copy', false, null);
}

test = [1, 2, 3];

BASE64 = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '+',
  '-',
  '=',
  '/'
];

HAN = [
  '好',
  '希望',
  '但',
  '对于',
  '不',
  '看',
  '为',
  '也',
  '可',
  '会',
  '哈',
  '的',
  '之',
  '要',
  '发现',
  '是',
  '却',
  '只能',
  '知道',
  '很',
  '没有',
  '高兴',
  '应该',
  '一',
  '都',
  '由于',
  '新',
  '去',
  '联系',
  '而且',
  '没',
  '这',
  '又',
  '朋友',
  '说',
  '原因',
  '了解',
  '听',
  '复杂',
  '请',
  '才',
  '开',
  '起',
  '啦',
  '个',
  '全',
  '你',
  '我',
  '他',
  '她',
  '它',
  '问',
  '二',
  '则',
  '那',
  '和',
  '有',
  '如果',
  '多',
  '大',
  '点',
  '以及',
  '突然',
  '所以',
  '来',
  '小'
];

function b64ToUint6(nChr) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
    ? nChr - 71
    : nChr > 47 && nChr < 58
    ? nChr + 4
    : nChr === 43
    ? 62
    : nChr === 47
    ? 63
    : 0;
}

function base64DecToArr(sBase64, nBlockSize) {
  var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ''),
    nInLen = sB64Enc.length,
    nOutLen = nBlockSize
      ? Math.ceil(((nInLen * 3 + 1) >>> 2) / nBlockSize) * nBlockSize
      : (nInLen * 3 + 1) >>> 2,
    aBytes = new Uint8Array(nOutLen);

  for (
    var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
    nInIdx < nInLen;
    nInIdx++
  ) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (18 - 6 * nMod4);
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        aBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
      }
      nUint24 = 0;
    }
  }

  return aBytes;
}

/* Base64 string to array encoding */

function uint6ToB64(nUint6) {
  return nUint6 < 26
    ? nUint6 + 65
    : nUint6 < 52
    ? nUint6 + 71
    : nUint6 < 62
    ? nUint6 - 4
    : nUint6 === 62
    ? 43
    : nUint6 === 63
    ? 47
    : 65;
}

function base64EncArr(aBytes) {
  var eqLen = (3 - (aBytes.length % 3)) % 3,
    sB64Enc = '';

  for (
    var nMod3, nLen = aBytes.length, nUint24 = 0, nIdx = 0;
    nIdx < nLen;
    nIdx++
  ) {
    nMod3 = nIdx % 3;
    /* Uncomment the following line in order to split the output in lines 76-character long: */
    /*
      if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) { sB64Enc += "\r\n"; }
      */
    nUint24 |= aBytes[nIdx] << ((16 >>> nMod3) & 24);
    if (nMod3 === 2 || aBytes.length - nIdx === 1) {
      sB64Enc += String.fromCharCode(
        uint6ToB64((nUint24 >>> 18) & 63),
        uint6ToB64((nUint24 >>> 12) & 63),
        uint6ToB64((nUint24 >>> 6) & 63),
        uint6ToB64(nUint24 & 63)
      );
      nUint24 = 0;
    }
  }

  return eqLen === 0
    ? sB64Enc
    : sB64Enc.substring(0, sB64Enc.length - eqLen) + (eqLen === 1 ? '=' : '==');
}

/* UTF-8 array to DOMString and vice versa */

function UTF8ArrToStr(aBytes) {
  var sView = '';

  for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
    nPart = aBytes[nIdx];
    sView += String.fromCharCode(
      nPart > 251 && nPart < 254 && nIdx + 5 < nLen /* six bytes */
        ? /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
          (nPart - 252) * 1073741824 +
            ((aBytes[++nIdx] - 128) << 24) +
            ((aBytes[++nIdx] - 128) << 18) +
            ((aBytes[++nIdx] - 128) << 12) +
            ((aBytes[++nIdx] - 128) << 6) +
            aBytes[++nIdx] -
            128
        : nPart > 247 && nPart < 252 && nIdx + 4 < nLen /* five bytes */
        ? ((nPart - 248) << 24) +
          ((aBytes[++nIdx] - 128) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 239 && nPart < 248 && nIdx + 3 < nLen /* four bytes */
        ? ((nPart - 240) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 223 && nPart < 240 && nIdx + 2 < nLen /* three bytes */
        ? ((nPart - 224) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 191 && nPart < 224 && nIdx + 1 < nLen /* two bytes */
        ? ((nPart - 192) << 6) + aBytes[++nIdx] - 128 /* nPart < 127 ? */
        : /* one byte */
          nPart
    );
  }

  return sView;
}

function strToUTF8Arr(sDOMStr) {
  var aBytes,
    nChr,
    nStrLen = sDOMStr.length,
    nArrLen = 0;

  /* mapping... */

  for (var nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
    nChr = sDOMStr.charCodeAt(nMapIdx);
    nArrLen +=
      nChr < 0x80
        ? 1
        : nChr < 0x800
        ? 2
        : nChr < 0x10000
        ? 3
        : nChr < 0x200000
        ? 4
        : nChr < 0x4000000
        ? 5
        : 6;
  }

  aBytes = new Uint8Array(nArrLen);

  /* transcription... */

  for (var nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
    nChr = sDOMStr.charCodeAt(nChrIdx);
    if (nChr < 128) {
      /* one byte */
      aBytes[nIdx++] = nChr;
    } else if (nChr < 0x800) {
      /* two bytes */
      aBytes[nIdx++] = 192 + (nChr >>> 6);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x10000) {
      /* three bytes */
      aBytes[nIdx++] = 224 + (nChr >>> 12);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x200000) {
      /* four bytes */
      aBytes[nIdx++] = 240 + (nChr >>> 18);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x4000000) {
      /* five bytes */
      aBytes[nIdx++] = 248 + (nChr >>> 24);
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } /* if (nChr <= 0x7fffffff) */ else {
      /* six bytes */
      aBytes[nIdx++] = 252 + (nChr >>> 30);
      aBytes[nIdx++] = 128 + ((nChr >>> 24) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    }
  }

  return aBytes;
}
