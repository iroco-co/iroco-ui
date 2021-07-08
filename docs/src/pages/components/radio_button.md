# Radio Button

Iroco radio button component

## Usage

```example
<script>
    import { RadioButton } from "@iroco/ui";
    let value = 'value1'
</script>

<RadioButton name='doc' bind:group={value} value = 'value1'>Value 1</RadioButton>
<RadioButton name='doc' bind:group={value} value = 'value2'>Value 2</RadioButton>
```

## Properties
```properties
name | Name of the radio button group| 'myGroup'
value| Value of each radio button | 'value'
group | Shared value of radio button group. Can be bound to the external value | 'value'
```