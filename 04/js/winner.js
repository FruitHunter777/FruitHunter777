var turnplate = {
  outsideRadius: 191, //大转盘外圆的半径
  textRadius: 100, //大转盘奖品位置距离圆心的距离
  insideRadius: 80, //大转盘内圆的半径
  startAngle: 0, //开始角度
  bRotate: false, //false:停止;ture:旋转
};
var winnerList = [
  {
    id: 1,
    content: "",
    prize: "111",
    probability: "95%",
    img: "images/1.png",
  },
  {
    id: 2,
    content: "",
    prize: "222",
    probability: "1%",
    img: "images/2.png",
  },
  {
    id: 3,
    content: "",
    prize: "333",
    probability: "1%",
    img: "images/3.png",
  },
  {
    id: 4,
    content: "",
    prize: "444",
    probability: "1%",
    img: "images/4.png",
  },
  {
    id: 5,
    content: "",
    prize: "555",
    probability: "1%",
    img: "images/5.png",
  },
  {
    id: 6,
    content: "",
    prize: "666",
    probability: "1%",
    img: "images/6.png",
  },
  {
    id: 7,
    content: "",
    prize: "666",
    probability: "1%",
    img: "images/7.png",
  },
  {
    id: 8,
    content: "",
    prize: "666",
    probability: "1%",
    img: "images/8.png",
  },
  {
    id: 9,
    content: "",
    prize: "666",
    probability: "1%",
    img: "images/9.png",
  },
  {
    id: 10,
    content: "",
    prize: "666",
    probability: "1%",
    img: "images/10.png",
  },
]; //奖品列表

$(document).ready(function () {
  var rotateTimeOut = function () {
    $("#wheelCanvas").rotate({
      angle: 0,
      animateTo: 2160,
      duration: 8000,
      callback: function () {
        // alert('网络超时，请检查您的网络设置！');
      },
    });
  };

  //旋转转盘 item:奖品位置; txt：提示语;
  var rotateFn = function (item, txt) {
    var angles =
      item * (360 / winnerList.length) - 360 / (winnerList.length * 2);
    if (angles < 270) {
      angles = 270 - angles;
    } else {
      angles = 360 - angles + 270;
    }
    $("#wheelCanvas").stopRotate();
    $("#wheelCanvas").rotate({
      angle: 0,
      animateTo: angles + 1800,
      duration: 8000,
      callback: function () {
        console.log(txt);
        console.log($(".alert"));
        document.querySelector(".alert").style.display = "block";
        turnplate.bRotate = !turnplate.bRotate;
      },
    });
  };
  $(".alert").click(function () {
    document.querySelector(".alert").style.display = "none";
  });

  $(".pointer").click(function () {
    if (turnplate.bRotate) return;
    turnplate.bRotate = !turnplate.bRotate;
    //获取随机数(奖品个数范围内)
    // 中奖率randomRate
    let randomRate = [];
    for (var i = 0; i < winnerList.length; i++) {
      randomRate.push(winnerList[i].probability);
    }
    var item = rnd(randomRate);
    //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
    rotateFn(item, winnerList[item - 1]);
  });
});

function rnd(rate) {
  var random = Math.floor(Math.random() * 100);
  var myRandom = [];
  var randomList = [];
  var randomParent = [];
  for (var i = 0; i < 100; i++) {
    myRandom.push(parseInt([i]) + 1);
  }
  for (var i = 0; i < rate.length; i++) {
    var temp = [];
    var start = 0;
    var end = 0;
    randomList.push(parseInt(rate[i].split("%")[0]));
    for (var j = 0; j < randomList.length; j++) {
      start += randomList[j - 1] || 0;
      end += randomList[j];
    }
    temp = myRandom.slice(start, end);
    randomParent.push(temp);
  }
  for (var i = 0; i < randomParent.length; i++) {
    if ($.inArray(random, randomParent[i]) > 0) {
      return i + 1;
    }
  }
}
//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload = function () {
  drawRouletteWheel();
};
function drawRouletteWheel() {
  var canvas = document.getElementById("wheelCanvas");
  let num = winnerList.length;
  var width = 211;
  // let arc = Math.PI / (num / 2);
  if (canvas.getContext) {
    var arc = Math.PI / (num / 2);
    var ctx = canvas.getContext("2d");
    //在给定矩形内清空一个矩形
    ctx.clearRect(0, 0, width * 2, width * 2);
    //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
    ctx.strokeStyle = "#fff";

    for (let i = 0; i < num; i++) {
      let angle = 0 + i * arc;
      ctx.save();
      if ((i + 1) % 2 == 0) {
        ctx.fillStyle = "#9824e7";
      } else {
        ctx.fillStyle = "#f7f4ab";
      }
      ctx.beginPath();
      ctx.arc(width, width, turnplate.outsideRadius, angle, angle + arc, false);
      ctx.arc(width, width, turnplate.insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      //锁画布(为了保存之前的画布状态)
      ctx.save();
      //奖品默认字体颜色
      // this.ctx.fillStyle = "#fff";
      ctx.fillStyle = "#000";
      let text = winnerList[i].content;
      ctx.translate(
        width + Math.cos(angle + arc / 2) * (width - 20),
        width + Math.sin(angle + arc / 2) * (width - 20)
      );
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      //将字体绘制在对应坐标
      ctx.fillText(text, -ctx.measureText(text).width / 2, 20);
      //设置字体
      // this.ctx.font = " 14px Microsoft YaHei";
      ctx.restore();
      //绘制奖品图片
      if (winnerList[i].img) {
        let img = new Image();
        img.src = winnerList[i].img;
        img.onload = () => {
          ctx.save();
          ctx.translate(
            width + Math.cos(angle + arc / 2) * (width - 40),
            width + Math.sin(angle + arc / 2) * (width - 40)
          );
          ctx.rotate(angle + arc / 2);
          ctx.drawImage(
            img,
            -ctx.measureText(text).width / 2 - 60,
            -35,
            60,
            60
          );
          ctx.restore();
        };
      }
    }
  }
}
