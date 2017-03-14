(function ($) {
    $(function () {
        
        bindEvents();
    });
    //将秒数转为00:00格式   
    function timeToStr(time) {
        var m = 0,
            s = 0,
            _m = '00',
            _s = '00';
        time = Math.floor(time % 3600);
        m = Math.floor(time / 60);
        s = Math.floor(time % 60);
        _s = s < 10 ? '0' + s : s + '';
        _m = m < 10 ? '0' + m : m + '';
        return _m + ":" + _s;
    }
    function bindEvents() {
       var audio = document.getElementById('ao');
        var t = setInterval(function () {
            var currentTime = parseInt(audio.currentTime);
            var duration = parseInt(audio.duration);
            $(".range").attr({ 'max': duration });
            $('.max').text((duration - currentTime) < 1 ? (timeToStr(0)) : timeToStr(duration - currentTime));
            $(".range").val(currentTime);
            $('.cur').text(timeToStr(currentTime));
        }, 1000);
        //触发播放暂停事件   
        $('.play').on('click', function () {
            if (audio.paused) {
                audio.play();
                $(".play").css("background", "url('./images/pause.png') no-repeat");
                $("div.cd").addClass("rotate");

            } else {
                audio.pause();
                $(".play").css("background", "url('./images/play.png') no-repeat");
                $("div.cd").removeClass("rotate");
            }
        });
        //监听滑块，拖动以设置当下播放位置  
        $(".range").on('change', function () {
            audio.currentTime = this.value;
            $(".range").val(this.value);
        });
        $("#soundCtrl").on("click",function(){
            $(".soundCtrl").slideToggle();
        });
        $("#cd-model").on("click",function(){
            $(".cd").toggle();
        });
        $(".cd").on("click",function(){
            $(".play").trigger("click");
        });
        $("#mute").click(function(){
            if(audio.muted){
                $(this).css("background","url('./images/toMute.png') no-repeat");
                audio.muted=false;
            }else{
                $(this).css("background","url('./images/muted.png') no-repeat");
                audio.muted=true;
            }
        });
        $("#upVol").click(function(){
            audio.volume=(audio.volume+0.1)>0.9?1:(audio.volume+0.1);
            console.log(audio.volume);
        });
         $("#downVol").click(function(){
            audio.volume=(audio.volume-0.1)<.1?0:(audio.volume-0.1);
            console.log(audio.volume);
        });

    }

})(jQuery);
