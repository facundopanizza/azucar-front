import React from 'react';
import Router from 'next/router';

class Index extends React.Component {
  static async getInitialProps(ctx) {
    if (ctx && ctx.req) {
      ctx.res.writeHead(302, { Location: '/products' });
      ctx.res.end();
    } else {
      Router.push('/page');
    }
  }
}

export default Index;
