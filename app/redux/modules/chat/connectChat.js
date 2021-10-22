import { connect } from 'react-redux';
import { chatActionCreators } from './actions';

function mapStateToProps({ chatState }) {
    return {
        chatState,
    };
}

const mapDispatchToProps = chatActionCreators;

export function connectChat(configMapStateToProps = mapStateToProps) {
    return connect(
        configMapStateToProps,
        mapDispatchToProps
    );
}
