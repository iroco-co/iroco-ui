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
name | Name of the radio button group| 'myGroup'
value| Value of each radio button | 'value'
group | Shared value of radio button group. Can be bound to the external value | 'value'
label | Optional value of the label. If not provided slot will be used | 'My option 1' 
```