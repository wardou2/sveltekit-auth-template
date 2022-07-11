/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    user: { email: string } | null;
  }
  // interface Platform {}
  interface Session {
    user?: { email: string };
  }
  // interface Stuff {}
}
