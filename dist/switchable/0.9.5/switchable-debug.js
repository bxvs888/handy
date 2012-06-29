define("#switchable/0.9.5/switchable-debug", ["#zepto/0.9.0/zepto-debug", "#widget/0.9.16/widget-mobile-debug", "#base/0.9.16/base-debug", "#class/0.9.2/class-debug", "#events/0.9.1/events-debug", "#base/0.9.16/aspect-debug", "#base/0.9.16/attribute-debug", "#widget/0.9.16/daparser-mobile-debug", "#widget/0.9.16/auto-render-mobile-debug", "#switchable/0.9.5/const-debug", "#switchable/0.9.5/plugins/effects-debug", "#switchable/0.9.5/plugins/autoplay-debug", "#switchable/0.9.5/plugins/circular-debug", "#switchable/0.9.5/plugins/multiple-debug"], function(require, exports, module) {

    // Switchable
    // -----------
    // 可切换组件，核心特征是：有一组可切换的面板（Panel），可通过触点（Trigger）来触发。
    // 感谢：
    //  - https://github.com/kissyteam/kissy/blob/master/src/switchable/


    var $ = require("#zepto/0.9.0/zepto-debug");
    var Widget = require("#widget/0.9.16/widget-mobile-debug");

    var CONST = require("#switchable/0.9.5/const-debug");
    var Effects = require("#switchable/0.9.5/plugins/effects-debug");
    var Autoplay = require("#switchable/0.9.5/plugins/autoplay-debug");
    var Circular = require("#switchable/0.9.5/plugins/circular-debug");
    var Multiple = require("#switchable/0.9.5/plugins/multiple-debug");


    var Switchable = Widget.extend({

        attrs: {

            // 用户传入的 triggers 和 panels
            // 可以是 Selector、jQuery 对象、或 DOM 元素集
            triggers: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },
            panels: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            // 是否包含 triggers，用于没有传入 triggers 时，是否自动生成的判断标准
            hasTriggers: true,
            // 触发类型
            triggerType: 'click',
            // 触发延迟
            delay: 100,

            // 切换效果，可取 scrollx | scrolly | fade 或直接传入 effect function
            effect: 'none',
            easing: 'linear',
            duration: 500,

            // 初始切换到哪个面板
            activeIndex: {
                value: 0,
                getter: function (val){
                    return val*1;
                },
                setter: function (val){
                    return val*1;
                }
            },

            // 一屏内有多少个 panels
            step: 1,
            // 有多少屏
            length: {
                readOnly: true,
                getter: function() {
                    return this.panels.length / this.get('step');
                }
            },

            // 可见视图区域的大小。一般不需要设定此值，仅当获取值不正确时，用于手工指定大小
            viewSize: []
        },

        setup: function() {
            this._parseRole();
            this._initElement();
            this._initPanels();
            this._initTriggers();
            this._initPlugins();
            this.render();
        },


        _parseRole: function() {
            var role = this.dataset.role;
            if (!role) return;

            var element = this.element;
            var triggers = this.get('triggers');
            var panels = this.get('panels');

            // attr 里没找到时，才根据 data-role 来解析
            if (triggers.length === 0 && (role.trigger || role.nav)) {
                triggers = element.find(role.trigger || role.nav + ' > *');
            }

            if (panels.length === 0 && (role.panel || role.content)) {
                panels = element.find(role.panel || role.content + ' > *');
            }

            this.set('triggers', triggers);
            this.set('panels', panels);
        },

        _initElement: function() {
            this.element.addClass(CONST.UI_SWITCHABLE);
        },

        _initPanels: function() {
            var panels = this.panels = this.get('panels');
            if (panels.length === 0) {
                throw new Error('panels.length is ZERO');
            }

            this.content = panels.parent().addClass(CONST.CONTENT_CLASS);
            panels.addClass(CONST.PANEL_CLASS);
        },

        _initTriggers: function() {
            var triggers = this.triggers = this.get('triggers');

            // 用户没有传入 triggers，也没有通过 data-role 指定时，如果
            // hasTriggers 为 true，则自动生成 triggers
            if (triggers.length === 0 && this.get('hasTriggers')) {
                this.nav = generateTriggersMarkup(
                        this.get('length'),
                        this.get('activeIndex')
                ).appendTo(this.element);

                // update triggers
                this.triggers = this.nav.children();
            }
            else {
                this.nav = triggers.parent();
            }

            this.triggers.addClass(CONST.TRIGGER_CLASS);
            this.nav.addClass(CONST.NAV_CLASS);

            this.triggers.each(function(i, trigger) {
                $(trigger).data('value', i);
            });
            this._bindTriggers();
        },

        _initPlugins: function() {
            this._plugins = [];

            this._plug(Effects);
            this._plug(Autoplay);
            this._plug(Circular);
            this._plug(Multiple);
        },


        _bindTriggers: function() {
            var that = this;

            if (this.get('triggerType') === 'click') {
                this.triggers.click(focus);
            }

            function focus(ev) {
                that._onFocusTrigger(ev.type, $(this).data('value'));
            }
        },

        _onFocusTrigger: function(type, index) {
            var that = this;

            if (type === 'click') {
                this.switchTo(index);
            }
        },


        // 切换到指定 index
        switchTo: function(toIndex) {
            this.set('activeIndex', toIndex);
            return this;
        },

        _onRenderActiveIndex: function(toIndex, fromIndex) {
            if (this._triggerIsValid(toIndex, fromIndex)) {
                this._switchTo(toIndex, fromIndex);
            }
        },

        _switchTo: function(toIndex, fromIndex) {
            this.trigger('switch', toIndex, fromIndex);
            this._switchTrigger(toIndex, fromIndex);
            this._switchPanel(this._getPanelInfo(toIndex, fromIndex));
            this.trigger('switched', toIndex, fromIndex);
        },

        // 触发是否有效
        _triggerIsValid: function(toIndex, fromIndex) {
            return toIndex !== fromIndex;
        },

        _switchTrigger: function(toIndex, fromIndex) {
            var triggers = this.triggers;
            if (triggers.length < 1) return;

            triggers.eq(fromIndex).removeClass(CONST.ACTIVE_CLASS);
            triggers.eq(toIndex).addClass(CONST.ACTIVE_CLASS);
        },

        _switchPanel: function(panelInfo) {
            // 默认是最简单的切换效果：直接隐藏/显示
            panelInfo.fromPanels.css('display','none');
            panelInfo.toPanels.css('display','block');
        },

        _getPanelInfo: function(toIndex, fromIndex) {
            var panels = this.panels.get();
            var step = this.get('step');

            var fromPanels, toPanels;

            if (fromIndex > -1) {
                var begin = fromIndex * step;
                var end = (fromIndex + 1) * step;
                fromPanels = panels.slice(begin, end);
            }

            toPanels = panels.slice(toIndex * step, (toIndex + 1) * step);

            return {
                toIndex: toIndex,
                fromIndex: fromIndex,
                toPanels: $(toPanels),
                fromPanels: $(fromPanels)
            };
        },

        // 切换到上一视图
        prev: function() {
            var fromIndex = this.get('activeIndex');

            // 考虑循环切换的情况
            var index = (fromIndex - 1 + this.get('length')) % this.get('length');
            this.switchTo(index);
        },

        // 切换到下一视图
        next: function() {
            var fromIndex = this.get('activeIndex');
            var index = (fromIndex + 1) % this.get('length');
            this.switchTo(index);
        },


        _plug: function(plugin) {
            if (!plugin.isNeeded.call(this)) return;

            var pluginAttrs = plugin.attrs;
            var methods = plugin.methods;

            if (pluginAttrs) {
                for (var key in pluginAttrs) {
                    if (pluginAttrs.hasOwnProperty(key) &&
                            // 不覆盖用户传入的配置
                            !(key in this.attrs)) {
                        this.set(key, pluginAttrs[key]);
                    }
                }
            }

            if (methods) {
                for (var method in methods) {
                    if (methods.hasOwnProperty(method)) {
                        // 覆盖实例方法。
                        this[method] = methods[method];
                    }
                }
            }

            if (plugin.install) {
                plugin.install.call(this);
            }

            this._plugins.push(plugin);
        },


        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            Switchable.superclass.destroy.call(this);
        }
    });

    module.exports = Switchable;


    // Helpers
    // -------

    function generateTriggersMarkup(length, activeIndex) {
        var nav = $('<ul>');

        for (var i = 0; i < length; i++) {
            var className = i === activeIndex ? CONST.ACTIVE_CLASS : '';

            $('<li>').html(i+1).addClass(className).appendTo(nav);
        }

        return nav;
    }

});
