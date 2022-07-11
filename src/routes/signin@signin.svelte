<script lang="ts">
  import SignInForm from "$components/SignInForm.svelte";

  let error = "";

  const handleSubmit = async ({
    detail: { email, password }
  }: {
    detail: { email: string; password: string };
  }) => {
    const res = await fetch("api/sign-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      error = (await res.json()).message;
      return;
    }

    window.location = "/";
  };
</script>

<h1 class="text-2xl font-semibold text-center">Sign In</h1>
{#if error}
  <p class="mt-3 text-red-500 text-center font-semibold">{error}</p>
{/if}

<SignInForm class="max-w-xl mx-auto mt-8" on:submit={handleSubmit} />
