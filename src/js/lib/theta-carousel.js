(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var effect_base = require('./effect_base.js');
        var vector = require('./../vector.js');
        var rotation = require('./../rotation.js');

        var base = new effect_base(carousel, {
        
        });

        this.xDirection = new vector();
        this.xDirection.x = 1;

        this.yDirection = new vector();
        this.yDirection.y = 1;
    
        $.extend(this, base);
        $.extend(this.settings, settings);

        this.apply = function (elementTransform, element, value) {

            var currentPoint = this.carousel.path.getPoint(value);
            var directionPoint = this.carousel.path.getPoint(value + 0.1);
        
            var direction = new vector();
            direction.initFromPoints(currentPoint, directionPoint);
            var angle = direction.angle(this.xDirection);

            angle *= this.carousel.options.allignElementsWithPathCoefficient;

            elementTransform.rotations.push(new rotation(this.yDirection, angle));
        };
    };

})(jQuery);
},{"./../rotation.js":30,"./../vector.js":35,"./effect_base.js":2}],2:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        this.carousel = carousel;

        this.applyPhase = 'positioning';

        this.settings = {
        };

        $.extend(this.settings, settings);

        this.getApplyingPriority = function () {
            return 0;
        };

        this.apply = function (elementTransform, element, value) {

        };

        this.revert = function () {

        };
    };

})(jQuery);
},{}],3:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var effect_base = require('./effect_base.js');
        var getBezier = require('./../bezier.js');
    
        var base = new effect_base(carousel, {

        });

    
        $.extend(this, base);
        $.extend(this.settings, settings);

        this.apply = function (elementTransform, element, value) {
            var root = this.carousel.path.rootValue();
            var distance = Math.abs(value - root);
            var absDist = this.carousel.options.distance * this.carousel.options.fadeAwayNumberOfConfigurableElements;

            var bezierT = 1 - Math.min(distance / absDist, 1);

            var points = this.carousel.options.fadeAwayBezierPoints;
            var opacity = getBezier(bezierT, points.p1, points.p2, points.p3, points.p4).y;
            element.$element.css({ opacity: opacity / 100 });
        };
    };

})(jQuery);
},{"./../bezier.js":10,"./effect_base.js":2}],4:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var effect_base = require('./effect_base.js');

        var base = new effect_base(carousel, {

        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.apply = function (elementTransform, element, value) {
            var distFromRoot = Math.abs(value - this.carousel.path.rootValue());
            var coef = 1 - distFromRoot / this.carousel.options.distance;
            coef = Math.max(coef, 0);

            elementTransform.translateX += this.carousel.options.popoutSelectedShiftX * coef;
            elementTransform.translateY += this.carousel.options.popoutSelectedShiftY * coef;
            elementTransform.translateZ += this.carousel.options.popoutSelectedShiftZ * coef;
        };
    };

})(jQuery);
},{"./effect_base.js":2}],5:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var effect_base = require('./effect_base.js');

        var base = new effect_base(carousel, {

        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.apply = function (elementTransform, element, value) {
        
            if(element.isReflectionApplied)
                return;

            element.isReflectionApplied = true;
        
            element.$element.css("box-reflect", "below " + this.carousel.options.reflectionBelow +
                "px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" +
                    (1 - this.carousel.options.reflectionHeight) + ", transparent), to(black))");
        };

        this.revert = function () {
            for (var i = 0; i < this.carousel.elements.length; i++) {
                this.carousel.elements[i].isReflectionApplied = false;
                this.carousel.elements[i].$element.css("box-reflect", '');
            }
        };
    };

})(jQuery);

},{"./effect_base.js":2}],6:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var effect_base = require('./effect_base.js');
        var getBezier = require('./../bezier.js');
        var vector = require('./../vector.js');
        var rotation = require('./../rotation.js');

        var base = new effect_base(carousel, {

        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.apply = function (elementTransform, element, value) {
            var root = this.carousel.path.rootValue();
            var distance = Math.abs(value - root);
            var absDist = this.carousel.options.distance * this.carousel.options.rotationNumberOfConfigurableElements;

            var bezierT = 1 - Math.min(distance / absDist, 1);

            var points = this.carousel.options.rotationBezierPoints;
            var angle = getBezier(bezierT, points.p1, points.p2, points.p3, points.p4).y;

            if (value < root && this.carousel.options.rotationInvertForNegative)
                angle *= -1;

            var rotationVector = new vector();
            rotationVector.x = this.carousel.options.rotationVectorX,
            rotationVector.y = this.carousel.options.rotationVectorY,
            rotationVector.z = this.carousel.options.rotationVectorZ,
            elementTransform.rotations.push(new rotation(rotationVector, angle));
        };
    };

})(jQuery);

},{"./../bezier.js":10,"./../rotation.js":30,"./../vector.js":35,"./effect_base.js":2}],7:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var effect_base = require('./effect_base.js');

        var base = new effect_base(carousel, {

        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.apply = function (elementTransform, element, value) {

            var boxShadow = '0px 0px ' + this.carousel.options.shadowBlurRadius + 'px ' + this.carousel.options.shadowSpreadRadius + 'px #000000';

            var elementToApply = element.$element;

            if (this.carousel.options.shadowSelector) {
                elementToApply = $(this.carousel.options.shadowSelector, elementToApply);
            }

            elementToApply.css({
                '-webkit-box-shadow': boxShadow,
                '-moz-box-shadow': boxShadow,
                'box-shadow': boxShadow
            });
        };

        this.revert = function () {
            for (var i = 0; i < this.carousel.elements.length; i++) {

                var elementToApply = this.carousel.elements[i].$element;

                if (this.carousel.options.shadowSelector) {
                    elementToApply = $(this.carousel.options.shadowSelector, elementToApply);
                }

                elementToApply.css({
                    '-webkit-box-shadow': '',
                    '-moz-box-shadow': '',
                    'box-shadow': ''
                });
            }
        };
    };
})(jQuery);
},{"./effect_base.js":2}],8:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var effect_base = require('./effect_base.js');
        var getBezier = require('./../bezier.js');

        var base = new effect_base(carousel, {

        });


        $.extend(this, base);
        $.extend(this.settings, settings);

        this.apply = function (elementTransform, element, value) {
            var root = this.carousel.path.rootValue();
            var distance = Math.abs(value - root);
            var absDist = this.carousel.options.distance * this.carousel.options.sizeAdjustmentNumberOfConfigurableElements;

            var bezierT = 1 - Math.min(distance / absDist, 1);

            var points = this.carousel.options.sizeAdjustmentBezierPoints;
            var scale = getBezier(bezierT, points.p1, points.p2, points.p3, points.p4).y;
            elementTransform.scale = scale / 100;
        };
    };

})(jQuery);

},{"./../bezier.js":10,"./effect_base.js":2}],9:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel) {

        this.autorotationStarted = false;
        this.carousel = carousel;
        this.autorotationTimer = null;

        extend(this);
        this.carousel.widget().on("motionEnd", this.onMotionEnd);
        this.applySettings();
    };

    function extend(obj) {
        obj.applySettings = function () {
            if (this.carousel.options.autorotation)
                this.ensureStarted();
            else {
                this.autorotationStarted = false;
                if (this.autorotationTimer)
                    clearTimeout(this.autorotationTimer);
            }
        };

        obj.ensureStarted = function() {
            if (!this.autorotationStarted) {
                this.autorotationStarted = !!(this.move());
            }
        };

        obj.move = $.proxy(function() {
            if (this.carousel.options.autorotationDirection == 'left') {
                return this.carousel.moveBack();
            }

            if (this.carousel.options.autorotationDirection == 'right') {
                return this.carousel.moveForward();
            }
        }, obj);

        obj.onMotionEnd = $.proxy(function () {
            if (this.autorotationStarted) {

                if (this.autorotationTimer)
                    clearTimeout(this.autorotationTimer);

                this.autorotationTimer = setTimeout(this.move, this.carousel.options.autorotationPause);
            }
        }, obj);

        obj.destroy = function () {
            this.carousel.widget().off("motionEnd", this.onMotionEnd);
        };
    }
})(jQuery);
},{}],10:[function(require,module,exports){
function b1(t) { return t * t * t; };

function b2(t) { return 3 * t * t * (1 - t); };

function b3(t) { return 3 * t * (1 - t) * (1 - t); };

function b4(t) { return (1 - t) * (1 - t) * (1 - t); };

module.exports =
(function ($) {
    "use strict";
    return function(t, p1, cp1, cp2, p2) {
        var pos = {x:0,y:0};
        pos.x = p1.x*b1(t) + cp1.x*b2(t) + cp2.x*b3(t) + p2.x*b4(t);
        pos.y = p1.y*b1(t) + cp1.y*b2(t) + cp2.y*b3(t) + p2.y*b4(t);
        return pos;
    };

})(jQuery);

},{}],11:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    var getBezier = require('./bezier.js');

    var bezierBoxCache = [];

    function getBezierBox(p1, cp1, cp2, p2) {
        var point = getBezier(0, p1, cp1, cp2, p2);
        var minX = point.x;
        var minY = point.y;
        var maxX = point.x;
        var maxY = point.y;

        for (var i = 0; i <= 20; i++) {
            var tempPoint = getBezier(i * 0.05, p1, cp1, cp2, p2);
            minX = Math.min(tempPoint.x, minX);
            minY = Math.min(tempPoint.y, minY);
            maxX = Math.max(tempPoint.x, maxX);
            maxY = Math.max(tempPoint.y, maxY);
        }

        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY,
            width: maxX - minX,
            height: maxY - minY
        };
    };

    return function(p1, cp1, cp2, p2) {
        var key = p1.x + '.' + p1.y +
            '.' + cp1.x + '.' + cp1.y +
            '.' + cp2.x + '.' + cp2.y +
            '.' + p2.x + '.' + p2.y;

        if (typeof (bezierBoxCache[key]) == "undefined")
            bezierBoxCache[key] = getBezierBox(p1, cp1, cp2, p2);
        return bezierBoxCache[key];
    };

})(jQuery);

},{"./bezier.js":10}],12:[function(require,module,exports){
require('./easings.js')(); // patch jquery with easings

/*!
 * TODO: add about
 * 
 */

(function ($) {
    "use strict";
    if (!$.theta) {
        $.theta = new Object();
    };

    var comulative_animation = require('./comulative_animation.js');
    var fluid_layout = require('./fluid_layout.js');
    var elements_size_updater = require('./elements_size_updater.js');
    var input_controller = require('./input_controller.js');
    var motion_controller = require('./motion_controller.js');
    var rotation_logic_controller = require('./rotation_logic_controller.js');
    var endless_rotation_logic_controller = require('./endless_rotation_logic_controller.js');
    var fallback_rotation_logic_controller = require('./fallback_rotation_logic_controller.js');
    var auto_rotator = require('./auto_rotator.js');
    var size = require('./size.js');
    var utils = require('./utils.js');

    var path_archimedes_spiral = require('./paths/path_archimedes_spiral.js');
    var path_cubic = require('./paths/path_cubic.js');
    var path_cubic_bezier = require('./paths/path_cubic_bezier.js');
    var path_ellipse = require('./paths/path_ellipse.js');
    var path_line = require('./paths/path_line.js');
    var path_parabola = require('./paths/path_parabola.js');
    
    var effect_allign_to_path = require('./VisualEffects/effect_allign_to_path.js');
    var effect_fade_away = require('./VisualEffects/effect_fade_away.js');
    var effect_pop_out_selected = require('./VisualEffects/effect_pop_out_selected.js');
    var effect_rotation = require('./VisualEffects/effect_rotation.js');
    var effect_shadow = require('./VisualEffects/effect_shadow.js');
    var effect_size_adjustment = require('./VisualEffects/effect_size_adjustment.js');
    var effect_reflection = require('./VisualEffects/effect_reflection.js');
    
    var version = '1.7.0';
    var defaultOptions = {
        filter: "div",
        selectedIndex: 0,
        distance: 70,
        mode3D: 'z',
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        perspective: 1000,
        numberOfElementsToDisplayRight: null,
        numberOfElementsToDisplayLeft: null,
        sensitivity: 1,
        verticalRotation: false,
        minKeyDownFrequency: 0,
        rotationAnimationEasing: 'easeOutCubic',
        rotationAnimationDuration: 500,
        inertiaFriction: 10,
        inertiaHighFriction: 50,
        path: {
            type: "parabola",
            settings: {}
        },
        designedForWidth: null,
        designedForHeight: null,
        enabled: true,
        mousewheelEnabled: true,
        keyboardEnabled: true,
        gesturesEnabled: true,

        autorotation: false,
        autorotationDirection: 'right', /* left, right */
        autorotationPause: 0,

        // effects
        allignElementsWithPath: false,
        allignElementsWithPathCoefficient: 1,

        fadeAway: false,
        fadeAwayNumberOfConfigurableElements: 5,
        fadeAwayBezierPoints: { p1: { x: 0, y: 100 }, p2: { x: 50, y: 50 }, p3: { x: 50, y: 50 }, p4: { x: 100, y: 0 } },

        rotation: false,
        rotationVectorX: 0,
        rotationVectorY: 0,
        rotationVectorZ: 0,
        rotationNumberOfConfigurableElements: 5,
        rotationBezierPoints: { p1: { x: 0, y: 0 }, p2: { x: 50, y: 0 }, p3: { x: 50, y: 0 }, p4: { x: 100, y: 0 } },
        rotationInvertForNegative: false,

        sizeAdjustment: false,
        sizeAdjustmentNumberOfConfigurableElements: 5,
        sizeAdjustmentBezierPoints: { p1: { x: 0, y: 100 }, p2: { x: 50, y: 100 }, p3: { x: 50, y: 100 }, p4: { x: 100, y: 100 } },

        shadow: false,
        shadowBlurRadius: 100,
        shadowSpreadRadius: 0,
        shadowSelector: null,

        popoutSelected: false,
        popoutSelectedShiftX: 0,
        popoutSelectedShiftY: 0,
        popoutSelectedShiftZ: 0,

        reflection: false,
        reflectionBelow: 0,
        reflectionHeight: 0.3,

        fallback: 'auto', // auto, always, never
        distanceInFallbackMode: 200
    };

    $.theta.carousel = function (domElement, options) {

        var carousel = this;
        carousel.$element = $(domElement);
        carousel.$element.data("theta.carousel", carousel);
        carousel.$element.addClass('theta-carousel');

        carousel._create = function () {
            this.options = $.extend(true, {}, $.theta.carousel.defaultOptions, options);

            // prepare container
            var containerSize = new size(this.widget().width(), this.widget().height());

            this.container = $('<div class="theta-carousel-inner-container"></div>');
            this.container.appendTo(this.widget());
            this.container.css({
                width: containerSize.width + 'px',
                height: containerSize.height + 'px'
            });

            this.widget().attr('tabindex', 0).css({ outline: 'none', overflow: 'hidden' });
            this.container.css({
                overflow: 'hidden',
                transform: 'translate3d(0px,0px, 100000px)'
            });

            if (!utils.isFF()) {
                // bugs in firefox
                this.container.css({
                    perspective: this.options.perspective + 'px',
                });
            }

            // init elements
            this.update();

            // prepare widget
            this.effects = [];
            this._createPath();
            this._createEffects();
            this._createRotationLogicController();
            this.elementsSizeUpdater = new elements_size_updater(this);
            this.fluidLayout = new fluid_layout(this);
            this._alignElements();
            this.animation = new comulative_animation(this);
            this.motionController = new motion_controller(this, $.proxy(this._motionConsumer, this));
            this.inputController = new input_controller(this);
            this.autoRotator = new auto_rotator(this);

            // attach event listeners
            $(this.animation).on('step', $.proxy(function (e, shift) { this._alignElements(shift); }, this));
            $(this.animation).on('done', $.proxy(function (e, value) {
                this._rotationAnimationCompleted(value);
                this._raiseMotionEnd();
            }, this));
            $(this.motionController).on('end', $.proxy(function (e, value) { this._motionEnd(value); }, this));
            $(this.motionController).on('start', $.proxy(this._raiseMotionStart, this));

            this.initialized = true;
        };

        carousel.destroy = function () {

            for (var i = 0; i < this.effects.length; i++) {
                this.effects[i].revert();
            }

            if (this.rotationLogicController != null)
                this.rotationLogicController.destroy();
            this.inputController.destroy();
            this.fluidLayout.destroy();
            this.elementsSizeUpdater.destroy();
            this.autoRotator.destroy();
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].$element.off('tap', this.moveTo);
                this.elements[i].$element.off("click", this.moveTo);
            }
            this.widget().data('theta.carousel', null);
        };

        carousel.moveBack = function () {
            return this.rotationLogicController.moveBack();
        };

        carousel.moveForward = function () {
            return this.rotationLogicController.moveForward();
        };

        carousel.moveTo = function (index) {
            this.rotationLogicController.moveTo(index);
        };

        carousel.invalidate = function () {
            if (!this._isInMotion)
                this._alignElements();
        };

        carousel.update = function () {

            var itemsToAdd = this.widget().contents().filter(
                function() {
                    return (
                        this.nodeType == 8 /*we need comments for AngularJS*/
                        ||
                        !$(this).hasClass('theta-ignore')
                    ) && !$(this).hasClass('theta-carousel-inner-container'); // ignore internal container
                });

            itemsToAdd.appendTo(this.container);

            this.elements = this.container.children().filter(this.options.filter).map(function (i, e) {
                var $e = $(e);

                var order = $e.data('theta-order');

                if (!order)
                    order = i;
                
                return { $element: $e, element: e, order: order };
            }).toArray();

            this.elements.sort(function (e1, e2) { return e1.order - e2.order; });

            for (var i = 0; i < this.elements.length; i++) {

                this.elements[i].index = i;
                this.elements[i].element.index = i;

                if (!this.elements[i].$element.hasClass('theta-carousel-element')) {

                    var moveToProxy = $.proxy(function (e) {
                        if (this.options.enabled && !this.options.autorotation) {
                            this.moveTo(e.index);
                        }
                    }, this, this.elements[i].element);

                    this.elements[i].$element.addClass('theta-carousel-element');
                    this.elements[i].$element.css({ position: 'absolute' });
                    this.elements[i].$element.on('tap', moveToProxy);
                    this.elements[i].$element.click(moveToProxy);

                }
            }

            this.options.selectedIndex = Math.max(Math.min(this.options.selectedIndex, this.elements.length - 1), 0);

            if (this.elements.length == 0)
                this.options.selectedIndex = -1;

            if (this.initialized) {
                this.elementsSizeUpdater.update();
                this.invalidate();
            }

            this._applyCurrentItemStyle();
        };

        carousel.getIsInMotion = function () {
            return this._isInMotion;
        };

        carousel.getIsFallbackMode = function () {
            return this.rotationLogicController.isFallbackMode();
        };

        carousel.widget = function () {
            return this.$element;
        };

        carousel._setOption = function (name, value) {
            
            utils.setObjectPropertyValue(carousel.options, name, value);

            if (name === 'rotationAnimationDuration' || name === 'rotationAnimationEasing') {
                // don't need to do something if these properties has been changed
                return;
            }

            if (name === 'filter') {
                this.update();
            }

            if (name === 'perspective') {
                this.container.css({ perspective: value + 'px' });
                if (this.options.mode3D == 'scale')
                    this._alignElements();
            }

            if (name.indexOf('path') == 0 || name === 'fallback') {
                this._createPath();
                this._createRotationLogicController();
                this._alignElements();
            }

            if (name === "selectedIndex" || name === "distance" || name === "mode3D"
                || name === "numberOfElementsToDisplayRight" || name === "numberOfElementsToDisplayLeft"
                || name === "scaleX" || name === "scaleY" || name === "scaleZ"
                || name === "allignElementsWithPathCoefficient"
                || name === "fadeAwayBezierPoints" || name === "fadeAwayNumberOfConfigurableElements"
                || name === "rotationBezierPoints" || name === "rotationNumberOfConfigurableElements" || name === "rotationInvertForNegative"
                || name === "rotationVectorX" || name === "rotationVectorY" || name === "rotationVectorZ"
                || name === "sizeAdjustmentNumberOfConfigurableElements" || name === "sizeAdjustmentBezierPoints"
                || name === "shadowBlurRadius" || name === "shadowSpreadRadius"
                || name === "popoutSelectedShiftX" || name === "popoutSelectedShiftY" || name === "popoutSelectedShiftZ"
                || name === "distanceInFallbackMode"
                ) {
                this._alignElements();
            }

            if (name.indexOf('autorotation') != -1) {
                this.autoRotator.applySettings();
            }

            if (name.indexOf('allignElementsWithPath') != -1 || name.indexOf('fadeAway') != -1 || name.indexOf('rotation') != -1
                || name.indexOf('sizeAdjustment') != -1 || name.indexOf('shadow') != -1 || name.indexOf('popoutSelected') != -1
                || name.indexOf('reflection') != -1) {
                this._createEffects();
                this._alignElements();
            }

            if (name === 'selectedIndex') {
                this._applyCurrentItemStyle();
            }
        };

        carousel._createRotationLogicController = function()
        {
            if (this.rotationLogicController != null)
                this.rotationLogicController.destroy();

            if (this.path.isEndless())
                this.rotationLogicController = new endless_rotation_logic_controller(this);
            else
                this.rotationLogicController = new rotation_logic_controller(this);

            if (this.options.fallback == 'always' || (this.options.fallback == 'auto' && fallback_rotation_logic_controller.fallback())) {
                this.rotationLogicController = new fallback_rotation_logic_controller(this, this.rotationLogicController);
            }

            if (this.autoRotator) {
                this.autoRotator.applySettings();
            }
        };

        carousel._createEffects = function () {

            for (var i = 0; i < this.effects.length; i++) {
                this.effects[i].revert();
            }

            this.effects = [];

            if (this.options.allignElementsWithPath)
                this.effects.push(new effect_allign_to_path(this, {}));

            if (this.options.fadeAway)
                this.effects.push(new effect_fade_away(this, {}));

            if (this.options.rotation)
                this.effects.push(new effect_rotation(this, {}));

            if (this.options.sizeAdjustment)
                this.effects.push(new effect_size_adjustment(this, {}));

            if (this.options.shadow)
                this.effects.push(new effect_shadow(this, {}));

            if (this.options.popoutSelected)
                this.effects.push(new effect_pop_out_selected(this, {}));

            if (this.options.reflection)
                this.effects.push(new effect_reflection(this, {}));
        };

        carousel._createPath = function () {
            var newPath = null;

            if (this.options.path.type == "parabola") {
                newPath = new path_parabola(this, this.options.path.settings);
            }

            if (this.options.path.type == "line") {
                newPath = new path_line(this, this.options.path.settings);
            }

            if (this.options.path.type == "cubic") {
                newPath = new path_cubic(this, this.options.path.settings);
            }

            if (this.options.path.type == "archimedes_spiral") {
                newPath = new path_archimedes_spiral(this, this.options.path.settings);
            }

            if (this.options.path.type == "ellipse") {
                newPath = new path_ellipse(this, this.options.path.settings);
            }

            if (this.options.path.type == "cubic_bezier") {
                newPath = new path_cubic_bezier(this, this.options.path.settings);
            }

            if (newPath != null) {
                this.path = newPath;
                this.options.path.settings = this.path.settings;
            } else
                throw "path " + this.options.path.type + " is not supported.";
        };

        carousel._raiseChangeEvent = function () {
            this.widget().trigger("change", { index: this.options.selectedIndex });
            this._applyCurrentItemStyle();
        };

        carousel._applyCurrentItemStyle = function () {
            for (var i = 0; i < this.elements.length; i++) {
                if (i === this.options.selectedIndex) {
                    this.elements[i].$element.addClass('theta-current-item');
                }
                else {
                    this.elements[i].$element.removeClass('theta-current-item');
                }
            }
        };

        carousel._raiseMotionStart = function () {
            this._isInMotion = true;
            this.widget().addClass('theta-in-motion');
            this.widget().trigger("motionStart", { index: this.options.selectedIndex });
        };

        carousel._raiseMotionEnd = function () {
            this.inputController.nonInterruptibleMode(false);
            this.widget().removeClass('theta-in-motion');
            this._isInMotion = false;
            this.widget().trigger("motionEnd", { index: this.options.selectedIndex });
        };

        carousel._rotationAnimationCompleted = function (index) {
            if (this.options.selectedIndex != index) {
                this.options.selectedIndex = index;
                this._raiseChangeEvent();
            }
            this._alignElements();
        };

        carousel._motionConsumer = function (distance) {
            return this.rotationLogicController.consumeMotion(distance);
        };

        carousel._motionEnd = function (remainingDistance) {
            this.rotationLogicController.handleMotionEnd(remainingDistance);
        };

        carousel._alignElements = function (animationShift) {
            return this.rotationLogicController.alignElements(animationShift);
        };

        carousel._getContainerSize = function () {
            var container = $('.theta-carousel-inner-container', this.widget());
            return new size(container.width(), container.height());
        };

        carousel._create();
    };

    $.theta.carousel.defaultOptions = defaultOptions;
    $.theta.carousel.version = version;

    $.fn.theta_carousel = function (options) {
        var callArguments = arguments;

        var hasCallRes = false;
        var callRes = null;

        var eachRes = this.each(function () {
            var $el = $(this);
            var instance = $el.data('theta.carousel');

            if (instance) {
                if (typeof options === 'string') {

                    if (typeof instance[options] === 'function') {
                        var args = Array.prototype.slice.call(callArguments, 1);
                        hasCallRes = true;
                        callRes = instance[options].apply(instance, args);
                    }

                    if (options == 'option') {
                        if (callArguments.length == 2) {
                            hasCallRes = true;
                            callRes = utils.getObjectPropertyValue(instance.options, callArguments[1]);
                        }

                        if (callArguments.length == 3) {
                            instance._setOption(callArguments[1], callArguments[2]);
                        }
                    }
                    
                } else {
                    var clone = $.extend(true, {}, options);
                    $.each(clone, $.proxy($el.data('theta.carousel')._setOption, $el.data('theta.carousel')));
                }
            }
            else 
                (new $.theta.carousel(this, options));
        });

        if (!hasCallRes)
            return eachRes;
        else
            return callRes;
    };

})(jQuery);
},{"./VisualEffects/effect_allign_to_path.js":1,"./VisualEffects/effect_fade_away.js":3,"./VisualEffects/effect_pop_out_selected.js":4,"./VisualEffects/effect_reflection.js":5,"./VisualEffects/effect_rotation.js":6,"./VisualEffects/effect_shadow.js":7,"./VisualEffects/effect_size_adjustment.js":8,"./auto_rotator.js":9,"./comulative_animation.js":13,"./easings.js":14,"./elements_size_updater.js":15,"./endless_rotation_logic_controller.js":16,"./fallback_rotation_logic_controller.js":17,"./fluid_layout.js":18,"./input_controller.js":20,"./motion_controller.js":21,"./paths/path_archimedes_spiral.js":22,"./paths/path_cubic.js":24,"./paths/path_cubic_bezier.js":25,"./paths/path_ellipse.js":26,"./paths/path_line.js":27,"./paths/path_parabola.js":28,"./rotation_logic_controller.js":31,"./size.js":32,"./utils.js":34}],13:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function(carousel) {
        this.carousel = carousel;

        this.isInProgress = false;
        this.inProgressAnimationTarget = null;
        this.queue = [];
        this.distance = [];
        this.currentElement = null;

        this.clearQueue = function () {
            this.queue = [];
            this.distance = [];
        };

        this.animate = function (from, to, targetValue, easing, duration) {

            if (typeof (easing) == "undefined")
                easing = null;
            if (typeof (duration) == "undefined")
                duration = null;

            this.addDistance(Math.abs(to - from));

            if (this.queue.length > 5)
                return;

            this.queue.push({ from: from, to: to, targetValue: targetValue, easing: easing, duration: duration });

            if (!this.isInProgress) {
                this.peekFromQueue();
            }
        };

        this.completeCurrentImmediately = function () {
            if (this.currentElement != null) {
                this.currentElement.stop(true, true);
            }
        };

        this.peekFromQueue = function () {

            if (this.queue.length > 0) {
                var element = this.queue[0];
                this.queue = this.queue.slice(1);
                this.inProgressAnimationTarget = element.targetValue;
                this.currentElement = $(element);
                var stepDist = Math.abs(element.from - element.to);

                var easing = element.easing == null ? this.getEasing(stepDist) : element.easing;
                var duration = (element.duration == null ? this.carousel.options.rotationAnimationDuration : element.duration) * this.getDurationCoefficient(stepDist);

                this.currentElement.animate({ from: element.to }, {
                    easing: easing,
                    duration: duration,
                    start: $.proxy(this.onStart, this),
                    step: $.proxy(this.onStep, this),
                    done: $.proxy(this.onDone, this),
                    always: $.proxy(this.onAlways, this)
                });
            }
        };

        this.getTargetValue = function () {
            if (this.queue.length > 0)
                return this.queue[this.queue.length - 1].targetValue;
            return this.inProgressAnimationTarget;
        };

        this.onStart = function () {
            this.isInProgress = true;
        };

        this.onStep = function (val) {
            $(this).trigger('step', val);
        };

        this.onDone = function () {
            $(this).trigger('done', this.inProgressAnimationTarget);
        };

        this.onAlways = function () {
            this.isInProgress = false;
            this.peekFromQueue();
            this.currentElement = null;
        };

        this.addDistance = function (value) {
            this.distance.push({ date: new Date(), value: value });

            this.distance = $(this.distance).filter(function (i, d) {
                return (new Date() - d.date) < 5000;
            });
        };

        this.getActualDistance = function () {

            var distance = 0;
            var date = new Date();
            for (var i = 0; i < this.distance.length; i++) {

                var d = this.distance[i];

                if ((date - d.date) < this.carousel.options.rotationAnimationDuration)
                    distance += d.value;
            }

            return distance;
        };

        // adjust rotation duration, if user quiqly press next button several times
        this.getDurationCoefficient = function (oneStepDist) {
            if (this.carousel.options.autorotation) // adjustment is not required for auto rotation
                return 1; // 

            if (this.getActualDistance() == 0)
                return 1;
            return 1 / (this.getActualDistance() / oneStepDist);
        };

        this.getEasing = function (oneStepDist) {
            if (this.getDurationCoefficient(oneStepDist) > 0.4)
                return this.carousel.options.rotationAnimationEasing;
            else
                return "linear";
        };
    };

})(jQuery);

},{}],14:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function () {

        // based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

        var baseEasings = {};

        $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (i, name) {
            baseEasings[name] = function (p) {
                return Math.pow(p, i + 2);
            };
        });

        $.extend(baseEasings, {
            Sine: function (p) {
                return 1 - Math.cos(p * Math.PI / 2);
            },
            Circ: function (p) {
                return 1 - Math.sqrt(1 - p * p);
            },
            Elastic: function (p) {
                return p === 0 || p === 1 ? p :
                    -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
            },
            Back: function (p) {
                return p * p * (3 * p - 2);
            },
            Bounce: function (p) {
                var pow2,
                    bounce = 4;

                while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) { }
                return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
            }
        });

        var allEasings = {};
        $.each(baseEasings, function (name, easeIn) {
            allEasings["easeIn" + name] = easeIn;
            allEasings["easeOut" + name] = function (p) {
                return 1 - easeIn(1 - p);
            };
            allEasings["easeInOut" + name] = function (p) {
                return p < 0.5 ?
                    easeIn(p * 2) / 2 :
                    1 - easeIn(p * -2 + 2) / 2;
            };
        });

        $.each(allEasings, function (name, e) {
            if (typeof ($.easing[name]) == "undefined")
                $.easing[name] = e;
        });

    };

})(jQuery);
},{}],15:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    function extend(obj) {

        obj.update = function () {
            var invalidate = false;
            for (var i = 0; i < this.carousel.elements.length; i++) {
                var e = this.carousel.elements[i];

                var oldSize = null;
                if (e.size)
                    oldSize = e.size;

                e.size = {
                    height: e.$element.height(),
                    width: e.$element.width()
                }

                if (!oldSize || oldSize.height != e.size.height || oldSize.width != e.size.width)
                    invalidate = true;
            }

            if (invalidate)
                this.carousel.invalidate();
        };

        obj.destroy = function () {
            clearInterval(this.interval);
        };
    }

    return function (carousel) {

        extend(this);

        this.carousel = carousel;
        this.interval = setInterval($.proxy(this.update, this), 500);

        this.update();
    };

})(jQuery);

},{}],16:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    function extend(obj) {

        obj.moveToInternal = function (index) {
            var straight = this.carousel.options.selectedIndex - index;
            var reverse = 0;
            var reversePreferable = false;
            if (index > this.carousel.options.selectedIndex) {
                reverse = this.carousel.elements.length - index + this.carousel.options.selectedIndex;
            }
            else {
                reverse = (this.carousel.elements.length - this.carousel.options.selectedIndex + index) * -1;
                reversePreferable = true;
            }

            var distance = straight * this.getActualDistance();
            if (Math.abs(reverse) < Math.abs(straight) || (reversePreferable && Math.abs(reverse) == Math.abs(straight)))
                distance = reverse * this.getActualDistance();
        
            this.carousel.inputController.nonInterruptibleMode(true);
            this.carousel._raiseMotionStart();

            this.carousel.animation.animate(0, distance, index, Math.abs(reverse) === 1 ? null : "linear");
        };

        obj.moveBack = function () {
            var pendingTarget = this.carousel.animation.isInProgress ? this.carousel.animation.getTargetValue() : this.carousel.options.selectedIndex;

            pendingTarget--;

            if (pendingTarget < 0)
                pendingTarget = this.carousel.elements.length + pendingTarget;

            this.carousel.inputController.nonInterruptibleMode(true);
            this.carousel._raiseMotionStart();
            this.carousel.animation.animate(0, this.getActualDistance(), pendingTarget, null);
            return true;
        };

        obj.moveForward = function () {
            var pendingTarget = this.carousel.animation.isInProgress ? this.carousel.animation.getTargetValue() : this.carousel.options.selectedIndex;

            pendingTarget++;
            if (pendingTarget >= this.carousel.elements.length)
                pendingTarget -= this.carousel.elements.length;

            this.carousel.inputController.nonInterruptibleMode(true);
            this.carousel._raiseMotionStart();
            this.carousel.animation.animate(0, -1 * this.getActualDistance(), pendingTarget, null);
            return true;
        };

        obj.consumeMotion = function (distance) {
            var highFrictionRange = this.carousel._alignElements(distance);

            var scrolledElements = parseInt(distance / this.getActualDistance(), 10);

            var prevIndex = this.carousel.options.selectedIndex;
            this.carousel.options.selectedIndex -= scrolledElements;

            var consumedDistance = prevIndex - this.carousel.options.selectedIndex;
            if (this.carousel.options.selectedIndex < 0) {
                this.carousel.options.selectedIndex = this.carousel.options.selectedIndex % this.carousel.elements.length + this.carousel.elements.length;
                consumedDistance = this.carousel.elements.length - this.carousel.options.selectedIndex + prevIndex;
            }
            if (this.carousel.options.selectedIndex >= this.carousel.elements.length) {
                this.carousel.options.selectedIndex = this.carousel.options.selectedIndex % this.carousel.elements.length;
                consumedDistance = this.carousel.elements.length - prevIndex + this.carousel.options.selectedIndex;
                consumedDistance *= -1;
            }
        
            if (prevIndex != this.carousel.options.selectedIndex)
                this.carousel._raiseChangeEvent();

            return { distance: consumedDistance * this.getActualDistance(), highFrictionRange: highFrictionRange };
        };

        obj.handleMotionEnd = function (remainingDistance) {
            if (remainingDistance == 0)
                return;

            var targetIndex = this.carousel.options.selectedIndex;

            if (Math.abs(remainingDistance) > this.getActualDistance() / 2) {
                if (remainingDistance < 0)
                    targetIndex++;
                else
                    targetIndex--;
            }

            var reverse = false;
            if (this.carousel.elements.length == 0)
                targetIndex = 0;
            else {
                if (targetIndex < 0) {
                    targetIndex = targetIndex % this.carousel.elements.length + this.carousel.elements.length;
                    reverse = 'back';
                }
                if (targetIndex >= this.carousel.elements.length) {
                    targetIndex = targetIndex % this.carousel.elements.length;
                    reverse = 'forward';
                }
            }

            var targetDistance = 0;
            if (!reverse) {
                targetDistance = (this.carousel.options.selectedIndex - targetIndex) * this.getActualDistance();
            }
            else {
                if(reverse === 'back')
                    targetDistance = (this.carousel.elements.length - targetIndex + this.carousel.options.selectedIndex) * this.getActualDistance();
                else
                    targetDistance = (this.carousel.elements.length - this.carousel.options.selectedIndex + targetIndex) * this.getActualDistance() * -1;
            }
        
            var duration = Math.abs(this.carousel.options.rotationAnimationDuration * (remainingDistance / this.getActualDistance()));
            duration = Math.min(duration, this.carousel.options.rotationAnimationDuration / 2);

            this.carousel.animation.animate(remainingDistance, targetDistance, targetIndex, null, duration);
        };

        obj.alignElements = function (animationShift) {

            if (this.carousel.elements.length == 0 || this.carousel.options.selectedIndex < 0)
                return false;

            this.carousel.containerSize = this.carousel._getContainerSize();

            var shift = 0;
            if (typeof (animationShift) != "undefined")
                shift = animationShift;

            var location = this.getRootValue();
            var ranges = this.getFadeRanges(location);

            for (var i = 0; i < this.carousel.elements.length; i++) {
                this.carousel.elements[i].isEndlessProcessed = false;
            }

            var visibilityInfo = [];

            for (var i = new endlessIterator(this.carousel, this.carousel.options.selectedIndex) ; !i.isCycleCompleted(); i.moveNext()) {
                var visible = this.setElementPosition(this.carousel.elements[i.getCurrentIndex()], location + shift, ranges);
                if (visible)
                    this.carousel.elements[i.getCurrentIndex()].isEndlessProcessed = true;
                visibilityInfo[i.getCurrentIndex()] = visible;
                location = this.incrementValue(location, this.getActualDistance());
            }

            location = this.getRootValue();

            for (var i = new endlessIterator(this.carousel, this.carousel.options.selectedIndex - 1) ; !i.isCycleCompleted() ; i.movePrev()) {
                if (this.carousel.elements[i.getCurrentIndex()].isEndlessProcessed)
                    break;

                location = this.decrementValue(location, this.getActualDistance());
                visibilityInfo[i.getCurrentIndex()] = this.setElementPosition(this.carousel.elements[i.getCurrentIndex()], location + shift, ranges);
            }

            for (var i = 0; i < this.carousel.elements.length; i++) {
                this.base.setElementVisibilityInternal(!visibilityInfo[i], this.carousel.elements[i]);
            }

            this.setZIndexes();

            return false;
        };

        obj.setElementVisibilityInternal = function (hide) { };
    };

    var endlessIterator = function (carousel, currentIndex) {
        this.currentIndex = currentIndex;
        if (this.currentIndex == -1)
            this.currentIndex = carousel.elements.length - 1;
        this.iterations = 0;
        this.carousel = carousel;

        this.moveNext = function () {
            this.currentIndex++;
            if (this.currentIndex == this.carousel.elements.length)
                this.currentIndex = 0;
            this.iterations++;
        };

        this.movePrev = function () {
            this.currentIndex--;
            if (this.currentIndex == -1)
                this.currentIndex = this.carousel.elements.length - 1;
            this.iterations--;
        };

        this.isCycleCompleted = function () {
            return Math.abs(this.iterations) >= this.carousel.elements.length;
        };

        this.getCurrentIndex = function () {
            return this.currentIndex;
        };

    };

    return function (carousel) {

        var rotation_logic_controller = require('./rotation_logic_controller.js');
        this.base = new rotation_logic_controller(carousel);
        $.extend(this, this.base);

        extend(this);
    };

})(jQuery)
;
},{"./rotation_logic_controller.js":31}],17:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    var exports = null;

    function extend(obj) {

        obj.isFallbackMode = function () { return true; };

        obj.getActualDistance = function () {
            return this.carousel.options.distanceInFallbackMode;
        };

        obj.getRootValue = function () {
            return 0;
        };

        obj.incrementValue = function (value, increment) {
            return value + increment;
        };

        obj.decrementValue = function (value, decrement) {
            return value - decrement;
        };

        obj.minValue = function () {
            return -1 * this.maxValue();
        };

        obj.maxValue = function () {
            return (this.carousel.containerSize.width + this.getActualDistance()) / 2;
        };

        obj.setElementPosition = function (element, value) {

            var left = value - element.size.width / 2 + this.carousel.containerSize.width / 2;
            var top = this.carousel.containerSize.height / 2 - element.size.height / 2;

            element.$element.css({
                transform: '',
                left: left + 'px',
                top: top + 'px'
            });

            var visible = value > this.minValue() && value < this.maxValue()

            if (visible)
                element.$element.show();
            else
                element.$element.hide();

            return visible;
        };

        obj.destroy = function () {

            this.base.destroy();

            for (var i = 0; i < this.carousel.elements.length; i++) {
                this.carousel.elements[i].$element.css({
                    left: '0',
                    top: '0'
                });
            }
        };
    }

    function has3d() {
        if (document.body && document.body.style.perspective !== undefined) {
            return true;
        }
        var _tempDiv = document.createElement("div"),
            style = _tempDiv.style,
            a = ["Webkit", "Moz", "O", "Ms", "ms"],
            i = a.length;
        if (_tempDiv.style.perspective !== undefined) {
            return true;
        }
        while (--i > -1) {
            if (style[a[i] + "Perspective"] !== undefined) {
                return true;
            }
        }
        return false;
    }

    exports = function (carousel, baseRotator) {
        this.base = baseRotator;
        $.extend(this, this.base);
        extend(this);
    };

    exports.fallback = function () {
        return !has3d();
    };

    return exports;

})(jQuery);

},{}],18:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function(carousel) {

        extend(this);

        this.carousel = carousel;
        this.interval = setInterval($.proxy(this.update, this), 200);

        this.update();

        this.appliedWidth = null;
        this.appliedHeight = null;
        this.appliedScale = null;
    };

    function extend(obj) {
        obj.update = function () {

            var widthToApply = this.carousel.widget().width();
            var heightToApply = this.carousel.widget().height();
            var scaleToApply = null;

            if (widthToApply == 0 || heightToApply == 0)
                return;

            if (this.carousel.options.designedForWidth != null && this.carousel.options.designedForHeight != null) {
                scaleToApply = Math.min(widthToApply / this.carousel.options.designedForWidth, heightToApply / this.carousel.options.designedForHeight);
            }

            if (widthToApply != this.appliedWidth || heightToApply != this.appliedHeight || scaleToApply != this.appliedScale) {
                var container = $('.theta-carousel-inner-container', this.carousel.widget());

                if (scaleToApply != null) {
                    widthToApply = widthToApply / scaleToApply;
                    heightToApply = heightToApply / scaleToApply;

                    // keep proportion
                    if (widthToApply / heightToApply < this.carousel.options.designedForWidth / this.carousel.options.designedForHeight) {
                        heightToApply = widthToApply * (this.carousel.options.designedForHeight / this.carousel.options.designedForWidth);
                    } else {
                        widthToApply = heightToApply * (this.carousel.options.designedForWidth / this.carousel.options.designedForHeight);
                    }

                    // reposition
                    container.css({
                        left: this.carousel.widget().width() / 2 - widthToApply / 2,
                        top: this.carousel.widget().height() / 2 - heightToApply / 2,
                    });

                }

                // applaying
                if (widthToApply != this.appliedWidth) {
                    container.width(widthToApply);
                    this.carousel.invalidate();
                    this.appliedWidth = widthToApply;
                }

                if (heightToApply != this.appliedHeight) {
                    container.height(heightToApply);
                    this.carousel.invalidate();
                    this.appliedHeight = heightToApply;
                }

                if (scaleToApply != this.appliedScale) {
                    if (scaleToApply == null) {
                        container.css({
                            transform: 'translate3d(0px,0px, 100000px)',
                            position: 'static'
                        });
                    } else {
                        container.css({
                            transform: 'translate3d(0px,0px, 100000px) scale(' + scaleToApply + ')',
                            position: 'relative'
                        });
                    }
                    this.carousel.invalidate();

                    this.appliedScale = scaleToApply;
                }
            }
        };

        obj.getAppliedScale = function () {
            if (this.appliedScale)
                return this.appliedScale;
            return 1;
        };

        obj.destroy = function () {
            clearInterval(this.interval);
        };
    }

})(jQuery);
},{}],19:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel) {
        this.carousel = carousel;
        this.movements = [];
        this.passedBrakingDistance = 0;
        this.isInProgress = false;
        this.lowFrictionInProgress = false;
        this.switchingToHighFriction = false;

        this.registerMovement = function (distance) {
            this.movements.push({ date: new Date(), distance: distance });
            this.clearOldMovements();
        };

        this.stop = function () {
            this.switchingToHighFriction = false;
            $(this).stop(false, false);
        };

        this.movedIntoHighFrictionRange = function () {
            if (this.lowFrictionInProgress) {
                this.lowFrictionInProgress = false;
                this.switchingToHighFriction = true;
                $(this).stop(false, false);

                var brakingDistLeft = this.motionData.fromPosition + this.motionData.brakingDistance - this.passedBrakingDistance;
                var speedLeft = this.motionData.initialSpeed * Math.abs(brakingDistLeft / this.motionData.brakingDistance);

                var friction = this.carousel.options.inertiaHighFriction * 100;
                var brakingDistance = (speedLeft * speedLeft) / (2 * friction);
                if (speedLeft < 0)
                    brakingDistance *= -1;

                var brakingTime = brakingDistance / (speedLeft / 2);

                $(this).animate({ passedBrakingDistance: this.passedBrakingDistance + brakingDistance }, {
                    easing: 'easeOutQuad',
                    duration: brakingTime * 1000,
                    step: $.proxy(this.onStep, this),
                    complete: $.proxy(this.onComplete, this),
                    fail: $.proxy(this.onFail, this)
                });
            }
        };

        this.run = function (fromPosition) {

            var speed = this.getSpeed();
            this.movements = [];

            if (speed == 0) {
                $(this).trigger('complete');
                return;
            }

            var friction = this.carousel.options.inertiaFriction * 100;
            var brakingDistance = (speed * speed) / (2 * friction);
            if (speed < 0)
                brakingDistance *= -1;

            var brakingTime = brakingDistance / (speed / 2);

            this.passedBrakingDistance = fromPosition;

            this.isInProgress = true;
            this.lowFrictionInProgress = true;
            this.motionData = {
                initialSpeed: speed,
                brakingDistance: brakingDistance,
                fromPosition: fromPosition
            };

            $(this).animate({ passedBrakingDistance: fromPosition + brakingDistance }, {
                easing: 'easeOutCirc',
                duration: brakingTime * 1000,
                step: $.proxy(this.onStep, this),
                complete: $.proxy(this.onComplete, this),
                fail: $.proxy(this.onFail, this)
            });
        };

        this.onStep = function (val) {
            if (isNaN(val))
                return; //for some easings we can get NaNs

            this.passedBrakingDistance = val;
            $(this).trigger('step', val);
        };

        this.onComplete = function () {
            this.isInProgress = false;
            $(this).trigger('complete');
        };

        this.onFail = function () {
            if (!this.switchingToHighFriction) {
                this.isInProgress = false;
                $(this).trigger('stop');
            }
        };

        this.clearOldMovements = function () {
            this.movements = $(this.movements).filter(function (i, d) {
                return (new Date() - d.date) < 5000;
            });
        };

        this.getSpeed = function () {

            var distance = 0;
            var date = new Date();
            for (var i = 0; i < this.movements.length; i++) {

                var d = this.movements[i];

                if ((date - d.date) < 200)
                    distance += d.distance;
            }

            return distance * 5;
        };
    };

})(jQuery);
},{}],20:[function(require,module,exports){

module.exports =
(function ($) {
    "use strict";
    return function (carousel) {
        extend(this);

        this.carousel = carousel;
        this.lastKeyDownTime = new Date();
        this.lastProcessedEvent = null;
        this.nonInterruptible = false;
        this.destroyables = [];

        this.carousel.widget().keyup(this.destroyable("keyup", $.proxy(this.onKeyUp, this)));
        this.carousel.widget().keydown(this.destroyable("keydown", $.proxy(this.onKeyDown, this)));

        this.carousel.widget().mousedown(this.destroyable("mousedown", $.proxy(function (e) {
            if (this.isReadonly() || !this.getGesturesEnabled())
                return;

            this.carousel.widget().focus();
            this.motionStarted(this.isVerticalRotation() ? e.pageY : e.pageX);
            e.preventDefault();
        }, this)));
        this.carousel.widget().mousemove(this.destroyable("mousemove", $.proxy(function (e) {
            if (this.isReadonly() || !this.getGesturesEnabled())
                return;

            if (this.canProcessEvent()) {
                this.registerEventAsProcessed();
                this.motionContinued(this.isVerticalRotation() ? e.pageY : e.pageX);
            }
            e.preventDefault();
        }, this)));
        this.carousel.widget().mouseleave(this.destroyable("mouseleave", $.proxy(function (e) {
            if (this.isReadonly() || !this.getGesturesEnabled())
                return;

            if (this.nonInterruptible)
                return;
            this.carousel.motionController.motionEnded(true);
            e.preventDefault();
        }, this)));
        this.carousel.widget().mouseup(this.destroyable("mouseup", $.proxy(function (e) {
            if (this.isReadonly() || !this.getGesturesEnabled())
                return;

            this.carousel.motionController.motionEnded(true);
            e.preventDefault();
        }, this)));

        if (typeof (this.carousel.widget().get(0).onmousewheel) != "undefined") {
            this.carousel.widget().on("mousewheel", this.destroyable("mousewheel", $.proxy(this.onMousewheel, this)));
        } else {
            this.carousel.widget().on("DOMMouseScroll", this.destroyable("DOMMouseScroll", $.proxy(this.onMousewheel, this)));
        }

        this.carousel.widget().on('touchstart', this.destroyable("touchstart", $.proxy(function (e) {
            if (this.isReadonly() || !this.getGesturesEnabled())
                return;

            this.motionStarted(this.isVerticalRotation() ? e.originalEvent.touches[0].screenY : e.originalEvent.touches[0].screenX);
        }, this)));
        this.carousel.widget().on('touchmove', this.destroyable("touchmove", $.proxy(function (e) {
            if (this.isReadonly() || !this.getGesturesEnabled())
                return;

            if (this.canProcessEvent()) {
                this.registerEventAsProcessed();
                this.motionContinued(this.isVerticalRotation() ? e.originalEvent.touches[0].screenY : e.originalEvent.touches[0].screenX);
            }
            e.preventDefault();
        }, this)));
        this.carousel.widget().on('touchend', this.destroyable("touchend", $.proxy(function (e) {
            if (this.isReadonly() || !this.getGesturesEnabled())
                return;

            this.carousel.motionController.motionEnded(true);
        }, this)));
        this.carousel.widget().on('touchcancel', this.destroyable("touchcancel", $.proxy(function (e) {
            if (this.isReadonly() || !this.getGesturesEnabled())
                return;

            this.carousel.motionController.motionEnded(true);
        }, this)));
        this.carousel.widget().on('taphold', this.destroyable("taphold", function (e) { e.preventDefault(); }));
    };

    function extend(obj) {

        obj.isVerticalRotation = function() {
            return this.carousel.options.verticalRotation && !this.carousel.rotationLogicController.isFallbackMode();
        };

        obj.getSensitivity = function () {

            if (this.carousel.rotationLogicController.isFallbackMode())
                return 1;
            return this.carousel.options.sensitivity / this.carousel.fluidLayout.getAppliedScale();
        };

        obj.isReadonly = function() {
            return !this.carousel.options.enabled ||
                this.carousel.options.autorotation;
        };

        obj.getGesturesEnabled = function () {
            return this.carousel.options.gesturesEnabled;
        };

        obj.nonInterruptibleMode = function (nonInterruptible) {
            this.nonInterruptible = nonInterruptible;
        };

        obj.canProcessEvent = function () {
            if (this.lastProcessedEvent == null)
                return true;

            if (new Date() - this.lastProcessedEvent > 50)
                return true;

            return false;
        };

        obj.registerEventAsProcessed = function () {
            this.lastProcessedEvent = new Date();
        };

        obj.motionStarted = function (x) {
            this.carousel.motionController.motionStarted(x);
            this.initialX = x;
        };

        obj.motionContinued = function (x) {
            var delta = this.initialX - x;
            delta *= this.getSensitivity();
            x = this.initialX - delta;

            this.carousel.motionController.motionContinued(x);
        };

        obj.onMousewheel = function (event) {
            if (!this.carousel.options.mousewheelEnabled)
                return;

            if (this.isReadonly())
                return;

            event.preventDefault();

            if (this.carousel.getIsInMotion())
                return;

            var up = false;
            var down = false;
            var original = event.originalEvent;

        
            // jquery mousewheel plugin
            if (event.deltaY) {
                if (event.deltaY == 1)
                    up = true;
                else
                    if (event.deltaY == -1)
                        down = true;
            }

            if (original.wheelDelta) {
                if (original.wheelDelta >= 120) {
                    up = true;
                }
                else {
                    if (original.wheelDelta <= -120) {
                        down = true;
                    }
                }
            }

            if (original.detail) {
                if (original.detail == -3)
                    up = true;
                else
                    if (original.detail == 3)
                        down = true;
            }
        
            if (up) {
                if (this.getSensitivity() > 0)
                    this.carousel.moveBack();
                if (this.getSensitivity() < 0)
                    this.carousel.moveForward();
            }
            if (down) {
                if (this.getSensitivity() < 0)
                    this.carousel.moveBack();
                if (this.getSensitivity() > 0)
                    this.carousel.moveForward();
            }
        };

        obj.onKeyDown = function (event) {
            if (!this.carousel.options.keyboardEnabled)
                return;

            if (this.isReadonly())
                return;

            if (event.which == this.getBackKey() || event.which == this.getForwardKey())
                event.preventDefault();

            if (this.carousel.motionController.isInMotion || this.carousel.motionController.inertia.isInProgress)
                return;

            if ((new Date() - this.lastKeyDownTime) < this.carousel.options.minKeyDownFrequency)
                return;

            this.lastKeyDownTime = new Date();

            if (event.which == this.getBackKey()) {
                if (this.getSensitivity() > 0)
                    this.carousel.moveBack();
                if (this.getSensitivity() < 0)
                    this.carousel.moveForward();
            }
            if (event.which == this.getForwardKey()) {
                if (this.getSensitivity() < 0)
                    this.carousel.moveBack();
                if (this.getSensitivity() > 0)
                    this.carousel.moveForward();
            }
        };

        obj.onKeyUp = function (event) {
            if (this.isReadonly())
                return;

            if (this.carousel.motionController.isInMotion || this.carousel.motionController.inertia.isInProgress)
                return;

            if (event.which == this.getBackKey() || event.which == this.getForwardKey()) {
                this.carousel.animation.clearQueue();
            }
        };

        obj.destroyable = function (key, func) {
            this.destroyables[key] = func;
            return func;
        };

        obj.destroy = function () {
            for (var key in this.destroyables) {
                this.carousel.widget().off(key, this.destroyables[key]);
            }
        };

        obj.getForwardKey = function() {
            if (this.carousel.options.verticalRotation)
                return 40; //down
            return 37; //left
        };

        obj.getBackKey = function () {
            if (this.carousel.options.verticalRotation)
                return 38; //up
            return 39; //right
        };
    }


})(jQuery);
},{}],21:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, motionConsumer) {
        var inertia = require('./inertia.js');
    
        extend(this);

        this.isInMotion = false;
        this.lastPosition = null;
        this.distance = 0;
        this.motionConsumer = motionConsumer;
        this.inertia = new inertia(carousel);
        $(this.inertia).on('complete', $.proxy(this.motionEnded, this, false));
        $(this.inertia).on('stop', $.proxy(this.inertiaStop, this));
        $(this.inertia).on('step', $.proxy(function (e, value) { this.motionContinuedInternal(value); }, this));
    };

    function extend(obj) {
        obj.motionInProgress = function () {
            return this.inertia.isInProgress || this.isInMotion;
        };

        obj.motionStarted = function (position) {

            if (!this.inertia.isInProgress)
                this.distance = 0;

            this.inertia.stop();
            this.isInMotion = true;
            this.lastPosition = position;
            this.raiseStart = true;
        };

        obj.motionContinued = function (position) {

            if (!this.isInMotion)
                return;

            if (this.raiseStart && position != this.lastPosition)
            {
                $(this).trigger('start');
                this.raiseStart = false;
            }

            this.inertia.registerMovement(position - this.lastPosition);
            this.motionContinuedInternal(position);
        };

        obj.motionContinuedInternal = function (position) {

            this.distance += position - this.lastPosition;
            this.lastPosition = position;
            var consumingData = this.motionConsumer(this.distance);
            this.distance -= consumingData.distance;

            if (consumingData.highFrictionRange && this.inertia.isInProgress) {
                this.inertia.movedIntoHighFrictionRange();
            }
        };

        obj.motionEnded = function (useInertia) {

            if (this.inertia.isInProgress)
                return;

            this.isInMotion = false;

            if (!useInertia) {
                $(this).trigger('end', this.distance);
                this.distance = 0;
            } else {
                this.inertia.run(this.lastPosition);
            }
        };

        obj.inertiaStop = function () {
            this.isInMotion = false;
        };
    }

})(jQuery);
},{"./inertia.js":19}],22:[function(require,module,exports){
module.exports = 
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var path_base = require('./path_base.js');
        var point = require('./../point.js');

        var base = new path_base(carousel, {
            fi: 10,
            flatness: 10
        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.getPointInternal = function (value) {

            var angle = value * Math.PI * 2 / 360;

            var x = this.settings.fi * value * Math.cos(angle) / (2 * Math.PI);
            var y = this.settings.fi * value * Math.sin(angle) / (2 * Math.PI);

            var z = -1 * Math.pow(value - this.rootValue(), 2) / this.settings.flatness;

            return new point(x, y, z);
        };

        this.rootValue = function () {
            return 450;
        };

        this.minValue = function () {
            return 10;
        };

        this.maxValue = function () {
            return 650;
        };
    };

})(jQuery);

},{"./../point.js":29,"./path_base.js":23}],23:[function(require,module,exports){
module.exports =
    (function ($) {
        "use strict";
        return function (carousel, settings) {
            var rotation = require('./../rotation.js');
            var vector = require('./../vector.js');

            this.settings = {
                shiftX: 0,
                shiftY: 0,
                shiftZ: 0,
                rotationAngleXY: 0,
                rotationAngleZY: 0,
                rotationAngleZX: 0,
                rotateElements: false,
                endless: false
            };

            this.carousel = carousel;
            $.extend(this.settings, settings);


            this.getContainerSize = function () {
                return this.carousel._getContainerSize();
            };

            this.isEndless = function () {
                return this.settings.endless;
            };

            this.minValue = function () {
                return null;
            };

            this.maxValue = function () {
                return null;
            };

            this.rootValue = function () {
                return 0;
            };

            this.incrementValue = function (value, distance) {
                return value + distance;
            };

            this.decrementValue = function (value, distance) {
                return value - distance;
            };

            this.getPoint = function (value) {

                var res = this.getPointInternal(value);

                res.x = res.x + this.settings.shiftX;
                res.y = res.y + this.settings.shiftY;
                res.z = res.z + this.settings.shiftZ;

                var pair = null;

                pair = this.rotate({ a: res.x, b: res.y }, { a: 0, b: 0 }, this.settings.rotationAngleXY);
                res.x = pair.a;
                res.y = pair.b;

                pair = this.rotate({ a: res.z, b: res.y }, { a: 0, b: 0 }, this.settings.rotationAngleZY);
                res.z = pair.a;
                res.y = pair.b;

                pair = this.rotate({ a: res.z, b: res.x }, { a: 0, b: 0 }, this.settings.rotationAngleZX);
                res.z = pair.a;
                res.x = pair.b;

                return res;
            };

            this.rotate = function (pairToRotate, pairCenter, angle) {
                if (angle == 0)
                    return pairToRotate;

                var angleInRadians = angle * (Math.PI / 180);
                var cosTheta = Math.cos(angleInRadians);
                var sinTheta = Math.sin(angleInRadians);

                var a = (cosTheta * (pairToRotate.a - pairCenter.a) - sinTheta * (pairToRotate.b - pairCenter.b) + pairCenter.a);
                var b = (sinTheta * (pairToRotate.a - pairCenter.a) + cosTheta * (pairToRotate.b - pairCenter.b) + pairCenter.b);
                pairToRotate.a = a;
                pairToRotate.b = b;

                return pairToRotate;
            };

            this.elementsRotation = function () {
                if (!this.settings.rotateElements)
                    return null;

                if (this.settings.rotationAngleZY == 0 && this.settings.rotationAngleZX == 0 && this.settings.rotationAngleXY == 0)
                    return null;
        
                var v = new vector();
                v.x = this.settings.rotationAngleZY;
                v.y = -1 * this.settings.rotationAngleZX;
                v.z = -1 * this.settings.rotationAngleXY;

                var angle = -1 * v.length();

                return new rotation(v, angle);
            };
    };

}) (jQuery);
},{"./../rotation.js":30,"./../vector.js":35}],24:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var path_base = require('./path_base.js');
        var point = require('./../point.js');

        var base = new path_base(carousel, {
            wideness: 200,
        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.getPointInternal = function (value) {
            var y = (value * value * value + value * 20) / (1000 * this.settings.wideness);
            var z = -2 * Math.abs(y);

            return new point(value, y, z);
        };
    };

})(jQuery);

},{"./../point.js":29,"./path_base.js":23}],25:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function(carousel, settings) {

        var path_base = require('./path_base.js');
        var point = require('./../point.js');
        var getBezierBox = require('./../bezier_box.js');
        var getBezier = require('./../bezier.js');

        var base = new path_base(carousel, {
            xyPathBezierPoints: { p1: { x: -100, y: 0 }, p2: { x: 0, y: 0 }, p3: { x: 0, y: 0 }, p4: { x: 100, y: 0 } },
            xzPathBezierPoints: { p1: { x: -100, y: 0 }, p2: { x: 0, y: 0 }, p3: { x: 0, y: 0 }, p4: { x: 100, y: 0 } },
            xyArcLengthBezierPoints: { p1: { x: 0, y: 0 }, p2: { x: 50, y: 50 }, p3: { x: 50, y: 50 }, p4: { x: 100, y: 100 } },
            pathLength: 1000,
            zeroPosition: 0.5,
            width: 1000,
            height: 1000,
            depth: 1000
        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.getPointInternal = function (value) {
            var distance = Math.abs(value - this.minValue());
            var absDist = Math.abs(this.maxValue() - this.minValue());

            var bezierT = Math.min(distance / absDist, 1);

            var xyPoints = this.settings.xyPathBezierPoints;
            var xyArcLengthPoints = this.settings.xyArcLengthBezierPoints;
            var xzPoints = this.settings.xzPathBezierPoints;

            var boxXY = getBezierBox(xyPoints.p1, xyPoints.p2, xyPoints.p3, xyPoints.p4);
            var boxXZ = getBezierBox(xzPoints.p1, xzPoints.p2, xzPoints.p3, xzPoints.p4);

            bezierT = getBezier(bezierT, xyArcLengthPoints.p1, xyArcLengthPoints.p2, xyArcLengthPoints.p3, xyArcLengthPoints.p4).y / 100;

            var pointXY = getBezier(bezierT, xyPoints.p1, xyPoints.p2, xyPoints.p3, xyPoints.p4);
            var x = this.normalizeVal(pointXY.x, boxXY.minX, boxXY.maxX);
            var y = this.normalizeVal(pointXY.y, boxXY.minY, boxXY.maxY);
            var z = getBezier(bezierT, xzPoints.p1, xzPoints.p2, xzPoints.p3, xzPoints.p4).y;
            z = this.normalizeVal(z, boxXZ.minY, boxXZ.maxY);

            x = this.settings.width * x - this.settings.width / 2;
            y = this.settings.height * y * -1;
            z = this.settings.depth * z * -1;

            return new point(x, y, z);
        };

        this.normalizeVal = function (val, a, b) {
            var dist = Math.abs(b - a);
            var min = Math.min(a, b);

            if (dist != 0)
                return (val - min) / dist;
            return val - min;
        };

        this.minValue = function () {
            return 0;
        };

        this.maxValue = function () {
            return this.settings.pathLength;
        };

        this.rootValue = function () {
            return this.settings.pathLength * this.settings.zeroPosition;
        };
    };

})(jQuery);
},{"./../bezier.js":10,"./../bezier_box.js":11,"./../point.js":29,"./path_base.js":23}],26:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var path_base = require('./path_base.js');
        var point = require('./../point.js');

        var base = new path_base(carousel, {
            a: 200,
            b: 200,
        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.getPointInternal = function (value) {
            value *= -1;
            value -= 180;
            var angle = value * Math.PI * 2 / 360;
            var z = this.settings.b * Math.sin(angle);
            var x = this.settings.a * Math.cos(angle);

            return new point(x, 0, z);
        };

        this.rootValue = function () {
            return 90;
        };

        this.minValue = function () {
            return this.settings.endless ? -90 : 0;
        };

        this.maxValue = function () {
            return this.settings.endless ? 270 : 180;
        };
    };
})(jQuery);
},{"./../point.js":29,"./path_base.js":23}],27:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var path_base = require('./path_base.js');
        var point = require('./../point.js');

        var base = new path_base(carousel, {
        
        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.getPointInternal = function (value) {
            var z = -1 * value;
            return new point(0, 0, z);
        };
    };

})(jQuery);
},{"./../point.js":29,"./path_base.js":23}],28:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (carousel, settings) {

        var path_base = require('./path_base.js');
        var point = require('./../point.js');

        var base = new path_base(carousel, {
            wideness: 200,
        });

        $.extend(this, base);
        $.extend(this.settings, settings);

        this.getPointInternal = function (value) {
            var z = -1 * value * value * (1 / this.settings.wideness);
            return new point(value, 0, z);
        };
    };

})(jQuery);
},{"./../point.js":29,"./path_base.js":23}],29:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
})(jQuery);
},{}],30:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    var utils = require('./utils.js');

    return function(vector, angle) {
        this.vector = vector;
        this.angle = angle;

        this.getString = function () {

            if (utils.isFF()) {
                return '';
            }

            return 'rotate3d(' + this.vector.x + ', ' + this.vector.y + ', ' + this.vector.z + ', ' + this.angle + 'deg)';
        };
    };

})(jQuery);
},{"./utils.js":34}],31:[function(require,module,exports){
var transform = require('./transform.js');


module.exports =
(function ($) {
    "use strict";
    return function (carousel) {

        this.carousel = carousel;
        extend(this);
    };

    function extend(obj) {

        obj.isFallbackMode = function () { return false; };

        obj.getActualDistance = function() {
            return this.carousel.options.distance;
        };

        obj.getRootValue = function() {
            return this.carousel.path.rootValue();
        };

        obj.incrementValue = function (value, increment) {
            return this.carousel.path.incrementValue(value, increment);
        };

        obj.decrementValue = function (value, decrement) {
            return this.carousel.path.decrementValue(value, decrement);
        };

        obj.minValue = function () {
            return this.carousel.path.minValue();
        };

        obj.maxValue = function () {
            return this.carousel.path.maxValue();
        };

        obj.moveTo = function (index) {
            if (this.carousel.motionController.motionInProgress())
                return;

            this.carousel.animation.clearQueue();
            this.carousel.animation.completeCurrentImmediately();

            if (index == this.carousel.options.selectedIndex)
                return;
            if (index == this.carousel.options.selectedIndex + 1) {
                this.carousel.moveForward();
                return;
            }
            if (index == this.carousel.options.selectedIndex - 1) {
                this.carousel.moveBack();
                return;
            }

            index = Math.max(0, index);
            index = Math.min(index, this.carousel.elements.length - 1);

            this.moveToInternal(index);
        };

        obj.moveToInternal = function (index) {
            var distance = this.getActualDistance() * (this.carousel.options.selectedIndex - index);
            this.carousel.inputController.nonInterruptibleMode(true);
            this.carousel._raiseMotionStart();
            this.carousel.animation.animate(0, distance, index, "linear");
        };

        obj.moveBack = function () {
            var pendingTarget = this.carousel.animation.isInProgress ? this.carousel.animation.getTargetValue() : this.carousel.options.selectedIndex;

            if (pendingTarget > 0) {
                pendingTarget--;

                this.carousel.inputController.nonInterruptibleMode(true);
                this.carousel._raiseMotionStart();
                this.carousel.animation.animate(0, this.getActualDistance(), pendingTarget, null);
                return true;
            }
            return false;
        };

        obj.moveForward = function () {
            var pendingTarget = this.carousel.animation.isInProgress ? this.carousel.animation.getTargetValue() : this.carousel.options.selectedIndex;

            if (pendingTarget < this.carousel.elements.length - 1) {
                pendingTarget++;

                this.carousel.inputController.nonInterruptibleMode(true);
                this.carousel._raiseMotionStart();
                this.carousel.animation.animate(0, -1 * this.getActualDistance(), pendingTarget, null);
                return true;
            }
            return false;
        };

        obj.consumeMotion = function (distance) {
            var highFrictionRange = this.carousel._alignElements(distance);

            var optDistance = this.getActualDistance();

            var scrolledElements = parseInt(distance / optDistance, 10);

            var prevIndex = this.carousel.options.selectedIndex;
            this.carousel.options.selectedIndex -= scrolledElements;

            this.carousel.options.selectedIndex = Math.max(0, this.carousel.options.selectedIndex);
            this.carousel.options.selectedIndex = Math.min(this.carousel.options.selectedIndex, this.carousel.elements.length - 1);

            if (prevIndex != this.carousel.options.selectedIndex)
                this.carousel._raiseChangeEvent();

            return { distance: (prevIndex - this.carousel.options.selectedIndex) * optDistance, highFrictionRange: highFrictionRange };
        };

        obj.handleMotionEnd = function (remainingDistance) {
            if (remainingDistance == 0)
                return;

            var targetIndex = this.carousel.options.selectedIndex;

            if (Math.abs(remainingDistance) > this.getActualDistance() / 2) {
                if (remainingDistance < 0)
                    targetIndex++;
                else
                    targetIndex--;
            }

            if (this.carousel.elements.length == 0)
                targetIndex = 0;
            else {
                targetIndex = Math.max(0, targetIndex);
                targetIndex = Math.min(targetIndex, this.carousel.elements.length - 1);
            }

            var targetDistance = (this.carousel.options.selectedIndex - targetIndex) * this.getActualDistance();

            var duration = Math.abs(this.carousel.options.rotationAnimationDuration * (remainingDistance / this.getActualDistance()));
            duration = Math.min(duration, this.carousel.options.rotationAnimationDuration / 2);

            this.carousel.animation.animate(remainingDistance, targetDistance, targetIndex, null, duration);
        };

        obj.alignElements = function (animationShift) {
            if (this.carousel.elements.length == 0 || this.carousel.options.selectedIndex < 0)
                return false;

            this.carousel.containerSize = this.carousel._getContainerSize();

            var shift = 0;
            if (typeof (animationShift) != "undefined")
                shift = animationShift;

            var highFrictionRange = false;
            // slow down at the ends
            if (
                (this.carousel.options.selectedIndex == 0 && shift > 0) ||
                (this.carousel.options.selectedIndex == this.carousel.elements.length - 1 && shift < 0)
            ) {
                shift = Math.pow(Math.abs(shift), 0.7) * (shift / Math.abs(shift));
                highFrictionRange = true;
            }

            var location = this.getRootValue();
            var rangeShift = 0;
            if ((this.carousel.options.selectedIndex == 0 && shift > 0) || (this.carousel.options.selectedIndex == this.carousel.elements.length - 1 && shift < 0))
                rangeShift = shift;
            var ranges = this.getFadeRanges(location + rangeShift);

            for (var i = this.carousel.options.selectedIndex; i < this.carousel.elements.length; i++) {
                this.setElementPosition(this.carousel.elements[i], location + shift, ranges);
                location = this.incrementValue(location, this.getActualDistance());
            }

            location = this.getRootValue();

            for (var i = this.carousel.options.selectedIndex - 1; i >= 0; i--) {
                location = this.decrementValue(location, this.getActualDistance());
                this.setElementPosition(this.carousel.elements[i], location + shift, ranges);
            }

            this.setZIndexes();

            return highFrictionRange;
        };

        obj.setElementPosition = function (element, value, ranges) {
            //this method is performance critical so we trying to avoid jQuery usage

            if (this.setElementVisibility(ranges, element, value)) {

                var point = this.carousel.path.getPoint(value);

                var elementTransform = new transform();

                elementTransform.translateZ = point.z * this.carousel.options.scaleZ;
                elementTransform.translateX = point.x * this.carousel.options.scaleX + this.carousel.containerSize.width / 2 - element.size.width / 2;
                elementTransform.translateY = point.y * this.carousel.options.scaleY + this.carousel.containerSize.height / 2 - element.size.height / 2;

                var pathRotation = this.carousel.path.elementsRotation();
                if (pathRotation)
                    elementTransform.rotations.push(pathRotation);

                if (this.carousel.options.mode3D == 'scale') {
                    elementTransform.scale = this.carousel.options.perspective / (this.carousel.options.perspective - elementTransform.translateZ);
                    elementTransform.translateZ = 0;
                }

                for (var i = 0; i < this.carousel.effects.length; i++) {
                    if (this.carousel.effects[i].applyPhase === 'positioning')
                        this.carousel.effects[i].apply(elementTransform, element, value);
                }

                elementTransform.apply(element, this.carousel.options.perspective,
                    this.carousel.containerSize.width, this.carousel.containerSize.height);
                element.location = point;
                return true;
            }
            return false;
        };

        obj.setZIndexes = function () {

            var tmpElements = [];
            for (var i = 0; i < this.carousel.elements.length; i++) {
                var e = this.carousel.elements[i];
                if (e.location) // element has been positioned
                    tmpElements.push(e);
            }

            tmpElements.sort(function (e1, e2) {
                return e1.location.z - e2.location.z;
            });
            for (var i = 0; i < tmpElements.length; i++) {
                tmpElements[i].$element.get(0).style.zIndex = i;
            }
        };

        obj.getFadeRanges = function (root) {
            var location = root;

            var res = [];

            if (this.carousel.options.numberOfElementsToDisplayLeft != null) {
                res.push({
                    from: this.decrementValue(location, this.getActualDistance() * (this.carousel.options.numberOfElementsToDisplayLeft + 1)),
                    to: this.decrementValue(location, this.getActualDistance() * (this.carousel.options.numberOfElementsToDisplayLeft)),
                    hide: 'before'
                });
            }

            if (this.carousel.options.numberOfElementsToDisplayRight != null) {
                res.push({
                    from: this.incrementValue(location, this.getActualDistance() * (this.carousel.options.numberOfElementsToDisplayRight)),
                    to: this.incrementValue(location, this.getActualDistance() * (this.carousel.options.numberOfElementsToDisplayRight + 1)),
                    hide: 'after'
                });
            }

            return res;
        };

        obj.setElementVisibility = function (fadeRanges, element, value) {
            var $element = element.$element;
            var hidden = false;

            if ((this.minValue() != null && value < this.minValue())
                || (this.maxValue() != null && value > this.maxValue()))
                hidden = true;
            else {

                if (fadeRanges.length == 0)
                    $element.css({ opacity: 1 });

                for (var i = 0; i < fadeRanges.length; i++) {
                    var range = fadeRanges[i];

                    if ((range.hide == 'before' && value <= range.from) || (range.hide == 'after' && value >= range.to)) {
                        hidden = true;
                        break;
                    }

                    if (value > range.from && value < range.to) {
                        var distance = range.to - range.from;
                        var passed = Math.abs(value - (range.hide == 'after' ? range.from : range.to));
                        var opacity = (distance - passed) / distance;
                        $element.css({ opacity: opacity });
                        break;
                    } else {
                        $element.css({ opacity: 1 });
                    }
                }
            }

            this.setElementVisibilityInternal(hidden, element);
            return !hidden;
        };

        obj.destroy = function () {
            for (var i = 0; i < this.carousel.elements.length; i++) {
                this.carousel.elements[i].$element.css({
                    left: '0',
                    top: '0',
                    transform: '',
                    opacity: '1'
                });
                this.carousel.elements[i].$element.show();
            }
        };

        obj.setElementVisibilityInternal = function (hide, element) {
            if (hide) {
                element.$element.hide();
            } else {
                element.$element.show();
            }
        };
    }

})(jQuery);
},{"./transform.js":33}],32:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function (width, height) {
        this.width = width;
        this.height = height;
    };

})(jQuery);
},{}],33:[function(require,module,exports){
// we need to calculate 
var coefCache = [];
coefCache['X'] = { persp: 0, width: 0, val: 0 };
coefCache['Y'] = { persp: 0, width: 0, val: 0 };

module.exports =
(function ($) {
    "use strict";
    return function() {
        this.translateX = 0;
        this.translateY = 0;
        this.translateZ = 0;
        this.scale = 1;

        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;

        this.rotations = [];

        this.calculateShiftCoeficient = function (perspective, width, z, coefDimension) {

            var cache = coefCache[coefDimension];

            if (perspective == 0) {
                return 1;
            }

            var tan = 0;
            var alpha = 0
            width = width / 2;

            if (cache.persp == perspective && cache.width == width) {
                tan = cache.val; // optimisation
            }
            else {
                var c = Math.sqrt(perspective * perspective + width * width);
                alpha = Math.asin(width / c);
                tan = (Math.tan(1.5708 - alpha));

                cache.persp = perspective;
                cache.width = width;
                cache.val = tan;
            }

            var b = -1 * (1 / tan * z);
            var resultingWidth = width + b;
            return width / resultingWidth;
        };

        this.apply = function (e, perspective, width, height) {

            var pseudo3dScale = (perspective / (perspective - this.translateZ));

            var itemWidth = e.size.width;
            var itemHeight = e.size.height;

            var coefX = this.calculateShiftCoeficient(perspective, width, this.translateZ, 'X');
            var coefY = this.calculateShiftCoeficient(perspective, height, this.translateZ, 'Y');

            var x = this.translateX + itemWidth / 2;
            var y = this.translateY + itemHeight / 2;
            x = x - width / 2;
            y = y - height / 2;

            x = x * coefX;
            y = y * coefY;

            x = x + (width / 2) - (itemWidth / 2);
            y = y + (height / 2) - (itemHeight / 2);

            var str = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
            if (this.scale != 1)
                str += ' scale(' + this.scale + ',' + this.scale + ')';

            for (var i = 0; i < this.rotations.length; i++)
                str += ' ' + this.rotations[i].getString();

            str += ' scale(' + pseudo3dScale + ', ' + pseudo3dScale + ')';

            if (this.scaleX != 1)
                str += ' scaleX(' + this.scaleX + ')';
            if (this.scaleY != 1)
                str += ' scaleY(' + this.scaleY + ')';
            if (this.scaleZ != 1)
                str += ' scaleZ(' + this.scaleZ + ')';

            e.element.style.transform = str;
            e.element.style.webkitTransform = str;
            e.element.style.msTransform = str;
        };
    };

})(jQuery);
},{}],34:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";

    var utils = function () {
        this.getObjectPropertyValue = function (obj, property) {
            var parts = property.split('.');
            var res = obj;
            for (var i = 0; i < parts.length; i++) {
                res = res[parts[i]];
            }

            return res;
        };

        this.setObjectPropertyValue = function (obj, property, value) {
            var parts = property.split('.');
            var target = obj;
            for (var i = 0; i < parts.length - 1; i++) {
                target = target[parts[i]];
            }

            target[parts[parts.length - 1]] = value;
        };

        this.isFF = function() {
            return navigator.userAgent.indexOf("Firefox") != -1;
        }
    };

    return new utils();


})(jQuery);
},{}],35:[function(require,module,exports){
module.exports =
(function ($) {
    "use strict";
    return function () {

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.initFromPoints = function (p1, p2) {
            this.x = p2.x - p1.x;
            this.y = p2.y - p1.y;
            this.z = p2.z - p1.z;
        };

        this.normalize = function () {
            var length = this.length();
            this.x /= length;
            this.y /= length;
            this.z /= length;
        };

        this.length = function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
        };

        this.angle = function (v) {

            var scalarMultiplication = this.x * v.x + this.y * v.y + this.z * v.z;
            var absThis = this.length();
            var absV = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

            var cosA = scalarMultiplication / (absThis * absV);

            var a = Math.acos(cosA);

            if (this.z > v.z)
                a *= -1;

            return a * 180 / Math.PI;
        };

        this.perpendicularX = function () {
            var res = new vector();
            res.y = this.y;
            res.z = this.z;
            res.x = -1 * (this.y * res.y + this.z * res.z) / this.x;
            return res;
        };
    };

})(jQuery);
},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL1Zpc3VhbEVmZmVjdHMvZWZmZWN0X2FsbGlnbl90b19wYXRoLmpzIiwiLi4vQ2Fyb3VzZWwvSlNTb3VyY2VzL0Nhcm91c2VsQ29udHJvbC9WaXN1YWxFZmZlY3RzL2VmZmVjdF9iYXNlLmpzIiwiLi4vQ2Fyb3VzZWwvSlNTb3VyY2VzL0Nhcm91c2VsQ29udHJvbC9WaXN1YWxFZmZlY3RzL2VmZmVjdF9mYWRlX2F3YXkuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL1Zpc3VhbEVmZmVjdHMvZWZmZWN0X3BvcF9vdXRfc2VsZWN0ZWQuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL1Zpc3VhbEVmZmVjdHMvZWZmZWN0X3JlZmxlY3Rpb24uanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL1Zpc3VhbEVmZmVjdHMvZWZmZWN0X3JvdGF0aW9uLmpzIiwiLi4vQ2Fyb3VzZWwvSlNTb3VyY2VzL0Nhcm91c2VsQ29udHJvbC9WaXN1YWxFZmZlY3RzL2VmZmVjdF9zaGFkb3cuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL1Zpc3VhbEVmZmVjdHMvZWZmZWN0X3NpemVfYWRqdXN0bWVudC5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvYXV0b19yb3RhdG9yLmpzIiwiLi4vQ2Fyb3VzZWwvSlNTb3VyY2VzL0Nhcm91c2VsQ29udHJvbC9iZXppZXIuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL2Jlemllcl9ib3guanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL2Nhcm91c2VsLmpzIiwiLi4vQ2Fyb3VzZWwvSlNTb3VyY2VzL0Nhcm91c2VsQ29udHJvbC9jb211bGF0aXZlX2FuaW1hdGlvbi5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvZWFzaW5ncy5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvZWxlbWVudHNfc2l6ZV91cGRhdGVyLmpzIiwiLi4vQ2Fyb3VzZWwvSlNTb3VyY2VzL0Nhcm91c2VsQ29udHJvbC9lbmRsZXNzX3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL2ZhbGxiYWNrX3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL2ZsdWlkX2xheW91dC5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvaW5lcnRpYS5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvaW5wdXRfY29udHJvbGxlci5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvbW90aW9uX2NvbnRyb2xsZXIuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL3BhdGhzL3BhdGhfYXJjaGltZWRlc19zcGlyYWwuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL3BhdGhzL3BhdGhfYmFzZS5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvcGF0aHMvcGF0aF9jdWJpYy5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvcGF0aHMvcGF0aF9jdWJpY19iZXppZXIuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL3BhdGhzL3BhdGhfZWxsaXBzZS5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvcGF0aHMvcGF0aF9saW5lLmpzIiwiLi4vQ2Fyb3VzZWwvSlNTb3VyY2VzL0Nhcm91c2VsQ29udHJvbC9wYXRocy9wYXRoX3BhcmFib2xhLmpzIiwiLi4vQ2Fyb3VzZWwvSlNTb3VyY2VzL0Nhcm91c2VsQ29udHJvbC9wb2ludC5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvcm90YXRpb24uanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL3NpemUuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL3RyYW5zZm9ybS5qcyIsIi4uL0Nhcm91c2VsL0pTU291cmNlcy9DYXJvdXNlbENvbnRyb2wvdXRpbHMuanMiLCIuLi9DYXJvdXNlbC9KU1NvdXJjZXMvQ2Fyb3VzZWxDb250cm9sL3ZlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Z0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAgIHZhciBlZmZlY3RfYmFzZSA9IHJlcXVpcmUoJy4vZWZmZWN0X2Jhc2UuanMnKTtcclxuICAgICAgICB2YXIgdmVjdG9yID0gcmVxdWlyZSgnLi8uLi92ZWN0b3IuanMnKTtcclxuICAgICAgICB2YXIgcm90YXRpb24gPSByZXF1aXJlKCcuLy4uL3JvdGF0aW9uLmpzJyk7XHJcblxyXG4gICAgICAgIHZhciBiYXNlID0gbmV3IGVmZmVjdF9iYXNlKGNhcm91c2VsLCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMueERpcmVjdGlvbiA9IG5ldyB2ZWN0b3IoKTtcclxuICAgICAgICB0aGlzLnhEaXJlY3Rpb24ueCA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMueURpcmVjdGlvbiA9IG5ldyB2ZWN0b3IoKTtcclxuICAgICAgICB0aGlzLnlEaXJlY3Rpb24ueSA9IDE7XHJcbiAgICBcclxuICAgICAgICAkLmV4dGVuZCh0aGlzLCBiYXNlKTtcclxuICAgICAgICAkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwbHkgPSBmdW5jdGlvbiAoZWxlbWVudFRyYW5zZm9ybSwgZWxlbWVudCwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9pbnQgPSB0aGlzLmNhcm91c2VsLnBhdGguZ2V0UG9pbnQodmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uUG9pbnQgPSB0aGlzLmNhcm91c2VsLnBhdGguZ2V0UG9pbnQodmFsdWUgKyAwLjEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gbmV3IHZlY3RvcigpO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24uaW5pdEZyb21Qb2ludHMoY3VycmVudFBvaW50LCBkaXJlY3Rpb25Qb2ludCk7XHJcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IGRpcmVjdGlvbi5hbmdsZSh0aGlzLnhEaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgYW5nbGUgKj0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLmFsbGlnbkVsZW1lbnRzV2l0aFBhdGhDb2VmZmljaWVudDtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnRUcmFuc2Zvcm0ucm90YXRpb25zLnB1c2gobmV3IHJvdGF0aW9uKHRoaXMueURpcmVjdGlvbiwgYW5nbGUpKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYXJvdXNlbCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsO1xyXG5cclxuICAgICAgICB0aGlzLmFwcGx5UGhhc2UgPSAncG9zaXRpb25pbmcnO1xyXG5cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0ge1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRBcHBseWluZ1ByaW9yaXR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFwcGx5ID0gZnVuY3Rpb24gKGVsZW1lbnRUcmFuc2Zvcm0sIGVsZW1lbnQsIHZhbHVlKSB7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmV2ZXJ0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYXJvdXNlbCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgICAgdmFyIGVmZmVjdF9iYXNlID0gcmVxdWlyZSgnLi9lZmZlY3RfYmFzZS5qcycpO1xyXG4gICAgICAgIHZhciBnZXRCZXppZXIgPSByZXF1aXJlKCcuLy4uL2Jlemllci5qcycpO1xyXG4gICAgXHJcbiAgICAgICAgdmFyIGJhc2UgPSBuZXcgZWZmZWN0X2Jhc2UoY2Fyb3VzZWwsIHtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcbiAgICAgICAgJC5leHRlbmQodGhpcywgYmFzZSk7XHJcbiAgICAgICAgJC5leHRlbmQodGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLmFwcGx5ID0gZnVuY3Rpb24gKGVsZW1lbnRUcmFuc2Zvcm0sIGVsZW1lbnQsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciByb290ID0gdGhpcy5jYXJvdXNlbC5wYXRoLnJvb3RWYWx1ZSgpO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyh2YWx1ZSAtIHJvb3QpO1xyXG4gICAgICAgICAgICB2YXIgYWJzRGlzdCA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kaXN0YW5jZSAqIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5mYWRlQXdheU51bWJlck9mQ29uZmlndXJhYmxlRWxlbWVudHM7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmV6aWVyVCA9IDEgLSBNYXRoLm1pbihkaXN0YW5jZSAvIGFic0Rpc3QsIDEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5mYWRlQXdheUJlemllclBvaW50cztcclxuICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSBnZXRCZXppZXIoYmV6aWVyVCwgcG9pbnRzLnAxLCBwb2ludHMucDIsIHBvaW50cy5wMywgcG9pbnRzLnA0KS55O1xyXG4gICAgICAgICAgICBlbGVtZW50LiRlbGVtZW50LmNzcyh7IG9wYWNpdHk6IG9wYWNpdHkgLyAxMDAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAgIHZhciBlZmZlY3RfYmFzZSA9IHJlcXVpcmUoJy4vZWZmZWN0X2Jhc2UuanMnKTtcclxuXHJcbiAgICAgICAgdmFyIGJhc2UgPSBuZXcgZWZmZWN0X2Jhc2UoY2Fyb3VzZWwsIHtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMsIGJhc2UpO1xyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBseSA9IGZ1bmN0aW9uIChlbGVtZW50VHJhbnNmb3JtLCBlbGVtZW50LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgZGlzdEZyb21Sb290ID0gTWF0aC5hYnModmFsdWUgLSB0aGlzLmNhcm91c2VsLnBhdGgucm9vdFZhbHVlKCkpO1xyXG4gICAgICAgICAgICB2YXIgY29lZiA9IDEgLSBkaXN0RnJvbVJvb3QgLyB0aGlzLmNhcm91c2VsLm9wdGlvbnMuZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIGNvZWYgPSBNYXRoLm1heChjb2VmLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnRUcmFuc2Zvcm0udHJhbnNsYXRlWCArPSB0aGlzLmNhcm91c2VsLm9wdGlvbnMucG9wb3V0U2VsZWN0ZWRTaGlmdFggKiBjb2VmO1xyXG4gICAgICAgICAgICBlbGVtZW50VHJhbnNmb3JtLnRyYW5zbGF0ZVkgKz0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnBvcG91dFNlbGVjdGVkU2hpZnRZICogY29lZjtcclxuICAgICAgICAgICAgZWxlbWVudFRyYW5zZm9ybS50cmFuc2xhdGVaICs9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5wb3BvdXRTZWxlY3RlZFNoaWZ0WiAqIGNvZWY7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAgIHZhciBlZmZlY3RfYmFzZSA9IHJlcXVpcmUoJy4vZWZmZWN0X2Jhc2UuanMnKTtcclxuXHJcbiAgICAgICAgdmFyIGJhc2UgPSBuZXcgZWZmZWN0X2Jhc2UoY2Fyb3VzZWwsIHtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMsIGJhc2UpO1xyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBseSA9IGZ1bmN0aW9uIChlbGVtZW50VHJhbnNmb3JtLCBlbGVtZW50LCB2YWx1ZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZihlbGVtZW50LmlzUmVmbGVjdGlvbkFwcGxpZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmlzUmVmbGVjdGlvbkFwcGxpZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50LiRlbGVtZW50LmNzcyhcImJveC1yZWZsZWN0XCIsIFwiYmVsb3cgXCIgKyB0aGlzLmNhcm91c2VsLm9wdGlvbnMucmVmbGVjdGlvbkJlbG93ICtcclxuICAgICAgICAgICAgICAgIFwicHggLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgZnJvbSh0cmFuc3BhcmVudCksIGNvbG9yLXN0b3AoXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICgxIC0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnJlZmxlY3Rpb25IZWlnaHQpICsgXCIsIHRyYW5zcGFyZW50KSwgdG8oYmxhY2spKVwiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJldmVydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsLmVsZW1lbnRzW2ldLmlzUmVmbGVjdGlvbkFwcGxpZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuZWxlbWVudHNbaV0uJGVsZW1lbnQuY3NzKFwiYm94LXJlZmxlY3RcIiwgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhcm91c2VsLCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgICB2YXIgZWZmZWN0X2Jhc2UgPSByZXF1aXJlKCcuL2VmZmVjdF9iYXNlLmpzJyk7XHJcbiAgICAgICAgdmFyIGdldEJlemllciA9IHJlcXVpcmUoJy4vLi4vYmV6aWVyLmpzJyk7XHJcbiAgICAgICAgdmFyIHZlY3RvciA9IHJlcXVpcmUoJy4vLi4vdmVjdG9yLmpzJyk7XHJcbiAgICAgICAgdmFyIHJvdGF0aW9uID0gcmVxdWlyZSgnLi8uLi9yb3RhdGlvbi5qcycpO1xyXG5cclxuICAgICAgICB2YXIgYmFzZSA9IG5ldyBlZmZlY3RfYmFzZShjYXJvdXNlbCwge1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJC5leHRlbmQodGhpcywgYmFzZSk7XHJcbiAgICAgICAgJC5leHRlbmQodGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLmFwcGx5ID0gZnVuY3Rpb24gKGVsZW1lbnRUcmFuc2Zvcm0sIGVsZW1lbnQsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciByb290ID0gdGhpcy5jYXJvdXNlbC5wYXRoLnJvb3RWYWx1ZSgpO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyh2YWx1ZSAtIHJvb3QpO1xyXG4gICAgICAgICAgICB2YXIgYWJzRGlzdCA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kaXN0YW5jZSAqIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5yb3RhdGlvbk51bWJlck9mQ29uZmlndXJhYmxlRWxlbWVudHM7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmV6aWVyVCA9IDEgLSBNYXRoLm1pbihkaXN0YW5jZSAvIGFic0Rpc3QsIDEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5yb3RhdGlvbkJlemllclBvaW50cztcclxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gZ2V0QmV6aWVyKGJlemllclQsIHBvaW50cy5wMSwgcG9pbnRzLnAyLCBwb2ludHMucDMsIHBvaW50cy5wNCkueTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IHJvb3QgJiYgdGhpcy5jYXJvdXNlbC5vcHRpb25zLnJvdGF0aW9uSW52ZXJ0Rm9yTmVnYXRpdmUpXHJcbiAgICAgICAgICAgICAgICBhbmdsZSAqPSAtMTtcclxuXHJcbiAgICAgICAgICAgIHZhciByb3RhdGlvblZlY3RvciA9IG5ldyB2ZWN0b3IoKTtcclxuICAgICAgICAgICAgcm90YXRpb25WZWN0b3IueCA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5yb3RhdGlvblZlY3RvclgsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uVmVjdG9yLnkgPSB0aGlzLmNhcm91c2VsLm9wdGlvbnMucm90YXRpb25WZWN0b3JZLFxyXG4gICAgICAgICAgICByb3RhdGlvblZlY3Rvci56ID0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnJvdGF0aW9uVmVjdG9yWixcclxuICAgICAgICAgICAgZWxlbWVudFRyYW5zZm9ybS5yb3RhdGlvbnMucHVzaChuZXcgcm90YXRpb24ocm90YXRpb25WZWN0b3IsIGFuZ2xlKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhcm91c2VsLCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgICB2YXIgZWZmZWN0X2Jhc2UgPSByZXF1aXJlKCcuL2VmZmVjdF9iYXNlLmpzJyk7XHJcblxyXG4gICAgICAgIHZhciBiYXNlID0gbmV3IGVmZmVjdF9iYXNlKGNhcm91c2VsLCB7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkLmV4dGVuZCh0aGlzLCBiYXNlKTtcclxuICAgICAgICAkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwbHkgPSBmdW5jdGlvbiAoZWxlbWVudFRyYW5zZm9ybSwgZWxlbWVudCwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBib3hTaGFkb3cgPSAnMHB4IDBweCAnICsgdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNoYWRvd0JsdXJSYWRpdXMgKyAncHggJyArIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zaGFkb3dTcHJlYWRSYWRpdXMgKyAncHggIzAwMDAwMCc7XHJcblxyXG4gICAgICAgICAgICB2YXIgZWxlbWVudFRvQXBwbHkgPSBlbGVtZW50LiRlbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zaGFkb3dTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFRvQXBwbHkgPSAkKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zaGFkb3dTZWxlY3RvciwgZWxlbWVudFRvQXBwbHkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50VG9BcHBseS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJy13ZWJraXQtYm94LXNoYWRvdyc6IGJveFNoYWRvdyxcclxuICAgICAgICAgICAgICAgICctbW96LWJveC1zaGFkb3cnOiBib3hTaGFkb3csXHJcbiAgICAgICAgICAgICAgICAnYm94LXNoYWRvdyc6IGJveFNoYWRvd1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJldmVydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRUb0FwcGx5ID0gdGhpcy5jYXJvdXNlbC5lbGVtZW50c1tpXS4kZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJvdXNlbC5vcHRpb25zLnNoYWRvd1NlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFRvQXBwbHkgPSAkKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zaGFkb3dTZWxlY3RvciwgZWxlbWVudFRvQXBwbHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGVsZW1lbnRUb0FwcGx5LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtYm94LXNoYWRvdyc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICctbW96LWJveC1zaGFkb3cnOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAnYm94LXNoYWRvdyc6ICcnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAgIHZhciBlZmZlY3RfYmFzZSA9IHJlcXVpcmUoJy4vZWZmZWN0X2Jhc2UuanMnKTtcclxuICAgICAgICB2YXIgZ2V0QmV6aWVyID0gcmVxdWlyZSgnLi8uLi9iZXppZXIuanMnKTtcclxuXHJcbiAgICAgICAgdmFyIGJhc2UgPSBuZXcgZWZmZWN0X2Jhc2UoY2Fyb3VzZWwsIHtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAkLmV4dGVuZCh0aGlzLCBiYXNlKTtcclxuICAgICAgICAkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwbHkgPSBmdW5jdGlvbiAoZWxlbWVudFRyYW5zZm9ybSwgZWxlbWVudCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHJvb3QgPSB0aGlzLmNhcm91c2VsLnBhdGgucm9vdFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKHZhbHVlIC0gcm9vdCk7XHJcbiAgICAgICAgICAgIHZhciBhYnNEaXN0ID0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLmRpc3RhbmNlICogdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNpemVBZGp1c3RtZW50TnVtYmVyT2ZDb25maWd1cmFibGVFbGVtZW50cztcclxuXHJcbiAgICAgICAgICAgIHZhciBiZXppZXJUID0gMSAtIE1hdGgubWluKGRpc3RhbmNlIC8gYWJzRGlzdCwgMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNpemVBZGp1c3RtZW50QmV6aWVyUG9pbnRzO1xyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSBnZXRCZXppZXIoYmV6aWVyVCwgcG9pbnRzLnAxLCBwb2ludHMucDIsIHBvaW50cy5wMywgcG9pbnRzLnA0KS55O1xyXG4gICAgICAgICAgICBlbGVtZW50VHJhbnNmb3JtLnNjYWxlID0gc2NhbGUgLyAxMDA7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhcm91c2VsKSB7XHJcblxyXG4gICAgICAgIHRoaXMuYXV0b3JvdGF0aW9uU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbDtcclxuICAgICAgICB0aGlzLmF1dG9yb3RhdGlvblRpbWVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgZXh0ZW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkub24oXCJtb3Rpb25FbmRcIiwgdGhpcy5vbk1vdGlvbkVuZCk7XHJcbiAgICAgICAgdGhpcy5hcHBseVNldHRpbmdzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmopIHtcclxuICAgICAgICBvYmouYXBwbHlTZXR0aW5ncyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5hdXRvcm90YXRpb24pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuc3VyZVN0YXJ0ZWQoKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9yb3RhdGlvblN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9yb3RhdGlvblRpbWVyKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmF1dG9yb3RhdGlvblRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5lbnN1cmVTdGFydGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvcm90YXRpb25TdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9yb3RhdGlvblN0YXJ0ZWQgPSAhISh0aGlzLm1vdmUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoubW92ZSA9ICQucHJveHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm9wdGlvbnMuYXV0b3JvdGF0aW9uRGlyZWN0aW9uID09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWwubW92ZUJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5hdXRvcm90YXRpb25EaXJlY3Rpb24gPT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWwubW92ZUZvcndhcmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIG9iaik7XHJcblxyXG4gICAgICAgIG9iai5vbk1vdGlvbkVuZCA9ICQucHJveHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvcm90YXRpb25TdGFydGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b3JvdGF0aW9uVGltZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYXV0b3JvdGF0aW9uVGltZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b3JvdGF0aW9uVGltZXIgPSBzZXRUaW1lb3V0KHRoaXMubW92ZSwgdGhpcy5jYXJvdXNlbC5vcHRpb25zLmF1dG9yb3RhdGlvblBhdXNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIG9iaik7XHJcblxyXG4gICAgICAgIG9iai5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLndpZGdldCgpLm9mZihcIm1vdGlvbkVuZFwiLCB0aGlzLm9uTW90aW9uRW5kKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KShqUXVlcnkpOyIsImZ1bmN0aW9uIGIxKHQpIHsgcmV0dXJuIHQgKiB0ICogdDsgfTtcclxuXHJcbmZ1bmN0aW9uIGIyKHQpIHsgcmV0dXJuIDMgKiB0ICogdCAqICgxIC0gdCk7IH07XHJcblxyXG5mdW5jdGlvbiBiMyh0KSB7IHJldHVybiAzICogdCAqICgxIC0gdCkgKiAoMSAtIHQpOyB9O1xyXG5cclxuZnVuY3Rpb24gYjQodCkgeyByZXR1cm4gKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpOyB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQsIHAxLCBjcDEsIGNwMiwgcDIpIHtcclxuICAgICAgICB2YXIgcG9zID0ge3g6MCx5OjB9O1xyXG4gICAgICAgIHBvcy54ID0gcDEueCpiMSh0KSArIGNwMS54KmIyKHQpICsgY3AyLngqYjModCkgKyBwMi54KmI0KHQpO1xyXG4gICAgICAgIHBvcy55ID0gcDEueSpiMSh0KSArIGNwMS55KmIyKHQpICsgY3AyLnkqYjModCkgKyBwMi55KmI0KHQpO1xyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGdldEJlemllciA9IHJlcXVpcmUoJy4vYmV6aWVyLmpzJyk7XHJcblxyXG4gICAgdmFyIGJlemllckJveENhY2hlID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QmV6aWVyQm94KHAxLCBjcDEsIGNwMiwgcDIpIHtcclxuICAgICAgICB2YXIgcG9pbnQgPSBnZXRCZXppZXIoMCwgcDEsIGNwMSwgY3AyLCBwMik7XHJcbiAgICAgICAgdmFyIG1pblggPSBwb2ludC54O1xyXG4gICAgICAgIHZhciBtaW5ZID0gcG9pbnQueTtcclxuICAgICAgICB2YXIgbWF4WCA9IHBvaW50Lng7XHJcbiAgICAgICAgdmFyIG1heFkgPSBwb2ludC55O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAyMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wUG9pbnQgPSBnZXRCZXppZXIoaSAqIDAuMDUsIHAxLCBjcDEsIGNwMiwgcDIpO1xyXG4gICAgICAgICAgICBtaW5YID0gTWF0aC5taW4odGVtcFBvaW50LngsIG1pblgpO1xyXG4gICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4odGVtcFBvaW50LnksIG1pblkpO1xyXG4gICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgodGVtcFBvaW50LngsIG1heFgpO1xyXG4gICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgodGVtcFBvaW50LnksIG1heFkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWluWDogbWluWCxcclxuICAgICAgICAgICAgbWluWTogbWluWSxcclxuICAgICAgICAgICAgbWF4WDogbWF4WCxcclxuICAgICAgICAgICAgbWF4WTogbWF4WSxcclxuICAgICAgICAgICAgd2lkdGg6IG1heFggLSBtaW5YLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHAxLCBjcDEsIGNwMiwgcDIpIHtcclxuICAgICAgICB2YXIga2V5ID0gcDEueCArICcuJyArIHAxLnkgK1xyXG4gICAgICAgICAgICAnLicgKyBjcDEueCArICcuJyArIGNwMS55ICtcclxuICAgICAgICAgICAgJy4nICsgY3AyLnggKyAnLicgKyBjcDIueSArXHJcbiAgICAgICAgICAgICcuJyArIHAyLnggKyAnLicgKyBwMi55O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIChiZXppZXJCb3hDYWNoZVtrZXldKSA9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICBiZXppZXJCb3hDYWNoZVtrZXldID0gZ2V0QmV6aWVyQm94KHAxLCBjcDEsIGNwMiwgcDIpO1xyXG4gICAgICAgIHJldHVybiBiZXppZXJCb3hDYWNoZVtrZXldO1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcbiIsInJlcXVpcmUoJy4vZWFzaW5ncy5qcycpKCk7IC8vIHBhdGNoIGpxdWVyeSB3aXRoIGVhc2luZ3NcclxuXHJcbi8qIVxyXG4gKiBUT0RPOiBhZGQgYWJvdXRcclxuICogXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGlmICghJC50aGV0YSkge1xyXG4gICAgICAgICQudGhldGEgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjb211bGF0aXZlX2FuaW1hdGlvbiA9IHJlcXVpcmUoJy4vY29tdWxhdGl2ZV9hbmltYXRpb24uanMnKTtcclxuICAgIHZhciBmbHVpZF9sYXlvdXQgPSByZXF1aXJlKCcuL2ZsdWlkX2xheW91dC5qcycpO1xyXG4gICAgdmFyIGVsZW1lbnRzX3NpemVfdXBkYXRlciA9IHJlcXVpcmUoJy4vZWxlbWVudHNfc2l6ZV91cGRhdGVyLmpzJyk7XHJcbiAgICB2YXIgaW5wdXRfY29udHJvbGxlciA9IHJlcXVpcmUoJy4vaW5wdXRfY29udHJvbGxlci5qcycpO1xyXG4gICAgdmFyIG1vdGlvbl9jb250cm9sbGVyID0gcmVxdWlyZSgnLi9tb3Rpb25fY29udHJvbGxlci5qcycpO1xyXG4gICAgdmFyIHJvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIuanMnKTtcclxuICAgIHZhciBlbmRsZXNzX3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2VuZGxlc3Nfcm90YXRpb25fbG9naWNfY29udHJvbGxlci5qcycpO1xyXG4gICAgdmFyIGZhbGxiYWNrX3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2ZhbGxiYWNrX3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIuanMnKTtcclxuICAgIHZhciBhdXRvX3JvdGF0b3IgPSByZXF1aXJlKCcuL2F1dG9fcm90YXRvci5qcycpO1xyXG4gICAgdmFyIHNpemUgPSByZXF1aXJlKCcuL3NpemUuanMnKTtcclxuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcclxuXHJcbiAgICB2YXIgcGF0aF9hcmNoaW1lZGVzX3NwaXJhbCA9IHJlcXVpcmUoJy4vcGF0aHMvcGF0aF9hcmNoaW1lZGVzX3NwaXJhbC5qcycpO1xyXG4gICAgdmFyIHBhdGhfY3ViaWMgPSByZXF1aXJlKCcuL3BhdGhzL3BhdGhfY3ViaWMuanMnKTtcclxuICAgIHZhciBwYXRoX2N1YmljX2JlemllciA9IHJlcXVpcmUoJy4vcGF0aHMvcGF0aF9jdWJpY19iZXppZXIuanMnKTtcclxuICAgIHZhciBwYXRoX2VsbGlwc2UgPSByZXF1aXJlKCcuL3BhdGhzL3BhdGhfZWxsaXBzZS5qcycpO1xyXG4gICAgdmFyIHBhdGhfbGluZSA9IHJlcXVpcmUoJy4vcGF0aHMvcGF0aF9saW5lLmpzJyk7XHJcbiAgICB2YXIgcGF0aF9wYXJhYm9sYSA9IHJlcXVpcmUoJy4vcGF0aHMvcGF0aF9wYXJhYm9sYS5qcycpO1xyXG4gICAgXHJcbiAgICB2YXIgZWZmZWN0X2FsbGlnbl90b19wYXRoID0gcmVxdWlyZSgnLi9WaXN1YWxFZmZlY3RzL2VmZmVjdF9hbGxpZ25fdG9fcGF0aC5qcycpO1xyXG4gICAgdmFyIGVmZmVjdF9mYWRlX2F3YXkgPSByZXF1aXJlKCcuL1Zpc3VhbEVmZmVjdHMvZWZmZWN0X2ZhZGVfYXdheS5qcycpO1xyXG4gICAgdmFyIGVmZmVjdF9wb3Bfb3V0X3NlbGVjdGVkID0gcmVxdWlyZSgnLi9WaXN1YWxFZmZlY3RzL2VmZmVjdF9wb3Bfb3V0X3NlbGVjdGVkLmpzJyk7XHJcbiAgICB2YXIgZWZmZWN0X3JvdGF0aW9uID0gcmVxdWlyZSgnLi9WaXN1YWxFZmZlY3RzL2VmZmVjdF9yb3RhdGlvbi5qcycpO1xyXG4gICAgdmFyIGVmZmVjdF9zaGFkb3cgPSByZXF1aXJlKCcuL1Zpc3VhbEVmZmVjdHMvZWZmZWN0X3NoYWRvdy5qcycpO1xyXG4gICAgdmFyIGVmZmVjdF9zaXplX2FkanVzdG1lbnQgPSByZXF1aXJlKCcuL1Zpc3VhbEVmZmVjdHMvZWZmZWN0X3NpemVfYWRqdXN0bWVudC5qcycpO1xyXG4gICAgdmFyIGVmZmVjdF9yZWZsZWN0aW9uID0gcmVxdWlyZSgnLi9WaXN1YWxFZmZlY3RzL2VmZmVjdF9yZWZsZWN0aW9uLmpzJyk7XHJcbiAgICBcclxuICAgIHZhciB2ZXJzaW9uID0gJzEuNy4wJztcclxuICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgICBmaWx0ZXI6IFwiZGl2XCIsXHJcbiAgICAgICAgc2VsZWN0ZWRJbmRleDogMCxcclxuICAgICAgICBkaXN0YW5jZTogNzAsXHJcbiAgICAgICAgbW9kZTNEOiAneicsXHJcbiAgICAgICAgc2NhbGVYOiAxLFxyXG4gICAgICAgIHNjYWxlWTogMSxcclxuICAgICAgICBzY2FsZVo6IDEsXHJcbiAgICAgICAgcGVyc3BlY3RpdmU6IDEwMDAsXHJcbiAgICAgICAgbnVtYmVyT2ZFbGVtZW50c1RvRGlzcGxheVJpZ2h0OiBudWxsLFxyXG4gICAgICAgIG51bWJlck9mRWxlbWVudHNUb0Rpc3BsYXlMZWZ0OiBudWxsLFxyXG4gICAgICAgIHNlbnNpdGl2aXR5OiAxLFxyXG4gICAgICAgIHZlcnRpY2FsUm90YXRpb246IGZhbHNlLFxyXG4gICAgICAgIG1pbktleURvd25GcmVxdWVuY3k6IDAsXHJcbiAgICAgICAgcm90YXRpb25BbmltYXRpb25FYXNpbmc6ICdlYXNlT3V0Q3ViaWMnLFxyXG4gICAgICAgIHJvdGF0aW9uQW5pbWF0aW9uRHVyYXRpb246IDUwMCxcclxuICAgICAgICBpbmVydGlhRnJpY3Rpb246IDEwLFxyXG4gICAgICAgIGluZXJ0aWFIaWdoRnJpY3Rpb246IDUwLFxyXG4gICAgICAgIHBhdGg6IHtcclxuICAgICAgICAgICAgdHlwZTogXCJwYXJhYm9sYVwiLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc2lnbmVkRm9yV2lkdGg6IG51bGwsXHJcbiAgICAgICAgZGVzaWduZWRGb3JIZWlnaHQ6IG51bGwsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBtb3VzZXdoZWVsRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBrZXlib2FyZEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgZ2VzdHVyZXNFbmFibGVkOiB0cnVlLFxyXG5cclxuICAgICAgICBhdXRvcm90YXRpb246IGZhbHNlLFxyXG4gICAgICAgIGF1dG9yb3RhdGlvbkRpcmVjdGlvbjogJ3JpZ2h0JywgLyogbGVmdCwgcmlnaHQgKi9cclxuICAgICAgICBhdXRvcm90YXRpb25QYXVzZTogMCxcclxuXHJcbiAgICAgICAgLy8gZWZmZWN0c1xyXG4gICAgICAgIGFsbGlnbkVsZW1lbnRzV2l0aFBhdGg6IGZhbHNlLFxyXG4gICAgICAgIGFsbGlnbkVsZW1lbnRzV2l0aFBhdGhDb2VmZmljaWVudDogMSxcclxuXHJcbiAgICAgICAgZmFkZUF3YXk6IGZhbHNlLFxyXG4gICAgICAgIGZhZGVBd2F5TnVtYmVyT2ZDb25maWd1cmFibGVFbGVtZW50czogNSxcclxuICAgICAgICBmYWRlQXdheUJlemllclBvaW50czogeyBwMTogeyB4OiAwLCB5OiAxMDAgfSwgcDI6IHsgeDogNTAsIHk6IDUwIH0sIHAzOiB7IHg6IDUwLCB5OiA1MCB9LCBwNDogeyB4OiAxMDAsIHk6IDAgfSB9LFxyXG5cclxuICAgICAgICByb3RhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgcm90YXRpb25WZWN0b3JYOiAwLFxyXG4gICAgICAgIHJvdGF0aW9uVmVjdG9yWTogMCxcclxuICAgICAgICByb3RhdGlvblZlY3Rvclo6IDAsXHJcbiAgICAgICAgcm90YXRpb25OdW1iZXJPZkNvbmZpZ3VyYWJsZUVsZW1lbnRzOiA1LFxyXG4gICAgICAgIHJvdGF0aW9uQmV6aWVyUG9pbnRzOiB7IHAxOiB7IHg6IDAsIHk6IDAgfSwgcDI6IHsgeDogNTAsIHk6IDAgfSwgcDM6IHsgeDogNTAsIHk6IDAgfSwgcDQ6IHsgeDogMTAwLCB5OiAwIH0gfSxcclxuICAgICAgICByb3RhdGlvbkludmVydEZvck5lZ2F0aXZlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgc2l6ZUFkanVzdG1lbnQ6IGZhbHNlLFxyXG4gICAgICAgIHNpemVBZGp1c3RtZW50TnVtYmVyT2ZDb25maWd1cmFibGVFbGVtZW50czogNSxcclxuICAgICAgICBzaXplQWRqdXN0bWVudEJlemllclBvaW50czogeyBwMTogeyB4OiAwLCB5OiAxMDAgfSwgcDI6IHsgeDogNTAsIHk6IDEwMCB9LCBwMzogeyB4OiA1MCwgeTogMTAwIH0sIHA0OiB7IHg6IDEwMCwgeTogMTAwIH0gfSxcclxuXHJcbiAgICAgICAgc2hhZG93OiBmYWxzZSxcclxuICAgICAgICBzaGFkb3dCbHVyUmFkaXVzOiAxMDAsXHJcbiAgICAgICAgc2hhZG93U3ByZWFkUmFkaXVzOiAwLFxyXG4gICAgICAgIHNoYWRvd1NlbGVjdG9yOiBudWxsLFxyXG5cclxuICAgICAgICBwb3BvdXRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgcG9wb3V0U2VsZWN0ZWRTaGlmdFg6IDAsXHJcbiAgICAgICAgcG9wb3V0U2VsZWN0ZWRTaGlmdFk6IDAsXHJcbiAgICAgICAgcG9wb3V0U2VsZWN0ZWRTaGlmdFo6IDAsXHJcblxyXG4gICAgICAgIHJlZmxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIHJlZmxlY3Rpb25CZWxvdzogMCxcclxuICAgICAgICByZWZsZWN0aW9uSGVpZ2h0OiAwLjMsXHJcblxyXG4gICAgICAgIGZhbGxiYWNrOiAnYXV0bycsIC8vIGF1dG8sIGFsd2F5cywgbmV2ZXJcclxuICAgICAgICBkaXN0YW5jZUluRmFsbGJhY2tNb2RlOiAyMDBcclxuICAgIH07XHJcblxyXG4gICAgJC50aGV0YS5jYXJvdXNlbCA9IGZ1bmN0aW9uIChkb21FbGVtZW50LCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHZhciBjYXJvdXNlbCA9IHRoaXM7XHJcbiAgICAgICAgY2Fyb3VzZWwuJGVsZW1lbnQgPSAkKGRvbUVsZW1lbnQpO1xyXG4gICAgICAgIGNhcm91c2VsLiRlbGVtZW50LmRhdGEoXCJ0aGV0YS5jYXJvdXNlbFwiLCBjYXJvdXNlbCk7XHJcbiAgICAgICAgY2Fyb3VzZWwuJGVsZW1lbnQuYWRkQ2xhc3MoJ3RoZXRhLWNhcm91c2VsJyk7XHJcblxyXG4gICAgICAgIGNhcm91c2VsLl9jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLnRoZXRhLmNhcm91c2VsLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHByZXBhcmUgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXJTaXplID0gbmV3IHNpemUodGhpcy53aWRnZXQoKS53aWR0aCgpLCB0aGlzLndpZGdldCgpLmhlaWdodCgpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInRoZXRhLWNhcm91c2VsLWlubmVyLWNvbnRhaW5lclwiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRUbyh0aGlzLndpZGdldCgpKTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY3NzKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBjb250YWluZXJTaXplLndpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogY29udGFpbmVyU2l6ZS5oZWlnaHQgKyAncHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aWRnZXQoKS5hdHRyKCd0YWJpbmRleCcsIDApLmNzcyh7IG91dGxpbmU6ICdub25lJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMHB4LDBweCwgMTAwMDAwcHgpJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdXRpbHMuaXNGRigpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBidWdzIGluIGZpcmVmb3hcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc3BlY3RpdmU6IHRoaXMub3B0aW9ucy5wZXJzcGVjdGl2ZSArICdweCcsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaW5pdCBlbGVtZW50c1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJlcGFyZSB3aWRnZXRcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVBhdGgoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlRWZmZWN0cygpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVSb3RhdGlvbkxvZ2ljQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzU2l6ZVVwZGF0ZXIgPSBuZXcgZWxlbWVudHNfc2l6ZV91cGRhdGVyKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZsdWlkTGF5b3V0ID0gbmV3IGZsdWlkX2xheW91dCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5fYWxpZ25FbGVtZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBjb211bGF0aXZlX2FuaW1hdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5tb3Rpb25Db250cm9sbGVyID0gbmV3IG1vdGlvbl9jb250cm9sbGVyKHRoaXMsICQucHJveHkodGhpcy5fbW90aW9uQ29uc3VtZXIsIHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIgPSBuZXcgaW5wdXRfY29udHJvbGxlcih0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvUm90YXRvciA9IG5ldyBhdXRvX3JvdGF0b3IodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgICQodGhpcy5hbmltYXRpb24pLm9uKCdzdGVwJywgJC5wcm94eShmdW5jdGlvbiAoZSwgc2hpZnQpIHsgdGhpcy5fYWxpZ25FbGVtZW50cyhzaGlmdCk7IH0sIHRoaXMpKTtcclxuICAgICAgICAgICAgJCh0aGlzLmFuaW1hdGlvbikub24oJ2RvbmUnLCAkLnByb3h5KGZ1bmN0aW9uIChlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcm90YXRpb25BbmltYXRpb25Db21wbGV0ZWQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmFpc2VNb3Rpb25FbmQoKTtcclxuICAgICAgICAgICAgfSwgdGhpcykpO1xyXG4gICAgICAgICAgICAkKHRoaXMubW90aW9uQ29udHJvbGxlcikub24oJ2VuZCcsICQucHJveHkoZnVuY3Rpb24gKGUsIHZhbHVlKSB7IHRoaXMuX21vdGlvbkVuZCh2YWx1ZSk7IH0sIHRoaXMpKTtcclxuICAgICAgICAgICAgJCh0aGlzLm1vdGlvbkNvbnRyb2xsZXIpLm9uKCdzdGFydCcsICQucHJveHkodGhpcy5fcmFpc2VNb3Rpb25TdGFydCwgdGhpcykpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2Fyb3VzZWwuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZmZlY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdHNbaV0ucmV2ZXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdGF0aW9uTG9naWNDb250cm9sbGVyICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uTG9naWNDb250cm9sbGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmZsdWlkTGF5b3V0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50c1NpemVVcGRhdGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvUm90YXRvci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50c1tpXS4kZWxlbWVudC5vZmYoJ3RhcCcsIHRoaXMubW92ZVRvKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNbaV0uJGVsZW1lbnQub2ZmKFwiY2xpY2tcIiwgdGhpcy5tb3ZlVG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0KCkuZGF0YSgndGhldGEuY2Fyb3VzZWwnLCBudWxsKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5tb3ZlQmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm90YXRpb25Mb2dpY0NvbnRyb2xsZXIubW92ZUJhY2soKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5tb3ZlRm9yd2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm90YXRpb25Mb2dpY0NvbnRyb2xsZXIubW92ZUZvcndhcmQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5tb3ZlVG8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkxvZ2ljQ29udHJvbGxlci5tb3ZlVG8oaW5kZXgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhcm91c2VsLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNJbk1vdGlvbilcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FsaWduRWxlbWVudHMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXNUb0FkZCA9IHRoaXMud2lkZ2V0KCkuY29udGVudHMoKS5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGVUeXBlID09IDggLyp3ZSBuZWVkIGNvbW1lbnRzIGZvciBBbmd1bGFySlMqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhJCh0aGlzKS5oYXNDbGFzcygndGhldGEtaWdub3JlJylcclxuICAgICAgICAgICAgICAgICAgICApICYmICEkKHRoaXMpLmhhc0NsYXNzKCd0aGV0YS1jYXJvdXNlbC1pbm5lci1jb250YWluZXInKTsgLy8gaWdub3JlIGludGVybmFsIGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdGVtc1RvQWRkLmFwcGVuZFRvKHRoaXMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbigpLmZpbHRlcih0aGlzLm9wdGlvbnMuZmlsdGVyKS5tYXAoZnVuY3Rpb24gKGksIGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZSA9ICQoZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yZGVyID0gJGUuZGF0YSgndGhldGEtb3JkZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9yZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyID0gaTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgJGVsZW1lbnQ6ICRlLCBlbGVtZW50OiBlLCBvcmRlcjogb3JkZXIgfTtcclxuICAgICAgICAgICAgfSkudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5zb3J0KGZ1bmN0aW9uIChlMSwgZTIpIHsgcmV0dXJuIGUxLm9yZGVyIC0gZTIub3JkZXI7IH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50c1tpXS5pbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldLmVsZW1lbnQuaW5kZXggPSBpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50c1tpXS4kZWxlbWVudC5oYXNDbGFzcygndGhldGEtY2Fyb3VzZWwtZWxlbWVudCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlVG9Qcm94eSA9ICQucHJveHkoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lbmFibGVkICYmICF0aGlzLm9wdGlvbnMuYXV0b3JvdGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUbyhlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMsIHRoaXMuZWxlbWVudHNbaV0uZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNbaV0uJGVsZW1lbnQuYWRkQ2xhc3MoJ3RoZXRhLWNhcm91c2VsLWVsZW1lbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldLiRlbGVtZW50LmNzcyh7IHBvc2l0aW9uOiAnYWJzb2x1dGUnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNbaV0uJGVsZW1lbnQub24oJ3RhcCcsIG1vdmVUb1Byb3h5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldLiRlbGVtZW50LmNsaWNrKG1vdmVUb1Byb3h5KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZWxlY3RlZEluZGV4ID0gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5vcHRpb25zLnNlbGVjdGVkSW5kZXgsIHRoaXMuZWxlbWVudHMubGVuZ3RoIC0gMSksIDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNTaXplVXBkYXRlci51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hcHBseUN1cnJlbnRJdGVtU3R5bGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5nZXRJc0luTW90aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNJbk1vdGlvbjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5nZXRJc0ZhbGxiYWNrTW9kZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm90YXRpb25Mb2dpY0NvbnRyb2xsZXIuaXNGYWxsYmFja01vZGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC53aWRnZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhcm91c2VsLl9zZXRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHV0aWxzLnNldE9iamVjdFByb3BlcnR5VmFsdWUoY2Fyb3VzZWwub3B0aW9ucywgbmFtZSwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdyb3RhdGlvbkFuaW1hdGlvbkR1cmF0aW9uJyB8fCBuYW1lID09PSAncm90YXRpb25BbmltYXRpb25FYXNpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBuZWVkIHRvIGRvIHNvbWV0aGluZyBpZiB0aGVzZSBwcm9wZXJ0aWVzIGhhcyBiZWVuIGNoYW5nZWRcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdmaWx0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ3BlcnNwZWN0aXZlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY3NzKHsgcGVyc3BlY3RpdmU6IHZhbHVlICsgJ3B4JyB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubW9kZTNEID09ICdzY2FsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWxpZ25FbGVtZW50cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKCdwYXRoJykgPT0gMCB8fCBuYW1lID09PSAnZmFsbGJhY2snKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVSb3RhdGlvbkxvZ2ljQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWxpZ25FbGVtZW50cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJzZWxlY3RlZEluZGV4XCIgfHwgbmFtZSA9PT0gXCJkaXN0YW5jZVwiIHx8IG5hbWUgPT09IFwibW9kZTNEXCJcclxuICAgICAgICAgICAgICAgIHx8IG5hbWUgPT09IFwibnVtYmVyT2ZFbGVtZW50c1RvRGlzcGxheVJpZ2h0XCIgfHwgbmFtZSA9PT0gXCJudW1iZXJPZkVsZW1lbnRzVG9EaXNwbGF5TGVmdFwiXHJcbiAgICAgICAgICAgICAgICB8fCBuYW1lID09PSBcInNjYWxlWFwiIHx8IG5hbWUgPT09IFwic2NhbGVZXCIgfHwgbmFtZSA9PT0gXCJzY2FsZVpcIlxyXG4gICAgICAgICAgICAgICAgfHwgbmFtZSA9PT0gXCJhbGxpZ25FbGVtZW50c1dpdGhQYXRoQ29lZmZpY2llbnRcIlxyXG4gICAgICAgICAgICAgICAgfHwgbmFtZSA9PT0gXCJmYWRlQXdheUJlemllclBvaW50c1wiIHx8IG5hbWUgPT09IFwiZmFkZUF3YXlOdW1iZXJPZkNvbmZpZ3VyYWJsZUVsZW1lbnRzXCJcclxuICAgICAgICAgICAgICAgIHx8IG5hbWUgPT09IFwicm90YXRpb25CZXppZXJQb2ludHNcIiB8fCBuYW1lID09PSBcInJvdGF0aW9uTnVtYmVyT2ZDb25maWd1cmFibGVFbGVtZW50c1wiIHx8IG5hbWUgPT09IFwicm90YXRpb25JbnZlcnRGb3JOZWdhdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICB8fCBuYW1lID09PSBcInJvdGF0aW9uVmVjdG9yWFwiIHx8IG5hbWUgPT09IFwicm90YXRpb25WZWN0b3JZXCIgfHwgbmFtZSA9PT0gXCJyb3RhdGlvblZlY3RvclpcIlxyXG4gICAgICAgICAgICAgICAgfHwgbmFtZSA9PT0gXCJzaXplQWRqdXN0bWVudE51bWJlck9mQ29uZmlndXJhYmxlRWxlbWVudHNcIiB8fCBuYW1lID09PSBcInNpemVBZGp1c3RtZW50QmV6aWVyUG9pbnRzXCJcclxuICAgICAgICAgICAgICAgIHx8IG5hbWUgPT09IFwic2hhZG93Qmx1clJhZGl1c1wiIHx8IG5hbWUgPT09IFwic2hhZG93U3ByZWFkUmFkaXVzXCJcclxuICAgICAgICAgICAgICAgIHx8IG5hbWUgPT09IFwicG9wb3V0U2VsZWN0ZWRTaGlmdFhcIiB8fCBuYW1lID09PSBcInBvcG91dFNlbGVjdGVkU2hpZnRZXCIgfHwgbmFtZSA9PT0gXCJwb3BvdXRTZWxlY3RlZFNoaWZ0WlwiXHJcbiAgICAgICAgICAgICAgICB8fCBuYW1lID09PSBcImRpc3RhbmNlSW5GYWxsYmFja01vZGVcIlxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGlnbkVsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuYW1lLmluZGV4T2YoJ2F1dG9yb3RhdGlvbicpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9Sb3RhdG9yLmFwcGx5U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignYWxsaWduRWxlbWVudHNXaXRoUGF0aCcpICE9IC0xIHx8IG5hbWUuaW5kZXhPZignZmFkZUF3YXknKSAhPSAtMSB8fCBuYW1lLmluZGV4T2YoJ3JvdGF0aW9uJykgIT0gLTFcclxuICAgICAgICAgICAgICAgIHx8IG5hbWUuaW5kZXhPZignc2l6ZUFkanVzdG1lbnQnKSAhPSAtMSB8fCBuYW1lLmluZGV4T2YoJ3NoYWRvdycpICE9IC0xIHx8IG5hbWUuaW5kZXhPZigncG9wb3V0U2VsZWN0ZWQnKSAhPSAtMVxyXG4gICAgICAgICAgICAgICAgfHwgbmFtZS5pbmRleE9mKCdyZWZsZWN0aW9uJykgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUVmZmVjdHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FsaWduRWxlbWVudHMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdzZWxlY3RlZEluZGV4Jykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlDdXJyZW50SXRlbVN0eWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fY3JlYXRlUm90YXRpb25Mb2dpY0NvbnRyb2xsZXIgPSBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkxvZ2ljQ29udHJvbGxlciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkxvZ2ljQ29udHJvbGxlci5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXRoLmlzRW5kbGVzcygpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkxvZ2ljQ29udHJvbGxlciA9IG5ldyBlbmRsZXNzX3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIodGhpcyk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucm90YXRpb25Mb2dpY0NvbnRyb2xsZXIgPSBuZXcgcm90YXRpb25fbG9naWNfY29udHJvbGxlcih0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmFsbGJhY2sgPT0gJ2Fsd2F5cycgfHwgKHRoaXMub3B0aW9ucy5mYWxsYmFjayA9PSAnYXV0bycgJiYgZmFsbGJhY2tfcm90YXRpb25fbG9naWNfY29udHJvbGxlci5mYWxsYmFjaygpKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkxvZ2ljQ29udHJvbGxlciA9IG5ldyBmYWxsYmFja19yb3RhdGlvbl9sb2dpY19jb250cm9sbGVyKHRoaXMsIHRoaXMucm90YXRpb25Mb2dpY0NvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUm90YXRvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvUm90YXRvci5hcHBseVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fY3JlYXRlRWZmZWN0cyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZmZlY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdHNbaV0ucmV2ZXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGxpZ25FbGVtZW50c1dpdGhQYXRoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RzLnB1c2gobmV3IGVmZmVjdF9hbGxpZ25fdG9fcGF0aCh0aGlzLCB7fSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mYWRlQXdheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0cy5wdXNoKG5ldyBlZmZlY3RfZmFkZV9hd2F5KHRoaXMsIHt9KSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJvdGF0aW9uKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RzLnB1c2gobmV3IGVmZmVjdF9yb3RhdGlvbih0aGlzLCB7fSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaXplQWRqdXN0bWVudClcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0cy5wdXNoKG5ldyBlZmZlY3Rfc2l6ZV9hZGp1c3RtZW50KHRoaXMsIHt9KSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNoYWRvdylcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0cy5wdXNoKG5ldyBlZmZlY3Rfc2hhZG93KHRoaXMsIHt9KSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBvcG91dFNlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RzLnB1c2gobmV3IGVmZmVjdF9wb3Bfb3V0X3NlbGVjdGVkKHRoaXMsIHt9KSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlZmxlY3Rpb24pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdHMucHVzaChuZXcgZWZmZWN0X3JlZmxlY3Rpb24odGhpcywge30pKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fY3JlYXRlUGF0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1BhdGggPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXRoLnR5cGUgPT0gXCJwYXJhYm9sYVwiKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdQYXRoID0gbmV3IHBhdGhfcGFyYWJvbGEodGhpcywgdGhpcy5vcHRpb25zLnBhdGguc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhdGgudHlwZSA9PSBcImxpbmVcIikge1xyXG4gICAgICAgICAgICAgICAgbmV3UGF0aCA9IG5ldyBwYXRoX2xpbmUodGhpcywgdGhpcy5vcHRpb25zLnBhdGguc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhdGgudHlwZSA9PSBcImN1YmljXCIpIHtcclxuICAgICAgICAgICAgICAgIG5ld1BhdGggPSBuZXcgcGF0aF9jdWJpYyh0aGlzLCB0aGlzLm9wdGlvbnMucGF0aC5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGF0aC50eXBlID09IFwiYXJjaGltZWRlc19zcGlyYWxcIikge1xyXG4gICAgICAgICAgICAgICAgbmV3UGF0aCA9IG5ldyBwYXRoX2FyY2hpbWVkZXNfc3BpcmFsKHRoaXMsIHRoaXMub3B0aW9ucy5wYXRoLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXRoLnR5cGUgPT0gXCJlbGxpcHNlXCIpIHtcclxuICAgICAgICAgICAgICAgIG5ld1BhdGggPSBuZXcgcGF0aF9lbGxpcHNlKHRoaXMsIHRoaXMub3B0aW9ucy5wYXRoLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXRoLnR5cGUgPT0gXCJjdWJpY19iZXppZXJcIikge1xyXG4gICAgICAgICAgICAgICAgbmV3UGF0aCA9IG5ldyBwYXRoX2N1YmljX2Jlemllcih0aGlzLCB0aGlzLm9wdGlvbnMucGF0aC5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdQYXRoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF0aCA9IG5ld1BhdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGF0aC5zZXR0aW5ncyA9IHRoaXMucGF0aC5zZXR0aW5ncztcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcInBhdGggXCIgKyB0aGlzLm9wdGlvbnMucGF0aC50eXBlICsgXCIgaXMgbm90IHN1cHBvcnRlZC5cIjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fcmFpc2VDaGFuZ2VFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy53aWRnZXQoKS50cmlnZ2VyKFwiY2hhbmdlXCIsIHsgaW5kZXg6IHRoaXMub3B0aW9ucy5zZWxlY3RlZEluZGV4IH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9hcHBseUN1cnJlbnRJdGVtU3R5bGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fYXBwbHlDdXJyZW50SXRlbVN0eWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNbaV0uJGVsZW1lbnQuYWRkQ2xhc3MoJ3RoZXRhLWN1cnJlbnQtaXRlbScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50c1tpXS4kZWxlbWVudC5yZW1vdmVDbGFzcygndGhldGEtY3VycmVudC1pdGVtJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fcmFpc2VNb3Rpb25TdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNJbk1vdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0KCkuYWRkQ2xhc3MoJ3RoZXRhLWluLW1vdGlvbicpO1xyXG4gICAgICAgICAgICB0aGlzLndpZGdldCgpLnRyaWdnZXIoXCJtb3Rpb25TdGFydFwiLCB7IGluZGV4OiB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fcmFpc2VNb3Rpb25FbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyLm5vbkludGVycnVwdGlibGVNb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy53aWRnZXQoKS5yZW1vdmVDbGFzcygndGhldGEtaW4tbW90aW9uJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzSW5Nb3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy53aWRnZXQoKS50cmlnZ2VyKFwibW90aW9uRW5kXCIsIHsgaW5kZXg6IHRoaXMub3B0aW9ucy5zZWxlY3RlZEluZGV4IH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhcm91c2VsLl9yb3RhdGlvbkFuaW1hdGlvbkNvbXBsZXRlZCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNlbGVjdGVkSW5kZXggIT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yYWlzZUNoYW5nZUV2ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYWxpZ25FbGVtZW50cygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhcm91c2VsLl9tb3Rpb25Db25zdW1lciA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb3RhdGlvbkxvZ2ljQ29udHJvbGxlci5jb25zdW1lTW90aW9uKGRpc3RhbmNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fbW90aW9uRW5kID0gZnVuY3Rpb24gKHJlbWFpbmluZ0Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb25Mb2dpY0NvbnRyb2xsZXIuaGFuZGxlTW90aW9uRW5kKHJlbWFpbmluZ0Rpc3RhbmNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fYWxpZ25FbGVtZW50cyA9IGZ1bmN0aW9uIChhbmltYXRpb25TaGlmdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb3RhdGlvbkxvZ2ljQ29udHJvbGxlci5hbGlnbkVsZW1lbnRzKGFuaW1hdGlvblNoaWZ0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXJvdXNlbC5fZ2V0Q29udGFpbmVyU2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJy50aGV0YS1jYXJvdXNlbC1pbm5lci1jb250YWluZXInLCB0aGlzLndpZGdldCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBzaXplKGNvbnRhaW5lci53aWR0aCgpLCBjb250YWluZXIuaGVpZ2h0KCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhcm91c2VsLl9jcmVhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgJC50aGV0YS5jYXJvdXNlbC5kZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xyXG4gICAgJC50aGV0YS5jYXJvdXNlbC52ZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAkLmZuLnRoZXRhX2Nhcm91c2VsID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgY2FsbEFyZ3VtZW50cyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICAgICAgdmFyIGhhc0NhbGxSZXMgPSBmYWxzZTtcclxuICAgICAgICB2YXIgY2FsbFJlcyA9IG51bGw7XHJcblxyXG4gICAgICAgIHZhciBlYWNoUmVzID0gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRlbCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICRlbC5kYXRhKCd0aGV0YS5jYXJvdXNlbCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2Vbb3B0aW9uc10gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjYWxsQXJndW1lbnRzLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ2FsbFJlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxSZXMgPSBpbnN0YW5jZVtvcHRpb25zXS5hcHBseShpbnN0YW5jZSwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyA9PSAnb3B0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbEFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ2FsbFJlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsUmVzID0gdXRpbHMuZ2V0T2JqZWN0UHJvcGVydHlWYWx1ZShpbnN0YW5jZS5vcHRpb25zLCBjYWxsQXJndW1lbnRzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxBcmd1bWVudHMubGVuZ3RoID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLl9zZXRPcHRpb24oY2FsbEFyZ3VtZW50c1sxXSwgY2FsbEFyZ3VtZW50c1syXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjbG9uZSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goY2xvbmUsICQucHJveHkoJGVsLmRhdGEoJ3RoZXRhLmNhcm91c2VsJykuX3NldE9wdGlvbiwgJGVsLmRhdGEoJ3RoZXRhLmNhcm91c2VsJykpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgKG5ldyAkLnRoZXRhLmNhcm91c2VsKHRoaXMsIG9wdGlvbnMpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFoYXNDYWxsUmVzKVxyXG4gICAgICAgICAgICByZXR1cm4gZWFjaFJlcztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsUmVzO1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNhcm91c2VsKSB7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsO1xyXG5cclxuICAgICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5Qcm9ncmVzc0FuaW1hdGlvblRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhclF1ZXVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXVlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBbXTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGUgPSBmdW5jdGlvbiAoZnJvbSwgdG8sIHRhcmdldFZhbHVlLCBlYXNpbmcsIGR1cmF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChlYXNpbmcpID09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICBlYXNpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChkdXJhdGlvbikgPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGlzdGFuY2UoTWF0aC5hYnModG8gLSBmcm9tKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggPiA1KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKHsgZnJvbTogZnJvbSwgdG86IHRvLCB0YXJnZXRWYWx1ZTogdGFyZ2V0VmFsdWUsIGVhc2luZzogZWFzaW5nLCBkdXJhdGlvbjogZHVyYXRpb24gfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJblByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlZWtGcm9tUXVldWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY29tcGxldGVDdXJyZW50SW1tZWRpYXRlbHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbGVtZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQuc3RvcCh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucGVla0Zyb21RdWV1ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5xdWV1ZVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pblByb2dyZXNzQW5pbWF0aW9uVGFyZ2V0ID0gZWxlbWVudC50YXJnZXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBEaXN0ID0gTWF0aC5hYnMoZWxlbWVudC5mcm9tIC0gZWxlbWVudC50byk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVhc2luZyA9IGVsZW1lbnQuZWFzaW5nID09IG51bGwgPyB0aGlzLmdldEVhc2luZyhzdGVwRGlzdCkgOiBlbGVtZW50LmVhc2luZztcclxuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IChlbGVtZW50LmR1cmF0aW9uID09IG51bGwgPyB0aGlzLmNhcm91c2VsLm9wdGlvbnMucm90YXRpb25BbmltYXRpb25EdXJhdGlvbiA6IGVsZW1lbnQuZHVyYXRpb24pICogdGhpcy5nZXREdXJhdGlvbkNvZWZmaWNpZW50KHN0ZXBEaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRFbGVtZW50LmFuaW1hdGUoeyBmcm9tOiBlbGVtZW50LnRvIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IGVhc2luZyxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6ICQucHJveHkodGhpcy5vblN0YXJ0LCB0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBzdGVwOiAkLnByb3h5KHRoaXMub25TdGVwLCB0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBkb25lOiAkLnByb3h5KHRoaXMub25Eb25lLCB0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBhbHdheXM6ICQucHJveHkodGhpcy5vbkFsd2F5cywgdGhpcylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRUYXJnZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXVlW3RoaXMucXVldWUubGVuZ3RoIC0gMV0udGFyZ2V0VmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluUHJvZ3Jlc3NBbmltYXRpb25UYXJnZXQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5vblN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5vblN0ZXAgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignc3RlcCcsIHZhbCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkRvbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignZG9uZScsIHRoaXMuaW5Qcm9ncmVzc0FuaW1hdGlvblRhcmdldCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkFsd2F5cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0luUHJvZ3Jlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wZWVrRnJvbVF1ZXVlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRGlzdGFuY2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZS5wdXNoKHsgZGF0ZTogbmV3IERhdGUoKSwgdmFsdWU6IHZhbHVlIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9ICQodGhpcy5kaXN0YW5jZSkuZmlsdGVyKGZ1bmN0aW9uIChpLCBkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkgLSBkLmRhdGUpIDwgNTAwMDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRBY3R1YWxEaXN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRpc3RhbmNlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGQgPSB0aGlzLmRpc3RhbmNlW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoZGF0ZSAtIGQuZGF0ZSkgPCB0aGlzLmNhcm91c2VsLm9wdGlvbnMucm90YXRpb25BbmltYXRpb25EdXJhdGlvbilcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSArPSBkLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGlzdGFuY2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gYWRqdXN0IHJvdGF0aW9uIGR1cmF0aW9uLCBpZiB1c2VyIHF1aXFseSBwcmVzcyBuZXh0IGJ1dHRvbiBzZXZlcmFsIHRpbWVzXHJcbiAgICAgICAgdGhpcy5nZXREdXJhdGlvbkNvZWZmaWNpZW50ID0gZnVuY3Rpb24gKG9uZVN0ZXBEaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm9wdGlvbnMuYXV0b3JvdGF0aW9uKSAvLyBhZGp1c3RtZW50IGlzIG5vdCByZXF1aXJlZCBmb3IgYXV0byByb3RhdGlvblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7IC8vIFxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIHJldHVybiAxIC8gKHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKSAvIG9uZVN0ZXBEaXN0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldEVhc2luZyA9IGZ1bmN0aW9uIChvbmVTdGVwRGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXREdXJhdGlvbkNvZWZmaWNpZW50KG9uZVN0ZXBEaXN0KSA+IDAuNClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcm91c2VsLm9wdGlvbnMucm90YXRpb25BbmltYXRpb25FYXNpbmc7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImxpbmVhclwiO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy8gYmFzZWQgb24gZWFzaW5nIGVxdWF0aW9ucyBmcm9tIFJvYmVydCBQZW5uZXIgKGh0dHA6Ly93d3cucm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcpXHJcblxyXG4gICAgICAgIHZhciBiYXNlRWFzaW5ncyA9IHt9O1xyXG5cclxuICAgICAgICAkLmVhY2goW1wiUXVhZFwiLCBcIkN1YmljXCIsIFwiUXVhcnRcIiwgXCJRdWludFwiLCBcIkV4cG9cIl0sIGZ1bmN0aW9uIChpLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIGJhc2VFYXNpbmdzW25hbWVdID0gZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyhwLCBpICsgMik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQuZXh0ZW5kKGJhc2VFYXNpbmdzLCB7XHJcbiAgICAgICAgICAgIFNpbmU6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguY29zKHAgKiBNYXRoLlBJIC8gMik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIENpcmM6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gcCAqIHApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBFbGFzdGljOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHAgPT09IDAgfHwgcCA9PT0gMSA/IHAgOlxyXG4gICAgICAgICAgICAgICAgICAgIC1NYXRoLnBvdygyLCA4ICogKHAgLSAxKSkgKiBNYXRoLnNpbigoKHAgLSAxKSAqIDgwIC0gNy41KSAqIE1hdGguUEkgLyAxNSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIEJhY2s6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcCAqIHAgKiAoMyAqIHAgLSAyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgQm91bmNlOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvdzIsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmNlID0gNDtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAocCA8ICgocG93MiA9IE1hdGgucG93KDIsIC0tYm91bmNlKSkgLSAxKSAvIDExKSB7IH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAxIC8gTWF0aC5wb3coNCwgMyAtIGJvdW5jZSkgLSA3LjU2MjUgKiBNYXRoLnBvdygocG93MiAqIDMgLSAyKSAvIDIyIC0gcCwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGFsbEVhc2luZ3MgPSB7fTtcclxuICAgICAgICAkLmVhY2goYmFzZUVhc2luZ3MsIGZ1bmN0aW9uIChuYW1lLCBlYXNlSW4pIHtcclxuICAgICAgICAgICAgYWxsRWFzaW5nc1tcImVhc2VJblwiICsgbmFtZV0gPSBlYXNlSW47XHJcbiAgICAgICAgICAgIGFsbEVhc2luZ3NbXCJlYXNlT3V0XCIgKyBuYW1lXSA9IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGVhc2VJbigxIC0gcCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGFsbEVhc2luZ3NbXCJlYXNlSW5PdXRcIiArIG5hbWVdID0gZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwIDwgMC41ID9cclxuICAgICAgICAgICAgICAgICAgICBlYXNlSW4ocCAqIDIpIC8gMiA6XHJcbiAgICAgICAgICAgICAgICAgICAgMSAtIGVhc2VJbihwICogLTIgKyAyKSAvIDI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQuZWFjaChhbGxFYXNpbmdzLCBmdW5jdGlvbiAobmFtZSwgZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mICgkLmVhc2luZ1tuYW1lXSkgPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICQuZWFzaW5nW25hbWVdID0gZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBmdW5jdGlvbiBleHRlbmQob2JqKSB7XHJcblxyXG4gICAgICAgIG9iai51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnZhbGlkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLmNhcm91c2VsLmVsZW1lbnRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvbGRTaXplID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChlLnNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkU2l6ZSA9IGUuc2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnNpemUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBlLiRlbGVtZW50LmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBlLiRlbGVtZW50LndpZHRoKClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9sZFNpemUgfHwgb2xkU2l6ZS5oZWlnaHQgIT0gZS5zaXplLmhlaWdodCB8fCBvbGRTaXplLndpZHRoICE9IGUuc2l6ZS53aWR0aClcclxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGludmFsaWRhdGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsLmludmFsaWRhdGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwpIHtcclxuXHJcbiAgICAgICAgZXh0ZW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmNhcm91c2VsID0gY2Fyb3VzZWw7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCQucHJveHkodGhpcy51cGRhdGUsIHRoaXMpLCA1MDApO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmopIHtcclxuXHJcbiAgICAgICAgb2JqLm1vdmVUb0ludGVybmFsID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhaWdodCA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4IC0gaW5kZXg7XHJcbiAgICAgICAgICAgIHZhciByZXZlcnNlID0gMDtcclxuICAgICAgICAgICAgdmFyIHJldmVyc2VQcmVmZXJhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICByZXZlcnNlID0gdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGggLSBpbmRleCArIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV2ZXJzZSA9ICh0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aCAtIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4ICsgaW5kZXgpICogLTE7XHJcbiAgICAgICAgICAgICAgICByZXZlcnNlUHJlZmVyYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHN0cmFpZ2h0ICogdGhpcy5nZXRBY3R1YWxEaXN0YW5jZSgpO1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMocmV2ZXJzZSkgPCBNYXRoLmFicyhzdHJhaWdodCkgfHwgKHJldmVyc2VQcmVmZXJhYmxlICYmIE1hdGguYWJzKHJldmVyc2UpID09IE1hdGguYWJzKHN0cmFpZ2h0KSkpXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IHJldmVyc2UgKiB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuaW5wdXRDb250cm9sbGVyLm5vbkludGVycnVwdGlibGVNb2RlKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLl9yYWlzZU1vdGlvblN0YXJ0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLmFuaW1hdGlvbi5hbmltYXRlKDAsIGRpc3RhbmNlLCBpbmRleCwgTWF0aC5hYnMocmV2ZXJzZSkgPT09IDEgPyBudWxsIDogXCJsaW5lYXJcIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1vdmVCYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcGVuZGluZ1RhcmdldCA9IHRoaXMuY2Fyb3VzZWwuYW5pbWF0aW9uLmlzSW5Qcm9ncmVzcyA/IHRoaXMuY2Fyb3VzZWwuYW5pbWF0aW9uLmdldFRhcmdldFZhbHVlKCkgOiB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIHBlbmRpbmdUYXJnZXQtLTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nVGFyZ2V0IDwgMClcclxuICAgICAgICAgICAgICAgIHBlbmRpbmdUYXJnZXQgPSB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aCArIHBlbmRpbmdUYXJnZXQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLmlucHV0Q29udHJvbGxlci5ub25JbnRlcnJ1cHRpYmxlTW9kZSh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5fcmFpc2VNb3Rpb25TdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLmFuaW1hdGlvbi5hbmltYXRlKDAsIHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKSwgcGVuZGluZ1RhcmdldCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5tb3ZlRm9yd2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHBlbmRpbmdUYXJnZXQgPSB0aGlzLmNhcm91c2VsLmFuaW1hdGlvbi5pc0luUHJvZ3Jlc3MgPyB0aGlzLmNhcm91c2VsLmFuaW1hdGlvbi5nZXRUYXJnZXRWYWx1ZSgpIDogdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICBwZW5kaW5nVGFyZ2V0Kys7XHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nVGFyZ2V0ID49IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcGVuZGluZ1RhcmdldCAtPSB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuaW5wdXRDb250cm9sbGVyLm5vbkludGVycnVwdGlibGVNb2RlKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLl9yYWlzZU1vdGlvblN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuYW5pbWF0aW9uLmFuaW1hdGUoMCwgLTEgKiB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCksIHBlbmRpbmdUYXJnZXQsIG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouY29uc3VtZU1vdGlvbiA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xyXG4gICAgICAgICAgICB2YXIgaGlnaEZyaWN0aW9uUmFuZ2UgPSB0aGlzLmNhcm91c2VsLl9hbGlnbkVsZW1lbnRzKGRpc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxlZEVsZW1lbnRzID0gcGFyc2VJbnQoZGlzdGFuY2UgLyB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCksIDEwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggLT0gc2Nyb2xsZWRFbGVtZW50cztcclxuXHJcbiAgICAgICAgICAgIHZhciBjb25zdW1lZERpc3RhbmNlID0gcHJldkluZGV4IC0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4ID0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggJSB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aCArIHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY29uc3VtZWREaXN0YW5jZSA9IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoIC0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggKyBwcmV2SW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4ID49IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4ICUgdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjb25zdW1lZERpc3RhbmNlID0gdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGggLSBwcmV2SW5kZXggKyB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgICAgIGNvbnN1bWVkRGlzdGFuY2UgKj0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHByZXZJbmRleCAhPSB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleClcclxuICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuX3JhaXNlQ2hhbmdlRXZlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7IGRpc3RhbmNlOiBjb25zdW1lZERpc3RhbmNlICogdGhpcy5nZXRBY3R1YWxEaXN0YW5jZSgpLCBoaWdoRnJpY3Rpb25SYW5nZTogaGlnaEZyaWN0aW9uUmFuZ2UgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouaGFuZGxlTW90aW9uRW5kID0gZnVuY3Rpb24gKHJlbWFpbmluZ0Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdEaXN0YW5jZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhcmdldEluZGV4ID0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMocmVtYWluaW5nRGlzdGFuY2UpID4gdGhpcy5nZXRBY3R1YWxEaXN0YW5jZSgpIC8gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0Rpc3RhbmNlIDwgMClcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4LS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciByZXZlcnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IHRhcmdldEluZGV4ICUgdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGggKyB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICByZXZlcnNlID0gJ2JhY2snO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEluZGV4ID49IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSB0YXJnZXRJbmRleCAlIHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmVyc2UgPSAnZm9yd2FyZCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXREaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgIGlmICghcmV2ZXJzZSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RGlzdGFuY2UgPSAodGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggLSB0YXJnZXRJbmRleCkgKiB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXZlcnNlID09PSAnYmFjaycpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGlzdGFuY2UgPSAodGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGggLSB0YXJnZXRJbmRleCArIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4KSAqIHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXREaXN0YW5jZSA9ICh0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aCAtIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4ICsgdGFyZ2V0SW5kZXgpICogdGhpcy5nZXRBY3R1YWxEaXN0YW5jZSgpICogLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gTWF0aC5hYnModGhpcy5jYXJvdXNlbC5vcHRpb25zLnJvdGF0aW9uQW5pbWF0aW9uRHVyYXRpb24gKiAocmVtYWluaW5nRGlzdGFuY2UgLyB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCkpKTtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSBNYXRoLm1pbihkdXJhdGlvbiwgdGhpcy5jYXJvdXNlbC5vcHRpb25zLnJvdGF0aW9uQW5pbWF0aW9uRHVyYXRpb24gLyAyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuYW5pbWF0aW9uLmFuaW1hdGUocmVtYWluaW5nRGlzdGFuY2UsIHRhcmdldERpc3RhbmNlLCB0YXJnZXRJbmRleCwgbnVsbCwgZHVyYXRpb24pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5hbGlnbkVsZW1lbnRzID0gZnVuY3Rpb24gKGFuaW1hdGlvblNoaWZ0KSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGggPT0gMCB8fCB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCA8IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLmNvbnRhaW5lclNpemUgPSB0aGlzLmNhcm91c2VsLl9nZXRDb250YWluZXJTaXplKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2hpZnQgPSAwO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChhbmltYXRpb25TaGlmdCkgIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHNoaWZ0ID0gYW5pbWF0aW9uU2hpZnQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFJvb3RWYWx1ZSgpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2VzID0gdGhpcy5nZXRGYWRlUmFuZ2VzKGxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5lbGVtZW50c1tpXS5pc0VuZGxlc3NQcm9jZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHZpc2liaWxpdHlJbmZvID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbmV3IGVuZGxlc3NJdGVyYXRvcih0aGlzLmNhcm91c2VsLCB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCkgOyAhaS5pc0N5Y2xlQ29tcGxldGVkKCk7IGkubW92ZU5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpc2libGUgPSB0aGlzLnNldEVsZW1lbnRQb3NpdGlvbih0aGlzLmNhcm91c2VsLmVsZW1lbnRzW2kuZ2V0Q3VycmVudEluZGV4KCldLCBsb2NhdGlvbiArIHNoaWZ0LCByYW5nZXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5lbGVtZW50c1tpLmdldEN1cnJlbnRJbmRleCgpXS5pc0VuZGxlc3NQcm9jZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eUluZm9baS5nZXRDdXJyZW50SW5kZXgoKV0gPSB2aXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmluY3JlbWVudFZhbHVlKGxvY2F0aW9uLCB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsb2NhdGlvbiA9IHRoaXMuZ2V0Um9vdFZhbHVlKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbmV3IGVuZGxlc3NJdGVyYXRvcih0aGlzLmNhcm91c2VsLCB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCAtIDEpIDsgIWkuaXNDeWNsZUNvbXBsZXRlZCgpIDsgaS5tb3ZlUHJldigpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJvdXNlbC5lbGVtZW50c1tpLmdldEN1cnJlbnRJbmRleCgpXS5pc0VuZGxlc3NQcm9jZXNzZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmRlY3JlbWVudFZhbHVlKGxvY2F0aW9uLCB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCkpO1xyXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eUluZm9baS5nZXRDdXJyZW50SW5kZXgoKV0gPSB0aGlzLnNldEVsZW1lbnRQb3NpdGlvbih0aGlzLmNhcm91c2VsLmVsZW1lbnRzW2kuZ2V0Q3VycmVudEluZGV4KCldLCBsb2NhdGlvbiArIHNoaWZ0LCByYW5nZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZS5zZXRFbGVtZW50VmlzaWJpbGl0eUludGVybmFsKCF2aXNpYmlsaXR5SW5mb1tpXSwgdGhpcy5jYXJvdXNlbC5lbGVtZW50c1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0WkluZGV4ZXMoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouc2V0RWxlbWVudFZpc2liaWxpdHlJbnRlcm5hbCA9IGZ1bmN0aW9uIChoaWRlKSB7IH07XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBlbmRsZXNzSXRlcmF0b3IgPSBmdW5jdGlvbiAoY2Fyb3VzZWwsIGN1cnJlbnRJbmRleCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gY3VycmVudEluZGV4O1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBjYXJvdXNlbC5lbGVtZW50cy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMuaXRlcmF0aW9ucyA9IDA7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsO1xyXG5cclxuICAgICAgICB0aGlzLm1vdmVOZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPT0gdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlcmF0aW9ucysrO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubW92ZVByZXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB0aGlzLml0ZXJhdGlvbnMtLTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmlzQ3ljbGVDb21wbGV0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyh0aGlzLml0ZXJhdGlvbnMpID49IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q3VycmVudEluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwpIHtcclxuXHJcbiAgICAgICAgdmFyIHJvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL3JvdGF0aW9uX2xvZ2ljX2NvbnRyb2xsZXIuanMnKTtcclxuICAgICAgICB0aGlzLmJhc2UgPSBuZXcgcm90YXRpb25fbG9naWNfY29udHJvbGxlcihjYXJvdXNlbCk7XHJcbiAgICAgICAgJC5leHRlbmQodGhpcywgdGhpcy5iYXNlKTtcclxuXHJcbiAgICAgICAgZXh0ZW5kKHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSlcclxuOyIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBleHBvcnRzID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBleHRlbmQob2JqKSB7XHJcblxyXG4gICAgICAgIG9iai5pc0ZhbGxiYWNrTW9kZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07XHJcblxyXG4gICAgICAgIG9iai5nZXRBY3R1YWxEaXN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kaXN0YW5jZUluRmFsbGJhY2tNb2RlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5nZXRSb290VmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5pbmNyZW1lbnRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5jcmVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSArIGluY3JlbWVudDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouZGVjcmVtZW50VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGRlY3JlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgLSBkZWNyZW1lbnQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1pblZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTEgKiB0aGlzLm1heFZhbHVlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1heFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY2Fyb3VzZWwuY29udGFpbmVyU2l6ZS53aWR0aCArIHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKSkgLyAyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5zZXRFbGVtZW50UG9zaXRpb24gPSBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gdmFsdWUgLSBlbGVtZW50LnNpemUud2lkdGggLyAyICsgdGhpcy5jYXJvdXNlbC5jb250YWluZXJTaXplLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgdmFyIHRvcCA9IHRoaXMuY2Fyb3VzZWwuY29udGFpbmVyU2l6ZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5zaXplLmhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LiRlbGVtZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICcnLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdCArICdweCcsXHJcbiAgICAgICAgICAgICAgICB0b3A6IHRvcCArICdweCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmlzaWJsZSA9IHZhbHVlID4gdGhpcy5taW5WYWx1ZSgpICYmIHZhbHVlIDwgdGhpcy5tYXhWYWx1ZSgpXHJcblxyXG4gICAgICAgICAgICBpZiAodmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuJGVsZW1lbnQuc2hvdygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LiRlbGVtZW50LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2aXNpYmxlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iYXNlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5lbGVtZW50c1tpXS4kZWxlbWVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhczNkKCkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5ICYmIGRvY3VtZW50LmJvZHkuc3R5bGUucGVyc3BlY3RpdmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF90ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcclxuICAgICAgICAgICAgc3R5bGUgPSBfdGVtcERpdi5zdHlsZSxcclxuICAgICAgICAgICAgYSA9IFtcIldlYmtpdFwiLCBcIk1velwiLCBcIk9cIiwgXCJNc1wiLCBcIm1zXCJdLFxyXG4gICAgICAgICAgICBpID0gYS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKF90ZW1wRGl2LnN0eWxlLnBlcnNwZWN0aXZlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xyXG4gICAgICAgICAgICBpZiAoc3R5bGVbYVtpXSArIFwiUGVyc3BlY3RpdmVcIl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydHMgPSBmdW5jdGlvbiAoY2Fyb3VzZWwsIGJhc2VSb3RhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5iYXNlID0gYmFzZVJvdGF0b3I7XHJcbiAgICAgICAgJC5leHRlbmQodGhpcywgdGhpcy5iYXNlKTtcclxuICAgICAgICBleHRlbmQodGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydHMuZmFsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICFoYXMzZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZXhwb3J0cztcclxuXHJcbn0pKGpRdWVyeSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbihjYXJvdXNlbCkge1xyXG5cclxuICAgICAgICBleHRlbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbDtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoJC5wcm94eSh0aGlzLnVwZGF0ZSwgdGhpcyksIDIwMCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwbGllZFdpZHRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFwcGxpZWRIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYXBwbGllZFNjYWxlID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xyXG4gICAgICAgIG9iai51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2lkdGhUb0FwcGx5ID0gdGhpcy5jYXJvdXNlbC53aWRnZXQoKS53aWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0VG9BcHBseSA9IHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZVRvQXBwbHkgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpZHRoVG9BcHBseSA9PSAwIHx8IGhlaWdodFRvQXBwbHkgPT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm9wdGlvbnMuZGVzaWduZWRGb3JXaWR0aCAhPSBudWxsICYmIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kZXNpZ25lZEZvckhlaWdodCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZVRvQXBwbHkgPSBNYXRoLm1pbih3aWR0aFRvQXBwbHkgLyB0aGlzLmNhcm91c2VsLm9wdGlvbnMuZGVzaWduZWRGb3JXaWR0aCwgaGVpZ2h0VG9BcHBseSAvIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kZXNpZ25lZEZvckhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh3aWR0aFRvQXBwbHkgIT0gdGhpcy5hcHBsaWVkV2lkdGggfHwgaGVpZ2h0VG9BcHBseSAhPSB0aGlzLmFwcGxpZWRIZWlnaHQgfHwgc2NhbGVUb0FwcGx5ICE9IHRoaXMuYXBwbGllZFNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLnRoZXRhLWNhcm91c2VsLWlubmVyLWNvbnRhaW5lcicsIHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY2FsZVRvQXBwbHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoVG9BcHBseSA9IHdpZHRoVG9BcHBseSAvIHNjYWxlVG9BcHBseTtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHRUb0FwcGx5ID0gaGVpZ2h0VG9BcHBseSAvIHNjYWxlVG9BcHBseTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCBwcm9wb3J0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpZHRoVG9BcHBseSAvIGhlaWdodFRvQXBwbHkgPCB0aGlzLmNhcm91c2VsLm9wdGlvbnMuZGVzaWduZWRGb3JXaWR0aCAvIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kZXNpZ25lZEZvckhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRUb0FwcGx5ID0gd2lkdGhUb0FwcGx5ICogKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kZXNpZ25lZEZvckhlaWdodCAvIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kZXNpZ25lZEZvcldpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aFRvQXBwbHkgPSBoZWlnaHRUb0FwcGx5ICogKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5kZXNpZ25lZEZvcldpZHRoIC8gdGhpcy5jYXJvdXNlbC5vcHRpb25zLmRlc2lnbmVkRm9ySGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5jYXJvdXNlbC53aWRnZXQoKS53aWR0aCgpIC8gMiAtIHdpZHRoVG9BcHBseSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5jYXJvdXNlbC53aWRnZXQoKS5oZWlnaHQoKSAvIDIgLSBoZWlnaHRUb0FwcGx5IC8gMixcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXBwbGF5aW5nXHJcbiAgICAgICAgICAgICAgICBpZiAod2lkdGhUb0FwcGx5ICE9IHRoaXMuYXBwbGllZFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLndpZHRoKHdpZHRoVG9BcHBseSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBsaWVkV2lkdGggPSB3aWR0aFRvQXBwbHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhlaWdodFRvQXBwbHkgIT0gdGhpcy5hcHBsaWVkSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmhlaWdodChoZWlnaHRUb0FwcGx5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsLmludmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGxpZWRIZWlnaHQgPSBoZWlnaHRUb0FwcGx5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY2FsZVRvQXBwbHkgIT0gdGhpcy5hcHBsaWVkU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGVUb0FwcGx5ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwcHgsMHB4LCAxMDAwMDBweCknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdzdGF0aWMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMHB4LDBweCwgMTAwMDAwcHgpIHNjYWxlKCcgKyBzY2FsZVRvQXBwbHkgKyAnKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5pbnZhbGlkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbGllZFNjYWxlID0gc2NhbGVUb0FwcGx5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmdldEFwcGxpZWRTY2FsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwbGllZFNjYWxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGllZFNjYWxlO1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhcm91c2VsKSB7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsO1xyXG4gICAgICAgIHRoaXMubW92ZW1lbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5wYXNzZWRCcmFraW5nRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb3dGcmljdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN3aXRjaGluZ1RvSGlnaEZyaWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJNb3ZlbWVudCA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50cy5wdXNoKHsgZGF0ZTogbmV3IERhdGUoKSwgZGlzdGFuY2U6IGRpc3RhbmNlIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyT2xkTW92ZW1lbnRzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaGluZ1RvSGlnaEZyaWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQodGhpcykuc3RvcChmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubW92ZWRJbnRvSGlnaEZyaWN0aW9uUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvd0ZyaWN0aW9uSW5Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb3dGcmljdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoaW5nVG9IaWdoRnJpY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zdG9wKGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJyYWtpbmdEaXN0TGVmdCA9IHRoaXMubW90aW9uRGF0YS5mcm9tUG9zaXRpb24gKyB0aGlzLm1vdGlvbkRhdGEuYnJha2luZ0Rpc3RhbmNlIC0gdGhpcy5wYXNzZWRCcmFraW5nRGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BlZWRMZWZ0ID0gdGhpcy5tb3Rpb25EYXRhLmluaXRpYWxTcGVlZCAqIE1hdGguYWJzKGJyYWtpbmdEaXN0TGVmdCAvIHRoaXMubW90aW9uRGF0YS5icmFraW5nRGlzdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmcmljdGlvbiA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5pbmVydGlhSGlnaEZyaWN0aW9uICogMTAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJyYWtpbmdEaXN0YW5jZSA9IChzcGVlZExlZnQgKiBzcGVlZExlZnQpIC8gKDIgKiBmcmljdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BlZWRMZWZ0IDwgMClcclxuICAgICAgICAgICAgICAgICAgICBicmFraW5nRGlzdGFuY2UgKj0gLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJyYWtpbmdUaW1lID0gYnJha2luZ0Rpc3RhbmNlIC8gKHNwZWVkTGVmdCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYW5pbWF0ZSh7IHBhc3NlZEJyYWtpbmdEaXN0YW5jZTogdGhpcy5wYXNzZWRCcmFraW5nRGlzdGFuY2UgKyBicmFraW5nRGlzdGFuY2UgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFkJyxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogYnJha2luZ1RpbWUgKiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6ICQucHJveHkodGhpcy5vblN0ZXAsIHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAkLnByb3h5KHRoaXMub25Db21wbGV0ZSwgdGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbDogJC5wcm94eSh0aGlzLm9uRmFpbCwgdGhpcylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5ydW4gPSBmdW5jdGlvbiAoZnJvbVBvc2l0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3BlZWQgPSB0aGlzLmdldFNwZWVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZW1lbnRzID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAoc3BlZWQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjb21wbGV0ZScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJpY3Rpb24gPSB0aGlzLmNhcm91c2VsLm9wdGlvbnMuaW5lcnRpYUZyaWN0aW9uICogMTAwO1xyXG4gICAgICAgICAgICB2YXIgYnJha2luZ0Rpc3RhbmNlID0gKHNwZWVkICogc3BlZWQpIC8gKDIgKiBmcmljdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChzcGVlZCA8IDApXHJcbiAgICAgICAgICAgICAgICBicmFraW5nRGlzdGFuY2UgKj0gLTE7XHJcblxyXG4gICAgICAgICAgICB2YXIgYnJha2luZ1RpbWUgPSBicmFraW5nRGlzdGFuY2UgLyAoc3BlZWQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFzc2VkQnJha2luZ0Rpc3RhbmNlID0gZnJvbVBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc0luUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxvd0ZyaWN0aW9uSW5Qcm9ncmVzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubW90aW9uRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGluaXRpYWxTcGVlZDogc3BlZWQsXHJcbiAgICAgICAgICAgICAgICBicmFraW5nRGlzdGFuY2U6IGJyYWtpbmdEaXN0YW5jZSxcclxuICAgICAgICAgICAgICAgIGZyb21Qb3NpdGlvbjogZnJvbVBvc2l0aW9uXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFuaW1hdGUoeyBwYXNzZWRCcmFraW5nRGlzdGFuY2U6IGZyb21Qb3NpdGlvbiArIGJyYWtpbmdEaXN0YW5jZSB9LCB7XHJcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0Q2lyYycsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogYnJha2luZ1RpbWUgKiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogJC5wcm94eSh0aGlzLm9uU3RlcCwgdGhpcyksXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogJC5wcm94eSh0aGlzLm9uQ29tcGxldGUsIHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgZmFpbDogJC5wcm94eSh0aGlzLm9uRmFpbCwgdGhpcylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5vblN0ZXAgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChpc05hTih2YWwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL2ZvciBzb21lIGVhc2luZ3Mgd2UgY2FuIGdldCBOYU5zXHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhc3NlZEJyYWtpbmdEaXN0YW5jZSA9IHZhbDtcclxuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdzdGVwJywgdmFsKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm9uQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignY29tcGxldGUnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm9uRmFpbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN3aXRjaGluZ1RvSGlnaEZyaWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdzdG9wJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyT2xkTW92ZW1lbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50cyA9ICQodGhpcy5tb3ZlbWVudHMpLmZpbHRlcihmdW5jdGlvbiAoaSwgZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpIC0gZC5kYXRlKSA8IDUwMDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0U3BlZWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb3ZlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZCA9IHRoaXMubW92ZW1lbnRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoZGF0ZSAtIGQuZGF0ZSkgPCAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgKz0gZC5kaXN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlICogNTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7IiwiXHJcbm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwpIHtcclxuICAgICAgICBleHRlbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbDtcclxuICAgICAgICB0aGlzLmxhc3RLZXlEb3duVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5sYXN0UHJvY2Vzc2VkRXZlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubm9uSW50ZXJydXB0aWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveWFibGVzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkua2V5dXAodGhpcy5kZXN0cm95YWJsZShcImtleXVwXCIsICQucHJveHkodGhpcy5vbktleVVwLCB0aGlzKSkpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkua2V5ZG93bih0aGlzLmRlc3Ryb3lhYmxlKFwia2V5ZG93blwiLCAkLnByb3h5KHRoaXMub25LZXlEb3duLCB0aGlzKSkpO1xyXG5cclxuICAgICAgICB0aGlzLmNhcm91c2VsLndpZGdldCgpLm1vdXNlZG93bih0aGlzLmRlc3Ryb3lhYmxlKFwibW91c2Vkb3duXCIsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZWFkb25seSgpIHx8ICF0aGlzLmdldEdlc3R1cmVzRW5hYmxlZCgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC53aWRnZXQoKS5mb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdGlvblN0YXJ0ZWQodGhpcy5pc1ZlcnRpY2FsUm90YXRpb24oKSA/IGUucGFnZVkgOiBlLnBhZ2VYKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0sIHRoaXMpKSk7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbC53aWRnZXQoKS5tb3VzZW1vdmUodGhpcy5kZXN0cm95YWJsZShcIm1vdXNlbW92ZVwiLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmVhZG9ubHkoKSB8fCAhdGhpcy5nZXRHZXN0dXJlc0VuYWJsZWQoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhblByb2Nlc3NFdmVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRBc1Byb2Nlc3NlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3Rpb25Db250aW51ZWQodGhpcy5pc1ZlcnRpY2FsUm90YXRpb24oKSA/IGUucGFnZVkgOiBlLnBhZ2VYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSwgdGhpcykpKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsLndpZGdldCgpLm1vdXNlbGVhdmUodGhpcy5kZXN0cm95YWJsZShcIm1vdXNlbGVhdmVcIiwgJC5wcm94eShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1JlYWRvbmx5KCkgfHwgIXRoaXMuZ2V0R2VzdHVyZXNFbmFibGVkKCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ub25JbnRlcnJ1cHRpYmxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLm1vdGlvbkNvbnRyb2xsZXIubW90aW9uRW5kZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9LCB0aGlzKSkpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkubW91c2V1cCh0aGlzLmRlc3Ryb3lhYmxlKFwibW91c2V1cFwiLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmVhZG9ubHkoKSB8fCAhdGhpcy5nZXRHZXN0dXJlc0VuYWJsZWQoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubW90aW9uQ29udHJvbGxlci5tb3Rpb25FbmRlZCh0cnVlKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0sIHRoaXMpKSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkuZ2V0KDApLm9ubW91c2V3aGVlbCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLndpZGdldCgpLm9uKFwibW91c2V3aGVlbFwiLCB0aGlzLmRlc3Ryb3lhYmxlKFwibW91c2V3aGVlbFwiLCAkLnByb3h5KHRoaXMub25Nb3VzZXdoZWVsLCB0aGlzKSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkub24oXCJET01Nb3VzZVNjcm9sbFwiLCB0aGlzLmRlc3Ryb3lhYmxlKFwiRE9NTW91c2VTY3JvbGxcIiwgJC5wcm94eSh0aGlzLm9uTW91c2V3aGVlbCwgdGhpcykpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkub24oJ3RvdWNoc3RhcnQnLCB0aGlzLmRlc3Ryb3lhYmxlKFwidG91Y2hzdGFydFwiLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmVhZG9ubHkoKSB8fCAhdGhpcy5nZXRHZXN0dXJlc0VuYWJsZWQoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW90aW9uU3RhcnRlZCh0aGlzLmlzVmVydGljYWxSb3RhdGlvbigpID8gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uc2NyZWVuWSA6IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnNjcmVlblgpO1xyXG4gICAgICAgIH0sIHRoaXMpKSk7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbC53aWRnZXQoKS5vbigndG91Y2htb3ZlJywgdGhpcy5kZXN0cm95YWJsZShcInRvdWNobW92ZVwiLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmVhZG9ubHkoKSB8fCAhdGhpcy5nZXRHZXN0dXJlc0VuYWJsZWQoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhblByb2Nlc3NFdmVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRBc1Byb2Nlc3NlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3Rpb25Db250aW51ZWQodGhpcy5pc1ZlcnRpY2FsUm90YXRpb24oKSA/IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnNjcmVlblkgOiBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5zY3JlZW5YKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSwgdGhpcykpKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsLndpZGdldCgpLm9uKCd0b3VjaGVuZCcsIHRoaXMuZGVzdHJveWFibGUoXCJ0b3VjaGVuZFwiLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmVhZG9ubHkoKSB8fCAhdGhpcy5nZXRHZXN0dXJlc0VuYWJsZWQoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubW90aW9uQ29udHJvbGxlci5tb3Rpb25FbmRlZCh0cnVlKTtcclxuICAgICAgICB9LCB0aGlzKSkpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwud2lkZ2V0KCkub24oJ3RvdWNoY2FuY2VsJywgdGhpcy5kZXN0cm95YWJsZShcInRvdWNoY2FuY2VsXCIsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZWFkb25seSgpIHx8ICF0aGlzLmdldEdlc3R1cmVzRW5hYmxlZCgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5tb3Rpb25Db250cm9sbGVyLm1vdGlvbkVuZGVkKHRydWUpO1xyXG4gICAgICAgIH0sIHRoaXMpKSk7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbC53aWRnZXQoKS5vbigndGFwaG9sZCcsIHRoaXMuZGVzdHJveWFibGUoXCJ0YXBob2xkXCIsIGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBleHRlbmQob2JqKSB7XHJcblxyXG4gICAgICAgIG9iai5pc1ZlcnRpY2FsUm90YXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy52ZXJ0aWNhbFJvdGF0aW9uICYmICF0aGlzLmNhcm91c2VsLnJvdGF0aW9uTG9naWNDb250cm9sbGVyLmlzRmFsbGJhY2tNb2RlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmdldFNlbnNpdGl2aXR5ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWwucm90YXRpb25Mb2dpY0NvbnRyb2xsZXIuaXNGYWxsYmFja01vZGUoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbnNpdGl2aXR5IC8gdGhpcy5jYXJvdXNlbC5mbHVpZExheW91dC5nZXRBcHBsaWVkU2NhbGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouaXNSZWFkb25seSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuY2Fyb3VzZWwub3B0aW9ucy5lbmFibGVkIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsLm9wdGlvbnMuYXV0b3JvdGF0aW9uO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5nZXRHZXN0dXJlc0VuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcm91c2VsLm9wdGlvbnMuZ2VzdHVyZXNFbmFibGVkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5ub25JbnRlcnJ1cHRpYmxlTW9kZSA9IGZ1bmN0aW9uIChub25JbnRlcnJ1cHRpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9uSW50ZXJydXB0aWJsZSA9IG5vbkludGVycnVwdGlibGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmNhblByb2Nlc3NFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGFzdFByb2Nlc3NlZEV2ZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpIC0gdGhpcy5sYXN0UHJvY2Vzc2VkRXZlbnQgPiA1MClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5yZWdpc3RlckV2ZW50QXNQcm9jZXNzZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFByb2Nlc3NlZEV2ZW50ID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoubW90aW9uU3RhcnRlZCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubW90aW9uQ29udHJvbGxlci5tb3Rpb25TdGFydGVkKHgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxYID0geDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoubW90aW9uQ29udGludWVkID0gZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgdmFyIGRlbHRhID0gdGhpcy5pbml0aWFsWCAtIHg7XHJcbiAgICAgICAgICAgIGRlbHRhICo9IHRoaXMuZ2V0U2Vuc2l0aXZpdHkoKTtcclxuICAgICAgICAgICAgeCA9IHRoaXMuaW5pdGlhbFggLSBkZWx0YTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubW90aW9uQ29udHJvbGxlci5tb3Rpb25Db250aW51ZWQoeCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm9uTW91c2V3aGVlbCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2Fyb3VzZWwub3B0aW9ucy5tb3VzZXdoZWVsRW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmVhZG9ubHkoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJvdXNlbC5nZXRJc0luTW90aW9uKCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgdXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gZXZlbnQub3JpZ2luYWxFdmVudDtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGpxdWVyeSBtb3VzZXdoZWVsIHBsdWdpblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGVsdGFZKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGVsdGFZID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5kZWx0YVkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWwud2hlZWxEZWx0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsLndoZWVsRGVsdGEgPj0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsLndoZWVsRGVsdGEgPD0gLTEyMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5kZXRhaWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbC5kZXRhaWwgPT0gLTMpXHJcbiAgICAgICAgICAgICAgICAgICAgdXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbC5kZXRhaWwgPT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHVwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRTZW5zaXRpdml0eSgpID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsLm1vdmVCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRTZW5zaXRpdml0eSgpIDwgMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsLm1vdmVGb3J3YXJkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRvd24pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFNlbnNpdGl2aXR5KCkgPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubW92ZUJhY2soKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFNlbnNpdGl2aXR5KCkgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubW92ZUZvcndhcmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5vbktleURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsLm9wdGlvbnMua2V5Ym9hcmRFbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZWFkb25seSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09IHRoaXMuZ2V0QmFja0tleSgpIHx8IGV2ZW50LndoaWNoID09IHRoaXMuZ2V0Rm9yd2FyZEtleSgpKVxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm1vdGlvbkNvbnRyb2xsZXIuaXNJbk1vdGlvbiB8fCB0aGlzLmNhcm91c2VsLm1vdGlvbkNvbnRyb2xsZXIuaW5lcnRpYS5pc0luUHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoKG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RLZXlEb3duVGltZSkgPCB0aGlzLmNhcm91c2VsLm9wdGlvbnMubWluS2V5RG93bkZyZXF1ZW5jeSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGFzdEtleURvd25UaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PSB0aGlzLmdldEJhY2tLZXkoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2Vuc2l0aXZpdHkoKSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5tb3ZlQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2Vuc2l0aXZpdHkoKSA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5tb3ZlRm9yd2FyZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PSB0aGlzLmdldEZvcndhcmRLZXkoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2Vuc2l0aXZpdHkoKSA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5tb3ZlQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2Vuc2l0aXZpdHkoKSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5tb3ZlRm9yd2FyZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm9uS2V5VXAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZWFkb25seSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWwubW90aW9uQ29udHJvbGxlci5pc0luTW90aW9uIHx8IHRoaXMuY2Fyb3VzZWwubW90aW9uQ29udHJvbGxlci5pbmVydGlhLmlzSW5Qcm9ncmVzcylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PSB0aGlzLmdldEJhY2tLZXkoKSB8fCBldmVudC53aGljaCA9PSB0aGlzLmdldEZvcndhcmRLZXkoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5hbmltYXRpb24uY2xlYXJRdWV1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmRlc3Ryb3lhYmxlID0gZnVuY3Rpb24gKGtleSwgZnVuYykge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lhYmxlc1trZXldID0gZnVuYztcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmRlc3Ryb3lhYmxlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC53aWRnZXQoKS5vZmYoa2V5LCB0aGlzLmRlc3Ryb3lhYmxlc1trZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5nZXRGb3J3YXJkS2V5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm9wdGlvbnMudmVydGljYWxSb3RhdGlvbilcclxuICAgICAgICAgICAgICAgIHJldHVybiA0MDsgLy9kb3duXHJcbiAgICAgICAgICAgIHJldHVybiAzNzsgLy9sZWZ0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmdldEJhY2tLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm9wdGlvbnMudmVydGljYWxSb3RhdGlvbilcclxuICAgICAgICAgICAgICAgIHJldHVybiAzODsgLy91cFxyXG4gICAgICAgICAgICByZXR1cm4gMzk7IC8vcmlnaHRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYXJvdXNlbCwgbW90aW9uQ29uc3VtZXIpIHtcclxuICAgICAgICB2YXIgaW5lcnRpYSA9IHJlcXVpcmUoJy4vaW5lcnRpYS5qcycpO1xyXG4gICAgXHJcbiAgICAgICAgZXh0ZW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmlzSW5Nb3Rpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tb3Rpb25Db25zdW1lciA9IG1vdGlvbkNvbnN1bWVyO1xyXG4gICAgICAgIHRoaXMuaW5lcnRpYSA9IG5ldyBpbmVydGlhKGNhcm91c2VsKTtcclxuICAgICAgICAkKHRoaXMuaW5lcnRpYSkub24oJ2NvbXBsZXRlJywgJC5wcm94eSh0aGlzLm1vdGlvbkVuZGVkLCB0aGlzLCBmYWxzZSkpO1xyXG4gICAgICAgICQodGhpcy5pbmVydGlhKS5vbignc3RvcCcsICQucHJveHkodGhpcy5pbmVydGlhU3RvcCwgdGhpcykpO1xyXG4gICAgICAgICQodGhpcy5pbmVydGlhKS5vbignc3RlcCcsICQucHJveHkoZnVuY3Rpb24gKGUsIHZhbHVlKSB7IHRoaXMubW90aW9uQ29udGludWVkSW50ZXJuYWwodmFsdWUpOyB9LCB0aGlzKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmopIHtcclxuICAgICAgICBvYmoubW90aW9uSW5Qcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5lcnRpYS5pc0luUHJvZ3Jlc3MgfHwgdGhpcy5pc0luTW90aW9uO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5tb3Rpb25TdGFydGVkID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5lcnRpYS5pc0luUHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5lcnRpYS5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbk1vdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMucmFpc2VTdGFydCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1vdGlvbkNvbnRpbnVlZCA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW5Nb3Rpb24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5yYWlzZVN0YXJ0ICYmIHBvc2l0aW9uICE9IHRoaXMubGFzdFBvc2l0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlU3RhcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbmVydGlhLnJlZ2lzdGVyTW92ZW1lbnQocG9zaXRpb24gLSB0aGlzLmxhc3RQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMubW90aW9uQ29udGludWVkSW50ZXJuYWwocG9zaXRpb24pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5tb3Rpb25Db250aW51ZWRJbnRlcm5hbCA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSArPSBwb3NpdGlvbiAtIHRoaXMubGFzdFBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgY29uc3VtaW5nRGF0YSA9IHRoaXMubW90aW9uQ29uc3VtZXIodGhpcy5kaXN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgLT0gY29uc3VtaW5nRGF0YS5kaXN0YW5jZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25zdW1pbmdEYXRhLmhpZ2hGcmljdGlvblJhbmdlICYmIHRoaXMuaW5lcnRpYS5pc0luUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5lcnRpYS5tb3ZlZEludG9IaWdoRnJpY3Rpb25SYW5nZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1vdGlvbkVuZGVkID0gZnVuY3Rpb24gKHVzZUluZXJ0aWEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluZXJ0aWEuaXNJblByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc0luTW90aW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXVzZUluZXJ0aWEpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignZW5kJywgdGhpcy5kaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5lcnRpYS5ydW4odGhpcy5sYXN0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmluZXJ0aWFTdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5Nb3Rpb24gPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IFxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYXJvdXNlbCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgICAgdmFyIHBhdGhfYmFzZSA9IHJlcXVpcmUoJy4vcGF0aF9iYXNlLmpzJyk7XHJcbiAgICAgICAgdmFyIHBvaW50ID0gcmVxdWlyZSgnLi8uLi9wb2ludC5qcycpO1xyXG5cclxuICAgICAgICB2YXIgYmFzZSA9IG5ldyBwYXRoX2Jhc2UoY2Fyb3VzZWwsIHtcclxuICAgICAgICAgICAgZmk6IDEwLFxyXG4gICAgICAgICAgICBmbGF0bmVzczogMTBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJC5leHRlbmQodGhpcywgYmFzZSk7XHJcbiAgICAgICAgJC5leHRlbmQodGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLmdldFBvaW50SW50ZXJuYWwgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IHZhbHVlICogTWF0aC5QSSAqIDIgLyAzNjA7XHJcblxyXG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuc2V0dGluZ3MuZmkgKiB2YWx1ZSAqIE1hdGguY29zKGFuZ2xlKSAvICgyICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5zZXR0aW5ncy5maSAqIHZhbHVlICogTWF0aC5zaW4oYW5nbGUpIC8gKDIgKiBNYXRoLlBJKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB6ID0gLTEgKiBNYXRoLnBvdyh2YWx1ZSAtIHRoaXMucm9vdFZhbHVlKCksIDIpIC8gdGhpcy5zZXR0aW5ncy5mbGF0bmVzcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcG9pbnQoeCwgeSwgeik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yb290VmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA0NTA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5taW5WYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEwO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubWF4VmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA2NTA7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9XHJcbiAgICAoZnVuY3Rpb24gKCQpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNhcm91c2VsLCBzZXR0aW5ncykge1xyXG4gICAgICAgICAgICB2YXIgcm90YXRpb24gPSByZXF1aXJlKCcuLy4uL3JvdGF0aW9uLmpzJyk7XHJcbiAgICAgICAgICAgIHZhciB2ZWN0b3IgPSByZXF1aXJlKCcuLy4uL3ZlY3Rvci5qcycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIHNoaWZ0WDogMCxcclxuICAgICAgICAgICAgICAgIHNoaWZ0WTogMCxcclxuICAgICAgICAgICAgICAgIHNoaWZ0WjogMCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uQW5nbGVYWTogMCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uQW5nbGVaWTogMCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uQW5nbGVaWDogMCxcclxuICAgICAgICAgICAgICAgIHJvdGF0ZUVsZW1lbnRzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVuZGxlc3M6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsID0gY2Fyb3VzZWw7XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldENvbnRhaW5lclNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbC5fZ2V0Q29udGFpbmVyU2l6ZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc0VuZGxlc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5lbmRsZXNzO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5taW5WYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXhWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yb290VmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgKyBkaXN0YW5jZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgLSBkaXN0YW5jZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UG9pbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gdGhpcy5nZXRQb2ludEludGVybmFsKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXMueCA9IHJlcy54ICsgdGhpcy5zZXR0aW5ncy5zaGlmdFg7XHJcbiAgICAgICAgICAgICAgICByZXMueSA9IHJlcy55ICsgdGhpcy5zZXR0aW5ncy5zaGlmdFk7XHJcbiAgICAgICAgICAgICAgICByZXMueiA9IHJlcy56ICsgdGhpcy5zZXR0aW5ncy5zaGlmdFo7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBhaXIgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhaXIgPSB0aGlzLnJvdGF0ZSh7IGE6IHJlcy54LCBiOiByZXMueSB9LCB7IGE6IDAsIGI6IDAgfSwgdGhpcy5zZXR0aW5ncy5yb3RhdGlvbkFuZ2xlWFkpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnggPSBwYWlyLmE7XHJcbiAgICAgICAgICAgICAgICByZXMueSA9IHBhaXIuYjtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWlyID0gdGhpcy5yb3RhdGUoeyBhOiByZXMueiwgYjogcmVzLnkgfSwgeyBhOiAwLCBiOiAwIH0sIHRoaXMuc2V0dGluZ3Mucm90YXRpb25BbmdsZVpZKTtcclxuICAgICAgICAgICAgICAgIHJlcy56ID0gcGFpci5hO1xyXG4gICAgICAgICAgICAgICAgcmVzLnkgPSBwYWlyLmI7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFpciA9IHRoaXMucm90YXRlKHsgYTogcmVzLnosIGI6IHJlcy54IH0sIHsgYTogMCwgYjogMCB9LCB0aGlzLnNldHRpbmdzLnJvdGF0aW9uQW5nbGVaWCk7XHJcbiAgICAgICAgICAgICAgICByZXMueiA9IHBhaXIuYTtcclxuICAgICAgICAgICAgICAgIHJlcy54ID0gcGFpci5iO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZSA9IGZ1bmN0aW9uIChwYWlyVG9Sb3RhdGUsIHBhaXJDZW50ZXIsIGFuZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5nbGUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFpclRvUm90YXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhbmdsZUluUmFkaWFucyA9IGFuZ2xlICogKE1hdGguUEkgLyAxODApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhID0gKGNvc1RoZXRhICogKHBhaXJUb1JvdGF0ZS5hIC0gcGFpckNlbnRlci5hKSAtIHNpblRoZXRhICogKHBhaXJUb1JvdGF0ZS5iIC0gcGFpckNlbnRlci5iKSArIHBhaXJDZW50ZXIuYSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYiA9IChzaW5UaGV0YSAqIChwYWlyVG9Sb3RhdGUuYSAtIHBhaXJDZW50ZXIuYSkgKyBjb3NUaGV0YSAqIChwYWlyVG9Sb3RhdGUuYiAtIHBhaXJDZW50ZXIuYikgKyBwYWlyQ2VudGVyLmIpO1xyXG4gICAgICAgICAgICAgICAgcGFpclRvUm90YXRlLmEgPSBhO1xyXG4gICAgICAgICAgICAgICAgcGFpclRvUm90YXRlLmIgPSBiO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwYWlyVG9Sb3RhdGU7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzUm90YXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3Mucm90YXRlRWxlbWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mucm90YXRpb25BbmdsZVpZID09IDAgJiYgdGhpcy5zZXR0aW5ncy5yb3RhdGlvbkFuZ2xlWlggPT0gMCAmJiB0aGlzLnNldHRpbmdzLnJvdGF0aW9uQW5nbGVYWSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIHYgPSBuZXcgdmVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICB2LnggPSB0aGlzLnNldHRpbmdzLnJvdGF0aW9uQW5nbGVaWTtcclxuICAgICAgICAgICAgICAgIHYueSA9IC0xICogdGhpcy5zZXR0aW5ncy5yb3RhdGlvbkFuZ2xlWlg7XHJcbiAgICAgICAgICAgICAgICB2LnogPSAtMSAqIHRoaXMuc2V0dGluZ3Mucm90YXRpb25BbmdsZVhZO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhbmdsZSA9IC0xICogdi5sZW5ndGgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHJvdGF0aW9uKHYsIGFuZ2xlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KSAoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhcm91c2VsLCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgICB2YXIgcGF0aF9iYXNlID0gcmVxdWlyZSgnLi9wYXRoX2Jhc2UuanMnKTtcclxuICAgICAgICB2YXIgcG9pbnQgPSByZXF1aXJlKCcuLy4uL3BvaW50LmpzJyk7XHJcblxyXG4gICAgICAgIHZhciBiYXNlID0gbmV3IHBhdGhfYmFzZShjYXJvdXNlbCwge1xyXG4gICAgICAgICAgICB3aWRlbmVzczogMjAwLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkLmV4dGVuZCh0aGlzLCBiYXNlKTtcclxuICAgICAgICAkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UG9pbnRJbnRlcm5hbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgeSA9ICh2YWx1ZSAqIHZhbHVlICogdmFsdWUgKyB2YWx1ZSAqIDIwKSAvICgxMDAwICogdGhpcy5zZXR0aW5ncy53aWRlbmVzcyk7XHJcbiAgICAgICAgICAgIHZhciB6ID0gLTIgKiBNYXRoLmFicyh5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcG9pbnQodmFsdWUsIHksIHopO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNhcm91c2VsLCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgICB2YXIgcGF0aF9iYXNlID0gcmVxdWlyZSgnLi9wYXRoX2Jhc2UuanMnKTtcclxuICAgICAgICB2YXIgcG9pbnQgPSByZXF1aXJlKCcuLy4uL3BvaW50LmpzJyk7XHJcbiAgICAgICAgdmFyIGdldEJlemllckJveCA9IHJlcXVpcmUoJy4vLi4vYmV6aWVyX2JveC5qcycpO1xyXG4gICAgICAgIHZhciBnZXRCZXppZXIgPSByZXF1aXJlKCcuLy4uL2Jlemllci5qcycpO1xyXG5cclxuICAgICAgICB2YXIgYmFzZSA9IG5ldyBwYXRoX2Jhc2UoY2Fyb3VzZWwsIHtcclxuICAgICAgICAgICAgeHlQYXRoQmV6aWVyUG9pbnRzOiB7IHAxOiB7IHg6IC0xMDAsIHk6IDAgfSwgcDI6IHsgeDogMCwgeTogMCB9LCBwMzogeyB4OiAwLCB5OiAwIH0sIHA0OiB7IHg6IDEwMCwgeTogMCB9IH0sXHJcbiAgICAgICAgICAgIHh6UGF0aEJlemllclBvaW50czogeyBwMTogeyB4OiAtMTAwLCB5OiAwIH0sIHAyOiB7IHg6IDAsIHk6IDAgfSwgcDM6IHsgeDogMCwgeTogMCB9LCBwNDogeyB4OiAxMDAsIHk6IDAgfSB9LFxyXG4gICAgICAgICAgICB4eUFyY0xlbmd0aEJlemllclBvaW50czogeyBwMTogeyB4OiAwLCB5OiAwIH0sIHAyOiB7IHg6IDUwLCB5OiA1MCB9LCBwMzogeyB4OiA1MCwgeTogNTAgfSwgcDQ6IHsgeDogMTAwLCB5OiAxMDAgfSB9LFxyXG4gICAgICAgICAgICBwYXRoTGVuZ3RoOiAxMDAwLFxyXG4gICAgICAgICAgICB6ZXJvUG9zaXRpb246IDAuNSxcclxuICAgICAgICAgICAgd2lkdGg6IDEwMDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwMCxcclxuICAgICAgICAgICAgZGVwdGg6IDEwMDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJC5leHRlbmQodGhpcywgYmFzZSk7XHJcbiAgICAgICAgJC5leHRlbmQodGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLmdldFBvaW50SW50ZXJuYWwgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnModmFsdWUgLSB0aGlzLm1pblZhbHVlKCkpO1xyXG4gICAgICAgICAgICB2YXIgYWJzRGlzdCA9IE1hdGguYWJzKHRoaXMubWF4VmFsdWUoKSAtIHRoaXMubWluVmFsdWUoKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmV6aWVyVCA9IE1hdGgubWluKGRpc3RhbmNlIC8gYWJzRGlzdCwgMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgeHlQb2ludHMgPSB0aGlzLnNldHRpbmdzLnh5UGF0aEJlemllclBvaW50cztcclxuICAgICAgICAgICAgdmFyIHh5QXJjTGVuZ3RoUG9pbnRzID0gdGhpcy5zZXR0aW5ncy54eUFyY0xlbmd0aEJlemllclBvaW50cztcclxuICAgICAgICAgICAgdmFyIHh6UG9pbnRzID0gdGhpcy5zZXR0aW5ncy54elBhdGhCZXppZXJQb2ludHM7XHJcblxyXG4gICAgICAgICAgICB2YXIgYm94WFkgPSBnZXRCZXppZXJCb3goeHlQb2ludHMucDEsIHh5UG9pbnRzLnAyLCB4eVBvaW50cy5wMywgeHlQb2ludHMucDQpO1xyXG4gICAgICAgICAgICB2YXIgYm94WFogPSBnZXRCZXppZXJCb3goeHpQb2ludHMucDEsIHh6UG9pbnRzLnAyLCB4elBvaW50cy5wMywgeHpQb2ludHMucDQpO1xyXG5cclxuICAgICAgICAgICAgYmV6aWVyVCA9IGdldEJlemllcihiZXppZXJULCB4eUFyY0xlbmd0aFBvaW50cy5wMSwgeHlBcmNMZW5ndGhQb2ludHMucDIsIHh5QXJjTGVuZ3RoUG9pbnRzLnAzLCB4eUFyY0xlbmd0aFBvaW50cy5wNCkueSAvIDEwMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBwb2ludFhZID0gZ2V0QmV6aWVyKGJlemllclQsIHh5UG9pbnRzLnAxLCB4eVBvaW50cy5wMiwgeHlQb2ludHMucDMsIHh5UG9pbnRzLnA0KTtcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLm5vcm1hbGl6ZVZhbChwb2ludFhZLngsIGJveFhZLm1pblgsIGJveFhZLm1heFgpO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMubm9ybWFsaXplVmFsKHBvaW50WFkueSwgYm94WFkubWluWSwgYm94WFkubWF4WSk7XHJcbiAgICAgICAgICAgIHZhciB6ID0gZ2V0QmV6aWVyKGJlemllclQsIHh6UG9pbnRzLnAxLCB4elBvaW50cy5wMiwgeHpQb2ludHMucDMsIHh6UG9pbnRzLnA0KS55O1xyXG4gICAgICAgICAgICB6ID0gdGhpcy5ub3JtYWxpemVWYWwoeiwgYm94WFoubWluWSwgYm94WFoubWF4WSk7XHJcblxyXG4gICAgICAgICAgICB4ID0gdGhpcy5zZXR0aW5ncy53aWR0aCAqIHggLSB0aGlzLnNldHRpbmdzLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgeSA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0ICogeSAqIC0xO1xyXG4gICAgICAgICAgICB6ID0gdGhpcy5zZXR0aW5ncy5kZXB0aCAqIHogKiAtMTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcG9pbnQoeCwgeSwgeik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5ub3JtYWxpemVWYWwgPSBmdW5jdGlvbiAodmFsLCBhLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXN0ID0gTWF0aC5hYnMoYiAtIGEpO1xyXG4gICAgICAgICAgICB2YXIgbWluID0gTWF0aC5taW4oYSwgYik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlzdCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWwgLSBtaW4pIC8gZGlzdDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbCAtIG1pbjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm1pblZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm1heFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5wYXRoTGVuZ3RoO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5wYXRoTGVuZ3RoICogdGhpcy5zZXR0aW5ncy56ZXJvUG9zaXRpb247XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAgIHZhciBwYXRoX2Jhc2UgPSByZXF1aXJlKCcuL3BhdGhfYmFzZS5qcycpO1xyXG4gICAgICAgIHZhciBwb2ludCA9IHJlcXVpcmUoJy4vLi4vcG9pbnQuanMnKTtcclxuXHJcbiAgICAgICAgdmFyIGJhc2UgPSBuZXcgcGF0aF9iYXNlKGNhcm91c2VsLCB7XHJcbiAgICAgICAgICAgIGE6IDIwMCxcclxuICAgICAgICAgICAgYjogMjAwLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkLmV4dGVuZCh0aGlzLCBiYXNlKTtcclxuICAgICAgICAkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UG9pbnRJbnRlcm5hbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZSAqPSAtMTtcclxuICAgICAgICAgICAgdmFsdWUgLT0gMTgwO1xyXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSB2YWx1ZSAqIE1hdGguUEkgKiAyIC8gMzYwO1xyXG4gICAgICAgICAgICB2YXIgeiA9IHRoaXMuc2V0dGluZ3MuYiAqIE1hdGguc2luKGFuZ2xlKTtcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLnNldHRpbmdzLmEgKiBNYXRoLmNvcyhhbmdsZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHBvaW50KHgsIDAsIHopO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gOTA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5taW5WYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZW5kbGVzcyA/IC05MCA6IDA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXhWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZW5kbGVzcyA/IDI3MCA6IDE4MDtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhcm91c2VsLCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgICB2YXIgcGF0aF9iYXNlID0gcmVxdWlyZSgnLi9wYXRoX2Jhc2UuanMnKTtcclxuICAgICAgICB2YXIgcG9pbnQgPSByZXF1aXJlKCcuLy4uL3BvaW50LmpzJyk7XHJcblxyXG4gICAgICAgIHZhciBiYXNlID0gbmV3IHBhdGhfYmFzZShjYXJvdXNlbCwge1xyXG4gICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkLmV4dGVuZCh0aGlzLCBiYXNlKTtcclxuICAgICAgICAkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UG9pbnRJbnRlcm5hbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgeiA9IC0xICogdmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcG9pbnQoMCwgMCwgeik7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2Fyb3VzZWwsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAgIHZhciBwYXRoX2Jhc2UgPSByZXF1aXJlKCcuL3BhdGhfYmFzZS5qcycpO1xyXG4gICAgICAgIHZhciBwb2ludCA9IHJlcXVpcmUoJy4vLi4vcG9pbnQuanMnKTtcclxuXHJcbiAgICAgICAgdmFyIGJhc2UgPSBuZXcgcGF0aF9iYXNlKGNhcm91c2VsLCB7XHJcbiAgICAgICAgICAgIHdpZGVuZXNzOiAyMDAsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMsIGJhc2UpO1xyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRQb2ludEludGVybmFsID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciB6ID0gLTEgKiB2YWx1ZSAqIHZhbHVlICogKDEgLyB0aGlzLnNldHRpbmdzLndpZGVuZXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwb2ludCh2YWx1ZSwgMCwgeik7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoeCwgeSwgeikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLnogPSB6O1xyXG4gICAgfTtcclxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZlY3RvciwgYW5nbGUpIHtcclxuICAgICAgICB0aGlzLnZlY3RvciA9IHZlY3RvcjtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0U3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzRkYoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZTNkKCcgKyB0aGlzLnZlY3Rvci54ICsgJywgJyArIHRoaXMudmVjdG9yLnkgKyAnLCAnICsgdGhpcy52ZWN0b3IueiArICcsICcgKyB0aGlzLmFuZ2xlICsgJ2RlZyknO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxufSkoalF1ZXJ5KTsiLCJ2YXIgdHJhbnNmb3JtID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0uanMnKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhcm91c2VsKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbDtcclxuICAgICAgICBleHRlbmQodGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmopIHtcclxuXHJcbiAgICAgICAgb2JqLmlzRmFsbGJhY2tNb2RlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH07XHJcblxyXG4gICAgICAgIG9iai5nZXRBY3R1YWxEaXN0YW5jZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbC5vcHRpb25zLmRpc3RhbmNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5nZXRSb290VmFsdWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWwucGF0aC5yb290VmFsdWUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouaW5jcmVtZW50VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGluY3JlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbC5wYXRoLmluY3JlbWVudFZhbHVlKHZhbHVlLCBpbmNyZW1lbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5kZWNyZW1lbnRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgZGVjcmVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcm91c2VsLnBhdGguZGVjcmVtZW50VmFsdWUodmFsdWUsIGRlY3JlbWVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1pblZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbC5wYXRoLm1pblZhbHVlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1heFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbC5wYXRoLm1heFZhbHVlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1vdmVUbyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJvdXNlbC5tb3Rpb25Db250cm9sbGVyLm1vdGlvbkluUHJvZ3Jlc3MoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuYW5pbWF0aW9uLmNsZWFyUXVldWUoKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5hbmltYXRpb24uY29tcGxldGVDdXJyZW50SW1tZWRpYXRlbHkoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4ICsgMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5tb3ZlRm9yd2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubW92ZUJhY2soKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kZXggPSBNYXRoLm1heCgwLCBpbmRleCk7XHJcbiAgICAgICAgICAgIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoIC0gMSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vdmVUb0ludGVybmFsKGluZGV4KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoubW92ZVRvSW50ZXJuYWwgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gdGhpcy5nZXRBY3R1YWxEaXN0YW5jZSgpICogKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4IC0gaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLmlucHV0Q29udHJvbGxlci5ub25JbnRlcnJ1cHRpYmxlTW9kZSh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5fcmFpc2VNb3Rpb25TdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLmFuaW1hdGlvbi5hbmltYXRlKDAsIGRpc3RhbmNlLCBpbmRleCwgXCJsaW5lYXJcIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm1vdmVCYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcGVuZGluZ1RhcmdldCA9IHRoaXMuY2Fyb3VzZWwuYW5pbWF0aW9uLmlzSW5Qcm9ncmVzcyA/IHRoaXMuY2Fyb3VzZWwuYW5pbWF0aW9uLmdldFRhcmdldFZhbHVlKCkgOiB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nVGFyZ2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZ1RhcmdldC0tO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuaW5wdXRDb250cm9sbGVyLm5vbkludGVycnVwdGlibGVNb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5fcmFpc2VNb3Rpb25TdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5hbmltYXRpb24uYW5pbWF0ZSgwLCB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCksIHBlbmRpbmdUYXJnZXQsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5tb3ZlRm9yd2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHBlbmRpbmdUYXJnZXQgPSB0aGlzLmNhcm91c2VsLmFuaW1hdGlvbi5pc0luUHJvZ3Jlc3MgPyB0aGlzLmNhcm91c2VsLmFuaW1hdGlvbi5nZXRUYXJnZXRWYWx1ZSgpIDogdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICBpZiAocGVuZGluZ1RhcmdldCA8IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZ1RhcmdldCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuaW5wdXRDb250cm9sbGVyLm5vbkludGVycnVwdGlibGVNb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5fcmFpc2VNb3Rpb25TdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5hbmltYXRpb24uYW5pbWF0ZSgwLCAtMSAqIHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKSwgcGVuZGluZ1RhcmdldCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmNvbnN1bWVNb3Rpb24gPSBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgdmFyIGhpZ2hGcmljdGlvblJhbmdlID0gdGhpcy5jYXJvdXNlbC5fYWxpZ25FbGVtZW50cyhkaXN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3B0RGlzdGFuY2UgPSB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsZWRFbGVtZW50cyA9IHBhcnNlSW50KGRpc3RhbmNlIC8gb3B0RGlzdGFuY2UsIDEwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggLT0gc2Nyb2xsZWRFbGVtZW50cztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCA9IE1hdGgubWluKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4LCB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByZXZJbmRleCAhPSB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleClcclxuICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuX3JhaXNlQ2hhbmdlRXZlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7IGRpc3RhbmNlOiAocHJldkluZGV4IC0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXgpICogb3B0RGlzdGFuY2UsIGhpZ2hGcmljdGlvblJhbmdlOiBoaWdoRnJpY3Rpb25SYW5nZSB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5oYW5kbGVNb3Rpb25FbmQgPSBmdW5jdGlvbiAocmVtYWluaW5nRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0Rpc3RhbmNlID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0SW5kZXggPSB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhyZW1haW5pbmdEaXN0YW5jZSkgPiB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCkgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nRGlzdGFuY2UgPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXgtLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSBNYXRoLm1heCgwLCB0YXJnZXRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IE1hdGgubWluKHRhcmdldEluZGV4LCB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0RGlzdGFuY2UgPSAodGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggLSB0YXJnZXRJbmRleCkgKiB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBNYXRoLmFicyh0aGlzLmNhcm91c2VsLm9wdGlvbnMucm90YXRpb25BbmltYXRpb25EdXJhdGlvbiAqIChyZW1haW5pbmdEaXN0YW5jZSAvIHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKSkpO1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IE1hdGgubWluKGR1cmF0aW9uLCB0aGlzLmNhcm91c2VsLm9wdGlvbnMucm90YXRpb25BbmltYXRpb25EdXJhdGlvbiAvIDIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5hbmltYXRpb24uYW5pbWF0ZShyZW1haW5pbmdEaXN0YW5jZSwgdGFyZ2V0RGlzdGFuY2UsIHRhcmdldEluZGV4LCBudWxsLCBkdXJhdGlvbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmFsaWduRWxlbWVudHMgPSBmdW5jdGlvbiAoYW5pbWF0aW9uU2hpZnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoID09IDAgfHwgdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggPCAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5jb250YWluZXJTaXplID0gdGhpcy5jYXJvdXNlbC5fZ2V0Q29udGFpbmVyU2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNoaWZ0ID0gMDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoYW5pbWF0aW9uU2hpZnQpICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICBzaGlmdCA9IGFuaW1hdGlvblNoaWZ0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGhpZ2hGcmljdGlvblJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHNsb3cgZG93biBhdCB0aGUgZW5kc1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAodGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggPT0gMCAmJiBzaGlmdCA+IDApIHx8XHJcbiAgICAgICAgICAgICAgICAodGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggPT0gdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGggLSAxICYmIHNoaWZ0IDwgMClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzaGlmdCA9IE1hdGgucG93KE1hdGguYWJzKHNoaWZ0KSwgMC43KSAqIChzaGlmdCAvIE1hdGguYWJzKHNoaWZ0KSk7XHJcbiAgICAgICAgICAgICAgICBoaWdoRnJpY3Rpb25SYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0Um9vdFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHZhciByYW5nZVNoaWZ0ID0gMDtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2VsZWN0ZWRJbmRleCA9PSAwICYmIHNoaWZ0ID4gMCkgfHwgKHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5zZWxlY3RlZEluZGV4ID09IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHMubGVuZ3RoIC0gMSAmJiBzaGlmdCA8IDApKVxyXG4gICAgICAgICAgICAgICAgcmFuZ2VTaGlmdCA9IHNoaWZ0O1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2VzID0gdGhpcy5nZXRGYWRlUmFuZ2VzKGxvY2F0aW9uICsgcmFuZ2VTaGlmdCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXg7IGkgPCB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVsZW1lbnRQb3NpdGlvbih0aGlzLmNhcm91c2VsLmVsZW1lbnRzW2ldLCBsb2NhdGlvbiArIHNoaWZ0LCByYW5nZXMpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmluY3JlbWVudFZhbHVlKGxvY2F0aW9uLCB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsb2NhdGlvbiA9IHRoaXMuZ2V0Um9vdFZhbHVlKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNlbGVjdGVkSW5kZXggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmRlY3JlbWVudFZhbHVlKGxvY2F0aW9uLCB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50UG9zaXRpb24odGhpcy5jYXJvdXNlbC5lbGVtZW50c1tpXSwgbG9jYXRpb24gKyBzaGlmdCwgcmFuZ2VzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRaSW5kZXhlcygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGhpZ2hGcmljdGlvblJhbmdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5zZXRFbGVtZW50UG9zaXRpb24gPSBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWUsIHJhbmdlcykge1xyXG4gICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGlzIHBlcmZvcm1hbmNlIGNyaXRpY2FsIHNvIHdlIHRyeWluZyB0byBhdm9pZCBqUXVlcnkgdXNhZ2VcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldEVsZW1lbnRWaXNpYmlsaXR5KHJhbmdlcywgZWxlbWVudCwgdmFsdWUpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5jYXJvdXNlbC5wYXRoLmdldFBvaW50KHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFRyYW5zZm9ybSA9IG5ldyB0cmFuc2Zvcm0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50VHJhbnNmb3JtLnRyYW5zbGF0ZVogPSBwb2ludC56ICogdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNjYWxlWjtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRUcmFuc2Zvcm0udHJhbnNsYXRlWCA9IHBvaW50LnggKiB0aGlzLmNhcm91c2VsLm9wdGlvbnMuc2NhbGVYICsgdGhpcy5jYXJvdXNlbC5jb250YWluZXJTaXplLndpZHRoIC8gMiAtIGVsZW1lbnQuc2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50VHJhbnNmb3JtLnRyYW5zbGF0ZVkgPSBwb2ludC55ICogdGhpcy5jYXJvdXNlbC5vcHRpb25zLnNjYWxlWSArIHRoaXMuY2Fyb3VzZWwuY29udGFpbmVyU2l6ZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5zaXplLmhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGhSb3RhdGlvbiA9IHRoaXMuY2Fyb3VzZWwucGF0aC5lbGVtZW50c1JvdGF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aFJvdGF0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUcmFuc2Zvcm0ucm90YXRpb25zLnB1c2gocGF0aFJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJvdXNlbC5vcHRpb25zLm1vZGUzRCA9PSAnc2NhbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFRyYW5zZm9ybS5zY2FsZSA9IHRoaXMuY2Fyb3VzZWwub3B0aW9ucy5wZXJzcGVjdGl2ZSAvICh0aGlzLmNhcm91c2VsLm9wdGlvbnMucGVyc3BlY3RpdmUgLSBlbGVtZW50VHJhbnNmb3JtLnRyYW5zbGF0ZVopO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUcmFuc2Zvcm0udHJhbnNsYXRlWiA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNhcm91c2VsLmVmZmVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJvdXNlbC5lZmZlY3RzW2ldLmFwcGx5UGhhc2UgPT09ICdwb3NpdGlvbmluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuZWZmZWN0c1tpXS5hcHBseShlbGVtZW50VHJhbnNmb3JtLCBlbGVtZW50LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFRyYW5zZm9ybS5hcHBseShlbGVtZW50LCB0aGlzLmNhcm91c2VsLm9wdGlvbnMucGVyc3BlY3RpdmUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5jb250YWluZXJTaXplLndpZHRoLCB0aGlzLmNhcm91c2VsLmNvbnRhaW5lclNpemUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQubG9jYXRpb24gPSBwb2ludDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouc2V0WkluZGV4ZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG1wRWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNhcm91c2VsLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMuY2Fyb3VzZWwuZWxlbWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5sb2NhdGlvbikgLy8gZWxlbWVudCBoYXMgYmVlbiBwb3NpdGlvbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wRWxlbWVudHMucHVzaChlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdG1wRWxlbWVudHMuc29ydChmdW5jdGlvbiAoZTEsIGUyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZTEubG9jYXRpb24ueiAtIGUyLmxvY2F0aW9uLno7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRtcEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXBFbGVtZW50c1tpXS4kZWxlbWVudC5nZXQoMCkuc3R5bGUuekluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5nZXRGYWRlUmFuZ2VzID0gZnVuY3Rpb24gKHJvb3QpIHtcclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gcm9vdDtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm9wdGlvbnMubnVtYmVyT2ZFbGVtZW50c1RvRGlzcGxheUxlZnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHRoaXMuZGVjcmVtZW50VmFsdWUobG9jYXRpb24sIHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKSAqICh0aGlzLmNhcm91c2VsLm9wdGlvbnMubnVtYmVyT2ZFbGVtZW50c1RvRGlzcGxheUxlZnQgKyAxKSksXHJcbiAgICAgICAgICAgICAgICAgICAgdG86IHRoaXMuZGVjcmVtZW50VmFsdWUobG9jYXRpb24sIHRoaXMuZ2V0QWN0dWFsRGlzdGFuY2UoKSAqICh0aGlzLmNhcm91c2VsLm9wdGlvbnMubnVtYmVyT2ZFbGVtZW50c1RvRGlzcGxheUxlZnQpKSxcclxuICAgICAgICAgICAgICAgICAgICBoaWRlOiAnYmVmb3JlJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcm91c2VsLm9wdGlvbnMubnVtYmVyT2ZFbGVtZW50c1RvRGlzcGxheVJpZ2h0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLmluY3JlbWVudFZhbHVlKGxvY2F0aW9uLCB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCkgKiAodGhpcy5jYXJvdXNlbC5vcHRpb25zLm51bWJlck9mRWxlbWVudHNUb0Rpc3BsYXlSaWdodCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0aGlzLmluY3JlbWVudFZhbHVlKGxvY2F0aW9uLCB0aGlzLmdldEFjdHVhbERpc3RhbmNlKCkgKiAodGhpcy5jYXJvdXNlbC5vcHRpb25zLm51bWJlck9mRWxlbWVudHNUb0Rpc3BsYXlSaWdodCArIDEpKSxcclxuICAgICAgICAgICAgICAgICAgICBoaWRlOiAnYWZ0ZXInXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouc2V0RWxlbWVudFZpc2liaWxpdHkgPSBmdW5jdGlvbiAoZmFkZVJhbmdlcywgZWxlbWVudCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gZWxlbWVudC4kZWxlbWVudDtcclxuICAgICAgICAgICAgdmFyIGhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLm1pblZhbHVlKCkgIT0gbnVsbCAmJiB2YWx1ZSA8IHRoaXMubWluVmFsdWUoKSlcclxuICAgICAgICAgICAgICAgIHx8ICh0aGlzLm1heFZhbHVlKCkgIT0gbnVsbCAmJiB2YWx1ZSA+IHRoaXMubWF4VmFsdWUoKSkpXHJcbiAgICAgICAgICAgICAgICBoaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZmFkZVJhbmdlcy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3MoeyBvcGFjaXR5OiAxIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmFkZVJhbmdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IGZhZGVSYW5nZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocmFuZ2UuaGlkZSA9PSAnYmVmb3JlJyAmJiB2YWx1ZSA8PSByYW5nZS5mcm9tKSB8fCAocmFuZ2UuaGlkZSA9PSAnYWZ0ZXInICYmIHZhbHVlID49IHJhbmdlLnRvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IHJhbmdlLmZyb20gJiYgdmFsdWUgPCByYW5nZS50bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSByYW5nZS50byAtIHJhbmdlLmZyb207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXNzZWQgPSBNYXRoLmFicyh2YWx1ZSAtIChyYW5nZS5oaWRlID09ICdhZnRlcicgPyByYW5nZS5mcm9tIDogcmFuZ2UudG8pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSAoZGlzdGFuY2UgLSBwYXNzZWQpIC8gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmNzcyh7IG9wYWNpdHk6IG9wYWNpdHkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmNzcyh7IG9wYWNpdHk6IDEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEVsZW1lbnRWaXNpYmlsaXR5SW50ZXJuYWwoaGlkZGVuLCBlbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuICFoaWRkZW47XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXJvdXNlbC5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5lbGVtZW50c1tpXS4kZWxlbWVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcxJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcm91c2VsLmVsZW1lbnRzW2ldLiRlbGVtZW50LnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5zZXRFbGVtZW50VmlzaWJpbGl0eUludGVybmFsID0gZnVuY3Rpb24gKGhpZGUsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGhpZGUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuJGVsZW1lbnQuaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC4kZWxlbWVudC5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxufSkoalF1ZXJ5KTsiLCIvLyB3ZSBuZWVkIHRvIGNhbGN1bGF0ZSBcclxudmFyIGNvZWZDYWNoZSA9IFtdO1xyXG5jb2VmQ2FjaGVbJ1gnXSA9IHsgcGVyc3A6IDAsIHdpZHRoOiAwLCB2YWw6IDAgfTtcclxuY29lZkNhY2hlWydZJ10gPSB7IHBlcnNwOiAwLCB3aWR0aDogMCwgdmFsOiAwIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9XHJcbihmdW5jdGlvbiAoJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gMDtcclxuICAgICAgICB0aGlzLnRyYW5zbGF0ZVkgPSAwO1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlWiA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMuc2NhbGVYID0gMTtcclxuICAgICAgICB0aGlzLnNjYWxlWSA9IDE7XHJcbiAgICAgICAgdGhpcy5zY2FsZVogPSAxO1xyXG5cclxuICAgICAgICB0aGlzLnJvdGF0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVNoaWZ0Q29lZmljaWVudCA9IGZ1bmN0aW9uIChwZXJzcGVjdGl2ZSwgd2lkdGgsIHosIGNvZWZEaW1lbnNpb24pIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYWNoZSA9IGNvZWZDYWNoZVtjb2VmRGltZW5zaW9uXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwZXJzcGVjdGl2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRhbiA9IDA7XHJcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IDBcclxuICAgICAgICAgICAgd2lkdGggPSB3aWR0aCAvIDI7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FjaGUucGVyc3AgPT0gcGVyc3BlY3RpdmUgJiYgY2FjaGUud2lkdGggPT0gd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHRhbiA9IGNhY2hlLnZhbDsgLy8gb3B0aW1pc2F0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IE1hdGguc3FydChwZXJzcGVjdGl2ZSAqIHBlcnNwZWN0aXZlICsgd2lkdGggKiB3aWR0aCk7XHJcbiAgICAgICAgICAgICAgICBhbHBoYSA9IE1hdGguYXNpbih3aWR0aCAvIGMpO1xyXG4gICAgICAgICAgICAgICAgdGFuID0gKE1hdGgudGFuKDEuNTcwOCAtIGFscGhhKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FjaGUucGVyc3AgPSBwZXJzcGVjdGl2ZTtcclxuICAgICAgICAgICAgICAgIGNhY2hlLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjYWNoZS52YWwgPSB0YW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBiID0gLTEgKiAoMSAvIHRhbiAqIHopO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0aW5nV2lkdGggPSB3aWR0aCArIGI7XHJcbiAgICAgICAgICAgIHJldHVybiB3aWR0aCAvIHJlc3VsdGluZ1dpZHRoO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXBwbHkgPSBmdW5jdGlvbiAoZSwgcGVyc3BlY3RpdmUsIHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBwc2V1ZG8zZFNjYWxlID0gKHBlcnNwZWN0aXZlIC8gKHBlcnNwZWN0aXZlIC0gdGhpcy50cmFuc2xhdGVaKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbVdpZHRoID0gZS5zaXplLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUhlaWdodCA9IGUuc2l6ZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29lZlggPSB0aGlzLmNhbGN1bGF0ZVNoaWZ0Q29lZmljaWVudChwZXJzcGVjdGl2ZSwgd2lkdGgsIHRoaXMudHJhbnNsYXRlWiwgJ1gnKTtcclxuICAgICAgICAgICAgdmFyIGNvZWZZID0gdGhpcy5jYWxjdWxhdGVTaGlmdENvZWZpY2llbnQocGVyc3BlY3RpdmUsIGhlaWdodCwgdGhpcy50cmFuc2xhdGVaLCAnWScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLnRyYW5zbGF0ZVggKyBpdGVtV2lkdGggLyAyO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMudHJhbnNsYXRlWSArIGl0ZW1IZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICB4ID0geCAtIHdpZHRoIC8gMjtcclxuICAgICAgICAgICAgeSA9IHkgLSBoZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICAgICAgeCA9IHggKiBjb2VmWDtcclxuICAgICAgICAgICAgeSA9IHkgKiBjb2VmWTtcclxuXHJcbiAgICAgICAgICAgIHggPSB4ICsgKHdpZHRoIC8gMikgLSAoaXRlbVdpZHRoIC8gMik7XHJcbiAgICAgICAgICAgIHkgPSB5ICsgKGhlaWdodCAvIDIpIC0gKGl0ZW1IZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHIgPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgIT0gMSlcclxuICAgICAgICAgICAgICAgIHN0ciArPSAnIHNjYWxlKCcgKyB0aGlzLnNjYWxlICsgJywnICsgdGhpcy5zY2FsZSArICcpJztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3RhdGlvbnMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyAnICsgdGhpcy5yb3RhdGlvbnNbaV0uZ2V0U3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBzdHIgKz0gJyBzY2FsZSgnICsgcHNldWRvM2RTY2FsZSArICcsICcgKyBwc2V1ZG8zZFNjYWxlICsgJyknO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGVYICE9IDEpXHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyBzY2FsZVgoJyArIHRoaXMuc2NhbGVYICsgJyknO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY2FsZVkgIT0gMSlcclxuICAgICAgICAgICAgICAgIHN0ciArPSAnIHNjYWxlWSgnICsgdGhpcy5zY2FsZVkgKyAnKSc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYWxlWiAhPSAxKVxyXG4gICAgICAgICAgICAgICAgc3RyICs9ICcgc2NhbGVaKCcgKyB0aGlzLnNjYWxlWiArICcpJztcclxuXHJcbiAgICAgICAgICAgIGUuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHI7XHJcbiAgICAgICAgICAgIGUuZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBzdHI7XHJcbiAgICAgICAgICAgIGUuZWxlbWVudC5zdHlsZS5tc1RyYW5zZm9ybSA9IHN0cjtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciB1dGlscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdldE9iamVjdFByb3BlcnR5VmFsdWUgPSBmdW5jdGlvbiAob2JqLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBwcm9wZXJ0eS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gb2JqO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXMgPSByZXNbcGFydHNbaV1dO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0T2JqZWN0UHJvcGVydHlWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBwcm9wZXJ0eS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gb2JqO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W3BhcnRzW2ldXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGFyZ2V0W3BhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaXNGRiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgdXRpbHMoKTtcclxuXHJcblxyXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID1cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICB0aGlzLnogPSAwO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRGcm9tUG9pbnRzID0gZnVuY3Rpb24gKHAxLCBwMikge1xyXG4gICAgICAgICAgICB0aGlzLnggPSBwMi54IC0gcDEueDtcclxuICAgICAgICAgICAgdGhpcy55ID0gcDIueSAtIHAxLnk7XHJcbiAgICAgICAgICAgIHRoaXMueiA9IHAyLnogLSBwMS56O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubm9ybWFsaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcclxuICAgICAgICAgICAgdGhpcy54IC89IGxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy55IC89IGxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy56IC89IGxlbmd0aDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgodGhpcy54ICogdGhpcy54KSArICh0aGlzLnkgKiB0aGlzLnkpICsgKHRoaXMueiAqIHRoaXMueikpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBmdW5jdGlvbiAodikge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjYWxhck11bHRpcGxpY2F0aW9uID0gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55ICsgdGhpcy56ICogdi56O1xyXG4gICAgICAgICAgICB2YXIgYWJzVGhpcyA9IHRoaXMubGVuZ3RoKCk7XHJcbiAgICAgICAgICAgIHZhciBhYnNWID0gTWF0aC5zcXJ0KHYueCAqIHYueCArIHYueSAqIHYueSArIHYueiAqIHYueik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29zQSA9IHNjYWxhck11bHRpcGxpY2F0aW9uIC8gKGFic1RoaXMgKiBhYnNWKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhID0gTWF0aC5hY29zKGNvc0EpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMueiA+IHYueilcclxuICAgICAgICAgICAgICAgIGEgKj0gLTE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYSAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5wZXJwZW5kaWN1bGFyWCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJlcyA9IG5ldyB2ZWN0b3IoKTtcclxuICAgICAgICAgICAgcmVzLnkgPSB0aGlzLnk7XHJcbiAgICAgICAgICAgIHJlcy56ID0gdGhpcy56O1xyXG4gICAgICAgICAgICByZXMueCA9IC0xICogKHRoaXMueSAqIHJlcy55ICsgdGhpcy56ICogcmVzLnopIC8gdGhpcy54O1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxufSkoalF1ZXJ5KTsiXX0=
