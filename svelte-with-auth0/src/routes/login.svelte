<script>
	import { onMount } from 'svelte';
	import auth from '$lib/services/auth';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let auth0Client;

	onMount(async () => {
		auth0Client = await auth.createClient();
		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	function login() {
		auth.loginWithPopup(auth0Client).then(() => {
			goto('/app');
		});
	}

	function logout() {
		auth.logout(auth0Client);
	}
</script>

<div class="flex flex-col space-y-4 justify-center" style="height: 50vh;">
	<h1 class="text-3xl">Login</h1>

	<p>Login using Auth0!</p>

	{#if $isAuthenticated}
		<h2>Hey {$user.name}!</h2>
		{#if $user.picture}
			<img src={$user.picture} alt={user.name} />
		{:else}
			<img src="https://source.unsplash.com/random/400x300" alt="Random Photo" />
		{/if}
		<button class="btn" on:click={logout}>Logout</button>
	{:else}
		<button class="btn" on:click={login}>Login</button>
	{/if}
</div>
