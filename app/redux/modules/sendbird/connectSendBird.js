import { connect } from 'react-redux';
import * as sendBirdActions from './actions';

function mapStateToProps({ sendBirdState }) {
    return {
        sendBirdState,
    };
}

const mapDispatchToProps = sendBirdActions;

export function connectSendBird(configMapStateToProps = mapStateToProps) {
    return connect(
        configMapStateToProps,
        mapDispatchToProps
    );
}