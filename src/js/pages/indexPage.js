global.$ = import('jquery')
global.jQuery = global.$
import '../lib/theta-carousel'
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'

$(function () {
    let clearNode = document.getElementById('index-slider').cloneNode(true)

    var mq = window.matchMedia('(max-width: 767px)')
    setSlider(mq)
    mq.addListener(setSlider)
    function setSlider(mediaQuery) {
        document.getElementById('index-slider').remove()
        document.getElementById('index-slider-cnt').appendChild(clearNode.cloneNode(true))
        let back = $('#index-slider__back').off('click')
        let fw = $('#index-slider__forward').off('click')
        var container = $('#index-slider')
        if (mediaQuery.matches) {
            container.slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: back,
                nextArrow: fw,
            })
        } else {
            // fade in effect
            container.css({
                opacity: 0,
            })
            container.delay(500).animate(
                {
                    opacity: 1,
                },
                500
            )
            container.theta_carousel({
                selectedIndex: 5,
                distance: 197,
                designedForWidth: 1248,
                designedForHeight: 550,
                distanceInFallbackMode: 240,
                scaleX: 1.34,
                scaleY: 0.11,
                scaleZ: 0.36,
                path: {
                    settings: {
                        shiftY: 130,
                        shiftZ: -305,
                        rotationAngleZY: 2,
                        wideness: 368,
                    },
                },
                fadeAway: true,
                fadeAwayBezierPoints: {
                    p1: {
                        x: 0,
                        y: 100,
                    },
                    p2: {
                        x: 97,
                        y: 97,
                    },
                    p3: {
                        x: 97,
                        y: 98,
                    },
                    p4: {
                        x: 100,
                        y: 0,
                    },
                },
                sizeAdjustment: true,
                sizeAdjustmentNumberOfConfigurableElements: 7,
                sizeAdjustmentBezierPoints: {
                    p1: {
                        x: 0,
                        y: 94,
                    },
                    p2: {
                        x: -2,
                        y: 21,
                    },
                    p3: {
                        x: 96,
                        y: 16,
                    },
                    p4: {
                        x: 100,
                        y: 92,
                    },
                },
                popoutSelected: true,
                popoutSelectedShiftZ: 117,
            })
            back.on('click', function (e) {
                $('#index-slider').theta_carousel('moveBack')
            })
            fw.on('click', function (e) {
                $('#index-slider').theta_carousel('moveForward')
            })
        }
    }
})
