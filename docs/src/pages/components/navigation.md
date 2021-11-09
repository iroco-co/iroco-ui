# Navigation

Iroco Navigation component

## Usage

```example
<script>
    import { Navigation } from "@iroco/ui";

    const navigationItems = [
        {
            destination : "/account", // the place where goes the link
            name : "Account" // the link name
        },

        {
            destination : "/password", // the place where goes the link
            name : "Password" // the link name
        }
    ]
</script>

<Navigation title="Home" {navigationItems}/>
```

## Properties
```properties
navigationItems | an array of NavigationItems | see type definition in definition.d.ts file
title | string | the page title wich will be displayed in the top bar
```