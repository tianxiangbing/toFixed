/*
 * Created with Visual Studio Code.
 * github: https://github.com/tianxiangbing/toFixed.git
 * User: 田想兵
 * Date: 2017-07-31
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 * desc: 对小数位的四舍五入处理。
 * 请使用https://github.com/tianxiangbing/toFixed.git 上的代码
 */
Object.assign(Number.prototype, {
    toFixedMax(max) {
        let ps = this.split('.');
        let len= 0 ;
        if(ps.length>1){
            len = ps[1].length;
        }
        max = Math.min(len,max);
        return this.toFixed(max);
    },
    toFixed(d) {
        var s = this + "";
        if (!d) d = 0;
        d = parseInt(d);
        if (s.indexOf(".") == -1) s += ".";
        s += new Array(d + 1).join("0");
        if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
            var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
            if (a == d + 2) {
                a = s.match(/\d/g);
                if ((pm !== '-' && parseInt(a[a.length - 1]) > 4) || (pm === "-" && parseInt(a[a.length - 1]) > 5)) {
                    for (var i = a.length - 2; i >= 0; i--) {
                        a[i] = parseInt(a[i]) + 1;
                        if (a[i] == 10) {
                            a[i] = 0;
                            b = i != 1;
                        } else break;
                    }
                }
                s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
            } if (b) s = s.substr(1);
            return (pm + s).replace(/\.$/, "");
        } return this + "";
    }
})