# Number Input

Iroco inputs fields for numbers

## Usage

```example
<script>
    import { NumberInput } from "@iroco/ui";
</script>

<NumberInput id="id" type="number" placeholder="1" />
<NumberInput id="id" type="number" placeholder="1" min="1" max="10"/>
```

## Properties

```properties
id | Id of the number field | 'my_price'
type | Type of the number field | 'number'
label | Label for the number field | 'string'
placeholder | Placeholder for the number field | 'string'
error | Error related to the input | 'string'
min | Minimal value for number input | 'number'
max | Maximal value fot number input | 'number'
```