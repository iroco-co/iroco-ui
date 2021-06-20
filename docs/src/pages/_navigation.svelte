<script>
  import { layout, url, isActive } from "@roxi/routify";
  const components = $layout.children[0].children
          .filter((c) => c.meta["frontmatter"])
          .sort((a, b) => b.meta["frontmatter"].published.localeCompare(a.meta["frontmatter"].published));
  console.log(components)
</script>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li>Components</li>
    <ul>
      {#each components as {path, title}}
      <li><a href={$url(path)} class:active={$isActive(path)}>{title}</a></li>
    {/each}
    </ul>
  </ul>
</nav>

<style lang="scss">
  nav {
    ul {
      list-style: none;
    }
  }
</style>
