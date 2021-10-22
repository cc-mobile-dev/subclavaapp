import { connect } from 'react-redux';
import { accountActionCreators } from './actions';

function mapStateToProps({ accountState }) {
    return {
        accountState,
    };
}

const mapDispatchToProps = accountActionCreators;

export function connectAccount(configMapStateToProps = mapStateToProps) {
    return connect(
        configMapStateToProps,
        mapDispatchToProps
    );
}
