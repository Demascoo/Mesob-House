import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div className="page">
          <div
            className="panel panel--coral"
            style={{ padding: 40, textAlign: "center" }}
          >
            <div style={{ fontSize: "2.5rem" }}>🍽️</div>
            <h2 style={{ marginTop: 12 }}>Something went wrong</h2>
            <p
              style={{
                color: "var(--soft)",
                marginTop: 8,
                fontSize: "0.85rem",
              }}
            >
              The rest of the site is fine.
            </p>
            <button
              className="btn"
              onClick={this.reset}
              style={{ marginTop: 16 }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
