import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(
      Component.Explorer({
        folderDefaultState: "open",
        // First "Writing" or "Blog", then others
        sortFn: (a, b) => {
          if (a.name.includes("Writing") || a.name.includes("Blog")) return -1
          if (b.name.includes("Writing") || b.name.includes("Blog")) return 1
          return 0
        },
      }),
    ),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Search(),
    Component.DesktopOnly(Component.Backlinks()),
    Component.MobileOnly(
      Component.Explorer({
        folderDefaultState: "collapsed",
        // First "Writing" or "Blog", then others
        sortFn: (a, b) => {
          if (a.name.includes("Writing") || a.name.includes("Blog")) return -1
          if (b.name.includes("Writing") || b.name.includes("Blog")) return 1
          return 0
        },
      }),
    ),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [],
}
