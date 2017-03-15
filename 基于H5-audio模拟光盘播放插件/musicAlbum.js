; (function ($) {
    //限于背景效果，暂时要求容器media尺寸不小于600*626px
    var Album = function (mediaDiv) {
        // var self = this;//以防在函数中遇到另外的函数或方法时this指向发生变化时取不到本对象，本插件中没有用到
        this.setting = {
            preload: "true",
            loop: "loop",
            autoplay: "true"
        };
        this.media = mediaDiv;
        this.audio = mediaDiv.find("audio");
        //扩展setting对象的内容，当用户设置了对应项是进行覆盖并修改setting的内容
        $.extend(this.setting, this.getSetting());
        this.renderDom();
        this.bindEvents();
        this.cdAutoRoll();
    };

    Album.prototype = {
        //当用户要求页面加载时自动播放音乐时，旋转光盘
        cdAutoRoll: function () {
            if (this.audio[0].played) {
                $(".play").css("background", "url('./images/pause.png') no-repeat");
                $("div.cd,div.music").addClass("rotate");

            }
        },
        //audio.duration值为秒数，需制造一个方法将其转化为时间格式
        timeToStr: function (time) {
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
        },
        //为dom中的元素绑定事件
        bindEvents: function () {
            var audio = this.audio[0];
            var timeToStr = this.timeToStr;
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
                    $("div.cd,div.music").addClass("rotate");

                    $(".cd").css("display", "block");
                } else {
                    audio.pause();
                    $(".play").css("background", "url('./images/play.png') no-repeat");
                    $("div.cd,div.music").removeClass("rotate");
                    $(".cd").css("display", "none");

                }
            });
            //监听滑块，拖动以设置当下播放位置  
            $(".range").on('change', function () {
                audio.currentTime = this.value;
                $(".range").val(this.value);
            });

            $("#cd-model").on("click", function () {
                $('.play').trigger("click");
            });
            $(".cd").on("click", function () {
                $(".play").trigger("click");
            });
            $("#mute").click(function () {
                if (audio.muted) {
                    $(this).css("background", "url('./images/toMute.png') no-repeat");
                    audio.muted = false;
                } else {
                    $(this).css("background", "url('./images/muted.png') no-repeat");
                    audio.muted = true;
                }
            });
            $("#upVol").click(function () {
                audio.volume = (audio.volume + 0.1) > 0.9 ? 1 : (audio.volume + 0.1);
                console.log(audio.volume);
            });
            $("#downVol").click(function () {
                audio.volume = (audio.volume - 0.1) < .1 ? 0 : (audio.volume - 0.1);
                console.log(audio.volume);
            });

        },
        //获取用户传输的设置参数，注意参数对象需为严格的JSON对象
        getSetting: function () {
            var setting = this.media.attr("data-setting");
            if (setting && setting != "") {
                return $.parseJSON(setting);
            } else {
                return {};
            };
        },
        //渲染插件的结构
        renderDom: function () {
            var setting = this.setting;
            var dom =
                "<span class='play'></span><span class='cur'>00:00</span><input type='range' min=0 max=100 class='range' value=0>" +
                "<span class='max'>音频长</span>" +
                "<span id='soundCtrl'></span>" +
                "<div class='soundCtrl'>" +
                "<span id='mute'></span>" +
                "<input type='button' value='+' id='upVol' />音量<input type='button' value='-' id='downVol'>" +
                "<span id='cd-model' title='开启CD模拟模式'></span>" +
                "</div>" +
                "<div class='cd-container'>" +
                "<div class='cd'></div>" +
                "<div class='music'></div>" +
                "</div>";
            this.media.append($(dom));
            this.audio.attr({
                "preload": setting.preload,
                "loop": setting.loop
            });
            if (setting.autoplay === "true") {
                this.audio.attr("autoplay");
            }
        }

    };
    Album.init = function (mediaDvis) {
        var album = this;
        mediaDvis.each(function () {
            new album($(this));
        });
    };
    window["Album"] = Album;
})(jQuery);
