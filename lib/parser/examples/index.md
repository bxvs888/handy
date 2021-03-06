<style type="text/css">
        a{
            text-decoration:none;
        }
        .box {
            width: auto;
            margin: 0 auto;
            padding: 0;
        }

        caption {
            text-align: left;
        }

        td {
            text-align: left;
        }

        table {
            margin: 10px 0;
        }

        table td:first-child {
            width: 100px;
        }
        .des{
            background:#F0F1F8;
            border:1px solid #D4D8EB;
            padding:10px;
            line-height:22px;
        }
        pre,code{
            padding:10px;
            background:#FCFBFA;
            border:1px solid #EFEEED;
            border-left-width:5px;
        }
        .bar{
            height:40px;
            background:black;
            color:#fff;
            text-align:center;
            margin:0 0 20px 0;
            font-size:14px;
            line-height:40px;
        }
        body{
            padding:0;
            margin:0;
        }
        .des{
            margin:0 30px;
        }
        .back{
            font-size:14px;
        }
        #J-bottom-btns{
            margin-top:50px;
            text-align:center;
        }
        #J-bottom-btns a{
            color:#fff;
            text-align:center;
            display:block;
            margin-bottom:10px;
            background:#000;
            padding:5px;
        }
        #J-performance-show{
            position:absolute;
            top:0;
            right:0;
            z-index:10;
            background:green;
            color:#fff;
            line-height:23px;
            padding:10px;
            border:1px solid #000;
        }
</style>
<div class="box">
    <div id="J-page-box" data-module-name="pageTransition" data-pageTransition-id="abcd">
        <section data-pageTransition-role="page">
            <h1 class="bar">Example：PageTransition</h1>
            <p class="des" style="border-bottom:none;">PageTransition 提供一个模拟 iOS 原生应用页面过渡效果的 UI 组件。</p>
            <article class="des">
                PageTransition 暂时只提供水平过渡效果，未来的版本会增加过渡模式 (transition mode) 配置<br />
                PageTransition 水平过渡效果使用了 margin-left 动画，并没有使用 translate-x ，由此带来的问题是：<a href="http://qiqicartoon.com/?p=1023" target="_blank">动画运动不够平滑</a>,
                既然 margin-left 在移动平台的动画不够平滑，为何还要使用 margin-left 呢？您可以参考 <a href="http://qiqicartoon.com/?p=785" target="_blank">Android平台中CSS3 transition和animation问题</a><br />
                1、您可以<a href="javascript:void(0)" data-pageTransition-role="trigger" data-pageTransition-action="forward" data-pageTransition-forward="#J-page-box-nextPage">点击此</a>查看 PageTransition 组件所需的 HTML 结构<br />
                2、您可以<a href="javascript:void(0)" data-pageTransition-role="trigger" data-pageTransition-action="forward" data-pageTransition-forward="#J-page-box-nextPage2">查看 pageTransition 组件的基本配置</a><br />
                建议您使用移动设备内置浏览器访问这个页面<br />
                <a href="javascript:void(0)" data-pageTransition-role="trigger" data-pageTransition-action="forward" data-pageTransition-forward="#J-page-box-nextPage">下一页</a>
            </article>
        </section>
    </div>
    <p style="margin:10px 30px;text-align:center;">@copy <a href="http://aralejs.org" target="_blank">arale.org</a></p>

<article id="J-page-box-nextPage" style="display:none;" data-pageTransition-role="page">
    <h1 class="bar">Example: PageTransition 所需的 HTML 结构</h1>
    <article class="des">
        <a href="javascript:void(0)" data-pageTransition-role="trigger" data-pageTransition-action="back" class="back">返回</a><br />
 <pre>
 &lt;div id="J-page-box"&gt;这是最外层的容器
     &lt;section data-pageTransition-role="page"&gt;标识这个标签是 pageTransition 的页面
         &lt;a href="javascript:void(0)" data-pageTransition-role="trigger" data-pageTransition-action="forward" data-pageTransition-forward="#J-page-box-nextPage">点击此&lt;/a&gt;
         这是超链接是一个触点，它必须有 action，forward 和 role 配置，这是 pageTransition 组件的触点最基本的参数
     &lt;/section&gt;
 &lt;/div&gt;
 </pre>
     </article>
</article>

<article id="J-page-box-nextPage2" style="display:none;" data-pageTransition-role="page">
        <h1 class="bar">Example: PageTransition 的基本配置参数</h1>
        <article class="des">
            <a href="javascript:void(0)" data-pageTransition-role="trigger" data-pageTransition-action="back" class="back">返回</a><br />
            <a href="javascript:void(0)" data-pageTransition-role="trigger" data-pageTransition-action="forward" data-pageTransition-forward="#J-page-box-nextPage">点击此</a>查看 PageTransition 组件所需的 HTML 结构<br />
            <a href="javascript:void(0)" id="J-destroy">点击此处销毁 pageTransition </a><br />
<pre>
实例化配置参数：
{
  srcNode:
}
pageTransition 还需要trigger及page参数，这些参数是通过 data-pageTransition-attribute 定义在 html 标签上的
trigger:
  当在 html 中定义一个 PageTransition trigger 时，必须定义它的 action,role 和 forward/back 指向的目标元素，这些定义必须以 data-pageTransition 做前缀
  &lt;a href="javascript:void(0)" data-pageTransition-role="trigger" data-pageTransition-action="forward" data-pageTransition-forward="#J-page-box-nextPage"&gt;点击此&lt;/a&gt;
  如果你的触发器的作用是返回，则不需要指定返回的目标元素，PageTransition 会记录你上一张页面。

page:
  PageTransition 只需要一个 page 即可，它同样以 data-pageTransition 做前缀，以 role 做名称
  data-pageTransition-role="page"
  值得注意的是：凡是要做为 trigger 的 data-pageTransition-forward 属性值的目标元素，必须要定义 data-pageTransition-role="page"。
</pre>
        </article>
</article>
<div data-module-name="overlay" data-overlay-id="one">
    <data data-overlay-align='{"baseXY":["100%","100%"],"selfXY":["100%+30","100%"]}'></data>
    <a href="javascript:void(0)" data-overlay-role="trigger" data-overlay-action="hide">关闭</a>
    <a href="javascript:void(0)" data-overlay-role="trigger" data-overlay-action="destroy">销毁</a>
</div>
<div data-module-name="overlay" data-overlay-id="two">
    <data data-overlay-align='{"baseXY":["center","center"],"selfXY":["center","center"]}'></data>
    <a href="javascript:void(0)" data-overlay-role="trigger" data-overlay-action="hide">取消</a>
</div>
<a href="javascript:void(0)" id="J-showOverlay" style="margin:0 30px;">右下角显示一个 Overlay </a>
<a href="javascript:void(0)" id="J-showOverlay2" style="margin:0 30px;">在中央显示一个 Overlay </a>
</div>

<div id="J-performance-show"></div>

```javascript
    seajs.use(['parser','$'],function (parser,$){
        var completed = function (){
            var time = HandyParserData.time,
                    html = '';

            html += '<p>解析 DOM 的时间：'+time.parseDOM/1000+'ms</p>';
            html += '<p>分析数据的时间：'+time.analyzeData/1000+'ms</p>';
            html += '<p>解析器总共消耗的时间：'+time.parse/1000+'ms</p>';

            document.querySelector('#J-performance-show').innerHTML = html;

            document.querySelector('#J-showOverlay').addEventListener('click',function (){
                HandyParserData.overlay_one.show();
            },false);

            HandyParserData.overlay_two.after('show',function (o){
                o.element.css({
                    left: ($(window).width() - o.element.offset().width) / 2,
                    top:  ($(window).height() - o.element.offset().height) / 2 + window.scrollY
                });
            });
            document.querySelector('#J-showOverlay2').addEventListener('click',function (){
                HandyParserData.overlay_two.show();
            },false);
        };
        HandyParser.on('completed',function (){
            completed();
        });
        HandyParser.start();
    });
```