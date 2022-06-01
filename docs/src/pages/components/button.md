# Button

Iroco button component

## Usage

```example
<script>
    import { Button } from "@iroco/ui";
</script>

<Button>Click me</Button>
<Button kind="success">Sucess</Button>
<Button kind="danger">Remove</Button>
<Button kind="dark">Dark</Button>
<Button type="button" disabled="true">Disabled</Button>
```

## Properties
```properties
type | Type of the button | 'button','submit'('button')
disabled | Make button disabled | bool(false)
kind | the button kind (defines the button layout) | `basic|success|danger`
node | handle to the button HTML element
```