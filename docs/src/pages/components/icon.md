# Icon

Iroco icon component base on https://feathericons.com/

## Usage

```example
<script>
    import { Icon } from "@iroco/ui";
    import { IconMastodon } from "@iroco/ui";
</script>

<Icon name="calendar"/>
<Icon name="clock" color="red"/>
<IconMastodon width="2em" height="2em"/>
```

## Properties

```properties
name | name of the icon | 'activity','bell-off'
stroke | stroke of the icon | string(undefined)
strokeWidth | stroke of the icon | string(undefined)
width | witdh of the icon | string(1em)
height | height of the icon | string(1em)
color | icon color | string(white)
```