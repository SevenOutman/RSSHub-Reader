export default {
  addFavorite(state, favorite) {
    state.favorites.push(favorite)
  },
  removeFavorite(state, rss) {
    state.favorites = state.favorites.filter((favorite) => rss !== favorite.rss)
  }
}
