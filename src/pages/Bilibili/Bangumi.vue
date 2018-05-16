<template>
  <div class="bilibili-bangumi">
    <div class="container" v-if="result">
      <h2>{{ result.title }}</h2>
      <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      <div class="bangumi-episodes">
        <a :href="episode.link" target="_blank" rel="noopener noreferrer" class="bangumi-episode"
           v-for="episode of result.items" :key="episode.guid"
           v-html="episode.content.replace(episode.contentSnippet, '') + episode.title">
        </a>
      </div>
    </div>
    <cell-group title="查询番剧" v-if="!$route.params.seasonid">
      <mt-field label="番剧ID" placeholder="可在番剧主页URL中找到" v-model="form.seasonid"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS" :disabled="!seasonid">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" :disabled="!seasonid" @click="addToFavorites">加入收藏
      </mt-button>
      <mt-button type="danger" size="large" v-else :disabled="!seasonid" @click="removeFromFavorites">取消收藏</mt-button>
    </button-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Indicator, Toast } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import parse from '@/utils/parseRss'

  export default {
    name: 'Bangumi',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          seasonid: this.$route.query.seasonid || '',
        },

        result: null,
        popupVisible: false,
      }
    },
    computed: {
      seasonid() {
        return this.$route.params.seasonid || this.form.seasonid
      },
      rssPath() {
        return `/bilibili/bangumi/${this.seasonid}`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    methods: {
      async fetchRSS() {
        Indicator.open()
        return axios(this.rssPath)
          .catch(() => Indicator.close())
          .then(async ({ data }) => {
            this.result = await parse(data)
            Indicator.close()
          })
      },
      async addToFavorites() {
        let title
        if (!this.result) {
          await this.fetchRSS()
        }
        title = this.result.title
        this.$store.commit('addFavorite', {
          type: 'bilibili',
          desc: '番剧',
          title,
          path: this.rssPath,
          rss: this.rssPath,
          autoUpdate: true,
        })
        Toast({
          message: '收藏好了~',
          duration: 1500,
        })
      },
      removeFromFavorites() {
        this.$store.commit('removeFavorite', this.rssPath)
        Toast({
          message: '已取消收藏',
          duration: 1500,
        })
      },
    },
    created() {
      if (this.$route.params.seasonid) {
        this.fetchRSS()
      }
    },
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
