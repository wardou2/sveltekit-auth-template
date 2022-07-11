<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ session }) => {
    if (!session?.user) {
      return {
        status: 302,
        redirect: "/signin"
      };
    }
    return {
      props: { user: session.user }
    };
  };
</script>

<script>
  import "../app.css";
</script>

<slot />
