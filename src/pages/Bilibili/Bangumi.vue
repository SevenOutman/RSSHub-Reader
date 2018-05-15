<template>
  <div class="bilibili-bangumi">
    <div class="container" v-if="result">
      <h2>{{ result.title }}</h2>
      <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      <div class="bangumi-episodes">
        <div class="bangumi-episode" v-for="episode of result.items" :key="episode.guid"
             v-html="episode.content.replace(episode.contentSnippet, '') + episode.title">
        </div>
      </div>
    </div>
    <cell-group title="查询番剧" v-if="!$route.params.seasonid">
      <mt-field label="番剧ID" placeholder="可在番剧主页URL中找到" v-model="seasonid"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS">立即查询</mt-button>
      <mt-button type="primary" size="large">加入收藏</mt-button>
    </button-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Indicator } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import parse from '@/utils/parseRss'

  export default {
    name: 'Bangumi',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        seasonid: this.$route.query.seasonid || '',

        result: null,
        popupVisible: false
      }
    },
    methods: {
      fetchRSS() {
        Indicator.open()
        return axios(`/bilibili/bangumi/${this.seasonid}`)
          .then(async ({ data }) => {
            this.result = await parse(data)
            Indicator.close()
          })
      }
    }
  }
</script>

<style lang="less">
  .bilibili-bangumi {
    .bangumi-episodes {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .bangumi-episode {
        flex-shrink: 0;
        flex-basis: 49%;
        margin-bottom: 15px;
        img {
          display: block;
          width: 100%;
          border-radius: 4px;
        }
      }
    }
  }
</style>
