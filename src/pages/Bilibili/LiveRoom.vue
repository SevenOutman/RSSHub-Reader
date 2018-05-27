<template>
  <div class="bilibili-live-room">
    <template v-if="result">
      <div class="container">
        <h2>{{ result.title }}</h2>
        <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      </div>
      <div class="room-activities container">
        <a :href="activity.link" target="_blank" rel="noopener noreferrer" class="room-activity"
           v-for="activity of result.items" :key="activity.guid">
          <div class="activity-time">{{ activity.isoDate | time }}</div>
          <div class="activity-content"
               v-html="formatContent(activity.content)"></div>
          <div class="activity-desc">{{activity.title}}</div>
        </a>
      </div>
    </template>
    <cell-group title="查询直播开播" v-if="!$route.params.roomID">
      <mt-field label="房间号" placeholder="可在直播间 URL 中找到" v-model="form.roomID"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS" :disabled="!roomID">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" :disabled="!roomID" @click="addToFavorites">加入收藏
      </mt-button>
      <mt-button type="danger" size="large" v-else :disabled="!roomID" @click="removeFromFavorites">取消收藏</mt-button>
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
    name: 'LiveRoom',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          roomID: this.$route.query.roomID || '',
        },

        result: null,
        popupVisible: false,
      }
    },
    computed: {
      roomID() {
        return this.$route.params.roomID || this.form.roomID
      },
      rssPath() {
        return `/bilibili/live/room/${this.roomID}`
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
        return axios(this.rssPath)
          .catch(() => Indicator.close())
          .then(async ({ data }) => {
            this.result = await parse(data)
            Indicator.close()
          })
      },
      formatContent(content) {
        return content
      },
      async addToFavorites() {
        let title
        if (!this.result) {
          await this.fetchRSS()
        }
        title = this.result.title.replace(' 直播间开播状态 ', '')
        this.$store.commit('addFavorite', {
          type: 'bilibili',
          desc: '直播开播',
          title,
          path: `/bilibili/live-room/${this.roomID}`,
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
      if (this.$route.params.roomID) {
        this.fetchRSS()
      }
    },
  }
</script>

<style lang="less">
  .bilibili-live-room {
    .room-activities {
      padding: 10px;
      margin-bottom: 15px;
      background-color: rgb(244, 245, 247);

      .room-activity {
        padding: 10px;
        background-color: #fff;
        border-radius: 4px;
        display: block;
        &:not(:last-child) {
          margin-bottom: 10px;
        }

        .activity-time {
          opacity: 0.5;
          font-size: 14px;
          margin-bottom: 1em;
        }

        .activity-content {
          img {
            display: block;
            max-width: 100%;
            border-radius: 4px;
          }
        }
        .activity-desc {
          font-size: 14px;
          margin-top: 1em;
        }
      }
    }
  }
</style>
