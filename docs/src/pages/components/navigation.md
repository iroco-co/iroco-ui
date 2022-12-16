# Navigation

Iroco Navigation component

## Usage

```example
<script>
    import { Navigation, NavigationItem } from "@iroco/ui";

    const navigationItems = [
        new NavigationItem("Account", "/account"),
        new NavigationItem("Password", () => "foo")
    ]
</script>

<Navigation title="Home" {navigationItems}/>
```

## Properties

```properties
navigationItems | an array of NavigationItems | see type definition in definition.d.ts file
title | string | the page title wich will be displayed in the top bar
```
