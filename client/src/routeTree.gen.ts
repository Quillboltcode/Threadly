/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/Profile'
import { Route as NotFoundImport } from './routes/NotFound'
import { Route as HomeImport } from './routes/Home'
import { Route as AboutImport } from './routes/About'

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  id: '/Profile',
  path: '/Profile',
  getParentRoute: () => rootRoute,
} as any)

const NotFoundRoute = NotFoundImport.update({
  id: '/NotFound',
  path: '/NotFound',
  getParentRoute: () => rootRoute,
} as any)

const HomeRoute = HomeImport.update({
  id: '/Home',
  path: '/Home',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/About',
  path: '/About',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/About': {
      id: '/About'
      path: '/About'
      fullPath: '/About'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/Home': {
      id: '/Home'
      path: '/Home'
      fullPath: '/Home'
      preLoaderRoute: typeof HomeImport
      parentRoute: typeof rootRoute
    }
    '/NotFound': {
      id: '/NotFound'
      path: '/NotFound'
      fullPath: '/NotFound'
      preLoaderRoute: typeof NotFoundImport
      parentRoute: typeof rootRoute
    }
    '/Profile': {
      id: '/Profile'
      path: '/Profile'
      fullPath: '/Profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/About': typeof AboutRoute
  '/Home': typeof HomeRoute
  '/NotFound': typeof NotFoundRoute
  '/Profile': typeof ProfileRoute
}

export interface FileRoutesByTo {
  '/About': typeof AboutRoute
  '/Home': typeof HomeRoute
  '/NotFound': typeof NotFoundRoute
  '/Profile': typeof ProfileRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/About': typeof AboutRoute
  '/Home': typeof HomeRoute
  '/NotFound': typeof NotFoundRoute
  '/Profile': typeof ProfileRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/About' | '/Home' | '/NotFound' | '/Profile'
  fileRoutesByTo: FileRoutesByTo
  to: '/About' | '/Home' | '/NotFound' | '/Profile'
  id: '__root__' | '/About' | '/Home' | '/NotFound' | '/Profile'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AboutRoute: typeof AboutRoute
  HomeRoute: typeof HomeRoute
  NotFoundRoute: typeof NotFoundRoute
  ProfileRoute: typeof ProfileRoute
}

const rootRouteChildren: RootRouteChildren = {
  AboutRoute: AboutRoute,
  HomeRoute: HomeRoute,
  NotFoundRoute: NotFoundRoute,
  ProfileRoute: ProfileRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/About",
        "/Home",
        "/NotFound",
        "/Profile"
      ]
    },
    "/About": {
      "filePath": "About.tsx"
    },
    "/Home": {
      "filePath": "Home.tsx"
    },
    "/NotFound": {
      "filePath": "NotFound.tsx"
    },
    "/Profile": {
      "filePath": "Profile.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
