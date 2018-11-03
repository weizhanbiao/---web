window.onload = function(){
    /*初始化页面功能*/
    /*搜索*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
}

var search = function(){
    /*
     * 1.页面初始化的时候  距离顶部是0的距离的时候  透明度是0
     * 2.当页面滚动的时候  随着页面距离顶部的距离变大  透明度变大
     * 3.当滚动的距离超过了轮播图的距离的时候 保持不变
     * */
    /*获取dom元素*/
    var search = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    /*距离范围*/
    var height = banner.offsetHeight;

    /*监听滚动事件*/
    window.onscroll = function() {

        /*当前页面滚动的距离*/
        var top = document.body.scrollTop;
        /*谷歌*/
        /*var top = document.documentElement.scrollTop;/!*ie*!/*/

        var opacity = 0;

        if (top > height) {
            /*3.当滚动的距离超过了轮播图的距离的时候 保持不变*/
            opacity = 0.85;
        } else {
            /*2.当页面滚动的时候  随着页面距离顶部的距离变大  透明度变大*/
            opacity = 0.85 * (top / height);
        }

        /*设置颜色给搜索盒子*/
        search.style.background = 'rgba(216,80,92,'+opacity+')'
    }

}

var banner = function(){
    /*
    * 1.无缝滚动&无缝滑动（定时器 过渡 位移）
    * 2.点盒子对应改变 （改变当前样式）
    * 3.可以滑动 （touch事件  监听触摸点坐标改变距离  位移）
    * 4.当滑动距离不够的时候   吸附回去  （过渡  位移）
    * 5.当滑动距离够了的时候    跳转  上一张  下一张 （判断方向  过渡  位移）
    * */

    /*获取需要操作的dom元素*/
    /*大容器*/
    var banner = document.querySelector('.jd_banner');
    /*轮播图宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    /*ul:first是jquery封装的选择器  css当中是无效的 */
    /*querySelector用的选着器就是css当中的有效选择器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');

    /*提几个公用的方法*/
    /*加过渡*/
    var addTransition = function(){
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';/*兼容*/
    }
    /*清过渡*/
    var removeTransition = function(){
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';/*兼容*/
    }
    /*设置位移*/
    var setTranslateX = function(translateX){
        imageBox.style.transform = 'translateX('+translateX+'px)';/*移轮播图宽度*/
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';/*兼容*/
    }


    /*1.无缝滚动&无缝滑动（定时器 过渡 位移）*/
    var index = 1;/*默认索引*/
    var timer = setInterval(function(){
        index ++;
        /*过渡*/
        addTransition();
        /*位移*/
        setTranslateX(-index*width);
    },3000);

    /*怎么监听过渡结束这个时间点  过渡结束事件*/
    imageBox.addEventListener('transitionend',function(){
        /*无缝滚动*/
        if(index >=9 ){
            /*瞬间定位到第一张*/
            index = 1;
            /*清除过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index*width);
        }
        /*无缝滑动*/
        else if(index <= 0){
            /*瞬间定位到第八张*/
            index = 8;
            /*清除过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index*width);
        }

        /*正常*/
        /*index 取值范围  1-8  对应点的  0-7 */
        setPoint();
    });

    /*2.点盒子对应改变 （改变当前样式）*/
    var setPoint = function(){
        /*index 1-8 */
        /*去除所有的now样式*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].classList.remove('now');
        }
        /*给对应的加上*/
        points[index-1].classList.add('now');
    }

    /*3.可以滑动 （touch事件  监听触摸点坐标改变距离  位移）*/

    var startX = 0;/*记录开始的X坐标*/
    var distanceX = 0;/*记录坐标坐标轴的改变的*/
    /*严谨判断*/
    var isMove = false;

    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);

        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        /* distanceX 大于0的时候  向右滑动  */
        /* distanceX 小于0的时候  向左滑动  */

        /*滑动*/
        /*基于当前的位置*/
        /*计算将要去做定位*/
        var translateX = -index*width + distanceX;
        /*清除过渡*/
        removeTransition();
        /*做定位*/
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend',function(e){
        /*滑动事件结束之后来判断当前滑动的距离*/
        /*有一个范围  如果大于三分之一切换图片 反之吸附回去定位回去*/
        if(isMove){
            if(Math.abs(distanceX) < width/3){
                /* 4.当滑动距离不够的时候   吸附回去  （过渡  位移）*/
                /*过渡*/
                addTransition();
                /*位移*/
                setTranslateX(-index*width);
            }else{
                /*5.当滑动距离够了的时候    跳转  上一张  下一张 （判断方向  过渡  位移）*/
                if(distanceX > 0 ){
                    /*向右滑  上一张*/
                    index -- ;
                }else{
                    /*向左滑 下一张*/
                    index ++ ;
                }
                /*加过渡*/
                addTransition();
                /*定位*/
                setTranslateX(-index*width);
            }
        }

        /*加上定时器*/
        /*严谨做法  保证只加一次*/
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            /*过渡*/
            addTransition();
            /*位移*/
            setTranslateX(-index*width);
        },3000);

        /*重置参数*/
        startX = 0;
        distanceX = 0;
        isMove = false;

    });
}


let downTime = function(){
    /*
    * 1.模拟倒计时的时间  是11个小时
    * 2.利用定时器  1  秒一次   重新展示时间
    * */

    let time = 60*60*11;

    let skTime = document.querySelector('.sk_time');
    let spans = skTime.querySelectorAll('span');

    let timer = setInterval(function(){

        time -- ;

        /*格式化时间*/
        let h = Math.floor(time/3600);
        let m = Math.floor(time%3600/60);
        let s = time%60;

        /*设置时间*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    },1000);


}















