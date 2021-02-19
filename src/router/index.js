import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

/* eslint-disable */
export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/autologin',
      name: 'autologin',
      component: () => import('../views/login/autologin.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/bsitem/home.vue')
    },
    {
      path: '/allquery',
      name: 'allquery',
      component: () => import('../views/busquery/allquery.vue')
    },
    {
      path: '/bindindex',
      name: 'bindindex',
      component: () => import('../views/account/bindindex.vue')
    },
    {
      path: '/bindsuccess',
      name: 'bindsuccess',
      component: () => import('../views/account/bindsuccess.vue')
    },
    {
      path: '/bindverify',
      name: 'bindverify',
      component: () => import('../views/account/bindverify.vue')
    },
    {
      path: '/noresult',
      name: 'noresult',
      component: () => import('../views/account/noresult.vue')
    },
    {
      path: '/oauthbind',
      name: 'oauthbind',
      component: () => import('../views/account/oauthbind.vue')
    },
    {
      path: '/scrollload',
      name: 'scrollload',
      component: () => import('../components/ScrollLoading.vue')
    },
    {
      path: '/noauth',
      name: 'noauth',
      component: () => import('../views/account/noauth.vue')
    },
    {
      path: '/testlogin',
      name: 'testlogin',
      component: () => import('../views/test/testlogin.vue')
    },
    {
      path: '/testoauth',
      name: 'testoauth',
      component: () => import('../views/test/testoauth.vue')
    },
    {
      path: '/errorindex',
      name: 'errorindex',
      component: () => import('../views/error/index.vue')
    },
    ,
    {
      path: '/otherindex',
      name: 'otherindex',
      component: () => import('../views/busquery/other/index.vue')
    },
    {
      path: '/otherquery',
      name: 'otherquery',
      component: () => import('../views/busquery/other/query.vue')
    },
    {
      path: '/bookindex',
      name: 'bookindex',
      component: () => import('../views/book/index.vue')
    },
    {
      path: '/bookresult',
      name: 'bookresult',
      component: () => import('../views/book/result.vue')
    },
    {
      path: '/oauthbook',
      name: 'oauthbook',
      component: () => import('../views/book/oauthbook.vue')
    },
    {
      path: '/bookdetail',
      name: 'bookdetail',
      component: () => import('../views/book/detail.vue')
    },
    {
      path: '/querypdf',
      name: 'querypdf',
      component: () => import('../views/busquery/pdfviews/querypdf.vue')
    },
    {
      path: '/showpdf',
      name: 'showpdf',
      component: () => import('../views/busquery/pdfviews/showpdf.vue')
    },
    {
      path: '/notcertified',
      name: 'notcertified',
      component: () => import('../views/account/notcertified.vue')
    },
    {
      path: '/notlocaluser',
      name: 'notlocaluser',
      component: () => import('../views/account/notlocaluser.vue')
    }
  ]
})
