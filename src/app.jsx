import * as React from "react";
import { Router } from "wouter";
import { registerSW } from 'virtual:pwa-register'

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
import "./styles/normalize.css";
import "./styles/styles.scss";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";
// The component that adds our Meta tags to the page
import Seo from "./components/seo.jsx";

// Home function that is reflected across the site

export default function Home() {
  
  registerSW({ immediate: true })
  
      return <Router>
      <Seo />
        <main role="main">
          <div className="content"> 
            <PageRouter />
          </div>
        </main>
      </Router>
}
