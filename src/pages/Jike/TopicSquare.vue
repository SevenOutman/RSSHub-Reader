<template>
  <div>
    <div class="result" v-if="result">
      <div class="result-header">
        <h2>{{ result.title }}
          <small><a :href="result.link" target="_blank" rel="noopener noreferrer">前往主题>></a></small>
        </h2>
      </div>
      <div class="result-items">
        <a :href="activity.link" target="_blank" rel="noopener noreferrer" class="result-item"
           v-for="activity of result.items" :key="activity.guid">
          <div class="result-item-time">{{ activity.isoDate | time }}</div>
          <div class="result-item-content"
               v-html="activity.content"></div>
        </a>
      </div>
    </div>
    <cell-group title="查询主题" v-if="!$route.params.id">
      <mt-field label="主题ID" placeholder="可在主题页URL中找到" v-model="form.id"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS" :disabled="!id">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" :disabled="!id" @click="addToFavorites">加入收藏
      </mt-button>
      <mt-button type="danger" size="large" v-else :disabled="!id" @click="removeFromFavorites">取消收藏</mt-button>
    </button-group>
  </div>
</template>

<script>
  import { Indicator, Toast } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import feeds from 'rsshub.js/feeds'

  const today = new Date()

  export default {
    name: 'Topic',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          id: this.$route.query.id || '',
        },

        result: null,
        popupVisible: false,
      }
    },
    computed: {
      id() {
        return this.$route.params.id || this.form.id
      },
      rssPath() {
        return `/jike/topic/square/${this.id}`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    filters: {
      time(isoTime) {
        let date = new Date(isoTime)
        if (date.getFullYear() === today.getFullYear()) {
          return isoTime.substr(5, 5)
        }
        return isoTime.substr(0, 10)
      },
    },
    methods: {
      async fetchRSS() {
        Indicator.open()
        return feeds.jike.topic_square({ id: this.id })
          .rss2()
          .catch(() => Indicator.close())
          .then(async (data) => {
            this.result = data
            Indicator.close()
          })
      },
      async addToFavorites() {
        let title
        if (!this.result) {
          await this.fetchRSS()
        }
        title = this.result.title.replace(' - 即刻主题广场', '')
        this.$store.commit('addFavorite', {
          type: 'jike',
          desc: this.$route.meta.title,
          title,
          path: `/jike/topic-square/${this.id}`,
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
      if (this.$route.params.id) {
        this.fetchRSS()
      }
    },
  }
</script>
