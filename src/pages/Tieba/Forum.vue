<template>
  <div class="tieba-forum">
    <div class="result" v-if="result">
      <div class="container">
        <h2>{{ result.title }}</h2>
      </div>
      <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      <div class="result-items">
        <a
          class="result-item"
          target="_blank"
          rel="noopener noreferrer"
          v-for="post of result.items"
          :key="post.guid"
          :href="post.link"
        >
          <div class="result-item-time">{{ post.time | time }}</div>
          <div class="result-item-title" v-html="post.title"></div>
          <div class="result-item-content" v-html="post.content"></div>
        </a>
      </div>
    </div>
    <cell-group title="查询帖子列表" v-if="!$route.params.seasonid">
      <mt-field label="吧名" placeholder="贴吧全名" v-model="form.kw"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" @click="addToFavorites">加入收藏</mt-button>
      <mt-button type="danger" size="large" v-else @click="removeFromFavorites">取消收藏</mt-button>
    </button-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Indicator, Toast } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import parse from '@/utils/parseRss'
  import feeds from 'rsshub.js/feeds'

  export default {
    name: 'CalendarToday',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          kw: this.$route.params.kw || '',
        },

        result: null,
        popupVisible: false,
      }
    },
    computed: {
      kw() {
        return this.$route.params.kw || this.form.kw
      },
      rssPath() {
        return `/tieba/forum/today`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    methods: {
      async fetchRSS() {
        function item2post({ guid, link, title, content, isoDate }) {
          const [preview, image, author] = content.match(/<p>.*?<\/p>/g)
          return {
            guid,
            link,
            title,
            content: preview + image,
            author,
            time: isoDate
          }
        }

        function rss2result({ title, link, items }) {
          return {
            title,
            link,
            items: items.map(item2post)
          }
        }

        Indicator.open()
        return feeds.tieba.forum({ kw: this.kw })
          .rss2()
          .catch(() => Indicator.close())
          .then(async (data) => {
            this.result = rss2result(data)
            Indicator.close()
          })
      },
      async addToFavorites() {
        let title
        if (!this.result) {
          await this.fetchRSS()
        }
        this.$store.commit('addFavorite', {
          type: 'tieba',
          desc: this.$route.meta.title,
          title: this.result.title,
          path: `/tieba/forum/${this.kw}`,
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
      if (this.$route.params.kw) {
        this.fetchRSS()
      }
    },
  }
</script>

<style lang="less">
  .tieba-forum {
    .result-item-content {
      p:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
