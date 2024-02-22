<script lang="ts">
	import type { ButtonModel } from './definition';
	import { Icon } from 'svelte-awesome';
	import chevronRight from 'svelte-awesome/icons/chevronRight';

	export let imgSrc: string;
	export let figureCaption: string | undefined = undefined;
	export let alt: string;
	export let articleTitle: string;
	export let articleContent: string;
	export let buttonList: ButtonModel[] = [];
	export let reversed = false;
</script>

<div class="imagearticle" class:reversed>
	<figure class="imagearticle__figure">
		<img class="imagearticle__figure__image"
				 src={imgSrc}
				 {alt} />
		{#if figureCaption}
			<figcaption>{ figureCaption }</figcaption>
		{/if}
	</figure>

	<article class="imagearticle__article">
		<h1>{articleTitle}</h1>
		<p>{articleContent}</p>
		<div class="imagearticle__article__buttonGroup">
			{#each buttonList as buttonModel}
				<a
					class="iroco-ui-button iroco-ui-button--small iroco-ui-button--dark"
					href={buttonModel.href}
					role="button"
				>
					<Icon data={chevronRight} />
					{buttonModel.label}
				</a>
			{/each}
		</div>
	</article>
</div>

<style lang="scss">
  @import "./scss/containers";
  @import "./scss/button";

  .imagearticle {
    display: flex;
    justify-content: space-around;
    align-items: center;

    &__figure {

      width: 40%;
      display: block;
      object-fit: cover;
      margin: 0 auto;
      text-align: center;

      &__image {
        width: 100%;
      }
    }


    &__article {
      width: 50%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: 2em;

      &__buttonGroup {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;
      }
    }

    &.reversed {
      flex-direction: row-reverse;
    }
  }

  @include screen-tablet {
    .imagearticle {
      display: block;
      width: 80%;
      text-align: center;

      &__figure {
        width: 100%;

        &__image {
          width: 100%;
        }
      }

      &__article {
        width: 100%;
      }
    }
  }
</style>
