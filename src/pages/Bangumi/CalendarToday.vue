<template>
  <div class="bangumi-calendar-today">
    <div class="container" v-if="result">
      <h2>{{ result.title }}</h2>
      <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      <div class="user-videos">
        <a :href="video.link" target="_blank" rel="noopener noreferrer" class="user-video"
           v-for="video of result.items" :key="video.guid">
          <div class="video-cover"
               v-html="video.content.match(/<img .+?>/)[0]"></div>
          <div class="video-info">{{video.title}}</div>
        </a>
      </div>
    </div>
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
          uid: this.$route.query.uid || '',
        },

        result: null,
        popupVisible: false,
      }
    },
    computed: {
      uid() {
        return this.$route.params.uid || this.form.uid
      },
      rssPath() {
        return `/bangumi/calendar/today`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    methods: {
      async fetchRSS() {
        Indicator.open()
        return feeds.bangumi.calendar_today()
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
        title = this.result.title.replace('bangumi ', '')
        this.$store.commit('addFavorite', {
          type: 'bangumi',
          desc: this.$route.meta.title,
          title,
          path: `/bangumi/calendar-today`,
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
      this.fetchRSS()
    },
  }
</script>

<style lang="less">
  .bangumi-calendar-today {
    .user-videos {
      margin-bottom: 15px;

      .user-video {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #eee;

        .video-cover {
          flex-shrink: 0;
          height: 60px;
          border-radius: 4px;
          margin-right: 10px;
          overflow: hidden;

          img {
            display: block;
            height: 100%;
          }
        }
        .video-info {
          flex-grow: 1;
          font-size: 14px;
        }
      }
    }
  }
</style>
