import React, { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux/native';

import SearchInput from './SearchInput';
import CategoryBrowser from './CategoryBrowser';
import { navigateTo } from '../shared/router/routerActions';
import { setSearchTerm, selectCategory, resetSearchTerm, resetCategory } from './actions';

class Finder extends React.Component {
  
  constructor(props) {
    super(props);
    
    this._onFindDealsForSearchTerm = this._onFindDealsForSearchTerm.bind(this);
    this._onFindDealsForCategory = this._onFindDealsForCategory.bind(this);
  }
  
  _onFindDealsForSearchTerm(searchTerm) {
    this.props.dispatch(setSearchTerm(searchTerm));
    this.props.dispatch(navigateTo('/deals'));
  }

  _onFindDealsForCategory(selectedCategory) {
    this.props.dispatch(selectCategory(selectedCategory));
    this.props.dispatch(navigateTo('/deals'));
  }
    
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchinput}>
          <SearchInput searchTerm={this.props.searchTerm} onSearch={(searchTerm) => this._onFindDealsForSearchTerm(searchTerm)} />
        </View>
        <View style={styles.categorybrowser}>
          <CategoryBrowser categories={this.props.categories} onSelectCategory={(category) => this._onFindDealsForCategory(category)} />
        </View>
      </View>      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchinput: {
    flex: 1
  },
  categorybrowser: {
    flex: 3
  }
});

function mapStateToProps(state) {
  return {
    categories: state.finder.categories.items,
    searchTerm: state.finder.searchTerm,
    selectedCategory: state.finder.selectedCategory
  };
}

export default connect(mapStateToProps)(Finder)