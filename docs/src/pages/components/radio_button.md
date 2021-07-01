# Radio Button

Iroco radio button component

## Usage

```example
<script>
    import { RadioButton } from "@iroco/ui";
    let value = 'withSlot'
</script>

<RadioButton name='doc' bind:group={value} value = 'withSlot' >with slot</RadioButton>
<RadioButton name='doc' bind:group={value} value = 'withLabel' label = 'with label'/>
```

## Properties
```properties
type | Type of the button | 'button','submit'('button')
disabled | Make button disabled | bool(false)
```