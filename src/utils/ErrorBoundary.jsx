import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false};
    }

    static getDerivedStateFromError (error) {
        //Update state so the next render show the fallback UI
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        //Log the error to an Error reporting service
        console.error('Error Boundary Caught: ', error, errorInfo);
    }

    render () {
        if (this.state.hasError){
            return <h1>Something went Terribly wrong! Please try again later.</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;