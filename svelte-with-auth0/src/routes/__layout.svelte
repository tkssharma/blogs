<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="bg-white h-full w-full min-h-screen">
	<div class="w-full max-w-screen-xl mx-auto flex flex-col min-h-screen">
		<Header />
		<main class="px-6 flex-1">
			<slot />
		</main>
		<Footer />
	</div>
</div>
