<template>
  <div class="bilibili-video-comments">
    <template v-if="result">
      <div class="container">
        <h2>{{ result.title }}</h2>
      </div>
      <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      <cell-group class="video-comments">
        <mt-cell
          class="video-comment"
          v-for="comment of result.items"
          :key="comment.guid"
          :title="comment.title"
          :label="getCommentIndex(comment)"
          is-link
          :href="comment.link"
          target="_blank" rel="noopener noreferrer"
        />
      </cell-group>
    </template>
    <cell-group title="查询视频评论" v-if="!$route.params.aid">
      <mt-field label="AV号" placeholder="可在视频页URL中找到" v-model="form.aid"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS" :disabled="!aid">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" :disabled="!aid" @click="addToFavorites">加入收藏
      </mt-button>
      <mt-button type="danger" size="large" v-else :disabled="!aid" @click="removeFromFavorites">取消收藏</mt-button>
    </button-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Indicator, Toast } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import parse from '@/utils/parseRss'

  const today = new Date()

  export default {
    name: 'UserFollowers',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          aid: this.$route.query.aid || '',
        },

        result: null,
        popupVisible: false,
      }
    },
    computed: {
      aid() {
        return this.$route.params.aid || this.form.aid
      },
      rssPath() {
        return `/bilibili/video/reply/${this.aid}`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    methods: {
      formatTime(isoTime) {
        let date = new Date(isoTime)
        if (date.getFullYear() === today.getFullYear()) {
          return isoTime.substr(5, 5)
        }
        return isoTime.substr(0, 10)
      },
      getCommentIndex(comment) {
        return `${comment.content.split('<br>')[0]} ${this.formatTime(comment.isoDate)}`
      },
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
        title = this.result.title.replace(' 的 评论', '')
        this.$store.commit('addFavorite', {
          type: 'bilibili',
          desc: '视频评论',
          title,
          path: `/bilibili/video-comments/${this.aid}`,
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
      if (this.$route.params.aid) {
        this.fetchRSS()
      }
    },
  }
</script>

<style lang="less">
  .bilibili-video-comments {
    .video-comments {
      margin-bottom: 15px;
    }
  }
</style>
