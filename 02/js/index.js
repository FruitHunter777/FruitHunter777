window.onload=function(){
	
	var speed=800;//小鱼出现的速度
	//小鱼出现
	function fish_cx(){
		var fish_jl=document.body.clientWidth+500;
		//小鱼在左边出现的位置
		var fish_move=20000;//小鱼游速
		var fish_fx=Math.random()*45;//小鱼方向
		//随机方向
		var fish_bool=Math.floor(Math.random()*2);
		if(fish_bool){
			fish_fx=fish_fx;
		}else{
			fish_fx=fish_fx*-1;
		}
		var fish_pos=Math.floor(Math.random()*2);//随机位置
		if(fish_pos){
			fish_jl=fish_jl;
		}else{
			fish_fx=(fish_fx+180)*-1;
			fish_jl=fish_jl*1;
		}
		var fish_lf=Math.random()*80;
		var fish_index=Math.floor(Math.random()*10+1);
		
		var this_fish=$("<div data-id="+fish_index+" class='pos_"+fish_pos+" fish fish"+fish_index+"'></div>");
		$(".main").append(this_fish);
		
		
		
		this_fish.css("top",fish_lf+"%");
		if(fish_index==1)fish_move=35000;
		if(fish_index==2)fish_move=35000;
		if(fish_index==3)fish_move=40000;
		if(fish_index==4)fish_move=40000;
		if(fish_index==5)fish_move=45000;
		if(fish_index==6)fish_move=50000;
		if(fish_index==7)fish_move=50000;
		if(fish_index==8)fish_move=48000;
		if(fish_index==9)fish_move=45000;
		if(fish_index==10)fish_move=52000;
		if(fish_index==11)fish_move=55000;
		if(fish_index==12)fish_move=58000;
		this_fish.css("transform","rotate("+fish_fx+"deg)");
		this_fish.animate({x:fish_jl},fish_move,"linear",function(){
			this_fish.remove();
		});
		

		
		var time=setTimeout(fish_cx,speed);
	}
	fish_cx();
	
	//初始金币
	var gold=15;
	$(".fengs").html(gold);
	//初始化进度条
	var jdt=0;
	//点击撤换大炮效果
	$(".add").on("mousedown",function(){
		$(this).css("background-position-x","-3px");
	})
	$(".add").on("mouseup",function(){
		$(this).css("background-position-x","-48px");
	})
	$(".de").on("mousedown",function(){
		$(this).css("background-position-x","-90px");
	})
	$(".de").on("mouseup",function(){
		$(this).css("background-position-x","-135px");
	})
	//点击撤换大炮
	var can=1;//大炮的号数
	var add_bl=true;
	var de_bl=true;
	$(".cannon").append("<div class='cannon1'></div>");
	$(".add").on("click",function(e){
		//消除炮弹
		$(".pao"+can).remove();
		$(".wang"+can).remove();
		e.stopPropagation();
		can++;
		if(can>=8){
			can=1;
		};
		$(".cannon div").transit({y:"100%",rotate:0},function(){
			$(".cannon div").remove();
			$(".cannon").append("<div class='cannon"+can+"'></div>");
			$(".cannon div").transit({y:0});
		});
	})
	$(".de").on("click",function(e){
		//消除炮弹
		$(".pao"+can).remove();
		//消除网
		$(".wang"+can).remove();
		e.stopPropagation();
		can--;
		if(can<=1){
			can=7;
		}
		$(".cannon div").transit({y:"100%",rotate:0},function(){
			$(".cannon div").remove();
			$(".cannon").append("<div class='cannon"+can+"'></div>");
			$(".cannon div").transit({y:0});
		});
	})
	//大炮的指向
	var web_bl=true;
	var h=document.body.clientHeight;
	$(".web").on("click",function(e){
		
		if(web_bl){
			if(can==1){
				if(gold<1){
					alert("游戏结束！")
					return;
				}else{
					gold-=1;
					$(".fengs").html(gold);
				}
				
			}
			if(can==2){
				if(gold<2){
					alert("金币不够，请充值，谢谢！");
					return;
				}else{
					gold-=2;
					$(".fengs").html(gold);
				}
			}
			if(can==3){
				if(gold<4){
					alert("金币不够，请充值，谢谢！");
					return;
				}else{
					gold-=4;
					$(".fengs").html(gold);
				}
			}
			if(can==4){
				if(gold<6){
					alert("金币不够，请值，谢谢！");
					return;
				}else{
					gold-=6;
					$(".fengs").html(gold);
				}
			}
			if(can==5){
				if(gold<7){
					alert("金币不够，请充值，谢谢！");
					return;
				}else{
					gold-=7;
					$(".fengs").html(gold);
				}
			}
			if(can==6){
				if(gold<8){
					alert("金币不够，请充值，谢谢！");
					return;
				}else{
					gold-=8;
					$(".fengs").html(gold);
				}
			}
			if(can==7){
				if(gold<10){
					alert("金币不够，请充值，谢谢！");
					return;
				}else{
					gold-=10;
					$(".fengs").html(gold);
				}
			}
			web_bl=false;
			var x=$(".cannon div").offset().left+37;
			
			if(e.clientX>x){
				var deg=90-(Math.atan((h-e.clientY)/(e.clientX-x))*180/Math.PI);
			}else{
				var deg=(90-(Math.atan((h-e.clientY)/(x-e.clientX))*180/Math.PI))*-1;
			}
			
			$(".cannon div").css({"transform":"rotate("+deg+"deg)"});
			$(".cannon div").addClass("f_cannon");
			var pao=$("<div class='pao"+can+"'></div>");
			
				$(".cannon"+can).append(pao);
					pao.animate({y:-(h+300)},1500,function(){
					pao.remove();
					clearInterval(time_zt);
					web_bl=true;
				})
					//碰撞检测
			var time_zt=setInterval(function(){
				
				var obj1=$(".pao"+can);
				var obj2=$(".main div");
				
		   		var left1 = obj1.offset().left;
		   
		  		var right1 = obj1.offset().left + obj1.width();
		   
		  		var top1 = obj1.offset().top;
		   
		  		var bottom1 = obj1.offset().top + obj1.height();
		  		obj2.each(function(index){
		  			//碰撞后
		   			if (right1 >$(this).offset().left && left1 < $(this).offset().left + $(this).width() && bottom1 > $(this).offset().top&& top1 < $(this).offset().top + $(this).height()) {
			  			//生成捕抓概率
						var gl=Math.floor(Math.random()*12);
						//生成网
						var wang=$("<div class='wang"+can+"'></div>");
						$(".web").append(wang);
						//消除炮弹
						$(".pao"+can).remove();
						//网的位置
						$(".wang"+can).offset({"left":$(this).offset().left +$(this).width()*.5-$(".wang"+can).width()*.5,"top":$(this).offset().top +$(this).height()*.5-$(".wang"+can).height()*.5});
			  			//可以再次点击
			  			web_bl=true;
			  			//获取鱼的种类
			  			var bog=$(this).data("id");
			  			
				  		var _this=$(this);
				  		//捕鱼的概率
				  		if(can==7){
				  			gl+=1;
				  		}else{
				  			gl+=can*.1;
				  		}
				  		
				  		if(bog<=gl){
				  			puzhua();
				  			
				  		}else{
					  			$(".wang"+can).transit({"opacity":0},function(){
					  				$(".wang"+can).remove();
					  				
					  			})
					  			clearInterval(time_zt);
				  		}
				  		//捕抓函数
				  		
				  		function puzhua(){
				  			
				  			//被捕抓状态
				  		_this.addClass("si_fish"+bog);
				  		//让鱼停止
				  		_this.stop();
				  		//计算加分
				  		if(bog==1){
				  			gold+=2;
				  			$(".fengs").html(gold);
				  			var add_gold=$("<div class='add_gold'>x2</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==2){
				  			gold+=5;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x5</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==3){
				  			gold+=8;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x8</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==4){
				  			gold+=10;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x10</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==5){
				  			gold+=15;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x15</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==6){
				  			gold+=20;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x20</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==7){
				  			gold+=30;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x30</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==8){
				  			gold+=40;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x40</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==9){
				  			gold+=50;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x50</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==10){
				  			gold+=60;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x60</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==11){
				  			gold+=80;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x80</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		if(bog==12){
				  			gold+=100;
							$(".fengs").html(gold);
							var add_gold=$("<div class='add_gold'>x100</div>");
				  			$(".web").append(add_gold);
				  			add_gold.offset({"left":_this.offset().left +_this.width()*.5,"top":_this.offset().top +_this.height()*.5});
				  			add_gold.transit({y:-50},1000,function(){
				  				add_gold.remove();
				  			})
				  		}
				  		
				  		setTimeout(function(){
				  			
				  			//判断出现金币，银币
				  			if(bog<=4){
				  				//生成银币
				  				var yin=$("<div class='yin'></div>");
				  				$(".web").append(yin);
				  				$(".yin").offset({"left":_this.offset().left +_this.width()*.5-$(".yin").width()*.5,"top":_this.offset().top +_this.height()*.5-$(".yin").height()*.5});
				  				var jinbi=$(".yin");
				  			}else{
				  				//生成金币
				  				var jin=$("<div class='jin'></div>");
				  				$(".web").append(jin);
				  				$(".jin").offset({"left":_this.offset().left +_this.width()*.5-$(".yin").width()*.5,"top":_this.offset().top +_this.height()*.5-$(".yin").height()*.5});
				  				var jinbi=$(".jin");
				  			}
				  			//清除鱼
				  			_this.remove();
				  			jinbi.transit({y:-100},function(){
				  				jinbi.transit({y:700},function(){
				  					jinbi.remove();
				  				})
				  				//进度条
						  		if(jdt>=100){
						  			gold+=500;
									$(".fengs").html(gold);
									var add_gold=$("<div class='add_gold'>x500</div>");
						  			$(".web").append(add_gold);
						  			add_gold.offset({"left":$(".web").width()*.5,"top":$(".web").height()*.5});
						  			add_gold.transit({y:-50,"scale":3},1000,function(){
						  				$(".web").css("background-image","url(img/startbg.jpg)");
						  				add_gold.remove();
						  				jdt=0;
						  			})
						  			
						  			
						  		}else{
						  			jdt+=bog*.1;
						  		}
						  		$(".jingdu").css("transform","translateX("+jdt+"%)");
				  			});
				  			//清除网
				  			$(".wang"+can).remove();
				  		},1000)
				  		
				  		clearInterval(time_zt);
				  		}
			  		}else{//没有发生碰撞
		  				
		  			}	
		  			
		   		})
		    },10)
			
			setTimeout(function(){
				$(".cannon div").removeClass("f_cannon");
				
			},1000);
		}
			
	})


}


