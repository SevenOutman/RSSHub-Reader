<template>
  <div class="ncm-user-playlist">
    <div class="result" v-if="result">
      <div class="result-header">
        <h2>{{ result.title }}
          <small><a :href="result.link" target="_blank" rel="noopener noreferrer">用户主页>></a></small>
        </h2>
      </div>
      <div class="result-items">
        <a
          v-for="playlist of playlists"
          :key="playlist.guid"
          :href="playlist.link"
          target="_blank"
          rel="noopener noreferrer"
          class="result-item playlist-music"
        >
          <div class="music-cover" v-html="playlist.cover">
          </div>
          <div class="music-info">
            <div class="music-title">{{ playlist.title }}</div>
            <div class="result-item-desc music-album">{{ playlist.isoDate | YMD }}</div>
          </div>
        </a>
      </div>
    </div>
    <cell-group title="查询用户歌单" v-if="!$route.params.uid">
      <mt-field label="用户UID" placeholder="可在用户主页URL中找到" v-model="form.uid"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS" :disabled="!uid">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" :disabled="!uid" @click="addToFavorites">加入收藏
      </mt-button>
      <mt-button type="danger" size="large" v-else :disabled="!uid" @click="removeFromFavorites">取消收藏</mt-button>
    </button-group>
  </div>
</template>

<script>
  import { Indicator, Toast } from 'mint-ui'
  import moment from 'moment'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import feeds from 'rsshub.js/feeds'

  export default {
    name: 'UserPlaylist',
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
        return `/ncm/user/playlist/${this.uid}`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
      playlists() {
        if (!this.result) return []
        return this.result.items.map(({guid, link, title, isoDate, content}) => {
          const cover = content.match(/<img.+?\/>/i)[0]
          return {
            guid,
            link,
            title,
            isoDate,
            cover
          }
        })
      }
    },
    filters: {
      YMD(isoTime) {
        return moment(isoTime).format('YYYY-MM-DD')
      }
    },
    methods: {
      async fetchRSS() {
        Indicator.open()
        return feeds.ncm.user_playlist({ uid: this.uid })
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
        title = this.result.title
        this.$store.commit('addFavorite', {
          type: 'ncm',
          desc: this.$route.meta.title,
          title,
          path: `/ncm/user-playlist/${this.uid}`,
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
      if (this.$route.params.uid) {
        this.fetchRSS()
      }
    },
  }
</script>
<style lang="less">
  .ncm-user-playlist {
    .result-item.playlist-music {
      padding: 0;
      display: flex;
      overflow: hidden;

      .music-cover {
        width: 64px;
        height: 64px;
        flex-shrink: 0;
        overflow: hidden;
        font-size: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          vertical-align: bottom;
          display: block;
          height: 100%;
        }
      }
      .music-info {
        flex-grow: 1;
        padding: 10px;
        overflow: hidden;
        .music-title, .music-album {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .music-album {
          margin: 0;
        }
      }
    }
  }
</style>
