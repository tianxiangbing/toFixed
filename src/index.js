/*
 * Created with Visual Studio Code.
 * github: https://github.com/tianxiangbing/toFixed.git
 * User: 田想兵
 * Date: 2017-07-31
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 * desc: 对小数位的四舍五入处理。浮点数计算的处理
 * 请使用https://github.com/tianxiangbing/toFixed.git 上的代码
 */
(() => {
    Object.assign(Number.prototype, {
        toFixedMax(max) {
            let ps = String(this).split('.');
            let len = 0;
            if (ps.length > 1) {
                len = ps[1].length;
            }
            max = Math.min(len, max);
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
    });
    const mul = (a, b) => {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) { }
        try {
            c += e.split(".")[1].length;
        } catch (f) { }
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    }
    //运算符
    Object.assign(Number, {
        //加法
        floatAdd(a, b) {
            var c, d, e;
            try {
                c = a.toString().split(".")[1].length;
            } catch (f) {
                c = 0;
            }
            try {
                d = b.toString().split(".")[1].length;
            } catch (f) {
                d = 0;
            }
            e = Math.pow(10, Math.max(c, d));
            return (mul(a, e) + mul(b, e)) / e;
        },
        //减法
        floatSub(a, b) {
            var c, d, e;
            try {
                c = a.toString().split(".")[1].length;
            } catch (f) {
                c = 0;
            }
            try {
                d = b.toString().split(".")[1].length;
            } catch (f) {
                d = 0;
            }
            e = Math.pow(10, Math.max(c, d));
            return (mul(a, e) - mul(b, e)) / e;
        },
        //乘法
        floatMul(a, b) {
            return mul(a, b)
        },
        //除法
        floatDiv(a, b) {
            var c, d, e = 0,
                f = 0;
            try {
                e = a.toString().split(".")[1].length;
            } catch (g) { }
            try {
                f = b.toString().split(".")[1].length;
            } catch (g) { }
            c = Number(a.toString().replace(".", ""));
            d = Number(b.toString().replace(".", ""));
            return mul(c / d, Math.pow(10, f - e));
        },
        mod(a,b){
            var c, d, e = 0,
                f = 0;
            try {
                e = a.toString().split(".")[1].length;
            } catch (g) { }
            try {
                f = b.toString().split(".")[1].length;
            } catch (g) { }
            c = Number(a.toString().replace(".", ""));
            d = Number(b.toString().replace(".", ""));
            let m = Math.max(e,f);
            let p = Math.pow(10,m);
            return this.floatDiv(mul(p , a) % mul(p , b),p);
        }
    })
})();