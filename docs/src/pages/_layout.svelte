<script>
  import { metatags, page } from "@roxi/routify";
  import Navigation from "./_navigation.svelte";

  $: metatags.title = `My Routify app - ${$page.title}`;
  metatags.description = "Description coming soon...";
</script>

<div class="container">
  <Navigation />
  <div class="page">
    <slot />
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    >.page {
      margin-left: 2em;
    }
  }
</style>