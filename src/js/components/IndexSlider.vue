<template>
    <div class="items-center justify-around md:flex">
        <div class="index-main-slider w-[90vw] max-sm:mx-auto md:h-[53rem] md:w-[39rem]" >
            <agile ref="main" :options="options1" :key="source1.length" :fade="true" :as-nav-for="asNavFor1">
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
                    <div class="big-slide" v-for="(item, key) in source1" :key="key" >
                        <img class="h-full w-full object-contain" :src="item.tv_image" alt="" />
                        <div class="big-slide__text absolute bottom-8 right-0 rounded-xl text-alpen_blue max-sm:text-[.55rem] md:bottom-0">
                            <div class="text-[2.5em] font-semibold">{{ item.pagetitle }}</div>
                            <div class="mb-[.6em] mt-[-.35em] text-[2.18em]">({{ item.tv_dop_title }})</div>
                            <div class="mb-[1.3em] text-[1.25em] leading-[1.1]">
                                <p class="line-clamp-8">{{ item.introtext }}</p>
                            </div>
                            <a class="text-[.9em] text-alpen_blue underline underline-offset-4 hover:no-underline" :href="item.uri">Подробнее</a>
                        </div>
                    </div>
                </template>
            </agile>
        </div>

        <div class="index-preview-slider hidden w-[55rem] md:block">
            <agile ref="thumbnails" :options="options2" :key="source2.length" :as-nav-for="asNavFor2">
                <template slot="default">
                    <div class="big-slide big-slide--min" v-for="(item, key) in source2" :key="key">
                        <img class="h-full w-full object-contain" :src="item.tv_image" alt="" />
                        <div class="big-slide__text absolute bottom-0 right-0 flex flex-col items-center justify-center rounded-xl text-alpen_blue">
                            <div class="text-base font-semibold">{{ item.pagetitle }}</div>
                            <div class="text-xs">({{ item.tv_dop_title }})</div>
                        </div>
                    </div>
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
import ResourcesApi from '../services/ResourcesApi'
export default {
    components: {
        agile: VueAgile,
    },
    data() {
        return {
            asNavFor1: [],
            asNavFor2: [],
            source1: [],
            source2: [],
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
        }
    },
    mounted() {
        ResourcesApi.getSliderData('index').then((response) => {
            this.source1 = response;
			let s1 = this.source1.slice(0);
			s1.unshift(s1.pop());
			s1.unshift(s1.pop());
			this.source2 = s1;
            
			this.$nextTick(() => {
				this.asNavFor1.push(this.$refs.thumbnails);
        		this.asNavFor2.push(this.$refs.main);
			})
        });
    }
}
</script>

<style lang="scss"></style>
