<script lang="ts">
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";

  import { createEventDispatcher } from "svelte";

  let email = "";
  let password = "";

  const dispatch = createEventDispatcher<{ submit: { email: string; password: string } }>();

  const submit = () => {
    dispatch("submit", { email, password });
  };
</script>

<form on:submit|preventDefault={submit} class="space-y-5 {$$props.class}">
  <Input label="Email" id="email" name="email" type="email" bind:value={email} required />
  <Input
    label="Password"
    id="password"
    name="password"
    type="password"
    bind:value={password}
    required
  />
  <Button type="submit">Sign In</Button>
</form>
