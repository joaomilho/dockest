/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const engineeringBlogPostUrl = 'https://engineering.klarna.com/node-js-integration-testing-with-ease-fab5f8d29163'

const siteConfig = {
  title: 'Dockest', // Title for your website.
  tagline:
    'Dockest is an integration testing tool aimed at alleviating the process of evaluating unit tests whilst running multi-container Docker applications.',
  url: 'https://erikengervall.github.io', // Your website URL
  baseUrl: '/dockest/', // Base URL for your project
  organizationName: 'erikengervall',
  projectName: 'Dockest', // Used for publishing and more

  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {
      doc: 'introduction',
      label: 'Docs',
    },
    {
      doc: 'typedoc/index',
      label: 'Types',
    },
  ],

  /* path to images for header/footer */
  // headerIcon: 'img/favicon.png',
  // footerIcon: 'img/favicon.png',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#55735a',
    secondaryColor: '#3b503e',
  },
  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */
  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Erik Engervall`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'github',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  // ogImage: 'img/undraw_online.svg',
  // twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/erikengervall/dockest',
  engineeringBlogPostUrl,
}

module.exports = siteConfig
