import * as React from "react";
import { Router } from "wouter";

/**

/**
 * This code defines the react app
 *
 * Imports the router functionality to provide page navigation
 * Defines the Home function outlining the content on each page
 * Content specific to each page (Home and About) is defined in their components in /pages
 * Each page content is presented inside the overall structure defined here
 * The router attaches the page components to their paths
 */

// Import and apply CSS stylesheet
import "./styles/styles.scss";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";
import Splash from "./components/splash.jsx";

// The component that adds our Meta tags to the page
import Seo from "./components/seo.jsx";

// Home function that is reflected across the site

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 6000);
  }

  setTimePassed() {
    this.setState({ timePassed: true });
  }

  render() {
    if (!this.state.timePassed) {
      return <Splash />;
    } else {
      return <Router>
      <Seo />
        <main role="main">
          <div className="content">
            {/* Router specifies which component to insert here as the main content */}
            
            <PageRouter />
          </div>
        </main>
      </Router>
    }
  }
}
