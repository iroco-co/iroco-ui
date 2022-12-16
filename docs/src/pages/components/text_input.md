# Text Input

Iroco inputs fields for text

## Usage

```example
<script>
    import { TextInput } from "@iroco/ui";
</script>

<form class="iroco-ui-form">
  <TextInput id="id" type="text" placeholder="enter something" />
  <TextInput id="id" type="password" placeholder="enter your secrets" />
  <TextInput id="id" type="text" label="say me something" />
  <TextInput id="id" type="text" placeholder="wrong" error="error !!" />
  <TextInput id="id" type="text" htmlError="true" placeholder="wrong" error="see <a href='/'>this</a>" />
</form>
```

## Properties

```properties
id | Id of the text field | 'my_button'
type | Type of the text field | 'text','email','password'('text')
label | Label for the text field | 'string'
placeholder | Placeholder for the text field | 'string'
error | Error related to the input | 'string'
onFocus | Callback called when text input has focus | '(e) => void'
onBlur | Callback called when text input loose focus | '(e) => void'
htmlError | Boolean to display html in error text (beware whether the text source is trustable) | 'false'
```
