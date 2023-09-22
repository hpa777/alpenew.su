<template>
    <div class="container flex flex-wrap justify-between items-end">

        <div class="index-main-slider">
            <agile ref="main" :options="options1" :fade="true" :as-nav-for="asNavFor1">
                <template slot="prevButton">
                    <svg class="h-11 w-11 rotate-180 hover:opacity-70">
                        <use xlink:href="/images/sprite.svg#ArrowRight"></use>
                    </svg>
                </template>
                <template slot="nextButton">
                    <svg class="h-11 w-11 hover:opacity-70">
                        <use xlink:href="/images/sprite.svg#ArrowRight"></use>
                    </svg>
                </template>
                <template slot="default">
                    <slot name="big-slides"></slot>
                </template>
            </agile>
        </div>

        <div class="index-preview-slider">
            <agile ref="thumbnails" :options="options2" :as-nav-for="asNavFor2">
                <template slot="default">
                    <slot name="small-slides"></slot>
                </template>
                <template slot="prevButton">
                    <svg class="h-11 w-11 rotate-180 hover:opacity-70">
                        <use xlink:href="/images/sprite.svg#ArrowRight"></use>
                    </svg>
                </template>
                <template slot="nextButton">
                    <svg class="h-11 w-11 hover:opacity-70">
                        <use xlink:href="/images/sprite.svg#ArrowRight"></use>
                    </svg>
                </template>
            </agile>
        </div>
        
    </div>
</template>

<script>
import { VueAgile } from 'vue-agile'
export default {
    components: {
        agile: VueAgile,
    },
    props: {
        offset: {
            default: 2,
            type: Number
        },
        lastOffset: {
            default: 1,
            type: Number
        }
    },
    data() {
        return {
            asNavFor1: [],
            asNavFor2: [],
            options1: {
                dots: false,
                fade: true,
                navButtons: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            navButtons: false,
                        },
                    },
                ],
            },
            options2: {
                centerMode: true,
                dots: false,
                navButtons: true,
                slidesToShow: 3,
            },
            lastIdx: 0
        }
    },
    mounted() {
        this.asNavFor1.push(this.$refs.thumbnails);
        this.asNavFor2.push(this.$refs.main);    
        this.$refs.thumbnails.$el.querySelectorAll('.big-slide').forEach((slide) => {
            if (slide.dataset.idx > this.lastIdx) {
                this.lastIdx = slide.dataset.idx;
            }            
            slide.addEventListener("click", (e) => {
                if (e.currentTarget.dataset.idx !== undefined) {
                    if (e.currentTarget.dataset.idx == this.lastIdx) {
                        this.$refs.thumbnails.goTo(0 + this.lastOffset);
                    } else {
                        this.$refs.thumbnails.goTo(parseInt(e.currentTarget.dataset.idx, 10) + this.offset);
                    }
                    
                }
            });
        })
        //debugger;
    },
}
</script>

<style lang="scss"></style>
