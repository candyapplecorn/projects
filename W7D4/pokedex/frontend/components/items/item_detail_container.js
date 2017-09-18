import { connect } from 'react-redux';
import ItemDetail from './item_detail';
import { selectItem } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  item: selectItem(state, ownProps.match.params.itemId)
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);
