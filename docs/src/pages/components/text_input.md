# Text Input

Iroco inputs fields for text

## Usage

```example
<script>
    import { TextInput } from "@iroco/ui";
</script>

<TextInput id="id" type="text" placeholder="enter something" />
<TextInput id="id" type="password" placeholder="enter your secrets" />
<TextInput id="id" type="text" label="say me something" />
<TextInput id="id" type="text" placeholder="wrong" error="error !!" />
```

## Properties

```properties
id | Id of the text field | 'my_button'
type | Type of the text field | 'text','email','password'('text')
label | Label for the text field | 'string'
placeholder | Placeholder for the text field | 'string'
error | Error related to the input | 'string'
```