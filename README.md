# toFixed(len)
    js浮点数的toFixed四舍五入,负数与正数执行相同的逻辑。-1.5返回-1,-1.6返回-2
# toFixedMax(max) 
    最大小数位数 ,尾数为0的忽略

# NPMJS
    npm install js-tofixed --save

# Example

    1.55.toFixed(1) =>1.6
    (-1.55).toFixed(1) =>1.5
    1.555.toFixedMax(2)=>1.56
    1.5.toFixedMax(2)=>1.5
    