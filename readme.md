#搜索效果
#轮播图
##touch事件
###移动端特有事件安卓，苹果
####touchstart, 
手指刚接触到屏幕出发
####touchmove,
手指在屏幕滑动，不断触发
####touchend,
手指离开屏幕触发事件
####touchcancel
被迫中止滑动触发的事件
###使用事件
绑定：通过on ,但是第二次会覆盖
####dom.addEventListener();谷歌
####dom.attachEvent();IE
dom.addEventListener("touchstart",function(){
})
####其他事件类似
touches：记录页面上所有的触摸点，touchend没有记录
targetTouches:记录当前元素上的所有触摸点集合
changedTouches：记录页面最新改变的触摸点的集合，整个页面都有记录
###获取坐标
####clientx clienty
基于当前视口的触摸点坐标
####pagex pagey
基于当前页面触摸点的坐标
####screenX screenY
基于当前屏幕触摸点坐标
#倒计时
#滑动
#轻触
#手势