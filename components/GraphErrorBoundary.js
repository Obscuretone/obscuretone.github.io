import { Component } from 'react';

export default class GraphErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.error('Post graph failed to render', error);
    }

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return null;
        }

        return children;
    }
}
