import { connect } from 'react-redux';
import { socketActionCreators } from './actions';

function mapStateToProps({ socketState }) {
    return {
        socketState,
    };
}

const mapDispatchToProps = socketActionCreators;

export function connectSocket(configMapStateToProps = mapStateToProps) {
    return connect(
        configMapStateToProps,
        mapDispatchToProps
    );
}
