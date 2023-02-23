import React from 'react'

const SearchContext = React.createContext({
  SearchInput: '',
  isSearchButtonClick: false,
  setLoading: false,
  isFailure: false,
  resetFailure: () => {},
  setFailure: () => {},
  setSearchButton: () => {},
  updateLoading: () => {},
  updateSearchText: () => {},
  resetSearchButton: () => {},
  postsDate: [],
  setPostsData: () => {},
  initiateSearchPostLikeApi: () => {},
})

export default SearchContext
