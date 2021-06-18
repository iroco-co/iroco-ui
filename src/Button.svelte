<script lang="ts">
    let nightMode: string = 'night';
    function toggle() {
      nightMode = 'day';
    }
</script>

<button class="iroco-ui-button {nightMode}" on:click={toggle}>Test</button>

<style lang="scss">
    @use "colors";
    @use "fonts";
    @use "containers";

    .iroco-ui-button {
      display: block;
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: none;
      flex-shrink: 0;
      padding: 0;
      margin: 0;
      background: transparent;
      position: relative;
      transition: background linear 100ms, border linear 100ms;

      &:hover, &.active, &:focus {
        >.background {
          width: 100%;
        }
      }

      >.background {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 0;
        height: 3px;
        background: colors.$green;
        transition: all 400ms cubic-bezier(.215,.61,.355,1);
      }

      >.container {
        width: 100%;
        position: relative;
        z-index: 0;
        min-height: 40px;
        display: flex;
        align-items: stretch;
        justify-content: space-between;

        >.body {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          flex-shrink: 2;
          min-width: 0;

          >.left-icon {
            align-self: center;
            padding: 5px;
            flex-shrink: 0;
          }

          >.left-separator {
            transition: background linear 100ms;
            width: 1px;
            min-width: 1px;
            flex-shrink: 0;
          }

          >span {
            @include fonts.Arial(1em, white, bold);
            padding: 5px 10px;
            text-transform: uppercase;
            letter-spacing: .2em;
            align-self: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            flex-shrink: 2;

            @include containers.screen-mobile-M() {
              font-size: .8em;
            }

          }

        }

        >.right-icon {
          align-self: center;
          padding: 5px 10px;
          flex-shrink: 0;

        }
      }

      >.pending {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
        background: colors.$blue;
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition: visibility linear 100ms, opacity linear 100ms;

      }

      &.pending {
        >.pending {
          visibility: visible;
          opacity: 1;
        }
      }

      &.outline-green {
        background: colors.$blue;

        >.background {
          height: 100%;
          background: colors.$green;
        }

        &:hover, &.active, &:focus {
          >.background {
            width: 100%;
          }
        }

        >.container {
          padding: 10px 20px;

          >.body {
            >.left-separator {
              background: colors.$beige;
              margin: 0 10px;
            }

            >span {
              color: colors.$beige;
            }
          }

          svg {
            fill: colors.$beige;
          }
        }

      }

      &.fill-green {
        background: colors.$green;

        >.background {
          height: 100%;
          background: colors.$blue;
        }

        &:hover, &.active, &:focus {
          >.background {
            width: 100%;
          }
        }

        >.container {
          padding: 10px 20px;

          >.body {
            >.left-separator {
              background: colors.$darkBlue;
              margin: 0 10px;
            }

            >span {
              color: white;
              letter-spacing: 0.1em;
            }
          }

          svg {
            fill: colors.$darkBlue;
          }

        }

      }

    }
</style>
